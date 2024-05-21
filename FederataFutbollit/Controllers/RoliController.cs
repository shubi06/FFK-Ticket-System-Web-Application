using FederataFutbollit.Data;
using FederataFutbollit.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoliController : ControllerBase
    {
        private readonly DataContext _context;
        public RoliController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<List<Roli>>> GetAllRolet()
        {
            var roli = await _context.Roli.ToListAsync();

            return Ok(roli);

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Roli>> GetRoli(int id)
        {
            var roli = await _context.Roli.FindAsync(id);
            if (roli is null)
                return NotFound("Roli nuk u gjet");

            return Ok(roli);

        }


        [HttpPost]
        public async Task<ActionResult<List<Roli>>> AddRoli(Roli roli)
        {
            _context.Roli.Add(roli);
            await _context.SaveChangesAsync();
            return Ok(await _context.Roli.ToListAsync());

        }


        [HttpPut("{id}")]

        public async Task<ActionResult<List<Roli>>> UpdateRoli(Roli updatedStafi)
        {
            var dbStafi = await _context.Roli.FindAsync(updatedStafi.Id);
            if (dbStafi is null)
                return NotFound("Stafi nuk u gjet");

            dbStafi.Emri = updatedStafi.Emri;

            await _context.SaveChangesAsync();



            return Ok(await _context.Roli.ToListAsync());

        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Roli>>> DeleteRoli(int id)
        {
            var dbStafi = await _context.Roli.FindAsync(id);
            if (dbStafi is null)
                return NotFound("Stafi nuk u gjet");

            _context.Roli.Remove(dbStafi);
            await _context.SaveChangesAsync();



            return Ok(await _context.Roli.ToListAsync());

        }

    }
}

