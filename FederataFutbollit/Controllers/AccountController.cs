using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using FederataFutbollit.Contracts;
using FederataFutbollit.DTOs;
using Microsoft.AspNetCore.Authorization; 
using Microsoft.AspNetCore.Identity; 
using Microsoft.Extensions.Logging; 
using FederataFutbollit.Models; 
using FederataFutbollit.Data;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserAccount _userAccount;
        private readonly ILogger<AccountController> _logger;
        private readonly IEmailSender _emailSender;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public AccountController(
            IUserAccount userAccount,
            ILogger<AccountController> logger,
            IEmailSender emailSender,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
        {
            _userAccount = userAccount;
            _logger = logger;
            _emailSender = emailSender;
            _userManager = userManager;
            _configuration = configuration;
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

                // Generate email confirmation token
                var user = await _userManager.FindByEmailAsync(userDTO.Email);
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token, email = user.Email }, Request.Scheme);

                // Send email
                await _emailSender.SendEmailAsync(user.Email, "Confirm your email", confirmationLink);

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error registering user");
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpGet("confirmemail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return BadRequest("Invalid email address.");
            }

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Ok("Email confirmed successfully.");
            }

            return BadRequest("Email confirmation failed.");
        }

        // Existing methods: Login, RefreshToken
    




  [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            if (loginDTO == null)
            {
                return BadRequest("Login data is missing.");
            }

            var user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                return Unauthorized("Email not confirmed. Please check your email for confirmation instructions.");
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
