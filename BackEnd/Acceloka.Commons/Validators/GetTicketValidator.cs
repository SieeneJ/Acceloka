using System;
using System.Collections.Generic;
using System.Text;
using Acceloka.Contracts.Tickets;
using FluentValidation;

namespace Acceloka.Commons.Validators
{
    public class GetTicketValidator : AbstractValidator<GetTicketRequest>
    {
        public GetTicketValidator()
        {
            RuleFor(t => t.MaxPrice)
                .GreaterThanOrEqualTo(0)
                .When(t => t.MaxPrice.HasValue)
                .WithMessage("Max Price harus lebih dari 0");
            RuleFor(t => t.DateEventMin)
                .LessThanOrEqualTo(t => t.DateEventMax)
                .When(t => t.DateEventMin.HasValue && t.DateEventMax.HasValue)
                .WithMessage("Tanggal tiket sudah lewat");              
        }
    }
}
