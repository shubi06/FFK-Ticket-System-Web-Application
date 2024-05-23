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
    public class LojtaretController : ControllerBase
    {
        private readonly DataContext _context;

        public LojtaretController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Lojtaret>>> Get()
        {


            return await _context.Lojtaret.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lojtaret>> GetLojtariById(int id)
        {
            var lojtari = await _context.Lojtaret.FindAsync(id);
            if (lojtari == null)
            {
                return NotFound();
            }
            return lojtari;
        }

  
[HttpPost]
public async Task<ActionResult<List<Lojtaret>>> Create([FromForm] LojtariCreateDto request, [FromForm] IFormFile file)
{
    var kombetarja = await _context.Kombetarja.FindAsync(request.KombetarjaID);
    if (kombetarja == null)
        return NotFound();

    var newLojtari = new Lojtaret
    {
        Emri = request.Emri,
        Mbiemri = request.Mbiemri,
        Mosha = request.Mosha,
        Pozicioni = request.Pozicioni,
        Gola = request.Gola,
        Asiste = request.Asiste,
        NrFaneles = request.NrFaneles,
        KombetarjaID = request.KombetarjaID,
        FotoPath = "" // Initialize with an empty string or handle appropriately
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

        newLojtari.FotoPath = "/uploads/" + file.FileName;
    }

    _context.Lojtaret.Add(newLojtari);
    await _context.SaveChangesAsync();

    return await Get();
}


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLojtari(LojtariCreateDto request)
        {
            // Gjej lojtarin që duhet përditësuar dhe merr kombëtaren e lidhur
            var lojtari = await _context.Lojtaret.Include(k => k.Kombetarja).FirstOrDefaultAsync(k => k.Id == request.Id);
            if (lojtari == null)
            {
                return NotFound(); // Nëse lojtari nuk gjendet, kthe një përgjigje 404 Not Found
            }

            // Përditëso vetitë e lojtarit nga kërkesa
            _context.Entry(lojtari).CurrentValues.SetValues(request);

            // Ruaj ndryshimet në bazën e të dhënave
            await _context.SaveChangesAsync();

            // Kthe një përgjigje 204 No Content si konfirmim se përditësimi u bë me sukses
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLojtari(int id)
        {
            var lojtari = await _context.Lojtaret.FindAsync(id);
            if (lojtari == null)
            {
                return NotFound();
            }

            _context.Lojtaret.Remove(lojtari);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("upload")]
public async Task<IActionResult> UploadFoto([FromForm] IFormFile file, [FromForm] int lojtariId)
{
    var lojtari = await _context.Lojtaret.FindAsync(lojtariId);
    if (lojtari == null)
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

    lojtari.FotoPath = "/uploads/" + file.FileName;
    await _context.SaveChangesAsync();

    return Ok(new { path = lojtari.FotoPath });
}

    }
}
