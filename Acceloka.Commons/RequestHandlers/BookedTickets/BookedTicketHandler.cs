using Acceloka.Contracts.BookedTickets.BookTicket;
using Acceloka.Entities;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Commons.RequestHandlers.BookedTickets
{
    public class BookedTicketHandler : IRequestHandler<BookTicketRequest, BookingResponse>
    {
        public readonly AccelokaContext _db;
        public BookedTicketHandler(AccelokaContext db)
        {
            _db = db;
        }
        public async Task<BookingResponse> Handle(BookTicketRequest request, CancellationToken cancellationToken)
        {
            if (request.Bookings == null || !request.Bookings.Any())
                throw new ValidationException("Tidak ada ticket yang dikirim");

            var ticketCodes = request.Bookings
                .Select(x => x.TicketCode)
                .Where(x => !string.IsNullOrEmpty(x))
                .Distinct()
                .ToList();

            var tickets = await _db.Tickets
                .Include(t => t.Category)
                .Where(t => ticketCodes.Contains(t.TicketCode))
                .ToListAsync(cancellationToken);

            var failures = new List<ValidationFailure>();

            var bookingGroupId = Guid.NewGuid();

            foreach (var item in request.Bookings)
            {
                var ticket = tickets.FirstOrDefault(t => t.TicketCode == item.TicketCode);

                if (ticket == null)
                {
                    failures.Add(new ValidationFailure(item.TicketCode,  "Kode tiket tidak terdaftar" ));
                    continue;
                }
                else
                {
                    if (ticket.Quota <= 0)
                    {
                        failures.Add(new ValidationFailure(item.TicketCode,  "Tiket sudah habis" ));
                    }
                    if(ticket.Quota < item.Quantity)
                    {
                        failures.Add(new ValidationFailure(item.TicketCode,  "Quantity tiket tidak cukup" ));
                    }
                    if (ticket.EventDate <= DateTime.UtcNow)
                    {
                        failures.Add(new ValidationFailure(item.TicketCode, "Event sudah selesai" ));
                    }
                }
            }

            if (failures.Any())
            {
                throw new ValidationException(failures);
            }

            foreach (var item in request.Bookings)
            {
                var ticket = tickets
                    .First(t => t.TicketCode == item.TicketCode);

                ticket.Quota -= item.Quantity;

                _db.BookedTickets.Add(new BookedTicket
                {
                    BookedTicketId = bookingGroupId,
                    TicketCode = ticket.TicketCode,
                    Quantity = item.Quantity,
                });
            }

            var result = await _db.SaveChangesAsync(cancellationToken);

            var grouped = tickets
                .GroupBy(t => t.Category.CategoryName)
                .Select(g => new BookedCategoryDetail
                {
                    CategoryName = g.Key,
                    SummaryPrice = g.Sum(t => t.Price * request.Bookings.First(b => b.TicketCode == t.TicketCode).Quantity),
                    Tickets = g.Select(t => new BookedTicketDetail
                    {
                        TicketCode = t.TicketCode,
                        TicketName = t.TicketName,
                        Price = t.Price * request.Bookings.First(b => b.TicketCode == t.TicketCode).Quantity
                    }).ToList()
                }).ToList();

            var totalPrice = grouped.Sum(x => x.SummaryPrice);

            return new BookingResponse
            {
                PriceSummary = totalPrice,
                TicketPerCategories = grouped
            };
            
        }
    }
}
