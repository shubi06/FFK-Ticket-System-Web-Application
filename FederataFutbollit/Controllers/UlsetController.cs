using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FederataFutbollit.Data;
using FederataFutbollit.Entities;
using FederataFutbollit.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task<ActionResult<List<UlesjaDto>>> Get()
        {
            var uleset = await _context.Uleset
                .Select(u => new UlesjaDto
                {
                    Id = u.Id,
                    Numri = u.Numri,
                    IsAvailable = u.IsAvailable,
                    Cmimi = u.Cmimi,
                    SektoriUlseveID = u.SektoriUlseveID,
                    StadiumiId = u.StadiumiId
                })
                .ToListAsync();

            return uleset;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UlesjaDto>> GetUlesjaById(int id)
        {
            var ulesja = await _context.Uleset
                .Select(u => new UlesjaDto
                {
                    Id = u.Id,
                    Numri = u.Numri,
                    IsAvailable = u.IsAvailable,
                    Cmimi = u.Cmimi,
                    SektoriUlseveID = u.SektoriUlseveID,
                    StadiumiId = u.StadiumiId
                })
                .FirstOrDefaultAsync(u => u.Id == id);

            if (ulesja == null)
            {
                return NotFound();
            }

            return ulesja;
        }

        [HttpGet("sector/{sectorId}")]
        public async Task<ActionResult<List<UlesjaDto>>> GetUlesetBySector(int sectorId)
        {
            var uleset = await _context.Uleset
                .Where(u => u.SektoriUlseveID == sectorId)
                .Select(u => new UlesjaDto
                {
                    Id = u.Id,
                    Numri = u.Numri,
                    IsAvailable = u.IsAvailable,
                    Cmimi = u.Cmimi,
                    SektoriUlseveID = u.SektoriUlseveID,
                    StadiumiId = u.StadiumiId
                })
                .ToListAsync();

            if (uleset == null || uleset.Count == 0)
            {
                return NotFound();
            }

            return uleset;
        }

        [HttpPost]
        public async Task<ActionResult<List<UlesjaDto>>> Create(UlesjaCreateDto request)
        {
            var sektoriUlseve = await _context.SektoriUlseve.FindAsync(request.SektoriUlseveID);
            if (sektoriUlseve == null)
                return NotFound();

            var newUlesja = new Ulesja
            {
                Numri = request.Numri,
                IsAvailable = request.IsAvailable,
                SektoriUlseveID = request.SektoriUlseveID,
                StadiumiId = request.StadiumiId
            };

            _context.Uleset.Add(newUlesja);
            await _context.SaveChangesAsync();

            return await Get();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUlesja(int id, UlesjaCreateDto request)
        {
            var ulesja = await _context.Uleset.FindAsync(id);
            if (ulesja == null)
            {
                return NotFound();
            }

            ulesja.Numri = request.Numri;
            ulesja.IsAvailable = request.IsAvailable;
            ulesja.SektoriUlseveID = request.SektoriUlseveID;
            ulesja.StadiumiId = request.StadiumiId;

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
[HttpPost("addSeats")]
public async Task<IActionResult> AddSeats(int sektorId, int numberOfSeats, int stadiumiId, double Cmimi)
{
    var maxNumri = _context.Uleset.Any() ? _context.Uleset.Max(s => s.Numri) : 0;

    var seats = Enumerable.Range(1, numberOfSeats).Select(i => new Ulesja
    {
        Numri = maxNumri + i,
        IsAvailable = true,
        SektoriUlseveID = sektorId,
        StadiumiId = stadiumiId,
        Cmimi = Cmimi, 
    }).ToList();

    _context.Uleset.AddRange(seats);
    await _context.SaveChangesAsync();

    return Ok(new { Message = $"{numberOfSeats} seats added to sector {sektorId} in stadium {stadiumiId}." });
}

    }
}
