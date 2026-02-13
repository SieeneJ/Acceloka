using System.Text.Json.Serialization;
using MediatR;

namespace Acceloka.Contracts.BookedTickets.UpdateBookedTicket
{
    public class UpdateBookedRequest : IRequest<List<UpdateBookedRespond>>
    {
        [JsonIgnore]
        public Guid BookedTicketId { get; set; }
        public List<UpdateBookedDetail> Updating { get; set; } = new();
    }
}
