using Microsoft.AspNetCore.Mvc;
using FederataFutbollit.Data;
using FederataFutbollit.Entities;
using FederataFutbollit.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusiController : ControllerBase
    {
        private readonly DataContext _context;

        public StatusiController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Statusi>>> GetAllStatuset()
        {
            return await _context.Statusi.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Statusi>> GetStatusiById(int id)
        {
            var statusi = await _context.Statusi.FindAsync(id);
            if (statusi == null)
            {
                return NotFound("Statusi nuk u gjet");
            }
            return statusi;
        }

        [HttpPost]
        public async Task<ActionResult<List<Statusi>>> CreateStatusi(StatusiCreateDto request)
        {
            var newStatusi = new Statusi
            {
                Emri = request.Emri
            };

            _context.Statusi.Add(newStatusi);
            await _context.SaveChangesAsync();
            return await GetAllStatuset();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatusi(int id, StatusiUpdateDto request)
        {
            var statusi = await _context.Statusi.FindAsync(id);
            if (statusi == null)
            {
                return NotFound("Statusi nuk u gjet");
            }

            statusi.Emri = request.Emri;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatusi(int id)
        {
            var statusi = await _context.Statusi.FindAsync(id);
            if (statusi == null)
            {
                return NotFound("Statusi nuk u gjet");
            }

            _context.Statusi.Remove(statusi);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
