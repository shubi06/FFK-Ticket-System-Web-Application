using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FederataFutbollit.Data;
namespace FederataFutbollit.Entities
{
    public class Cart
    {
         public int Id { get; set; }
    public string ApplicationUserId { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
    public List<CartSeat> CartSeats { get; set; }
    }
}