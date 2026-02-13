using MediatR;

//What user input

namespace Acceloka.Contracts.Tickets
{
    public class GetTicketRequest :IRequest<GetTicketListResponse>
    {
        public string? CategoryName { get; set; }
        public string? TicketCode { get; set; }
        public string? TicketName { get;set; }
        public decimal? MaxPrice { get; set; }
        public DateTime? DateEventMin { get; set; }
        public DateTime? DateEventMax { get; set; }
        public string? OrderBy { get; set; }
        public string? OrderState { get; set; }
        public int PageNumber { get; set; } = 1;

    }
}
