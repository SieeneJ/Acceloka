using MediatR;

namespace Acceloka.Contracts.BookedTickets.BookTicket
{
    public class BookTicketRequest : IRequest<BookingResponse>
    {
        public int UserId { get; set; }
        public List<TicketBookingItem> Bookings { get; set; } = new();
    }
}
