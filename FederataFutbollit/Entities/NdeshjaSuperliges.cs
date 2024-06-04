using System;
using System.Collections.Generic;



namespace FederataFutbollit.Entities
{
    public class NdeshjaSuperliges
    {
        public int Id { get; set; }
        public string Ekipa1 { get; set; }
        public string Ekipa2 { get; set; }
        public DateTime DataENdeshjes { get; set; }
        public int StatusiId { get; set; }
        public Statusi Statusi { get; set; } // Referenca ndaj Statusit
        public int SuperligaId { get; set; }
        public Superliga Superliga { get; set; } // Referenca ndaj Superligës
        public int EkipaId { get; set; }
        public Ekipa Ekipa { get; set; } // Referenca ndaj Ekipës
    }
}
