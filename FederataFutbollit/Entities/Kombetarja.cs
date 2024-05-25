﻿using System.Text.Json.Serialization;

namespace FederataFutbollit.Entities
{
    public class Kombetarja
    {
        public int Id { get; set; }
        public string Emri { get; set; }
        [JsonIgnore]
        public Shteti Shteti { get; set; }
        public int ShtetiID { get; set; }
        public List<Lojtaret> Lojtaret { get; set; }

        public Selektori Selektori { get; set; }

        public List<Stafi> Stafi { get; set; }
         public List<Ndeshja> Ndeshjet { get; set; }
         public List<Stadiumi> Stadiumet { get; set; }


    }
}