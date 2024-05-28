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

        Response.Cookies.Append("refreshToken", response.RefreshToken, response.HttpOnlyCookie);

        return Ok(new { token = response.Token });
    }

   [HttpPost("refresh-token")]
public async Task<IActionResult> RefreshToken()
{
    _logger.LogInformation("RefreshToken endpoint hit.");
    
    var refreshToken = Request.Cookies["refreshToken"];
    if (string.IsNullOrEmpty(refreshToken))
    {
        _logger.LogError("Refresh token is missing.");
        return BadRequest("Refresh token is missing.");
    }

    var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
    if (string.IsNullOrEmpty(token))
    {
        _logger.LogError("Access token is missing.");
        return BadRequest("Access token is missing.");
    }

    try
    {
        _logger.LogInformation($"Received refresh token: {refreshToken}");
        _logger.LogInformation($"Received access token: {token}");

        var response = await _userAccount.RefreshTokenAsync(token, refreshToken);
        if (!response.Success)
        {
            _logger.LogError($"Token refresh failed: {response.Message}");
            return BadRequest(response.Message);
        }

        _logger.LogInformation("Token refresh successful.");
        _logger.LogInformation($"Refresh token expiry time: {response.RefreshTokenExpiryTime}");
        
        // Ruajmë refresh tokenin vetëm nëse është ndryshuar
        Response.Cookies.Append("refreshToken", response.RefreshToken, new CookieOptions
        {
            HttpOnly = true,
            Expires = response.RefreshTokenExpiryTime
        });

        return Ok(new { token = response.Token });
    }
    catch (Exception ex)
    {
        _logger.LogError($"Exception during token refresh: {ex.Message}");
        return StatusCode(500, "Internal server error");
    }
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
