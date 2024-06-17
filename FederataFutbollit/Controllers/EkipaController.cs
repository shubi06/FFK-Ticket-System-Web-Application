using FederataFutbollit.Data;
using FederataFutbollit.DTOs;
using FederataFutbollit.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            var ekipa = await _context.Ekipa
                .Include(e => e.Superliga)
                .Include(e => e.Lojtaret) // Përfshini lojtarët në query
                .ToListAsync();
            return Ok(ekipa);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ekipa>> GetEkipaById(int id)
        {
            var ekipa = await _context.Ekipa.Include(e => e.Superliga)
                                             .Include(e => e.Lojtaret) // Përfshini lojtarët në query
                                             .FirstOrDefaultAsync(e => e.Id == id);
            if (ekipa == null)
                return NotFound("Ekipa nuk u gjet");

            return Ok(ekipa);
        }

        [HttpPost]
        public async Task<ActionResult<Ekipa>> CreateEkipa([FromBody] EkipaDto ekipaDto)
        {
            var ekipa = new Ekipa
            {
                EmriKlubit = ekipaDto.EmriKlubit,
                Trajneri = ekipaDto.Trajneri,
                VitiThemelimit = ekipaDto.VitiThemelimit,
                NrTitujve = ekipaDto.NrTitujve,
                SuperligaId = ekipaDto.SuperligaId
            };

            _context.Ekipa.Add(ekipa);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEkipaById), new { id = ekipa.Id }, ekipa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEkipa(int id, [FromBody] EkipaDto ekipaDto)
        {
            var ekipa = await _context.Ekipa.FindAsync(id);
            if (ekipa == null)
                return NotFound("Ekipa nuk u gjet");

            ekipa.EmriKlubit = ekipaDto.EmriKlubit;
            ekipa.Trajneri = ekipaDto.Trajneri;
            ekipa.VitiThemelimit = ekipaDto.VitiThemelimit;
            ekipa.NrTitujve = ekipaDto.NrTitujve;
            ekipa.SuperligaId = ekipaDto.SuperligaId;

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
