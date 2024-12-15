using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BrainstormService.Models;
using BrainstormService.DTO;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace BrainstormService.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class BrainstormController : Controller
    {
        private readonly RailwayContext _context;

        public BrainstormController(RailwayContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet("Exists/{id}")]
        public bool Exists(string id) {
            var brainstorm = _context.Brainstorms
                .Where(b => b.Id == id)
                .FirstOrDefault();

            return brainstorm != null;
        }

        [AllowAnonymous]
        [HttpGet("Latest")]
        public ActionResult<string> GetLatest() {
            var brainstorm = _context.Brainstorms.OrderByDescending(b => b.CreatedAt).FirstOrDefault();
            if (brainstorm == null)
                return NotFound("There are no Brainstorms in the Database");

            return brainstorm.Id;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public ActionResult<BrainstormResponseDTO> Get(string id) {
            try
            {
                var brainstorm = _context.Brainstorms
                    .Include(b => b.User)
                    .Include(b => b.Words)
                    .Where((Brainstorm brainstorm) => brainstorm.Id == id)
                    .FirstOrDefault();

                if (brainstorm == null)
                    return NotFound("Brainstorm not found");
                
                var response = new BrainstormResponseDTO {
                    Id = brainstorm.Id,
                    Title = brainstorm.Title,
                    MaxWords = brainstorm.MaxWords,
                    Creator = brainstorm.User.UserName,
                    Words = brainstorm.Words.Select(w => new WordResponseDTO {
                        Value = w.Value,
                        Color = w.Color,
                        Occurrence = w.Occurrence
                    }).ToList()
                };

                return response;
            }
            catch (Exception) {
                return Problem("Unknown Exception");
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<BrainstormResponseDTO>> Get()
        {
            try
            {
                var brainstorms = _context.Brainstorms
                    .Include(b => b.User)
                    .Where((Brainstorm brainstorm) => brainstorm.UserId == int.Parse(HttpContext.User.FindFirstValue("userId")))
                    .OrderByDescending((Brainstorm brainstorm) => brainstorm.CreatedAt)
                    .ToList();

                var brainstormList = new List<BrainstormResponseDTO>();
                foreach (Brainstorm brainstorm in brainstorms) 
                {
                    brainstormList.Add(new BrainstormResponseDTO {
                        Id = brainstorm.Id,
                        Title = brainstorm.Title,
                        MaxWords = brainstorm.MaxWords,
                        Creator = brainstorm.User.UserName
                    });
                }

                return brainstormList;
            } 
            catch (Exception)
            {
                return Problem("Unknown Exception");
            }
        }

        [HttpPost]
        public async Task<ActionResult<BrainstormResponseDTO>> Post([FromBody]BrainstormRequestDTO reqBrainstorm)
        {
            try 
            {
                int userId = int.Parse(HttpContext.User.FindFirstValue("userId"));

                var newBrainstorm =_context.Brainstorms.Add(new Brainstorm {
                    Title = reqBrainstorm.Title,
                    MaxWords = reqBrainstorm.MaxWords,
                    UserId = userId
                });
                
                await _context.SaveChangesAsync();

                var user = _context.Users.Where((User user) => user.Id == userId).First();

                var brainstormResponse = new BrainstormResponseDTO {
                    Id = newBrainstorm.Entity.Id,
                    Title = newBrainstorm.Entity.Title,
                    MaxWords = newBrainstorm.Entity.MaxWords,
                    Creator = user!.UserName
                };

                return brainstormResponse;
            } catch (Exception) {
                return Problem("Unknown Exception");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id) 
        {
            try 
            {
                var brainstorm = _context.Brainstorms
                    .Include(b => b.Words)
                    .Where((Brainstorm brainstorm) => brainstorm.Id == id)
                    .FirstOrDefault();

                if (brainstorm == null)
                    return NotFound("Brainstorm not found");

                // A User is only allowed to delete its own Brainstorms
                int userId = int.Parse(HttpContext.User.FindFirstValue("userId"));
                if (brainstorm.UserId != userId)
                    return Conflict("Only allowed to delete own Brainstorms");
                

                _context.Brainstorms.Remove(brainstorm);
                _context.SaveChanges();
                
                return Ok();
            }
            catch (Exception) 
            {
                return Problem("Unknown Exception");
            }
        }
    }
}