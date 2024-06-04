// Controllers/KontabilitetiController.cs
using FederataFutbollit.Entities;
using FederataFutbollit.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FederataFutbollit.DTOs;

namespace FederataFutbollit.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KontabilitetiController : ControllerBase
    {
        private readonly DataContext _context;

        public KontabilitetiController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kontabiliteti>>> GetKontabiliteti()
        {
            return await _context.Kontabiliteti
                .Include(k => k.Stafi)
                .Include(k => k.Shpenzimet)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Kontabiliteti>> GetKontabilitetiById(int id)
        {
            var kontabiliteti = await _context.Kontabiliteti
                .Include(k => k.Stafi)
                .Include(k => k.Shpenzimet)
                .FirstOrDefaultAsync(k => k.Id == id);

            if (kontabiliteti == null)
            {
                return NotFound();
            }

            return kontabiliteti;
        }

        [HttpPost]
        public async Task<ActionResult<Kontabiliteti>> CreateKontabiliteti(KontabilitetiDTO kontabilitetiDto)
        {
            var stafi = await _context.Stafi.FindAsync(kontabilitetiDto.StafiId);
            if (stafi == null)
            {
                return BadRequest(new { Stafi = "Stafi not found" });
            }

            var shpenzimet = new Shpenzimet
            {
                Pershkrimi = kontabilitetiDto.ShpenzimetPershkrimi
            };

            var kontabiliteti = new Kontabiliteti
            {
                Stafi = stafi,
                Shpenzimet = shpenzimet,
                Data = kontabilitetiDto.Data,
                ShumaTotale = kontabilitetiDto.ShumaTotale
            };

            _context.Kontabiliteti.Add(kontabiliteti);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetKontabilitetiById), new { id = kontabiliteti.Id }, kontabiliteti);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKontabiliteti(int id, KontabilitetiDTO kontabilitetiDto)
        {
            var kontabiliteti = await _context.Kontabiliteti
                .Include(k => k.Stafi)
                .Include(k => k.Shpenzimet)
                .FirstOrDefaultAsync(k => k.Id == id);

            if (kontabiliteti == null)
            {
                return NotFound();
            }

            kontabiliteti.StafiId = kontabilitetiDto.StafiId;
            kontabiliteti.Shpenzimet.Pershkrimi = kontabilitetiDto.ShpenzimetPershkrimi;
            kontabiliteti.Data = kontabilitetiDto.Data;
            kontabiliteti.ShumaTotale = kontabilitetiDto.ShumaTotale;

            _context.Entry(kontabiliteti).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KontabilitetiExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKontabiliteti(int id)
        {
            var kontabiliteti = await _context.Kontabiliteti.FindAsync(id);
            if (kontabiliteti == null)
            {
                return NotFound();
            }

            _context.Kontabiliteti.Remove(kontabiliteti);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool KontabilitetiExists(int id)
        {
            return _context.Kontabiliteti.Any(e => e.Id == id);
        }
    }
}
