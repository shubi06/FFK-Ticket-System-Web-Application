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
    public class SelektoriController : ControllerBase
    {
        private readonly DataContext _context;
        public SelektoriController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Selektori>>> GetAllSelektori()
        {
            return await _context.Selektort.Include(k => k.Kombetarja).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Selektori>> GetSelektoriById(int id)
        {
            var selektori = await _context.Selektort.Include(k => k.Kombetarja).FirstOrDefaultAsync(k => k.Id == id);
            if (selektori == null)
            {
                return NotFound();
            }
            return selektori;
        }
        [HttpPost]
        public async Task<ActionResult<Selektori>> CreateSelektori(SelektoriCreateDto request)
        {
            // Check if the provided ShtetiID exists
            var kombetarja = await _context.Kombetarja.FindAsync(request.KombetarjaID);
            if (kombetarja == null)

                return NotFound($"No kombetarja found with ID {request.KombetarjaID}");


            // Check if Shteti already has a Kombetarja linked
            if (kombetarja.Selektori != null)
            {
                return BadRequest("The specified kombetarja already has a Selektori linked.");
            }

            var newSelektori = new Selektori
            {
                Emri = request.Emri,
                Mbiemri=request.Mbiemri,
                Mosha=request.Mosha,
                Nacionaliteti=request.Nacionaliteti,
                VitetEKontrates=request.VitetEKontrates,
                Kombetarja = kombetarja // Link to the existing Kombetarja
            };

            _context.Selektort.Add(newSelektori);
            await _context.SaveChangesAsync();

            return newSelektori;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSelektori(SelektoriCreateDto request)
        {
            // Gjej kombëtaren që duhet përditësuar dhe merr shtetin e lidhur
            var selektori = await _context.Selektort.Include(k => k.Kombetarja).FirstOrDefaultAsync(k => k.Id == request.Id);
            if (selektori == null)
            {
                return NotFound(); // Nëse kombëtarja nuk gjendet, kthe një përgjigje 404 Not Found
            }

            // Përditëso emrin e kombëtares dhe shtetin e lidhur
            selektori.Emri = request.Emri;
            selektori.Mbiemri = request.Mbiemri;
            selektori.Mosha = request.Mosha;
            selektori.Nacionaliteti = request.Nacionaliteti;
            selektori.VitetEKontrates = request.VitetEKontrates;


            // Ruaj ndryshimet në bazën e të dhënave
            await _context.SaveChangesAsync();

            // Kthe një përgjigje 204 No Content si konfirmim se përditësimi u bë me sukses
            return Ok(await _context.Selektort.ToListAsync());
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSelektori(int id)
        {
            var selektori = await _context.Selektort.FindAsync(id);
            if (selektori == null)
            {
                return NotFound();
            }

            _context.Selektort.Remove(selektori);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
