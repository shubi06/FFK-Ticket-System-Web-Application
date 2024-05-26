using System.Text.Json.Serialization;

namespace FederataFutbollit.Entities
{
    public class Bileta
    {
        public int Id { get; set; }
        public int Cmimi { get; set; }
        public DateTime OraBlerjes { get; set; }

        [JsonIgnore]
        public Ulesja Ulesja { get; set; }
        public int UlesjaID { get; set; }

        [JsonIgnore]
        public Ndeshja Ndeshja { get; set; }
        public int NdeshjaID { get; set; }
    }
}
