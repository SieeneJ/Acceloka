using Acceloka.Contracts.Users;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v1")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegistration request)
    {
        var response = await _mediator.Send(request);
        if (response)
        {
            return Ok("Registered!");
        }

        return BadRequest("User already exists.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLogin request)
    {
        var userId = await _mediator.Send(request);

        if (userId != null)
        {
            return Ok(new { UserId = userId });
        }

        return Unauthorized("Invalid credentials.");
    }
}