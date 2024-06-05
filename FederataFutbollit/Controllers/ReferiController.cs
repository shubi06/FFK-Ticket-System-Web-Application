using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using FederataFutbollit.Entities;
using FederataFutbollit.Data;
using Microsoft.EntityFrameworkCore;


namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReferiController : ControllerBase
    {
        private readonly DataContext _context;

        public ReferiController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Referi>>> GetAllReferet()
        {
            var referet = await _context.Referi.ToListAsync();
            return Ok(referet);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Referi>> GetReferiById(int id)
        {
            var referi = await _context.Referi.FindAsync(id);
            if (referi == null)
                return NotFound("Referi nuk u gjet.");

            return Ok(referi);
        }

        [HttpPost]
        public async Task<ActionResult<List<Referi>>> CreateReferi(Referi referi)
        {
            _context.Referi.Add(referi);
            await _context.SaveChangesAsync();

            return await GetAllReferet();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReferi(int id, Referi referi)
        {
            var existingReferi = await _context.Referi.FindAsync(id);
            if (existingReferi == null)
                return NotFound("Referi nuk u gjet.");

            existingReferi.Emri = referi.Emri;
            existingReferi.Mbiemri = referi.Mbiemri;


            _context.Referi.Update(existingReferi);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReferi(int id)
        {
            var referi = await _context.Referi.FindAsync(id);
            if (referi == null)
                return NotFound("Referi nuk u gjet.");

            _context.Referi.Remove(referi);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

