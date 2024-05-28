namespace FederataFutbollit.DTOs
{
    public class ServiceResponses
    {
        public record class GeneralResponse(bool Flag, string Message);
        public record class LoginResponse(bool Flag, string Token, string RefreshToken, string Message, CookieOptions HttpOnlyCookie = null);
        public record TokenResponse(bool Success, string Token, string RefreshToken, string Message, DateTime RefreshTokenExpiryTime);
    }
}

