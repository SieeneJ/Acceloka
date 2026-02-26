namespace Acceloka.Contracts.BookedTickets.GetBookedTicket
{
    public class GetBookedTicketResponse
    {
        public int QtyPerCategory { get; set; }
        public string CategoryName { get; set; } = null!;
        public List<GetBookedDetail> Tickets { get; set; } = new();
    }
}
