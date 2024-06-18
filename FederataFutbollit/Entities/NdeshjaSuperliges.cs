using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FederataFutbollit.Models; // Ensure this using directive is present
namespace FederataFutbollit.Entities
{
    public class NdeshjaSuperliges
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Ekipa1 { get; set; }

        [Required]
        public string Ekipa2 { get; set; }

        [Required]
        public DateTime DataENdeshjes { get; set; }

        [Required]
        public int StatusiId { get; set; }

        [JsonIgnore]
        public Statusi Statusi { get; set; }

        [Required]
        public int SuperligaId { get; set; }

        [JsonIgnore]
        public Superliga Superliga { get; set; }

        [Required]
        public int ReferiId { get; set; }

        [JsonIgnore]
        public Referi Referi { get; set; }

        public int? GolaEkipa1 { get; set; }
        public int? GolaEkipa2 { get; set; }
    }
}
