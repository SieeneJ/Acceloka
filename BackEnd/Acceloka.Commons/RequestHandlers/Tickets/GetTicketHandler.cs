using Acceloka.Contracts.Tickets;
using Acceloka.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Commons.RequestHandlers.Tickets
{
    public class GetTicketHandler : IRequestHandler<GetTicketRequest, GetTicketListResponse>
    {
        private readonly AccelokaContext _db;

        public GetTicketHandler (AccelokaContext db)
        {
            _db = db;
        }

        public async Task<GetTicketListResponse> Handle(GetTicketRequest request, CancellationToken cancellationToken)
        {
            var query = _db.Tickets
                .Include(t => t.Category)
                .AsQueryable();

            query = GetTicketFilter(request, query);

            var totalTickets = await query.CountAsync(cancellationToken);

            int pageSize = 10;
            int pageNumber = request.PageNumber <= 0 ? 1 : request.PageNumber;

            var tickets = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new TicketResponse
                {
                    EventDate = t.EventDate,
                    Quota = t.Quota,
                    TicketCode = t.TicketCode,
                    TicketName = t.TicketName,
                    CategoryName = t.Category.CategoryName,
                    Price = t.Price
                })
                .ToListAsync(cancellationToken);

            return new GetTicketListResponse
            {
                Tickets = tickets,
                TotalTickets = totalTickets
            };
        }

        private static IQueryable<Ticket> GetTicketFilter(GetTicketRequest request, IQueryable<Ticket> query)
        {
            if (!string.IsNullOrEmpty(request.CategoryName))
            {
                query = query.Where(t => t.Category.CategoryName.Contains(request.CategoryName));
            }
            if (!string.IsNullOrEmpty(request.TicketCode))
            {
                query = query.Where(t => t.TicketCode.Contains(request.TicketCode));
            }
            if (!string.IsNullOrEmpty(request.TicketName))
            {
                query = query.Where(t => t.TicketName.Contains(request.TicketName));
            }
            if (request.MaxPrice.HasValue)
            {
                query = query.Where(t => t.Price <= request.MaxPrice.Value);
            }
            if (request.DateEventMin.HasValue)
            {
                query = query.Where(t => t.EventDate >= request.DateEventMin.Value);
            }
            if (request.DateEventMax.HasValue)
            {
                query = query.Where(t => t.EventDate <= request.DateEventMax.Value);
            }
            if (!string.IsNullOrEmpty(request.OrderBy))
            {
                bool isAscending = request.OrderState?.ToLower() == "asc";

                query = request.OrderBy.ToLower() switch
                {
                    "categoryname" => isAscending ? query.OrderBy(t => t.Category.CategoryName) : query.OrderByDescending(t => t.Category.CategoryName),
                    "ticketcode" => isAscending ? query.OrderBy(t => t.TicketCode) : query.OrderByDescending(t => t.TicketCode),
                    "ticketname" => isAscending ? query.OrderBy(t => t.TicketName) : query.OrderByDescending(t => t.TicketName),
                    "price" => isAscending ? query.OrderBy(t => t.Price) : query.OrderByDescending(t => t.Price),
                    "quota" => isAscending ? query.OrderBy(t => t.Quota) : query.OrderByDescending(t => t.Quota),
                    "eventdate" => isAscending ? query.OrderBy(t => t.EventDate) : query.OrderByDescending(t => t.EventDate),
                    _ => query.OrderBy(t => t.TicketCode)
                };
            }
            else
            {
                query = query.OrderBy(t => t.TicketCode);
            }

            return query;
        }
    }
}
