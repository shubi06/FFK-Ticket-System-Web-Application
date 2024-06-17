using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using FederataFutbollit.Data;
using FederataFutbollit.Entities;
using Microsoft.EntityFrameworkCore;
using FederataFutbollit.DTOs;
using System.Security.Claims;

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
        public async Task<ActionResult<List<LojtaretSuperlige>>> Get()
        {
            return await _context.LojtaretSuperlige
                .Include(ls => ls.Ekipa) // Përfshini ekipën
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LojtaretSuperlige>> GetLojtariSuperligeById(int id)
        {
            var lojtariSuperlige = await _context.LojtaretSuperlige
                .Include(ls => ls.Ekipa) // Përfshini ekipën
                .FirstOrDefaultAsync(ls => ls.Id == id);

            if (lojtariSuperlige == null)
            {
                return NotFound();
            }

            return Ok(lojtariSuperlige);
        }


        [HttpPost]
        public async Task<ActionResult<List<LojtaretSuperlige>>> Create([FromForm] LojtariSuperligeCreateDto request, [FromForm] IFormFile file)
        {
            var superliga = await _context.Superligat.FindAsync(request.SuperligaID);
            if (superliga == null)
                return NotFound("Superliga nuk u gjet");

            var ekipa = await _context.Ekipa.FindAsync(request.EkipaId);
            if (ekipa == null)
                return NotFound("Ekipa nuk u gjet");

            var newLojtariSuperlige = new LojtaretSuperlige
            {
                Emri = request.Emri,
                Mbiemri = request.Mbiemri,
                Mosha = request.Mosha,
                Pozicioni = request.Pozicioni,
                Gola = request.Gola,
                Asiste = request.Asiste,
                NrFaneles = request.NrFaneles,
                SuperligaID = request.SuperligaID,
                EkipaId = request.EkipaId,
                FotoPath = ""
            };

            if (file != null && file.Length > 0)
            {
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

                // Check if the directory exists, if not, create it
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var filePath = Path.Combine(uploadPath, file.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                newLojtariSuperlige.FotoPath = "/uploads/" + file.FileName;
            }

            _context.LojtaretSuperlige.Add(newLojtariSuperlige);
            await _context.SaveChangesAsync();

            return await _context.LojtaretSuperlige.ToListAsync();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLojtariSuperlige(LojtariSuperligeCreateDto request)
        {
            // Gjej lojtarin që duhet përditësuar dhe merr kombëtaren e lidhur
            var lojtariSuperlige = await _context.LojtaretSuperlige.Include(s => s.Superliga).FirstOrDefaultAsync(s => s.Id == request.Id);
            if (lojtariSuperlige == null)
            {
                return NotFound(); // Nëse lojtari nuk gjendet, kthe një përgjigje 404 Not Found
            }

            // Përditëso vetitë e lojtarit nga kërkesa
            _context.Entry(lojtariSuperlige).CurrentValues.SetValues(request);

            // Ruaj ndryshimet në bazën e të dhënave
            await _context.SaveChangesAsync();

            // Kthe një përgjigje 204 No Content si konfirmim se përditësimi u bë me sukses
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLojtariSuperlige(int id)
        {
            var lojtariSuperlige = await _context.LojtaretSuperlige.FindAsync(id);
            if (lojtariSuperlige == null)
            {
                return NotFound();
            }

            _context.LojtaretSuperlige.Remove(lojtariSuperlige);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFoto([FromForm] IFormFile file, [FromForm] int lojtariSuperligeId)
        {
            var lojtariSuperlige = await _context.LojtaretSuperlige.FindAsync(lojtariSuperligeId);
            if (lojtariSuperlige == null)
            {
                return NotFound("Lojtari nuk u gjet.");
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest("Asnjë skedar nuk u ngarkua.");
            }

            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", file.FileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            lojtariSuperlige.FotoPath = "/uploads/" + file.FileName;
            await _context.SaveChangesAsync();

            return Ok(new { path = lojtariSuperlige.FotoPath });
        }

    }
}
