using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using FederataFutbollit.Entities; // Për të përdorur klasën Rezultati
using FederataFutbollit.Data;
using Microsoft.EntityFrameworkCore;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RezultatiController : ControllerBase
    {
        private readonly DataContext _context;

        public RezultatiController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Rezultati>>> GetAllRezultatet()
        {
            var results = await _context.Rezultati.ToListAsync();
            return Ok(results);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Rezultati>> GetRezultatiById(int id)
        {
            var rezultati = await _context.Rezultati.FindAsync(id);
            if (rezultati == null)
                return NotFound("Rezultati nuk u gjet.");

            return Ok(rezultati);
        }

        [HttpPost]
        public async Task<ActionResult<List<Rezultati>>> CreateRezultati(Rezultati rezultati)
        {
            _context.Rezultati.Add(rezultati);
            await _context.SaveChangesAsync();

            return await GetAllRezultatet();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRezultati(int id, Rezultati rezultati)
        {
            var existingRezultati = await _context.Rezultati.FindAsync(id);
            if (existingRezultati == null)
                return NotFound("Rezultati nuk u gjet.");

            existingRezultati.GolatEkipi1 = rezultati.GolatEkipi1;
            existingRezultati.GolatEkipi2 = rezultati.GolatEkipi2;

            _context.Rezultati.Update(existingRezultati);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRezultati(int id)
        {
            var rezultati = await _context.Rezultati.FindAsync(id);
            if (rezultati == null)
                return NotFound("Rezultati nuk u gjet.");

            _context.Rezultati.Remove(rezultati);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
