using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using BrainstormService.External;

namespace BrainstormService.Services.AIService
{

    public class AIService : IAIService
    {
        private readonly IConfiguration _config;

        public AIService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<string> GetColor(string word) 
        {
            var httpClient = new HttpClient();
            var url = _config.GetSection("AppSettings:AIServerURL").Value + "/color/" + word;
            var response = await httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<WordResponse>(json);

            return data!.color;
        }
    }
}