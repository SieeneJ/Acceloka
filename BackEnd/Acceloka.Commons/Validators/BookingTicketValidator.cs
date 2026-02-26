using Acceloka.Contracts.BookedTickets.BookTicket;
using FluentValidation;

namespace Acceloka.Commons.Validators
{
    public class BookingTicketValidator : AbstractValidator<BookTicketRequest>
    {
        public BookingTicketValidator()
        {
            RuleForEach(b => b.Bookings).ChildRules(booking =>
            {
                booking
                    .RuleFor(t => t.TicketCode)
                    .NotEmpty()
                    .WithMessage("Kode Tiket di perlukan.");
                booking
                    .RuleFor(t => t.Quantity)
                    .GreaterThan(0)
                    .WithMessage("Quantity yang ingin di booking harus lebih dari 0");
            });
        }
    }
}
