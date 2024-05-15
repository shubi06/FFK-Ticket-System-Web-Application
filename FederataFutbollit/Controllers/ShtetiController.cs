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
    public class ShtetiController : ControllerBase
    {
        private readonly DataContext _context;

        public ShtetiController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Shteti>>> GetAllShteti()
        {
            var shtetet = await _context.Shteti.Include(s => s.Kombetarja).ToListAsync();
            return Ok(shtetet);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shteti>> GetShtetiById(int id)
        {
            var shteti = await _context.Shteti.Include(s => s.Kombetarja).FirstOrDefaultAsync(s => s.Id == id);
            if (shteti == null)
            {
                return NotFound();
            }
            return Ok(shteti);
        }






  


    }
}
