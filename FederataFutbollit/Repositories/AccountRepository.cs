using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FederataFutbollit.Contracts;
using FederataFutbollit.Data;
using FederataFutbollit.DTOs;
using FederataFutbollit.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FederataFutbollit.Repositories
{
    public class AccountRepository : IUserAccount
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration config;

        public AccountRepository(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.config = config;
        }

        public async Task<ServiceResponses.GeneralResponse> CreateAccount(UserDTO userDTO)
        {
            if (userDTO is null) return new ServiceResponses.GeneralResponse(false, "Model is empty");
            var newUser = new ApplicationUser()
            {
                Name = userDTO.Name,
                Email = userDTO.Email,
                PasswordHash = userDTO.Password,
                UserName = userDTO.Email
            };
            var user = await userManager.FindByEmailAsync(newUser.Email);
            if (user is not null) return new ServiceResponses.GeneralResponse(false, "User registered already");

            var createUser = await userManager.CreateAsync(newUser, userDTO.Password);
            if (!createUser.Succeeded)
            {
                var errorMessage = string.Join(", ", createUser.Errors.Select(e => e.Description));
                return new ServiceResponses.GeneralResponse(false, errorMessage);
            }

            var checkAdmin = await roleManager.FindByNameAsync("Admin");
            if (checkAdmin is null)
            {
                await roleManager.CreateAsync(new IdentityRole() { Name = "Admin" });
                await userManager.AddToRoleAsync(newUser, "Admin");
                return new ServiceResponses.GeneralResponse(true, "Account Created");
            }
            else
            {
                var checkUser = await roleManager.FindByNameAsync("User");
                if (checkUser is null)
                    await roleManager.CreateAsync(new IdentityRole() { Name = "User" });

                await userManager.AddToRoleAsync(newUser, "User");
                return new ServiceResponses.GeneralResponse(true, "Account Created");
            }
        }

    public async Task<ServiceResponses.LoginResponse> LoginAccount(LoginDTO loginDTO)
        {
            if (loginDTO == null)
                return new ServiceResponses.LoginResponse(false, null, null, "Login container is empty");

            var getUser = await userManager.FindByEmailAsync(loginDTO.Email);
            if (getUser is null)
                return new ServiceResponses.LoginResponse(false, null, null, "User not found");

            bool checkUserPasswords = await userManager.CheckPasswordAsync(getUser, loginDTO.Password);
            if (!checkUserPasswords)
                return new ServiceResponses.LoginResponse(false, null, null, "Invalid email/password");

            var getUserRole = await userManager.GetRolesAsync(getUser);
            var userSession = new UserSession(getUser.Id, getUser.Name, getUser.Email, getUserRole.First());
            string token = GenerateToken(userSession);
            var refreshToken = GenerateRefreshToken();
            getUser.RefreshToken = refreshToken;
            getUser.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await userManager.UpdateAsync(getUser);

            var response = new ServiceResponses.LoginResponse(
                true,
                token,
                refreshToken,
                "Login completed",
                new CookieOptions
                {
                    HttpOnly = true,
                    Expires = getUser.RefreshTokenExpiryTime
                }
            );

            return response;
        }

    public async Task<ServiceResponses.TokenResponse> RefreshTokenAsync(string token, string refreshToken)
{
    var principal = GetPrincipalFromExpiredToken(token);
    if (principal == null)
    {
        return new ServiceResponses.TokenResponse(false, null, null, "Invalid access token", DateTime.MinValue);
    }

    var nameClaim = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
    if (nameClaim == null)
    {
        return new ServiceResponses.TokenResponse(false, null, null, "Invalid access token", DateTime.MinValue);
    }

    var user = await userManager.FindByIdAsync(nameClaim.Value);
    if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
    {
        return new ServiceResponses.TokenResponse(false, null, null, "Invalid refresh token", DateTime.MinValue);
    }

    var newToken = GenerateToken(new UserSession(user.Id, user.Name, user.Email, (await userManager.GetRolesAsync(user)).First()));

    
    user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
    await userManager.UpdateAsync(user);

    return new ServiceResponses.TokenResponse(true, newToken, refreshToken, "Token refreshed", user.RefreshTokenExpiryTime);
}


   private string GenerateToken(UserSession user)
{
    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
    var userClaims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.Name, user.Name),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

    var token = new JwtSecurityToken(
        issuer: config["Jwt:Issuer"],
        audience: config["Jwt:Audience"],
        claims: userClaims,
        expires: DateTime.UtcNow.AddMinutes(1),
        signingCredentials: credentials
    );

    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

    return tokenString;
}


       
private string GenerateRefreshToken()
        {
            var randomBytes = new byte[32];
            using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
                return Convert.ToBase64String(randomBytes);
            }
        }
    

// Token Validation
 private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

















    }
}



 