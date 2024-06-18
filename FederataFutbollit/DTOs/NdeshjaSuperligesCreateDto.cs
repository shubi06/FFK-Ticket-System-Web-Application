namespace FederataFutbollit.DTOs
{
    public class NdeshjaSuperligesCreateDto
    {
        public string Ekipa1 { get; set; }
        public string Ekipa2 { get; set; }
        public DateTime DataENdeshjes { get; set; }
        public int StatusiId { get; set; }
        public int SuperligaId { get; set; }
        public int ReferiId { get; set; }
        public int? GolaEkipa1 { get; set; }
        public int? GolaEkipa2 { get; set; }
    }

    public class NdeshjaSuperligesUpdateDto
    {
        public string Ekipa1 { get; set; }
        public string Ekipa2 { get; set; }
        public DateTime DataENdeshjes { get; set; }
        public int StatusiId { get; set; }
        public int SuperligaId { get; set; }
        public int ReferiId { get; set; }
        public int? GolaEkipa1 { get; set; }
        public int? GolaEkipa2 { get; set; }
    }
}