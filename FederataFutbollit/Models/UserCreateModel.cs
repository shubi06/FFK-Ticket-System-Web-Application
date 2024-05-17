using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FederataFutbollit.Models
{
    public class UserCreateModel
    {
    
    public string Name { get; set; }= string.Empty;
     [Required]
    [EmailAddress]
        public string Email { get; set; }= string.Empty;
        [Required]
    [DataType(DataType.Password)]
        public string Password { get; set; }= string.Empty;
        public string Role { get; set; }= string.Empty;
    }
}