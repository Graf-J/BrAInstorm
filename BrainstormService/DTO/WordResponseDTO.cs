using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BrainstormService.DTO
{
    public class WordResponseDTO
    {
        public string Value { get; set; } = "";
        public int Occurrence { get; set; } = 1;
        public string Color { get; set; } = "#FFFFFF";
    }
}