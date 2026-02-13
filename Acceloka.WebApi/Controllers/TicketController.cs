using Acceloka.Contracts.Tickets;
using MediatR;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Acceloka.WebApi.Controllers
{
    [Route("api/v1")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TicketController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        // GET: api/v1/get-available-ticket
        [HttpGet("get-available-ticket")]
        public async Task<IActionResult> GetTicket([FromQuery] GetTicketRequest request)
        {
            var data = await _mediator.Send(request);
            return Ok(data);
        }
    }
}
