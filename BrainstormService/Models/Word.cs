using System;
using System.Collections.Generic;

namespace BrainstormService.Models;

public partial class Word
{
    public int Id { get; set; }

    public string Value { get; set; } = null!;

    public int Occurrence { get; set; }

    public string BrainstormId { get; set; } = null!;

    public string Color { get; set; } = null!;

    public virtual Brainstorm Brainstorm { get; set; } = null!;
}
