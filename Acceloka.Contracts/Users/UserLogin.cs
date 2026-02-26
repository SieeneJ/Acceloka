using MediatR;

namespace Acceloka.Contracts.Users
{
    public class UserLogin : IRequest<int?>
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
