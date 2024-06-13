using Stripe;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using FederataFutbollit.DTOs;
using Stripe.Checkout;
using Microsoft.Extensions.Logging;
using FederataFutbollit.Repositories;
using Microsoft.Extensions.Options;

namespace FederataFutbollit.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly StripeSettings _stripeSettings;
        private readonly ILogger<PaymentController> _logger;

        public PaymentController(IOptions<StripeSettings> stripeSettings, ILogger<PaymentController> logger)
        {
            _stripeSettings = stripeSettings.Value;
            _logger = logger;
            StripeConfiguration.ApiKey = _stripeSettings.SecretKey;
        }

[HttpPost("create-checkout-session")]
public ActionResult CreateCheckoutSession([FromBody] CartDto cart)
{
    if (cart == null || cart.CartSeats == null || !cart.CartSeats.Any())
    {
        _logger.LogError("Cart is empty or invalid");
        return BadRequest("Cart is empty or invalid");
    }

    var metadata = new Dictionary<string, string>
    {
        { "userId", cart.ApplicationUserId },
        { "firstName", cart.FirstName },
        { "lastName", cart.LastName },
        { "city", cart.City }
    };

    foreach (var seat in cart.CartSeats)
    {
        metadata[$"seatFirstName_{seat.UlesjaId}"] = seat.SeatFirstName;
        metadata[$"seatLastName_{seat.UlesjaId}"] = seat.SeatLastName;
    }

    var options = new SessionCreateOptions
    {
        PaymentMethodTypes = new List<string> { "card" },
        LineItems = cart.CartSeats.Select(seat => new SessionLineItemOptions
        {
            PriceData = new SessionLineItemPriceDataOptions
            {
                UnitAmount = (long)(seat.Cmimi * 100), // Stripe requires amounts in cents
                Currency = "eur",
                ProductData = new SessionLineItemPriceDataProductDataOptions
                {
                    Name = $"Seat {seat.UlesjaId} in Sector {seat.SektoriUlseveId}"
                }
            },
            Quantity = seat.Quantity,
        }).ToList(),
        Mode = "payment",
        SuccessUrl = "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
        CancelUrl = "http://localhost:3000/cancel",
        Metadata = metadata
    };

    try
    {
        var service = new SessionService();
        Session session = service.Create(options);

        return Ok(new { sessionId = session.Id, userId = cart.ApplicationUserId });
    }
    catch (StripeException e)
    {
        _logger.LogError(e, "Stripe error");
        return BadRequest(e.Message);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "General error");
        return BadRequest(new { error = ex.Message });
    }
}

    }
}
