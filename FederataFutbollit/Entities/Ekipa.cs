namespace FederataFutbollit.Entities
{
    public class Ekipa
    {
        public int Id { get; set; }
        public string EmriKlubit { get; set; } = string.Empty;
        public string Trajneri { get; set; } = string.Empty;
        public int VitiThemelimit { get; set; }
        public int NrTitujve { get; set; }

        public int SuperligaId { get; set; }  // Foreign key pointing to Superliga
        public Superliga Superliga { get; set; }  // Navigation property

        public ICollection<NdeshjaSuperliges> NdeshjetESuperliges { get; set; }

    }
}
