using Acceloka.Contracts.Users;
using Acceloka.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Commons.RequestHandlers.Users
{
    public class RegisterUserHandler : IRequestHandler<UserRegistration, bool>
    {
        private readonly AccelokaContext _db;
        private readonly PasswordHasher<User> _hasher = new ();

        public RegisterUserHandler(AccelokaContext db)
        {
            _db = db;
        }

        public async Task<bool> Handle(UserRegistration request, CancellationToken cancellationToken)
        {
            if (await _db.Users.AnyAsync(u => u.Name == request.Username || u.Email == request.Email, cancellationToken))
            {
                return false;
            }

            var user = new User
            {
                Name = request.Username,
                Email = request.Email,
                FullName = request.FullName,
                CreatedAt = DateTime.UtcNow
            };

            user.PasswordHashed = _hasher.HashPassword(user, request.Password);

            _db.Users.Add(user);
            await _db.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
