using MediatR;

namespace Acceloka.Contracts.Users
{
    public class UserRegistration : IRequest<bool>
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string FullName { get; set; } = null!;
    }
}
