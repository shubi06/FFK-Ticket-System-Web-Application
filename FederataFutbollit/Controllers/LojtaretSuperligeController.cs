using FederataFutbollit.Data;
using FederataFutbollit.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LojtaretSuperligeController : ControllerBase
    {
        private readonly DataContext _context;

        public LojtaretSuperligeController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<LojtaretSuperlige>>> GetLojtaretSuperlige()
        {
            var lojtaretSuperlige = await _context.LojtaretSuperlige.ToListAsync();
            return Ok(lojtaretSuperlige);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LojtaretSuperlige>> GetLojtariSuperligeById(int id)
        {
            var lojtariSuperlige = await _context.LojtaretSuperlige.FindAsync(id);
            if (lojtariSuperlige == null)
            {
                return NotFound("Lojtari nuk u gjet");
            }
            return Ok(lojtariSuperlige);
        }

        [HttpPost]
        public async Task<ActionResult<List<LojtaretSuperlige>>> AddLojtariSuperlige(LojtaretSuperlige lojtari)
        {
            _context.LojtaretSuperlige.Add(lojtari);
            await _context.SaveChangesAsync();
            return Ok(await _context.LojtaretSuperlige.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<LojtaretSuperlige>>> UpdateLojtariSuperlige(int id, LojtaretSuperlige updatedLojtari)
        {
            var lojtariSuperlige = await _context.LojtaretSuperlige.FindAsync(id);
            if (lojtariSuperlige == null)
            {
                return NotFound("Lojtari nuk u gjet");
            }

            lojtariSuperlige.Emri = updatedLojtari.Emri;
            lojtariSuperlige.Mbiemri = updatedLojtari.Mbiemri;
            lojtariSuperlige.Mosha = updatedLojtari.Mosha;
            lojtariSuperlige.Pozicioni = updatedLojtari.Pozicioni;
            lojtariSuperlige.Gola = updatedLojtari.Gola;
            lojtariSuperlige.Asiste = updatedLojtari.Asiste;
            lojtariSuperlige.NrFaneles = updatedLojtari.NrFaneles;
            lojtariSuperlige.SuperligaID = updatedLojtari.SuperligaID;

            await _context.SaveChangesAsync();

            return Ok(await _context.LojtaretSuperlige.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<LojtaretSuperlige>>> DeleteLojtariSuperlige(int id)
        {
            var lojtariSuperlige = await _context.LojtaretSuperlige.FindAsync(id);
            if (lojtariSuperlige == null)
            {
                return NotFound("Lojtari nuk u gjet");
            }

            _context.LojtaretSuperlige.Remove(lojtariSuperlige);
            await _context.SaveChangesAsync();

            return Ok(await _context.LojtaretSuperlige.ToListAsync());
        }
    }
}



