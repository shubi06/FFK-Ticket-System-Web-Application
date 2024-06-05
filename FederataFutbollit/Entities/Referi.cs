using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FederataFutbollit.Entities
{
    public class Referi
    {
        [Key]
        public int Referi_ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Emri { get; set; }

        [Required]
        [MaxLength(50)]
        public string Mbiemri { get; set; }

        [ForeignKey("Superliga")]
        public int Superliga_ID { get; set; }

        public Superliga Superliga { get; set; }
    }
}
