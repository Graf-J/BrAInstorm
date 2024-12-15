using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BrainstormService.DTO
{
    public class BrainstormRequestDTO
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        [Range(10, 30)]
        public int MaxWords { get; set; } = 0;
    }
}