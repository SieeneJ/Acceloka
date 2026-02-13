using MediatR;

namespace Acceloka.Contracts.BookedTickets.GetBookedTicket
{
    public class GetBookedTicketRequest : IRequest<List<GetBookedTicketResponse>>
    {
        public Guid BookedTicketId { get; set; }
        public GetBookedTicketRequest(Guid bookedTicketId)
        {
            BookedTicketId = bookedTicketId;
        }
    }
}
