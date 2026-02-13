namespace Acceloka.Contracts.BookedTickets.GetBookedTicket
{
    public class GetBookedDetail
    {
        public string TicketCode { get; set; } = null!;
        public string TicketName { get; set; } = null!;
        public DateTime EventDate { get; set; }
        public int Quantity { get; set; }
    }
}