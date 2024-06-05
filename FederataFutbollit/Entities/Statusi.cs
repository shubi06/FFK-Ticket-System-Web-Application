using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace FederataFutbollit.Entities
{
    public class Statusi
    {
        public int Id { get; set; }
        public string Emri { get; set; }
        
         [JsonIgnore]

        public List<Ndeshja> Ndeshjet { get; set; } = new List<Ndeshja>(); // Bëjeni fushën jo të kërkuar
        public ICollection<NdeshjaSuperliges> NdeshjetESuperliges { get; set; }


    }
}
