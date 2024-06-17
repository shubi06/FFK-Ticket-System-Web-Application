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
                Pershkrimi = kontabilitetiDto.ShpenzimetPershkrimi,
                Shuma = kontabilitetiDto.ShumaTotale
            };

            var kontabiliteti = new Kontabiliteti
            {
                Stafi = stafi,
                Shpenzimet = shpenzimet,
                Data = kontabilitetiDto.Data,
                ShumaTotale = kontabilitetiDto.ShumaTotale,
                BuxhetiVjetor = kontabilitetiDto.BuxhetiVjetor - kontabilitetiDto.ShumaTotale // Zvogëlimi i buxhetit me shpenzimin
            };

            _context.Kontabiliteti.Add(kontabiliteti);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetKontabilitetiById), new { id = kontabiliteti.Id }, kontabiliteti);
        }

        // Kontrolloni dhe sigurohuni që kjo është vetëm metoda `UpdateKontabiliteti`
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
            kontabiliteti.Shpenzimet.Shuma = kontabilitetiDto.ShumaTotale;
            kontabiliteti.Data = kontabilitetiDto.Data;
            kontabiliteti.ShumaTotale = kontabilitetiDto.ShumaTotale;
            kontabiliteti.BuxhetiVjetor = kontabilitetiDto.BuxhetiVjetor - kontabilitetiDto.ShumaTotale; // Zvogëlimi i buxhetit me shpenzimin

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

        // Kontrolloni për ndonjë metodë tjetër `UpdateKontabiliteti` dhe largojeni ose ndryshoni emrin nëse është e nevojshme

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
