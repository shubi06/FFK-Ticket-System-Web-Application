using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FederataFutbollit.Entities
{
    public class Kompeticionet
    {
        public int Id { get; set; }
        public string Emri { get; set; }
         
          [JsonIgnore]
        public List<Ndeshja> Ndeshja { get; set; } = new List<Ndeshja>(); // Bëjeni fushën jo të kërkuar
    }
}

