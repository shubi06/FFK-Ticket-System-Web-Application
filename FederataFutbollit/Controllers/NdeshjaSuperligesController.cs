using Microsoft.AspNetCore.Mvc;
using FederataFutbollit.Data;
using FederataFutbollit.Entities;
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

        public NdeshjaSuperligesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/NdeshjaSuperliges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NdeshjaSuperliges>>> GetAllNdeshjet()
        {
            return await _context.NdeshjetESuperliges.Include(n => n.Statusi).ToListAsync();
        }

        // GET: api/NdeshjaSuperliges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NdeshjaSuperliges>> GetNdeshjaById(int id)
        {
            var ndeshja = await _context.NdeshjetESuperliges.Include(n => n.Statusi).FirstOrDefaultAsync(n => n.Id == id);
            if (ndeshja == null)
            {
                return NotFound();
            }
            return ndeshja;
        }

        // GET: api/NdeshjaSuperliges/ByStatus/1
        [HttpGet("ByStatus/{statusId}")]
        public async Task<ActionResult<IEnumerable<NdeshjaSuperliges>>> GetNdeshjeByStatus(int statusId)
        {
            var ndeshjet = await _context.NdeshjetESuperliges.Where(n => n.StatusiId == statusId).Include(n => n.Statusi).ToListAsync();
            if (ndeshjet == null || !ndeshjet.Any())
            {
                return NotFound("Asnjë ndeshje me këtë status nuk u gjet.");
            }
            return ndeshjet;
        }

        // POST: api/NdeshjaSuperliges
        [HttpPost]
        public async Task<ActionResult<NdeshjaSuperliges>> CreateNdeshja([FromBody] NdeshjaSuperliges ndeshja)
        {
            _context.NdeshjetESuperliges.Add(ndeshja);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetNdeshjaById", new { id = ndeshja.Id }, ndeshja);
        }

        // PUT: api/NdeshjaSuperliges/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNdeshja(int id, [FromBody] NdeshjaSuperliges ndeshja)
        {
            if (id != ndeshja.Id)
            {
                return BadRequest();
            }

            _context.Entry(ndeshja).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.NdeshjetESuperliges.Any(n => n.Id == id))
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

        // DELETE: api/NdeshjaSuperliges/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNdeshja(int id)
        {
            var ndeshja = await _context.NdeshjetESuperliges.FindAsync(id);
            if (ndeshja == null)
            {
                return NotFound();
            }

            _context.NdeshjetESuperliges.Remove(ndeshja);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
