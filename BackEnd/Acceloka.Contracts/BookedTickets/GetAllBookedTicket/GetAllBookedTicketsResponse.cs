using System;
using System.Collections.Generic;
using System.Text;
using Acceloka.Contracts.BookedTickets.GetBookedTicket;

namespace Acceloka.Contracts.BookedTickets.GetAllBookedTicket
{
    public class GetAllBookedTicketsResponse
    {
        public Guid BookedTicketId { get; set; }

        public List<GetBookedTicketResponse> Categories { get; set; } = new();
    }
}
