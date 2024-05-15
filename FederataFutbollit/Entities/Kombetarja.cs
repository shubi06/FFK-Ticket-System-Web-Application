using System.Text.Json.Serialization;

namespace FederataFutbollit.Entities
{
    public class Kombetarja
    {
        public int Id { get; set; }
        public string Emri { get; set; }
        [JsonIgnore]
        public Shteti Shteti { get; set; }
        public int ShtetiID { get; set; }

        public List<Lojtaret> Lojtaret { get; set; }
    }
}
