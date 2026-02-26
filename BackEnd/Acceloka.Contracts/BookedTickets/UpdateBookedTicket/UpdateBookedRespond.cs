namespace Acceloka.Contracts.BookedTickets.UpdateBookedTicket
{
    public class UpdateBookedRespond
    {
        public string TicketCode { get; set; } = null!;
        public string TicketName { get; set; } = null!;
        public int Quantity { get; set; }
        public string CategoryName { get; set; } = null!;
    }
}
