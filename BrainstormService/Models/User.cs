using System;
using System.Collections.Generic;

namespace BrainstormService.Models;

public partial class User
{
    public int Id { get; set; }

    public string UserName { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public virtual ICollection<Brainstorm> Brainstorms { get; set; } = new List<Brainstorm>();
}
