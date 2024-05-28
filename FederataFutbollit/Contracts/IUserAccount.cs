using FederataFutbollit.DTOs;

namespace FederataFutbollit.Contracts
{
    public interface IUserAccount
    {
        Task<ServiceResponses.GeneralResponse> CreateAccount(UserDTO userDTO);
        Task<ServiceResponses.LoginResponse> LoginAccount(LoginDTO loginDTO);
        Task<ServiceResponses.TokenResponse> RefreshTokenAsync(string token, string refreshToken);
    }
}
