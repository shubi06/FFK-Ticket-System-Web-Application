using FederataFutbollit.Entities;
using System.ComponentModel.DataAnnotations;

namespace FederataFutbollit.Models
{
    public class Referi
    {
        [Key]
        public int Referi_ID { get; set; }

        [Required]
        public string Emri { get; set; }

        [Required]
        public string Mbiemri { get; set; }

        [Required]
        public string Kombesia { get; set; }

        [Required]
        public int Mosha { get; set; }

        // Foreign key for Superliga
        public int SuperligaId { get; set; }

        // Navigation property
        public Superliga Superliga { get; set; }
    }
}
