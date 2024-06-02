using System.ComponentModel.DataAnnotations;
public class ValidateResetLinkDTO
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Token { get; set; }

    [Required]
    public string ValidUntil { get; set; }
}
