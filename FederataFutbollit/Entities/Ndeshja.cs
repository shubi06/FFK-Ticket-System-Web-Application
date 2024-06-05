using System.Text.Json.Serialization;

namespace FederataFutbollit.Entities
{
    public class Ndeshja
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public int StadiumiId { get; set; }
        [JsonIgnore]
        public Stadiumi Stadiumi { get; set; }
        public int KompeticioniId { get; set; }
        [JsonIgnore]
        public Kompeticionet Kompeticioni { get; set; }
        public int StatusiId { get; set; }
        [JsonIgnore]
        public Statusi Statusi { get; set; }
        
        public int KombetarjaId { get; set; }  // Shto këtë linjë

        [JsonIgnore]
        public Kombetarja Kombetarja { get; set; }  // Shto këtë linjë
        
        public string EkipiKundershtar { get; set; }
        public int? GolaEkipiJone { get; set; }
        public int ?GolaEkipiKundershtar { get; set; }

   

        [JsonIgnore]
        public List<Bileta> Bileta { get; set; }

        [JsonIgnore]
        public List<CartSeat> CartSeats { get; set; }

    }
}
