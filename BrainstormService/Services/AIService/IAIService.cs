using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BrainstormService.Services.AIService
{
    public interface IAIService
    {
        Task<string> GetColor(string word);
    }
}