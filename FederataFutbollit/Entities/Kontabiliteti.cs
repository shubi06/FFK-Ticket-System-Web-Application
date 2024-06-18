namespace FederataFutbollit.Entities
{
    public class Kontabiliteti
    {
        public int Id { get; set; }
        public int StafiId { get; set; }
        public int ShpenzimetId { get; set; }
        public DateTime Data { get; set; }
        public decimal ShumaTotale { get; set; }
        public decimal BuxhetiVjetor { get; set; }

        public Stafi Stafi { get; set; }
        public Shpenzimet Shpenzimet { get; set; }
    }
}