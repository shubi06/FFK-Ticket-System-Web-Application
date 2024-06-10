using FederataFutbollit.Data;
using System.Text.Json.Serialization;

namespace FederataFutbollit.Entities
{
    public class Bileta
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Cmimi { get; set; }
        public DateTime OraBlerjes { get; set; }

        [JsonIgnore]
        public Ulesja Ulesja { get; set; }
        public int UlesjaID { get; set; }

        [JsonIgnore]
        public Ndeshja Ndeshja { get; set; }
        public int NdeshjaID { get; set; }

       

        public ApplicationUser ApplicationUser { get; set; }
        public string ApplicationUserID { get; set; }

        [JsonIgnore]
        public SektoriUlseve SektoriUlseve { get; set; }
        public int? SektoriUlseveID { get; set; }


        public string EkipiKundershtar => Ndeshja?.EkipiKundershtar;

        public int NumriUlses => (int)(Ulesja?.Numri);
        public string SektoriUlses => SektoriUlseve?.Emri;


    }
}
