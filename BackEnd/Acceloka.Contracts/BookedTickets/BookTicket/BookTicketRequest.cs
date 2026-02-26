using MediatR;

namespace Acceloka.Contracts.BookedTickets.BookTicket
{
    public class BookTicketRequest : IRequest<BookingResponse>
    {
        public List<TicketBookingItem> Bookings { get; set; } = new();
    }
}
