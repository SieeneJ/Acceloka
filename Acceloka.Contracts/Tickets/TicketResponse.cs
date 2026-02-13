using System;
using System.Collections.Generic;
using System.Text;

// what user view

namespace Acceloka.Contracts.Tickets
{
    public class TicketResponse
    {
        public DateTime EventDate { get; set; }
        public int Quota { get; set; }
        public string TicketCode { get; set; } = null!;
        public string TicketName { get; set; } = null!;
        public string CategoryName { get; set; } = null!;
        public decimal Price { get; set; }


    }
}
