using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FederataFutbollit.Entities;
using FederataFutbollit.Data;
using FederataFutbollit.DTOs;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly DataContext _context;

        public CartController(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets the cart for a specific user. Creates a new cart if it doesn't exist.
        /// </summary>
        /// <param name="userId">The user's ID.</param>
        /// <returns>The user's cart.</returns>
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
                    Cmimi = cs.Cmimi
                }).ToList()
            };

            return Ok(cartDto);
        }

        [HttpPost]
        public async Task<ActionResult<CartDto>> AddToCart([FromBody] CartSeatDto cartSeatDto)
        {
            var ulesja = await _context.Uleset.FindAsync(cartSeatDto.UlesjaId);
            if (ulesja == null) return NotFound("Ulesja not found");

            var sektoriUlseve = await _context.SektoriUlseve.FindAsync(cartSeatDto.SektoriUlseveId);
            if (sektoriUlseve == null) return NotFound("Sektori not found");

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
                    Cmimi = ulesja.Cmimi
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
                    Cmimi = cs.Cmimi
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
    }
}
