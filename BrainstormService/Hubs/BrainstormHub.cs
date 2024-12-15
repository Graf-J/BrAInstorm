using BrainstormService.DTO;
using BrainstormService.Models;
using BrainstormService.Services.AIService;
using BrainstormService.Services.BrainstormServices;
using Microsoft.AspNetCore.SignalR;

namespace BrainstormService.Hubs
{
    public class BrainstormHub : Hub
    {
        private readonly RailwayContext _context;
        private readonly IBrainstormsService _brainstormService;
        private readonly IAIService _aiService;

        public BrainstormHub(RailwayContext context, IBrainstormsService brainstormService, IAIService aiService)
        {
            _context = context;
            _brainstormService = brainstormService;
            _aiService = aiService;
        }

        public async Task SendWord(string groupId, string word)
        {
            var brainstorm = await _brainstormService.GetBrainstormById(groupId);

            // Check if this Word already exists in the Brainstorm
            var newWord = brainstorm!.Words.FirstOrDefault<Word>(w => w.Value == word);
            if (newWord != null) 
            {
                // If Word exists -> Increment Occurrence and save
                newWord.Occurrence++;
                await _context.SaveChangesAsync();
            }
            else {
                // If it's a new Word -> Check, if Max number of words already exceeded
                if (brainstorm.Words.Count() >= brainstorm.MaxWords)
                {
                    await Clients.Group(groupId).SendAsync("Problem", "Max. number of words reached for this Brainstorm");
                    return;
                }
                
                // Request for Color by AI and store the new Word in the Database
                string color = await _aiService.GetColor(word);
                newWord = await _brainstormService.AddWord(groupId, word, color);
            }

            // Send the new Word to the Clients of the Brainstorm Group
            await Clients.Group(groupId).SendAsync("Word", new WordResponseDTO {
                Value = newWord.Value,
                Occurrence = newWord.Occurrence,
                Color = newWord.Color
            });
        }

        public async Task JoinGroup(string groupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);
        }

        public async Task LeaveGroup(string groupId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId);
        }
    }
}
