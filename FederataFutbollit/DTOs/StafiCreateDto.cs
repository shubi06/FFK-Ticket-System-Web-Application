using FederataFutbollit.Entities;
using System.Text.Json.Serialization;

namespace FederataFutbollit.DTOs
{
    public class StafiCreateDto
    {
        public int Id { get; set; }
        public string Emri { get; set; } = string.Empty;
        public string Mbiemri { get; set; } = string.Empty;
        public int Paga { get; set; }
        public string Email { get; set; } = string.Empty;
        public int Telefoni { get; set; }

        public int KombetarjaID { get; set; }
        public int RoliID { get; set; }
    }
}
