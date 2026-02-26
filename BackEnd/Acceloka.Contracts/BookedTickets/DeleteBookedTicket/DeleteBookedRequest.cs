using MediatR;

namespace Acceloka.Contracts.BookedTickets.DeleteBookedTicket
{
    public class DeleteBookedRequest :IRequest<DeleteBookedResponse>
    {
        public Guid BookedTicketId { get; set; }
        public string KodeTicket { get; set; } = null!;
        public int Qty { get; set; }
    }
}
