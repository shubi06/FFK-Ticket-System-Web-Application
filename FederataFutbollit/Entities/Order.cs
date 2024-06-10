using System;
using System.Collections.Generic;
using FederataFutbollit.Data; // Shtoni këtë linjë për të importuar ApplicationUser

namespace FederataFutbollit.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; } 
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }

        public List<CartSeat> Seats { get; set; } // Kjo lidhet me ulëset e porositura

        public int NdeshjaId { get; set; }
        public int UlesjaId { get; set; }
        public int Quantity { get; set; }
        public double Cmimi { get; set; }
        public int SektoriUlseveId { get; set; }

        // Shtoni emrin dhe mbiemrin e blerësit
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }

  
    }
}
