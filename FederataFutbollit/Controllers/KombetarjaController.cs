using FederataFutbollit.Data;
using FederataFutbollit.DTOs;
using FederataFutbollit.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KombetarjaController : ControllerBase
    {
        private readonly DataContext _context;
        public KombetarjaController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Kombetarja>>> GetAllKombetarja()
        {
            return await _context.Kombetarja.
                Include(k => k.Shteti)
                .Include(k => k.Selektori)
                .Include(k=>k.Lojtaret)
                .Include(k => k.Stafi)

                .ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Kombetarja>> GetKombetarjaById(int id)
        {
            var kombetarja = await _context.Kombetarja
                .Include(k => k.Shteti)
                .Include(k => k.Selektori)
                .Include(k => k.Lojtaret)
                .Include(k => k.Stafi)
                .FirstOrDefaultAsync(k => k.Id == id);
            if (kombetarja == null)
            {
                return NotFound();
            }
            return kombetarja;
        }
        [HttpPost]
        public async Task<ActionResult<Kombetarja>> CreateKombetarja(KombetarjaCreateDto request)
        {
            // Check if the provided ShtetiID exists
            var shteti = await _context.Shteti.FindAsync(request.ShtetiID);
            if (shteti == null)

                return NotFound($"No Shteti found with ID {request.ShtetiID}");
           

            // Check if Shteti already has a Kombetarja linked
            if (shteti.Kombetarja != null)
            {
                return BadRequest("The specified Shteti already has a Kombetarja linked.");
            }

            var newKombetarja = new Kombetarja
            {
                Emri = request.Emri,
                Shteti = shteti // Link to the existing Shteti
            };

            _context.Kombetarja.Add(newKombetarja);
            await _context.SaveChangesAsync();

            return newKombetarja;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKombetarja(KombetarjaCreateDto request)
        {
            // Gjej kombëtaren që duhet përditësuar dhe merr shtetin e lidhur
            var kombetarja = await _context.Kombetarja.Include(k => k.Shteti).FirstOrDefaultAsync(k => k.Id == request.Id);
            if (kombetarja == null)
            {
                return NotFound(); // Nëse kombëtarja nuk gjendet, kthe një përgjigje 404 Not Found
            }

            // Përditëso emrin e kombëtares dhe shtetin e lidhur
            kombetarja.Emri = request.Emri;
        

            // Ruaj ndryshimet në bazën e të dhënave
            await _context.SaveChangesAsync();

            // Kthe një përgjigje 204 No Content si konfirmim se përditësimi u bë me sukses
            return Ok(await _context.Kombetarja.ToListAsync());
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKombetarja(int id)
        {
            var kombetarja = await _context.Kombetarja.FindAsync(id);
            if (kombetarja == null)
            {
                return NotFound();
            }

            _context.Kombetarja.Remove(kombetarja);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
