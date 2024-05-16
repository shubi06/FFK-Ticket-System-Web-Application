namespace FederataFutbollit.DTOs
{
    public class SelektoriCreateDto
    {
        public int Id { get; set; }
        public required string Emri { get; set; }
        public required string Mbiemri { get; set; }
        public int Mosha { get; set; }
        public required string Nacionaliteti { get; set; }
        public int VitetEKontrates { get; set; }

        public int KombetarjaID { get; set; }
    }
}
