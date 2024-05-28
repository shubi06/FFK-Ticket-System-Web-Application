namespace FederataFutbollit.DTOs
{
    public class UlesjaCreateDto
    {
        public int Id { get; set; }
        public int Numri { get; set; }
        public bool IsAvailable { get; set; }
        public int SektoriUlseveID { get; set; }
    }
}
