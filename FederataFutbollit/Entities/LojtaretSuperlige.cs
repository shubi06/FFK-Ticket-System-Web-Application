using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FederataFutbollit.Entities
{
    public class LojtaretSuperlige
    {
        public int Id { get; set; }
        public string Emri { get; set; }
        public string Mbiemri { get; set; }
        public int Mosha { get; set; }
        public string Pozicioni { get; set; }

        public int Gola { get; set; }
        public int Asiste { get; set; }
        public int NrFaneles { get; set; }

        [JsonIgnore]
        public Superliga Superliga { get; set; }
        public int SuperligaID { get; set; }
        public string FotoPath { get; set; }


    }
}
