using FederataFutbollit.Data;
using FederataFutbollit.Entities;
public class CartSeatDto
{
      public int Id { get; set; }
    public int UlesjaId { get; set; }
    public int Quantity { get; set; }
     public double Cmimi { get; set; }
    public int SektoriUlseveId { get; set; }
  
    public string ApplicationUserId { get; set; }
}
