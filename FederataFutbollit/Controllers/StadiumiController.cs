using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FederataFutbollit.Data;
using FederataFutbollit.Entities;
using FederataFutbollit.DTOs; // Shtoni këtë linjë
using Microsoft.EntityFrameworkCore;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StadiumiController : ControllerBase
    {
        private readonly DataContext _context;

        public StadiumiController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Stadiumi>>> Get()
        {
            return await _context.Stadiumi.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Stadiumi>> GetStadiumiById(int id)
        {
            var stadiumi = await _context.Stadiumi.FindAsync(id);
            if (stadiumi == null)
            {
                return NotFound();
            }
            return stadiumi;
        }

        [HttpPost]
        public async Task<ActionResult<List<Stadiumi>>> Create(StadiumiCreateDto request)
        {
            var kombetarja = await _context.Kombetarja.FindAsync(request.KombetarjaID);
            if (kombetarja == null)
                return NotFound();

            var newStadiumi = new Stadiumi
            {
                Emri = request.Emri,
                Kapaciteti = request.Kapaciteti,
                VitiNdertuar = request.VitiNdertuar,
                KombetarjaID = request.KombetarjaID
            };

            _context.Stadiumi.Add(newStadiumi);
            await _context.SaveChangesAsync();

            return await Get();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStadiumi(int id, StadiumiCreateDto request)
        {
            var stadiumi = await _context.Stadiumi.FindAsync(id);
            if (stadiumi == null)
            {
                return NotFound();
            }

            stadiumi.Emri = request.Emri;
            stadiumi.Kapaciteti = request.Kapaciteti;
            stadiumi.VitiNdertuar = request.VitiNdertuar;
            stadiumi.KombetarjaID = request.KombetarjaID;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStadiumi(int id)
        {
            var stadiumi = await _context.Stadiumi.FindAsync(id);
            if (stadiumi == null)
            {
                return NotFound();
            }

            _context.Stadiumi.Remove(stadiumi);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
