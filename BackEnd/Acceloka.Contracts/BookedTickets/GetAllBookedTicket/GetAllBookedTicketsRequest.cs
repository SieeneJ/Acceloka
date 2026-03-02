using MediatR;

namespace Acceloka.Contracts.BookedTickets.GetAllBookedTicket
{
    public class GetAllBookedTicketsRequest :IRequest<List<GetAllBookedTicketsResponse>>
    {
        public int UserId { get; set; }
    }
}
