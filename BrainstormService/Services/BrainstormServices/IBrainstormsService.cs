using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrainstormService.Models;

namespace BrainstormService.Services.BrainstormServices
{
    public interface IBrainstormsService
    {
        Task<Brainstorm?> GetBrainstormById(string id);
        Task<Word> AddWord(string brainstormId, string word, string color);
    }
}