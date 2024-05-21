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
    public class StafiController : ControllerBase
    {
        private readonly DataContext _context;

        public StafiController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Stafi>>> Get()
        {


            return await _context.Stafi.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Stafi>> GetStafiById(int id)
        {
            var stafi = await _context.Stafi.FindAsync(id);
            if (stafi == null)
            {
                return NotFound();
            }
            return stafi;
        }

        [HttpPost]
        public async Task<ActionResult<List<Stafi>>> Create(StafiCreateDto request)
        {
            var kombetarja = await _context.Kombetarja.FindAsync(request.KombetarjaID);
            if (kombetarja == null)
                return NotFound();



            var newStafi = new Stafi
            {
                Emri = request.Emri,
                Mbiemri = request.Mbiemri,
                Paga = request.Paga,
                Email = request.Email,
                Telefoni = request.Telefoni,
                RoliID = request.RoliID,
                KombetarjaID = request.KombetarjaID
                
            };

            _context.Stafi.Add(newStafi);
            await _context.SaveChangesAsync();

            return await Get();

        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStafi(StafiCreateDto request)
        {
            // Gjej lojtarin që duhet përditësuar dhe merr kombëtaren e lidhur
            var stafi = await _context.Stafi.Include(k => k.Kombetarja).FirstOrDefaultAsync(k => k.Id == request.Id);
            if (stafi == null)
            {
                return NotFound(); // Nëse lojtari nuk gjendet, kthe një përgjigje 404 Not Found
            }

            // Përditëso vetitë e lojtarit nga kërkesa
            _context.Entry(stafi).CurrentValues.SetValues(request);

            // Ruaj ndryshimet në bazën e të dhënave
            await _context.SaveChangesAsync();

            // Kthe një përgjigje 204 No Content si konfirmim se përditësimi u bë me sukses
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStafi(int id)
        {
            var stafi = await _context.Stafi.FindAsync(id);
            if (stafi == null)
            {
                return NotFound();
            }

            _context.Stafi.Remove(stafi);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
