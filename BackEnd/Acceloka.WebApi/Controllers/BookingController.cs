using Acceloka.Contracts.BookedTickets.BookTicket;
using Acceloka.Contracts.BookedTickets.DeleteBookedTicket;
using Acceloka.Contracts.BookedTickets.GetBookedTicket;
using Acceloka.Contracts.BookedTickets.UpdateBookedTicket;
using MediatR;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Acceloka.WebApi.Controllers
{
    [Route("api/v1")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IMediator _mediator;
        public BookingController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("book-ticket")]
        public async Task<IActionResult> BookedTicket([FromBody] BookTicketRequest request)
        {
            var datas = await _mediator.Send(request);
            return Ok(datas);
        }

        [HttpGet("get-booked-ticket/{BookedTicketId}")]
        public async Task<IActionResult> GetBookedTicket([FromRoute] Guid bookedTicketId)
        {
            var datas = await _mediator.Send(new GetBookedTicketRequest(bookedTicketId));
            return Ok(datas);
        }

        [HttpDelete("revoke-ticket/{BookedTicketId}/{KodeTicket}/{Qty}")]
        public async Task<IActionResult> DeleteBookedTicket(Guid bookedTicketId, string kodeTicket, int qty)
        {
            var datas = await _mediator.Send(new DeleteBookedRequest()
            {
                BookedTicketId = bookedTicketId,
                KodeTicket = kodeTicket,
                Qty = qty
            });
            return Ok(datas);
        }

        [HttpPut("edit-booked-ticket/{BookedTicketId}")]
        public async Task<IActionResult> UpdateBookedTicket(Guid bookedTicketId, [FromBody] UpdateBookedRequest request)
        {
            request.BookedTicketId = bookedTicketId;
            var datas = await _mediator.Send(request);
            return Ok(datas);
        }
            
    }
}
