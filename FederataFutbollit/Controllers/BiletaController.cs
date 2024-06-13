using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FederataFutbollit.Data;
using FederataFutbollit.Entities;
using FederataFutbollit.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BiletaController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<BiletaController> _logger;

        public BiletaController(DataContext context, ILogger<BiletaController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Bileta>>> Get()
        {
            return await _context.Biletat
                .Include(b => b.Ulesja)
                .Include(b => b.Ndeshja)
                .Include(b => b.ApplicationUser)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Bileta>> GetBiletaById(int id)
        {
            var bileta = await _context.Biletat
                .Include(b => b.Ulesja)
                .Include(b => b.Ndeshja)
                .Include(b => b.ApplicationUser)
                .FirstOrDefaultAsync(b => b.Id == id);
            if (bileta == null)
            {
                return NotFound();
            }
            return bileta;
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<Bileta>>> GetTicketsByUserId(string userId)
        {
            try
            {
                var tickets = await _context.Biletat
                    .Include(b => b.Ulesja)
                    .Include(b => b.Ndeshja)
                    .Include(b => b.SektoriUlseve) // This includes the Ndeshja entity
                    .Where(b => b.ApplicationUserID == userId)
                    .ToListAsync();

                if (tickets == null || !tickets.Any())
                {
                    return NotFound();
                }

                return tickets;
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here for further investigation
                return StatusCode(500, "Internal server error");
            }
        }

    [HttpPost("check-ticket-limit")]
public async Task<ActionResult> CheckTicketLimit(string userId, int ndeshjaId)
{
    _logger.LogInformation("Checking ticket limit for user {UserId} and match {NdeshjaId}", userId, ndeshjaId);
    
    var ticketCount = await _context.Biletat
        .Where(b => b.ApplicationUserID == userId && b.NdeshjaID == ndeshjaId)
        .CountAsync();
    
    _logger.LogInformation("User {UserId} has {TicketCount} tickets for match {NdeshjaId}", userId, ticketCount, ndeshjaId);

    if (ticketCount >= 4)
    {
        _logger.LogWarning("User {UserId} has reached the maximum limit of 4 tickets for match {NdeshjaId}", userId, ndeshjaId);
        return Ok(new { limitReached = true, ticketCount });
    }

    _logger.LogInformation("User {UserId} can purchase more tickets for match {NdeshjaId}", userId, ndeshjaId);
    return Ok(new { limitReached = false, ticketCount });
}


        [HttpPost]
        public async Task<ActionResult<List<Bileta>>> Create(BiletaCreateDto request)
        {
            var ulesja = await _context.Uleset.FindAsync(request.UlesjaID);
            var ndeshja = await _context.Ndeshja.FindAsync(request.NdeshjaID);
            var user = await _context.Users.FindAsync(request.ApplicationUserID);

            if (ulesja == null || ndeshja == null || user == null)
                return NotFound();

            var newBileta = new Bileta
            {
                Cmimi = request.Cmimi,
                OraBlerjes = request.OraBlerjes,
                UlesjaID = request.UlesjaID,
                NdeshjaID = request.NdeshjaID,
                ApplicationUserID = request.ApplicationUserID
            };

            _context.Biletat.Add(newBileta);
            await _context.SaveChangesAsync();

            return await Get();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBileta(int id, BiletaCreateDto request)
        {
            var bileta = await _context.Biletat
                .Include(b => b.Ulesja)
                .Include(b => b.Ndeshja)
                .Include(b => b.ApplicationUser)
                .FirstOrDefaultAsync(b => b.Id == id);
            if (bileta == null)
            {
                return NotFound();
            }

            bileta.Cmimi = request.Cmimi;
            bileta.OraBlerjes = request.OraBlerjes;
            bileta.UlesjaID = request.UlesjaID;
            bileta.NdeshjaID = request.NdeshjaID;
            bileta.ApplicationUserID = request.ApplicationUserID;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBileta(int id)
        {
            var bileta = await _context.Biletat.FindAsync(id);
            if (bileta == null)
            {
                return NotFound();
            }

            _context.Biletat.Remove(bileta);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
