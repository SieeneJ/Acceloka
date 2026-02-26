namespace Acceloka.Contracts.BookedTickets.BookTicket
{
    public class BookedCategoryDetail
    {
        public string CategoryName { get; set; } = null!;
        public decimal SummaryPrice { get; set; }
        public List<BookedTicketDetail> Tickets
        { get; set; } = new();
    }
}
