using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FederataFutbollit.DTOs;
using FederataFutbollit.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using FederataFutbollit.Models;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReferiController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<ReferiController> _logger;

        public ReferiController(DataContext context, ILogger<ReferiController> logger)
        {
            _context = context;
            _logger = logger;
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
        public async Task<ActionResult<List<Referi>>> CreateReferi(ReferiCreateDto referiDto)
        {
            var referi = new Referi
            {
                Emri = referiDto.Emri,
                Mbiemri = referiDto.Mbiemri,
                Kombesia = referiDto.Kombesia,
                Mosha = referiDto.Mosha,
                SuperligaId = referiDto.SuperligaId // Added SuperligaId field
            };

            try
            {
                _context.Referi.Add(referi);
                await _context.SaveChangesAsync();
                return await GetAllReferet();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "An error occurred while creating the referee.");
                return StatusCode(500, new { message = "An error occurred while creating the referee.", details = ex.InnerException?.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred.");
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReferi(int id, ReferiCreateDto referiDto)
        {
            var existingReferi = await _context.Referi.FindAsync(id);
            if (existingReferi == null)
                return NotFound("Referi nuk u gjet.");

            existingReferi.Emri = referiDto.Emri;
            existingReferi.Mbiemri = referiDto.Mbiemri;
            existingReferi.Kombesia = referiDto.Kombesia;
            existingReferi.Mosha = referiDto.Mosha;
            existingReferi.SuperligaId = referiDto.SuperligaId;

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
