using Acceloka.Contracts.BookedTickets.GetBookedTicket;
using FluentValidation;

namespace Acceloka.Commons.Validators
{
    public class GetBookedTicketValidator : AbstractValidator<GetBookedTicketRequest>
    {
        public GetBookedTicketValidator()
        {
            RuleFor(t => t.BookedTicketId)
                .NotEmpty()
                .WithMessage("Ticket Id tidak boleh kosong");
        }  
    }
}
