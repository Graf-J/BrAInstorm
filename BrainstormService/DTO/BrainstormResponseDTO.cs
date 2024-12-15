using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BrainstormService.DTO
{
    public class BrainstormResponseDTO
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int MaxWords { get; set; } = 0;
        public string Creator { get; set; } = string.Empty;
        public List<WordResponseDTO> Words { get; set; } = new();
    }
}