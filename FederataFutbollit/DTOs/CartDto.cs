using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FederataFutbollit.Data;
namespace FederataFutbollit.DTOs
{
    public class CartDto
    {
           public int Id { get; set; }
    public string ApplicationUserId { get; set; }
    public List<CartSeatDto> CartSeats { get; set; }
    }
}