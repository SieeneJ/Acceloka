using System;
using System.Collections.Generic;
using System.Text;
using Acceloka.Contracts.Users;
using Acceloka.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Commons.RequestHandlers.Users
{
    public class LoginUserHandler : IRequestHandler<UserLogin, int?>
    {
        private readonly AccelokaContext _db;
        private readonly PasswordHasher<User> _hasher = new();

        public LoginUserHandler(AccelokaContext db)
        {
            _db = db;
        }

        public async Task<int?> Handle(UserLogin request, CancellationToken cancellationToken)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Name == request.Username, cancellationToken);
            if (user == null) return null;

            var result = _hasher.VerifyHashedPassword(user, user.PasswordHashed, request.Password);
            return result == PasswordVerificationResult.Failed ? null : user.Id;
        }
    }
}
