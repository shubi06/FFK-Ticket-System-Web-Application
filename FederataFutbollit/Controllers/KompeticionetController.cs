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
    public class KompeticionetController : ControllerBase
    {
        private readonly DataContext _context;

        public KompeticionetController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Kompeticionet>>> GetAllKompeticionet()
        {
            var kompeticionet = await _context.Kompeticionet.Include(k => k.Ndeshja).ToListAsync();
            return Ok(kompeticionet);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Kompeticionet>> GetKompeticionet(int id)
        {
            var kompeticionet = await _context.Kompeticionet.Include(k => k.Ndeshja).FirstOrDefaultAsync(k => k.Id == id);
            if (kompeticionet == null)
                return NotFound("Kompeticioni nuk u gjet");

            return Ok(kompeticionet);
        }

        [HttpPost]
        public async Task<ActionResult<List<Kompeticionet>>> AddKompeticioni(KompeticionetCreateDto request)
        {
            var kompeticioni = new Kompeticionet
            {
                Emri = request.Emri
            };

            _context.Kompeticionet.Add(kompeticioni);
            await _context.SaveChangesAsync();
            return Ok(await _context.Kompeticionet.Include(k => k.Ndeshja).ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Kompeticionet>>> UpdateKompeticioni(int id, KompeticionetUpdateDto request)
        {
            var dbKompeticioni = await _context.Kompeticionet.FindAsync(id);
            if (dbKompeticioni == null)
                return NotFound("Kompeticioni nuk u gjet");

            dbKompeticioni.Emri = request.Emri;
            await _context.SaveChangesAsync();
            return Ok(await _context.Kompeticionet.Include(k => k.Ndeshja).ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Kompeticionet>>> DeleteKompeticionet(int id)
        {
            var dbKompeticioni = await _context.Kompeticionet.FindAsync(id);
            if (dbKompeticioni == null)
                return NotFound("Kompeticioni nuk u gjet");

            _context.Kompeticionet.Remove(dbKompeticioni);
            await _context.SaveChangesAsync();
            return Ok(await _context.Kompeticionet.Include(k => k.Ndeshja).ToListAsync());
        }
    }
}
