using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FederataFutbollit.DTOs
{
    public class UserWithRolesDTO
    {
        public string ?Id { get; set; }
    public string ?Name { get; set; }
    public string ?Email { get; set; }
    public IList<string>? Roles { get; set; }
    }
}