using System;
using System.Collections.Generic;

namespace Acceloka.Entities;

public partial class BookedTicket
{
    public int Id { get; set; }

    public Guid BookedTicketId { get; set; }

    public string TicketCode { get; set; } = null!;

    public int Quantity { get; set; }

    public int UserId { get; set; }

    public virtual User UserNavigation { get; set; } = null!;

    public virtual Ticket TicketCodeNavigation { get; set; } = null!;
}
