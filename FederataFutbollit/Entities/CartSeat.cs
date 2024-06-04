using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FederataFutbollit.Entities
{
    public class CartSeat
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        public int UlesjaId { get; set; }
        public Ulesja Ulesja { get; set; }
        public int Quantity { get; set; }  
        public double Cmimi { get; set; }
        public int SektoriUlseveId { get; set; }
        public SektoriUlseve SektoriUlseve { get; set; }

          public int? OrderId { get; set; }
         public Order Order { get; set; }
    }
}
