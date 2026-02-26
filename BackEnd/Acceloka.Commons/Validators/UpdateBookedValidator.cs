using Acceloka.Contracts.BookedTickets.UpdateBookedTicket;
using FluentValidation;

namespace Acceloka.Commons.Validators
{
    public class UpdateBookedValidator : AbstractValidator<UpdateBookedRequest>
    {
        public UpdateBookedValidator()
        {
            RuleFor(u => u.BookedTicketId)
                .NotEmpty()
                .WithMessage("Kode tiket booking tidak boleh kosong");
            RuleForEach(u => u.Updating).ChildRules(update =>
            {
                update.RuleFor(t => t.TicketCode)
                    .NotEmpty()
                    .WithMessage("Kode tiket tidak boleh kosong");
                update.RuleFor(t => t.Quantity)
                    .GreaterThan(0)
                    .OverridePropertyName("Quantity")
                    .WithMessage("Quantity minimal 1");
            });
        }
    }
}
