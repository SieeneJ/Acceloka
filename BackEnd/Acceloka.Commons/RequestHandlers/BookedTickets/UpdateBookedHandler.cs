using Acceloka.Contracts.BookedTickets.UpdateBookedTicket;
using Acceloka.Entities;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Commons.RequestHandlers.BookedTickets
{
    public class UpdateBookedHandler : IRequestHandler<UpdateBookedRequest, List<UpdateBookedRespond>>
    {
        public readonly AccelokaContext _db;
        public UpdateBookedHandler(AccelokaContext db)
        {
            _db = db;
        }
        public async Task<List<UpdateBookedRespond>> Handle(UpdateBookedRequest request, CancellationToken cancellationToken)
        {

            var bookedTicket = await _db.BookedTickets
                .Include(t => t.TicketCodeNavigation)
                    .ThenInclude(t => t.Category)
                .Where(t => t.BookedTicketId == request.BookedTicketId)
                .ToListAsync(cancellationToken);

            var failures = new List<ValidationFailure>();

            var result = new List<UpdateBookedRespond>();

            if (!bookedTicket.Any())
            {
                throw new KeyNotFoundException("Booked Id tidak terdaftar");
            }

            foreach(var item in request.Updating)
            {
                var ticket = bookedTicket.FirstOrDefault(t => t.TicketCode == item.TicketCode);

                if (ticket == null)
                {
                    failures.Add(new ValidationFailure(item.TicketCode, "Kode tiket tidak terdaftar"));
                    continue;
                }

                int delta = item.Quantity - ticket.Quantity;

                if (delta > 0 && ticket.TicketCodeNavigation.Quota < delta)
                {
                    failures.Add(new ValidationFailure(item.TicketCode, $"Kuota tidak mencukupi untuk menambah {delta} tiket. Sisa kuota master: {ticket.TicketCodeNavigation.Quota}"));
                    continue;
                }

                ticket.TicketCodeNavigation.Quota -= delta;

                ticket.Quantity = item.Quantity;

                ticket.TicketCodeNavigation.Quota -= item.Quantity;

                result.Add(new UpdateBookedRespond
                {
                    TicketCode = ticket.TicketCode,
                    TicketName = ticket.TicketCodeNavigation.TicketName,
                    Quantity = ticket.Quantity,
                    CategoryName = ticket.TicketCodeNavigation.Category.CategoryName
                });
            }

            if (failures.Any())
            {
                throw new ValidationException(failures);
            }

            await _db.SaveChangesAsync(cancellationToken);

            return result;
        }
    }
}
