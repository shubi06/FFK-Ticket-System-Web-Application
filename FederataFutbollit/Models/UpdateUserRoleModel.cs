using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FederataFutbollit.Models
{
    public class UpdateUserRoleModel
    {
      
       public string Role { get; set; } = string.Empty;
    }
}