using System;
using System.Collections.Generic;

namespace BrainstormService.Models;

public partial class Brainstorm
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string Title { get; set; } = null!;

    public int MaxWords { get; set; }

    public DateTime CreatedAt { get; set; }

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual ICollection<Word> Words { get; set; } = new List<Word>();
}
