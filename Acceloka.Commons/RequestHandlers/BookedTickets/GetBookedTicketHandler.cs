using Acceloka.Contracts.BookedTickets.GetBookedTicket;
using Acceloka.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Commons.RequestHandlers.BookedTickets
{

    public class GetBookedTicketHandler : IRequestHandler<GetBookedTicketRequest, List<GetBookedTicketResponse>>
    {
        private readonly AccelokaContext _db;
        public GetBookedTicketHandler(AccelokaContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }
        public async Task<List<GetBookedTicketResponse>> Handle(GetBookedTicketRequest request, CancellationToken cancellationToken)
        {
            var bookedTickets = await _db.BookedTickets
                .Include(t => t.TicketCodeNavigation)
                    .ThenInclude(t => t.Category)
                .Where(t => t.BookedTicketId == request.BookedTicketId)
                .ToListAsync(cancellationToken);

            if (!bookedTickets.Any())
            {
                throw new KeyNotFoundException("Booked Id tidak terdaftar");
            }

            var grouped = bookedTickets
            .GroupBy(x => x.TicketCodeNavigation.Category.CategoryName)
            .Select(g => new GetBookedTicketResponse
            {
                QtyPerCategory = g.Sum(x => x.Quantity),
                CategoryName = g.Key,
                Tickets = g.Select(x => new GetBookedDetail
                {
                    TicketCode = x.TicketCode,
                    TicketName = x.TicketCodeNavigation.TicketName,
                    EventDate = x.TicketCodeNavigation.EventDate,
                    Quantity = x.Quantity
                }).ToList()
            }).ToList();

            return grouped;
        }
    }
}
