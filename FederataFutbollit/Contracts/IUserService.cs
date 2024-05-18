using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using FederataFutbollit.Models;
using FederataFutbollit.DTOs;
using FederataFutbollit.Data;

namespace FederataFutbollit.Contracts
{
    public interface IUserService
    {
        Task<IEnumerable<UserWithRolesDTO>> GetAllUsersWithRolesAsync();
        Task<ApplicationUser?> GetUserByIdAsync(string userId);
        Task<IdentityResult> UpdateUserAsync(string userId, UserUpdateModel model);
        Task<IdentityResult> UpdateUserRoleAsync(string userId, string newRole);
        Task<IdentityResult> DeleteUserAsync(string userId);
        Task<IdentityResult> ToggleUserRoleAsync(string userId, string role1, string role2);
        Task<ServiceResponse<UserWithRolesDTO>> CreateUserAsync(UserCreateModel model);
         Task<int> GetAdminCountAsync();
         Task<bool> IsUserInRoleAsync(ApplicationUser user, string role);
    }
}



