namespace FederataFutbollit.DTOs
{
   public class NdeshjaCreateDto
    {
        public DateTime Data { get; set; }
        public int StadiumiId { get; set; }
        public int KompeticioniId { get; set; }
        public int StatusiId { get; set; }
        public int KombetarjaId { get; set; }  // Kombetarja jonë
        public string EkipiKundershtar { get; set; }
        public int ?GolaEkipiJone { get; set; }
        public int ?GolaEkipiKundershtar { get; set; }
    }
}
