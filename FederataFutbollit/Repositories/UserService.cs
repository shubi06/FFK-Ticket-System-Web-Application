using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using FederataFutbollit.Models;
using FederataFutbollit.Contracts;
using FederataFutbollit.DTOs;
using FederataFutbollit.Data;

namespace FederataFutbollit.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IEnumerable<UserWithRolesDTO>> GetAllUsersWithRolesAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            var usersWithRoles = new List<UserWithRolesDTO>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                usersWithRoles.Add(new UserWithRolesDTO
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Roles = roles
                });
            }

            return usersWithRoles;
        }

        public async Task<ApplicationUser?> GetUserByIdAsync(string userId)
        {
            return await _userManager.FindByIdAsync(userId);
        }

        public async Task<IdentityResult> UpdateUserAsync(string userId, UserUpdateModel model)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }

            if (model.Email != null)
                user.Email = model.Email;
            if (model.Name != null)
                user.Name = model.Name;

            var result = await _userManager.UpdateAsync(user);
            return result;
        }

        public async Task<IdentityResult> UpdateUserRoleAsync(string userId, string newRole)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }

            var currentRoles = await _userManager.GetRolesAsync(user);
            if (currentRoles.Contains(newRole))
            {
                return IdentityResult.Success; // Role is already assigned, no need to update
            }

            var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeResult.Succeeded)
            {
                return removeResult;
            }

            var addResult = await _userManager.AddToRoleAsync(user, newRole);
            if (!addResult.Succeeded)
            {
                return addResult;
            }

            return IdentityResult.Success;
        }

        public async Task<IdentityResult> DeleteUserAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = $"No user found with ID {userId}" });
            }
            return await _userManager.DeleteAsync(user);
        }

        public async Task<IdentityResult> ToggleUserRoleAsync(string userId, string role1, string role2)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = $"No user found with ID {userId}" });
            }

            var hasRole1 = await _userManager.IsInRoleAsync(user, role1);

            var removeResult = await _userManager.RemoveFromRoleAsync(user, hasRole1 ? role1 : role2);
            if (!removeResult.Succeeded)
            {
                return removeResult;
            }

            return await _userManager.AddToRoleAsync(user, hasRole1 ? role2 : role1);
        }

        public async Task<ServiceResponse<UserWithRolesDTO>> CreateUserAsync(UserCreateModel model)
        {
            var response = new ServiceResponse<UserWithRolesDTO>();
            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                response.Success = false;
                response.Message = string.Join(", ", result.Errors.Select(e => e.Description));
                return response;
            }

            var roleResult = await _userManager.AddToRoleAsync(user, model.Role);
            if (!roleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user);
                response.Success = false;
                response.Message = string.Join(", ", roleResult.Errors.Select(e => e.Description));
                return response;
            }

            var roles = await _userManager.GetRolesAsync(user);
            var userWithRoles = new UserWithRolesDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Roles = roles
            };

            response.Data = userWithRoles;
            return response;
        }
    }
}
