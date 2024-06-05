using System.ComponentModel.DataAnnotations;

namespace FederataFutbollit.Entities
{
    public class EkipaDto
    {
        [Required]
        public string EmriKlubit { get; set; }

        [Required]
        public string Trajneri { get; set; }

        [Required]
        [Range(1850, int.MaxValue, ErrorMessage = "Please enter a valid year (after 1850)")]
        public int VitiThemelimit { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Number of titles must be a valid number")]
        public int NrTitujve { get; set; }

        [Required]
        public int SuperligaId { get; set; }

        public IFormFile Logo { get; set; }
    }
}