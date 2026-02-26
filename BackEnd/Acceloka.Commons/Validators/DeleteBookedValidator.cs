using Acceloka.Contracts.BookedTickets.DeleteBookedTicket;
using FluentValidation;

namespace Acceloka.Commons.Validators
{
    public class DeleteBookedValidator : AbstractValidator<DeleteBookedRequest>
    {
        public DeleteBookedValidator()
        {
            RuleFor(d => d.BookedTicketId)
                .NotEmpty()
                .WithMessage("Booking Id tidak boleh kosong");
            RuleFor(d => d.KodeTicket)
                .NotEmpty()
                .WithMessage("Kode Ticket diperlukan");
            RuleFor(d => d.Qty)
                .GreaterThan(0)
                .WithMessage("Quantity yang ingin di hapus harus lebih dari 0");
        }
    }
}
