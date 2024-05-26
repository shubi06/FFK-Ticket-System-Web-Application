using System.Threading.Tasks;
using FederataFutbollit.Contracts;
using FederataFutbollit.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization; 
using Microsoft.AspNetCore.Identity; 
using Microsoft.Extensions.Logging; 
using FederataFutbollit.Models; 

namespace FederataFutbollit.Controllers
{
     [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserAccount _userAccount;
        private readonly ILogger<AccountController> _logger;

        public AccountController(IUserAccount userAccount, ILogger<AccountController> logger)
        {
            _userAccount = userAccount;
            _logger = logger;
        }

 [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { errors = ModelState.Values.SelectMany(v => v.Errors.Select(b => b.ErrorMessage)) });
            }

            try
            {
                var response = await _userAccount.CreateAccount(userDTO);
                if (!response.Flag)
                {
                    if (response.Message == "User registered already")
                    {
                        return Conflict(new { message = response.Message });
                    }
                    return BadRequest(new { message = response.Message });
                }
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error registering user");
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            if (loginDTO == null)
            {
                return BadRequest("Login data is missing.");
            }

            var response = await _userAccount.LoginAccount(loginDTO);
            if (!response.Flag)
            {
                return Unauthorized(response.Message);
            }

            return Ok(response);
        }
          [HttpGet("protected")]
    public IActionResult GetProtected()
    {
        return Ok("You are authenticated!");
    }
      [HttpGet("current-utc-time")]
    public IActionResult GetCurrentUtcTime()
    {
        return Ok(DateTime.UtcNow);
    }
     
    }
}
