namespace Acceloka.Contracts.BookedTickets.BookTicket
{
    public class BookedTicketDetail
    {
        public string TicketCode { get; set; } = null!;
        public string TicketName { get; set; } = null!;
        public decimal Price { get; set; }
    }
}
