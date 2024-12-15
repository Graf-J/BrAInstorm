using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrainstormService.Models;
using Microsoft.EntityFrameworkCore;

namespace BrainstormService.Services.BrainstormServices
{
    public class BrainstormsService : IBrainstormsService
    {
        private readonly RailwayContext _context;

        public BrainstormsService(RailwayContext context)
        {
            _context = context;
        }

        public async Task<Brainstorm?> GetBrainstormById(string id)
        {
            var brainstorm = await _context.Brainstorms
                .Include(b => b.Words)
                .SingleOrDefaultAsync(b => b.Id == id);

            return brainstorm;
        }

        public async Task<Word> AddWord(string brainstormId, string word, string color)
        {
            var newWord = new Word {
                BrainstormId = brainstormId,
                Value = word,
                Color = color,
                Occurrence = 1
            };

            _context.Words.Add(newWord);
            await _context.SaveChangesAsync();

            return newWord;
        }
    }
}