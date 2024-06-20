using FederataFutbollit.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatistikatController : ControllerBase
    {
        private readonly DataContext _context;

        public StatistikatController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("top-players")]
        public async Task<ActionResult<IEnumerable<object>>> GetTopPlayers()
        {
            var players = await _context.LojtaretSuperlige
                .OrderByDescending(p => p.Gola)
                .ThenByDescending(p => p.Asiste)
                .Take(3)
                .Select(p => new
                {
                    p.Emri,
                    p.Mbiemri,
                    p.Gola,
                    p.Asiste,
                    p.Mosha
                })
                .ToListAsync();

            return Ok(players);
        }

        [HttpGet("best-players")]
        public async Task<ActionResult<object>> GetBestPlayers()
        {
            var topGoalScorer = await _context.LojtaretSuperlige
                .OrderByDescending(p => p.Gola)
                .Select(p => new
                {
                    p.Emri,
                    p.Mbiemri,
                    p.Gola,
                    p.Asiste,
                    p.Mosha
                })
                .FirstOrDefaultAsync();

            var topAssistProvider = await _context.LojtaretSuperlige
                .OrderByDescending(p => p.Asiste)
                .Select(p => new
                {
                    p.Emri,
                    p.Mbiemri,
                    p.Gola,
                    p.Asiste,
                    p.Mosha
                })
                .FirstOrDefaultAsync();

            var oldestPlayer = await _context.LojtaretSuperlige
                .OrderByDescending(p => p.Mosha) // Order by descending to get the oldest player
                .Select(p => new
                {
                    p.Emri,
                    p.Mbiemri,
                    p.Gola,
                    p.Asiste,
                    p.Mosha
                })
                .FirstOrDefaultAsync();

            return Ok(new { topGoalScorer, topAssistProvider, oldestPlayer });
        }
    }
}
