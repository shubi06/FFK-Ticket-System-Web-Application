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
    public class NdeshjaController : ControllerBase
    {
        private readonly DataContext _context;

        public NdeshjaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NdeshjaDto>>> GetAllNdeshjet()
        {
            var ndeshjet = await _context.Ndeshja
                .Include(n => n.Stadiumi)
                .Include(n => n.Kompeticioni)
                .Include(n => n.Statusi)
                .Include(n => n.Kombetarja)
                .ToListAsync();

            var ndeshjaDtos = ndeshjet.Select(nd => new NdeshjaDto
            {
                Id = nd.Id,
                Data = nd.Data,
                StadiumiId = nd.StadiumiId,
                StadiumiEmri = nd.Stadiumi.Emri,
                KompeticioniId = nd.KompeticioniId,
                KompeticioniEmri = nd.Kompeticioni.Emri,
                StatusiId = nd.StatusiId,
                StatusiEmri = nd.Statusi.Emri,
                KombetarjaId = nd.KombetarjaId,
                KombetarjaEmri = nd.Kombetarja.Emri,
                EkipiKundershtar = nd.EkipiKundershtar,
                GolaEkipiJone = nd.GolaEkipiJone,
                GolaEkipiKundershtar = nd.GolaEkipiKundershtar
            }).ToList();

            return Ok(ndeshjaDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NdeshjaDto>> GetNdeshjaById(int id)
        {
            var ndeshja = await _context.Ndeshja
                .Include(n => n.Stadiumi)
                .Include(n => n.Kompeticioni)
                .Include(n => n.Statusi)
                .Include(n => n.Kombetarja)
                .FirstOrDefaultAsync(n => n.Id == id);

            if (ndeshja == null)
            {
                return NotFound();
            }

            var ndeshjaDto = new NdeshjaDto
            {
                Id = ndeshja.Id,
                Data = ndeshja.Data,
                StadiumiId = ndeshja.StadiumiId,
                StadiumiEmri = ndeshja.Stadiumi.Emri,
                KompeticioniId = ndeshja.KompeticioniId,
                KompeticioniEmri = ndeshja.Kompeticioni.Emri,
                StatusiId = ndeshja.StatusiId,
                StatusiEmri = ndeshja.Statusi.Emri,
                KombetarjaId = ndeshja.KombetarjaId,
                KombetarjaEmri = ndeshja.Kombetarja.Emri,
                EkipiKundershtar = ndeshja.EkipiKundershtar,
                GolaEkipiJone = ndeshja.GolaEkipiJone,
                GolaEkipiKundershtar = ndeshja.GolaEkipiKundershtar
            };

            return Ok(ndeshjaDto);
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<NdeshjaDto>>> Create(NdeshjaCreateDto request)
        {
            var stadiumi = await _context.Stadiumi.FindAsync(request.StadiumiId);
            if (stadiumi == null)
                return NotFound("Stadiumi nuk u gjet");

            var kompeticioni = await _context.Kompeticionet.FindAsync(request.KompeticioniId);
            if (kompeticioni == null)
                return NotFound("Kompeticioni nuk u gjet");

            var statusi = await _context.Statusi.FindAsync(request.StatusiId);
            if (statusi == null)
                return NotFound("Statusi nuk u gjet");

            var kombetarja = await _context.Kombetarja.FindAsync(request.KombetarjaId);
            if (kombetarja == null)
                return NotFound("Kombetarja nuk u gjet");

            if (request.StatusiId == 1 || request.StatusiId == 3) // Do te zhvillohet or E Anuluar
            {
                request.GolaEkipiJone = null;
                request.GolaEkipiKundershtar = null;
            }

            var newNdeshja = new Ndeshja
            {
                Data = request.Data,
                StadiumiId = request.StadiumiId,
                KompeticioniId = request.KompeticioniId,
                StatusiId = request.StatusiId,
                KombetarjaId = request.KombetarjaId,
                EkipiKundershtar = request.EkipiKundershtar,
                GolaEkipiJone = request.GolaEkipiJone,
                GolaEkipiKundershtar = request.GolaEkipiKundershtar
            };

            _context.Ndeshja.Add(newNdeshja);
            await _context.SaveChangesAsync();

            return await GetAllNdeshjet();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNdeshja(int id, NdeshjaCreateDto request)
        {
            var ndeshja = await _context.Ndeshja.FindAsync(id);
            if (ndeshja == null)
            {
                return NotFound();
            }

            var statusi = await _context.Statusi.FindAsync(request.StatusiId);
            if (statusi == null)
            {
                return NotFound("Statusi nuk u gjet");
            }

            if (request.StatusiId == 1 || request.StatusiId == 3) // Do te zhvillohet or E Anuluar
            {
                request.GolaEkipiJone = null;
                request.GolaEkipiKundershtar = null;
            }

            ndeshja.Data = request.Data;
            ndeshja.StadiumiId = request.StadiumiId;
            ndeshja.KompeticioniId = request.KompeticioniId;
            ndeshja.StatusiId = request.StatusiId;
            ndeshja.KombetarjaId = request.KombetarjaId;
            ndeshja.EkipiKundershtar = request.EkipiKundershtar;
            ndeshja.GolaEkipiJone = request.GolaEkipiJone;
            ndeshja.GolaEkipiKundershtar = request.GolaEkipiKundershtar;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNdeshja(int id)
        {
            var ndeshja = await _context.Ndeshja.FindAsync(id);
            if (ndeshja == null)
            {
                return NotFound();
            }

            _context.Ndeshja.Remove(ndeshja);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}


