using System;
using System.IO;
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
                    var cart = await _context.Carts
                        .Include(c => c.CartSeats)
                        .FirstOrDefaultAsync(c => c.ApplicationUserId == userId);

                    if (cart == null || !cart.CartSeats.Any())
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
                        Seats = cart.CartSeats.ToList(),
                        FirstName = firstName,
                        LastName = lastName,
                        City = city
                    };

                    _context.Orders.Add(order);
                    await _context.SaveChangesAsync();

                    // Log successful order creation
                    _logger.LogInformation($"Order created successfully for userId: {userId}, orderId: {order.Id}");

                    // Clear the cart
                    _context.CartSeats.RemoveRange(cart.CartSeats);
                    await _context.SaveChangesAsync();
                }

                return Ok();
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
