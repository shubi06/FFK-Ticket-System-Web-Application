using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace FederataFutbollit.Data
{
    public class ApplicationUser:IdentityUser
    {
        public string ? Name { get; set; }

    }
}