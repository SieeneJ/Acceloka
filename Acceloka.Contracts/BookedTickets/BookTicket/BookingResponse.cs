namespace Acceloka.Contracts.BookedTickets.BookTicket
{
    public class BookingResponse
    {
        public decimal PriceSummary {  get; set; }
        public List<BookedCategoryDetail> TicketPerCategories { get; set; } = new();
    }
}
