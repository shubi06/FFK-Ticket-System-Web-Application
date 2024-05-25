namespace FederataFutbollit.DTOs
{
    public class NdeshjaDto
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public int StadiumiId { get; set; }
        public string StadiumiEmri { get; set; }
        public int KompeticioniId { get; set; }
        public string KompeticioniEmri { get; set; }
        public int StatusiId { get; set; }
        public string StatusiEmri { get; set; }
        public int KombetarjaId { get; set; }
        public string KombetarjaEmri { get; set; }
        public string EkipiKundershtar { get; set; }
        public int? GolaEkipiJone { get; set; }
        public int ?GolaEkipiKundershtar { get; set; }
    }
}
