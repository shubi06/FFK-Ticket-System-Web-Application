using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FederataFutbollit.Entities;
using FederataFutbollit.Data;
using FederataFutbollit.DTOs;
using Microsoft.Extensions.Logging;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<CartController> _logger;

        public CartController(DataContext context, ILogger<CartController> logger)
        {
            _context = context;
            _logger = logger;
        }

         [HttpGet("{userId}")]
        public async Task<IActionResult> GetCart(string userId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartSeats)
                .FirstOrDefaultAsync(c => c.ApplicationUserId == userId);

            if (cart == null)
            {
                cart = new Cart { ApplicationUserId = userId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
                return Ok(new CartDto
                {
                    Id = cart.Id,
                    ApplicationUserId = cart.ApplicationUserId,
                    CartSeats = new List<CartSeatDto>()
                });
            }

            var cartDto = new CartDto
            {
                Id = cart.Id,
                ApplicationUserId = cart.ApplicationUserId,
                CartSeats = cart.CartSeats.Select(cs => new CartSeatDto
                {
                    Id = cs.Id,
                    UlesjaId = cs.UlesjaId,
                    Quantity = cs.Quantity,
                    SektoriUlseveId = cs.SektoriUlseveId,
                    Cmimi = cs.Cmimi,
                    NdeshjaId = cs.NdeshjaId // Add this line
                }).ToList()
            };

            return Ok(cartDto);
        }

        [HttpPost]
        public async Task<ActionResult<CartDto>> AddToCart([FromBody] CartSeatDto cartSeatDto)
        {
            _logger.LogInformation($"Received AddToCart request for user {cartSeatDto.ApplicationUserId} with NdeshjaId {cartSeatDto.NdeshjaId}");

            var ulesja = await _context.Uleset.FindAsync(cartSeatDto.UlesjaId);
            if (ulesja == null) return NotFound("Ulesja not found");

            var sektoriUlseve = await _context.SektoriUlseve.FindAsync(cartSeatDto.SektoriUlseveId);
            if (sektoriUlseve == null) return NotFound("Sektori not found");

            // Find Ndeshja from Ulesja's NdeshjaId
            var ndeshja = await _context.Set<Ndeshja>().FindAsync(cartSeatDto.NdeshjaId);
            if (ndeshja == null) 
            {
                _logger.LogWarning($"Ndeshja with ID {cartSeatDto.NdeshjaId} not found");
                return NotFound("Ndeshja not found");
            }

            var cart = await _context.Carts
                .Include(c => c.CartSeats)
                .FirstOrDefaultAsync(c => c.ApplicationUserId == cartSeatDto.ApplicationUserId);

            if (cart == null)
            {
                cart = new Cart
                {
                    ApplicationUserId = cartSeatDto.ApplicationUserId,
                    CartSeats = new List<CartSeat>()
                };
                _context.Carts.Add(cart);
            }

            var existingSeat = cart.CartSeats.FirstOrDefault(cs => cs.UlesjaId == cartSeatDto.UlesjaId);
            if (existingSeat != null)
            {
                existingSeat.Quantity += cartSeatDto.Quantity;
                existingSeat.Cmimi = ulesja.Cmimi;
            }
            else
            {
                cart.CartSeats.Add(new CartSeat
                {
                    UlesjaId = cartSeatDto.UlesjaId,
                    Quantity = cartSeatDto.Quantity,
                    CartId = cart.Id,
                    SektoriUlseveId = cartSeatDto.SektoriUlseveId,
                    Cmimi = ulesja.Cmimi,
                    NdeshjaId = cartSeatDto.NdeshjaId
                });
            }

            await _context.SaveChangesAsync();

            var cartDto = new CartDto
            {
                Id = cart.Id,
                ApplicationUserId = cart.ApplicationUserId,
                CartSeats = cart.CartSeats.Select(cs => new CartSeatDto
                {
                    Id = cs.Id,
                    UlesjaId = cs.UlesjaId,
                    Quantity = cs.Quantity,
                    SektoriUlseveId = cs.SektoriUlseveId,
                    Cmimi = cs.Cmimi,
                    NdeshjaId = cs.NdeshjaId
                }).ToList()
            };

            return Ok(cartDto);
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateCartSeat(string userId, [FromBody] CartSeat cartSeat)
        {
            var cart = await _context.Carts
                .Include(c => c.CartSeats)
                .FirstOrDefaultAsync(c => c.ApplicationUserId == userId);

            if (cart == null) return NotFound("Cart not found");

            var existingSeat = cart.CartSeats.FirstOrDefault(cs => cs.UlesjaId == cartSeat.UlesjaId);
            if (existingSeat == null) return NotFound("Seat not found in cart");

            if (cartSeat.Quantity > 0)
            {
                existingSeat.Quantity = cartSeat.Quantity;
                existingSeat.NdeshjaId = cartSeat.NdeshjaId;
            }
            else
            {
                cart.CartSeats.Remove(existingSeat);
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{userId}/{seatId}")]
        public async Task<IActionResult> RemoveFromCart(string userId, int seatId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartSeats)
                .FirstOrDefaultAsync(c => c.ApplicationUserId == userId);

            if (cart == null) return NotFound("Cart not found");

            var seat = cart.CartSeats.FirstOrDefault(cs => cs.Id == seatId);
            if (seat == null) return NotFound("Seat not found in cart");

            cart.CartSeats.Remove(seat);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("complete-payment/{userId}")]
        public async Task<IActionResult> CompletePayment(string userId)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    _logger.LogInformation($"Starting complete payment process for user {userId}");

                    var cart = await _context.Carts
                        .Include(c => c.CartSeats)
                            .ThenInclude(cs => cs.Ulesja)
                        .FirstOrDefaultAsync(c => c.ApplicationUserId == userId);

                    if (cart == null)
                    {
                        _logger.LogError($"Cart not found for user {userId}");
                        await transaction.RollbackAsync();
                        return NotFound("Cart not found");
                    }

                    _logger.LogInformation($"Cart found for user {userId}. Processing seats...");
                    bool isAnySeatUpdated = false;
                    foreach (var seat in cart.CartSeats)
                    {
                        var ulesja = seat.Ulesja;
                        if (ulesja != null && ulesja.IsAvailable)
                        {
                            _logger.LogInformation($"Updating seat {ulesja.Id} to not available");
                            ulesja.IsAvailable = false;
                            _context.Entry(ulesja).State = EntityState.Modified;
                            isAnySeatUpdated = true;
                        }
                        else
                        {
                            _logger.LogWarning($"Seat {ulesja?.Id} is already not available or does not exist");
                        }
                    }

                    if (isAnySeatUpdated)
                    {
                        _logger.LogInformation($"Saving changes to database");
                        await _context.SaveChangesAsync();
                    }

                    _logger.LogInformation($"Clearing cart for user {userId}");
                    _context.CartSeats.RemoveRange(cart.CartSeats);
                    await _context.SaveChangesAsync();

                    await transaction.CommitAsync();
                    _logger.LogInformation($"Payment completed and cart cleared for user {userId}");
                    return Ok("Payment completed and cart cleared.");
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Error during payment completion for user {userId}: {ex.Message}");
                    await transaction.RollbackAsync();
                    return StatusCode(500, "Internal Server Error: " + ex.Message);
                }
            }
        }

        [HttpPost("create-order/{userId}")]
        public async Task<IActionResult> CreateOrder(string userId, [FromBody] OrderCreationDto orderDto)
        {
            var cart = await _context.Carts
                .Include(c => c.CartSeats)
                .FirstOrDefaultAsync(c => c.ApplicationUserId == userId);

            if (cart == null || !cart.CartSeats.Any())
            {
                return BadRequest("Cart is empty");
            }

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                Status = "Pending",
                Seats = cart.CartSeats.ToList(),
                FirstName = orderDto.FirstName,
                LastName = orderDto.LastName,
                City = orderDto.City
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new { orderId = order.Id });
        }
    }
}
