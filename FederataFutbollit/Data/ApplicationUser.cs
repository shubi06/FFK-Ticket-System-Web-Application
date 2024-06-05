using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using FederataFutbollit.Entities;
using FederataFutbollit.DTOs;

namespace FederataFutbollit.Data
{
    public class ApplicationUser:IdentityUser
    {
   
        public string ? Name { get; set; }
    public string? RefreshToken { get; set; }
     public DateTime RefreshTokenExpiryTime { get; set; }


        public List<Bileta> Biletat { get; set; } = new List<Bileta>();
         public List<Order> Orders { get; set; } = new List<Order>();

    }
}