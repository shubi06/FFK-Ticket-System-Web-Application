namespace FederataFutbollit.Entities
{
    public class Superliga
    {
        public int Id { get; set; }
        public required string Emri { get; set; }
        public required string Sponzori { get; set; }
        public int NumriSkuadrave { get; set; }
        
        public ICollection<Ekipa>? Ekipa { get; set; } = new List<Ekipa>();
        public ICollection<NdeshjaSuperliges> NdeshjetESuperliges { get; set; }

    }
}
