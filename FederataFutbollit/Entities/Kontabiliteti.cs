namespace FederataFutbollit.Entities
{
    public class Kontabiliteti
    {
        public int Id { get; set; }
        public int StafiId { get; set; }
        public int ShpenzimetId { get; set; }
        public DateTime Data { get; set; }
        public int ShumaTotale { get; set; }

        public Stafi Stafi { get; set; }
        public Shpenzimet Shpenzimet { get; set; }
    }
}