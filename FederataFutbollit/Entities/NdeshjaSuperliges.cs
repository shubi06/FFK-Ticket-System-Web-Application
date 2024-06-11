﻿using System;
using System.Collections.Generic;


using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        public int EkipaId { get; set; }

        [JsonIgnore]
        public Ekipa Ekipa { get; set; }

    }
}