using Microsoft.AspNetCore.Mvc;
using FederataFutbollit.Data;
using FederataFutbollit.Entities;
using FederataFutbollit.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NdeshjaSuperligesController : ControllerBase
    {
        private readonly DataContext _context;

        public NdeshjaSuperligesController(DataContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NdeshjaSuperliges>>> GetAllNdeshjet()
        {
            return await _context.NdeshjaSuperliges.Include(n => n.Statusi).Include(n => n.Superliga).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<NdeshjaSuperliges>> GetNdeshjaById(int id)
        {
            var ndeshja = await _context.NdeshjaSuperliges
                .Include(n => n.Statusi)
                .Include(n => n.Superliga)
                .FirstOrDefaultAsync(n => n.Id == id);

            if (ndeshja == null)
            {
                return NotFound("Ndeshja nuk u gjet.");
            }

            return ndeshja;
        }


        [HttpGet("ByStatus/{statusId}")]
        public async Task<ActionResult<IEnumerable<NdeshjaSuperliges>>> GetNdeshjeByStatus(int statusId)
        {
            var ndeshjet = await _context.NdeshjaSuperliges.Where(n => n.StatusiId == statusId).Include(n => n.Statusi).Include(n => n.Superliga).ToListAsync();
            if (ndeshjet == null || !ndeshjet.Any())
            {
                return NotFound("Asnjë ndeshje me këtë status nuk u gjet.");
            }
            return ndeshjet;
        }

        [HttpGet("Ekipa")]
        public async Task<ActionResult<IEnumerable<Ekipa>>> GetAllEkipet()
        {
            return await _context.Ekipa.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<NdeshjaSuperliges>> CreateNdeshja([FromBody] NdeshjaSuperligesCreateDto request)
        {
            var ndeshja = new NdeshjaSuperliges
            {
                Ekipa1 = request.Ekipa1,
                Ekipa2 = request.Ekipa2,
                DataENdeshjes = request.DataENdeshjes,
                StatusiId = request.StatusiId,
                SuperligaId = request.SuperligaId,
                ReferiId = request.ReferiId,
                GolaEkipa1 = request.GolaEkipa1,
                GolaEkipa2 = request.GolaEkipa2
            };

            _context.NdeshjaSuperliges.Add(ndeshja);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { message = "Failed to create match. Database update exception.", error = ex.InnerException?.Message, ex.StackTrace });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Failed to create match.", error = ex.Message, ex.StackTrace });
            }

            return CreatedAtAction("GetNdeshjaById", new { id = ndeshja.Id }, ndeshja);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNdeshja(int id, [FromBody] NdeshjaSuperligesUpdateDto request)
        {
            var ndeshja = await _context.NdeshjaSuperliges.FindAsync(id);
            if (ndeshja == null)
            {
                return NotFound("Ndeshja nuk u gjet.");
            }

            ndeshja.Ekipa1 = request.Ekipa1;
            ndeshja.Ekipa2 = request.Ekipa2;
            ndeshja.DataENdeshjes = request.DataENdeshjes;
            ndeshja.StatusiId = request.StatusiId;
            ndeshja.SuperligaId = request.SuperligaId;
            ndeshja.ReferiId = request.ReferiId;
            ndeshja.GolaEkipa1 = request.GolaEkipa1;
            ndeshja.GolaEkipa2 = request.GolaEkipa2;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { message = "Failed to update match. Database update exception.", error = ex.InnerException?.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Failed to update match.", error = ex.Message });
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNdeshja(int id)
        {
            var ndeshja = await _context.NdeshjaSuperliges.FindAsync(id);
            if (ndeshja == null)
            {
                return NotFound("Ndeshja nuk u gjet.");
            }

            _context.NdeshjaSuperliges.Remove(ndeshja);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
