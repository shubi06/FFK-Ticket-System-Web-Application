namespace FederataFutbollit.Entities
{
    public class Roli
    {
        public int Id { get; set; }
        public string Emri { get; set; }

        public List<Stafi> Stafi { get; set; }
    }
}
