namespace Acceloka.Contracts.BookedTickets.DeleteBookedTicket
{
    public class DeleteBookedResponse
    {
        public string TicketCode { get; set; } = null!;
        public string TicketName { get; set; } = null!;
        public int Quantity { get; set; }
        public string CategoryName { get; set; } = null!;
    }
}
