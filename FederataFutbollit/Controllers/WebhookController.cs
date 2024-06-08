using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using FederataFutbollit.Data;
using FederataFutbollit.Entities;
using FederataFutbollit.Repositories;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebhookController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<WebhookController> _logger;
        private readonly StripeSettings _stripeSettings;

        public WebhookController(DataContext context, ILogger<WebhookController> logger, IOptions<StripeSettings> stripeSettings)
        {
            _context = context;
            _logger = logger;
            _stripeSettings = stripeSettings.Value;
        }

        [HttpPost]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _stripeSettings.WebhookSecret);
                _logger.LogInformation($"Received Stripe event: {stripeEvent.Type}");

                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var session = stripeEvent.Data.Object as Stripe.Checkout.Session;

                    if (session == null)
                    {
                        _logger.LogError("Stripe session is null");
                        return BadRequest("Stripe session is null");
                    }

                    // Log full session object
                    _logger.LogInformation($"Stripe session: {session}");

                    // Retrieve metadata from the session
                    var userId = session.Metadata["userId"];
                    var firstName = session.Metadata["firstName"];
                    var lastName = session.Metadata["lastName"];
                    var city = session.Metadata["city"];

                    _logger.LogInformation($"Session metadata: userId={userId}, firstName={firstName}, lastName={lastName}, city={city}");

                    if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(lastName) || string.IsNullOrEmpty(city))
                    {
                        _logger.LogError("Metadata is missing or empty");
                        return BadRequest("Metadata is missing or empty");
                    }

                    // Find the user's cart
                    var cartSeats = await _context.CartSeats
                        .Include(cs => cs.Cart)
                        .Include(cs => cs.Ndeshja)
                        .Include(cs => cs.Ulesja)
                        .Include(cs => cs.SektoriUlseve)
                        .Where(cs => cs.Cart.ApplicationUserId == userId)
                        .ToListAsync();

                    if (cartSeats == null || !cartSeats.Any())
                    {
                        _logger.LogError($"Cart is empty or not found for userId: {userId}");
                        return BadRequest("Cart is empty or not found");
                    }

                    // Create the order
                    var order = new Order
                    {
                        UserId = userId,
                        OrderDate = DateTime.UtcNow,
                        Status = "Completed",
                        FirstName = firstName,
                        LastName = lastName,
                        City = city,
                        Cmimi = cartSeats.Sum(cs => cs.Cmimi * cs.Quantity),
                        NdeshjaId = cartSeats.First().NdeshjaId,
                        Quantity = cartSeats.Sum(cs => cs.Quantity),
                        SektoriUlseveId = cartSeats.First().SektoriUlseveId,
                        UlesjaId = cartSeats.First().UlesjaId,
                    };

                    _context.Orders.Add(order);
                    await _context.SaveChangesAsync();

                    // Log successful order creation
                    _logger.LogInformation($"Order created successfully for userId: {userId}, orderId: {order.Id}");

                    // Create tickets for each seat in the cart
                    foreach (var cartSeat in cartSeats)
                    {
                        // Check if the seat has already been sold
                        var existingTicket = await _context.Biletat
                            .AnyAsync(b => b.UlesjaID == cartSeat.UlesjaId);
                        if (existingTicket)
                        {
                            _logger.LogError($"Seat with ID {cartSeat.UlesjaId} has already been sold.");
                            continue; // Skip this seat
                        }

                        var bileta = new Bileta
                        {
                            FirstName = firstName,
                            LastName = lastName,
                            Cmimi = (int)cartSeat.Cmimi,
                            OraBlerjes = DateTime.UtcNow,
                            UlesjaID = cartSeat.UlesjaId,
                            SektoriUlseveID = cartSeat.SektoriUlseveId,
                            NdeshjaID = cartSeat.NdeshjaId,
                            ApplicationUserID = userId
                        };

                        _context.Biletat.Add(bileta);

                        // Mark the seat as unavailable
                        var ulesja = await _context.Uleset.FindAsync(cartSeat.UlesjaId);
                        if (ulesja != null)
                        {
                            ulesja.IsAvailable = false;
                            _context.Uleset.Update(ulesja);
                        }
                        else
                        {
                            _logger.LogError($"Ulesja not found for ID: {cartSeat.UlesjaId}");
                        }
                    }
                    await _context.SaveChangesAsync();

                    // Clear the cart seats
                    _context.CartSeats.RemoveRange(cartSeats);
                    await _context.SaveChangesAsync();
                }

                return Ok();
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError($"Database update exception: {dbEx.InnerException?.Message}");
                return BadRequest("Database update error occurred.");
            }
            catch (StripeException e)
            {
                _logger.LogError($"Stripe exception: {e.Message}");
                return BadRequest();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong in webhook: {ex.Message}");
                return BadRequest();
            }
        }
    }
}
