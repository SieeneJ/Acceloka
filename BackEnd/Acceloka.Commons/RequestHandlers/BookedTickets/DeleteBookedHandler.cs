using Acceloka.Contracts.BookedTickets.DeleteBookedTicket;
using Acceloka.Entities;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Commons.RequestHandlers.BookedTickets
{
    public class DeleteBookedHandler : IRequestHandler<DeleteBookedRequest, DeleteBookedResponse>
    {
        private readonly AccelokaContext _db;
        public DeleteBookedHandler(AccelokaContext db)
        {
            _db = db;
        }
        public async Task<DeleteBookedResponse> Handle(DeleteBookedRequest request, CancellationToken cancellationToken)
        {
            var bookedTicket = await _db.BookedTickets
                .Include(t => t.TicketCodeNavigation)
                    .ThenInclude(t => t.Category)
                .Where(t => t.BookedTicketId == request.BookedTicketId)
                .ToListAsync(cancellationToken);

            var failures = new List<ValidationFailure>();

            if (!bookedTicket.Any())
            {
                throw new KeyNotFoundException("Booked Id tidak terdaftar");
            }

            var ticket = bookedTicket.FirstOrDefault(t => t.TicketCode == request.KodeTicket);

            if(ticket == null)
            {
                failures.Add(new ValidationFailure(request.KodeTicket, "Kode ticket tidak terdaftar"));
            }
            else
            {
                if (request.Qty > ticket.Quantity)
                {
                    failures.Add(new ValidationFailure(ticket.TicketCode, "Quantity tiket yang di booking kurang"));
                }
            }
            
            if (failures.Any())
            {
                throw new ValidationException(failures);
            }

            ticket.Quantity -= request.Qty;

            ticket.TicketCodeNavigation.Quota += request.Qty;

            if (ticket.Quantity == 0)
            {
                _db.BookedTickets.Remove(ticket);
            }

            await _db.SaveChangesAsync(cancellationToken);

            return new DeleteBookedResponse
            {
                TicketCode = ticket.TicketCode,
                TicketName = ticket.TicketCodeNavigation.TicketName,
                Quantity = ticket.Quantity,
                CategoryName = ticket.TicketCodeNavigation.Category.CategoryName,
            };
        }
    }
}
