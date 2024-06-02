using FederataFutbollit.Data;
using FederataFutbollit.DTOs;
using FederataFutbollit.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EkipaController : ControllerBase
    {
        private readonly DataContext _context;

        public EkipaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ekipa>>> GetAllEkipat()
        {
            var ekipa = await _context.Ekipa.Include(e => e.Superliga).ToListAsync();
            return Ok(ekipa);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ekipa>> GetEkipaById(int id)
        {
            var ekipa = await _context.Ekipa.Include(e => e.Superliga)
                                .FirstOrDefaultAsync(e => e.Id == id);
            if (ekipa == null)
                return NotFound("Ekipa nuk u gjet");

            return Ok(ekipa);
        }

        [HttpPost]
        public async Task<ActionResult<Ekipa>> CreateEkipa(Ekipa ekipa)
        {
            _context.Ekipa.Add(ekipa);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEkipaById), new { id = ekipa.Id }, ekipa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEkipa(int id, Ekipa ekipaUpdate)
        {
            var ekipa = await _context.Ekipa.FindAsync(id);
            if (ekipa == null)
                return NotFound("Ekipa not found");

            ekipa.EmriKlubit = ekipaUpdate.EmriKlubit;
            ekipa.Trajneri = ekipaUpdate.Trajneri;
            ekipa.VitiThemelimit = ekipaUpdate.VitiThemelimit;
            ekipa.NrTitujve = ekipaUpdate.NrTitujve;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEkipa(int id)
        {
            var ekipa = await _context.Ekipa.FindAsync(id);
            if (ekipa == null)
                return NotFound("Ekipa nuk u gjet");

            _context.Ekipa.Remove(ekipa);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
