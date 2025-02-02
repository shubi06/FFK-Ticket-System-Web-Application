﻿using System.Text.Json.Serialization;

namespace FederataFutbollit.Entities
{
    public class Stafi
    {
        public int Id { get; set; }
        public string Emri { get; set; } = string.Empty;
        public string Mbiemri { get; set; } = string.Empty;
        public int Paga { get; set; }
        public string Email { get; set; } = string.Empty;   
        public int Telefoni { get; set; }

        [JsonIgnore]
        public Kombetarja Kombetarja { get; set; }
        public int KombetarjaID { get; set; }

        [JsonIgnore]
        public Roli Roli { get; set; }
        public int RoliID { get; set; }



    }
}
