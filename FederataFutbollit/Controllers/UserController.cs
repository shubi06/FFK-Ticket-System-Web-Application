using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using FederataFutbollit.Contracts;
using FederataFutbollit.DTOs;
using FederataFutbollit.Models;

namespace FederataFutbollit.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
   
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersWithRolesAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UserUpdateModel model)
        {
            var result = await _userService.UpdateUserAsync(id, model);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateModel model)
        {
            var result = await _userService.CreateUserAsync(model);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            if (result.Data == null)
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }

            return CreatedAtAction(nameof(GetUserById), new { id = result.Data.Id }, result.Data);
        }

        [HttpPut("{id}/role")]
        public async Task<IActionResult> UpdateUserRole(string id, [FromBody] UpdateUserRoleModel model)
        {
            if (string.IsNullOrEmpty(model.Role))
            {
                return BadRequest("Role cannot be null or empty.");
            }

            // Kontrollo numrin e administratorëve
            var adminCount = await _userService.GetAdminCountAsync();
            var user = await _userService.GetUserByIdAsync(id);

            // Kontrollo nëse përdoruesi është administrator
            var isAdmin = await _userService.IsUserInRoleAsync(user, "Admin");

            // Nëse është vetëm një admin dhe po ndryshohet roli, ndalo veprimin
            if (adminCount == 1 && isAdmin && model.Role != "Admin")
            {
                return BadRequest("Cannot change the role of the only remaining admin.GO BACK");
            }

            var result = await _userService.UpdateUserRoleAsync(id, model.Role);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            // Kontrollo numrin e administratorëve
            var adminCount = await _userService.GetAdminCountAsync();
            var user = await _userService.GetUserByIdAsync(id);

            // Kontrollo nëse përdoruesi është administrator
            var isAdmin = await _userService.IsUserInRoleAsync(user, "Admin");

            // Nëse është vetëm një admin, ndalo veprimin
            if (adminCount == 1 && isAdmin)
            {
                return BadRequest("Cannot delete the only remaining admin.GO BACK");
            }

            var result = await _userService.DeleteUserAsync(id);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return NoContent();
        }

        [HttpPut("{id}/toggle-role")]
        public async Task<IActionResult> ToggleUserRole(string id, [FromBody] ToggleRoleModel model)
        {
            var result = await _userService.ToggleUserRoleAsync(id, model.Role1, model.Role2);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return NoContent();
        }

        [HttpGet("admincount")]
public async Task<IActionResult> GetAdminCount()
{
    var adminCount = await _userService.GetAdminCountAsync();
    return Ok(adminCount);
}
    }
}
