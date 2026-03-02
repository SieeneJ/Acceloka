using Acceloka.Contracts.BookedTickets.GetAllBookedTicket;
using Acceloka.Contracts.BookedTickets.GetBookedTicket;
using Acceloka.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Commons.RequestHandlers.BookedTickets
{
    public class GetAllBookedTicketsHandler : IRequestHandler<GetAllBookedTicketsRequest, List<GetAllBookedTicketsResponse>>
    {
        private readonly AccelokaContext _db;

        public GetAllBookedTicketsHandler(AccelokaContext db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<List<GetAllBookedTicketsResponse>> Handle(GetAllBookedTicketsRequest request, CancellationToken cancellationToken)
        {
            var allBookedTickets = await _db.BookedTickets
                .Include(t => t.TicketCodeNavigation)
                    .ThenInclude(t => t.Category)
                .Where(t => t.UserId == request.UserId)
                .ToListAsync(cancellationToken);

            if (!allBookedTickets.Any())
            {
                return new List<GetAllBookedTicketsResponse>();
            }

            var result = allBookedTickets
                .GroupBy(x => x.BookedTicketId)
                .Select(bookingGroup => new GetAllBookedTicketsResponse
                {
                    BookedTicketId = bookingGroup.Key,
                    Categories = bookingGroup
                        .GroupBy(c => c.TicketCodeNavigation.Category.CategoryName)
                        .Select(catGroup => new GetBookedTicketResponse
                        {
                            CategoryName = catGroup.Key,
                            QtyPerCategory = catGroup.Sum(q => q.Quantity),
                            Tickets = catGroup.Select(t => new GetBookedDetail
                            {
                                TicketCode = t.TicketCode,
                                TicketName = t.TicketCodeNavigation.TicketName,
                                EventDate = t.TicketCodeNavigation.EventDate,
                                Quantity = t.Quantity
                            }).ToList()
                        }).ToList()
                }).ToList();

            return result;
        }
    }
}