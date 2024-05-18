using System.Text.Json.Serialization;

namespace FederataFutbollit.Entities
{
    public class Selektori
    {
        public int Id { get; set; }
        public required string Emri { get; set; }
        public required string Mbiemri { get; set; }
        public int Mosha { get; set; }
        public required string Nacionaliteti { get; set; }
        public int VitetEKontrates { get; set; }


        [JsonIgnore]
        public Kombetarja ?Kombetarja { get; set; }
        public int KombetarjaID { get; set; }

    }
}