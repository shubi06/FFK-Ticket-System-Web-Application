using FederataFutbollit.Data;
using FederataFutbollit.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SektoriUlseveController : ControllerBase
    {
        private readonly DataContext _context;
        public SektoriUlseveController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<SektoriUlseve>>> GetAllSektoriUlseve()
        {
            var sektori = await _context.SektoriUlseve.Include(s => s.Uleset).ToListAsync();
            return Ok(sektori);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<SektoriUlseve>> GetSektori(int id)
        {
            var sektori = await _context.SektoriUlseve.FindAsync(id);
            if (sektori is null)
                return NotFound("sektori nuk u gjet");

            return Ok(sektori);

        }


        [HttpPost]
        public async Task<ActionResult<List<SektoriUlseve>>> AddSektori(SektoriUlseve sektori)
        {
            _context.SektoriUlseve.Add(sektori);
            await _context.SaveChangesAsync();
            return Ok(await _context.SektoriUlseve.ToListAsync());

        }


        [HttpPut("{id}")]

        public async Task<ActionResult<List<SektoriUlseve>>> UpdateSektoriUlseve(SektoriUlseve updatedStafi)
        {
            var dbSektori = await _context.SektoriUlseve.FindAsync(updatedStafi.Id);
            if (dbSektori is null)
                return NotFound("SektoriUlseve nuk u gjet");

            dbSektori.Emri = updatedStafi.Emri;

            await _context.SaveChangesAsync();



            return Ok(await _context.SektoriUlseve.ToListAsync());

        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<List<SektoriUlseve>>> DeleteSektoriUlseve(int id)
        {
            var dbStafi = await _context.SektoriUlseve.FindAsync(id);
            if (dbStafi is null)
                return NotFound("SektoriUlseve nuk u gjet");

            _context.SektoriUlseve.Remove(dbStafi);
            await _context.SaveChangesAsync();



            return Ok(await _context.SektoriUlseve.ToListAsync());

        }

    }
}

