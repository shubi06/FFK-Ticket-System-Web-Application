namespace FederataFutbollit.Entities
{
    public class SektoriUlseve
    {
        public int Id { get; set; }
        public string Emri { get; set; }

        public List<Ulesja> Uleset { get; set; }
    }
}
