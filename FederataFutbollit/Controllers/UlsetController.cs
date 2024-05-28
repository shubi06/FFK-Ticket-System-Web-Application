using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FederataFutbollit.Data;
using FederataFutbollit.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using FederataFutbollit.DTOs;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UlesjaController : ControllerBase
    {
        private readonly DataContext _context;

        public UlesjaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ulesja>>> Get()
        {
            return await _context.Uleset.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ulesja>> GetUlesjaById(int id)
        {
            var ulesja = await _context.Uleset.FindAsync(id);
            if (ulesja == null)
            {
                return NotFound();
            }
            return ulesja;
        }

        [HttpGet("sector/{sectorId}")]
        public async Task<ActionResult<List<Ulesja>>> GetUlesetBySector(int sectorId)
        {
            var uleset = await _context.Uleset
                .Where(u => u.SektoriUlseveID == sectorId)
                .ToListAsync();

            if (uleset == null || uleset.Count == 0)
            {
                return NotFound();
            }

            return uleset;
        }

        [HttpPost]
        public async Task<ActionResult<List<Ulesja>>> Create(UlesjaCreateDto request)
        {
            var sektoriUlseve = await _context.SektoriUlseve.FindAsync(request.SektoriUlseveID);
            if (sektoriUlseve == null)
                return NotFound();

            var newUlesja = new Ulesja
            {
                Numri = request.Numri,
                IsAvailable = request.IsAvailable,
                SektoriUlseveID = request.SektoriUlseveID
            };

            _context.Uleset.Add(newUlesja);
            await _context.SaveChangesAsync();

            return await Get();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUlesja(UlesjaCreateDto request)
        {
            var ulesja = await _context.Uleset.Include(u => u.SektoriUlseve).FirstOrDefaultAsync(u => u.Id == request.Id);
            if (ulesja == null)
            {
                return NotFound();
            }

            _context.Entry(ulesja).CurrentValues.SetValues(request);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUlesja(int id)
        {
            var ulesja = await _context.Uleset.FindAsync(id);
            if (ulesja == null)
            {
                return NotFound();
            }

            _context.Uleset.Remove(ulesja);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
