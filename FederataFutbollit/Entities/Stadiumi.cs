using System.Text.Json.Serialization;

namespace FederataFutbollit.Entities
{
    public class Stadiumi
    {
        public int Id { get; set; }
        public string Emri { get; set; }
        public int Kapaciteti { get; set; }
        public int VitiNdertuar { get; set; }

        [JsonIgnore]
        public Kombetarja Kombetarja { get; set; }
        public int KombetarjaID { get; set; }

        [JsonIgnore]
        public List<Ndeshja> Ndeshjet { get; set; }  // Shto këtë linjë për lidhjen me ndeshjet
    }
}
