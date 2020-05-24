using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly IJWTGenerator jwtGenerator;
            private readonly IUserAccessor userAccessor;

            public Handler(UserManager<AppUser> userManager, IJWTGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                this.userManager = userManager;
                this.jwtGenerator = jwtGenerator;
                this.userAccessor = userAccessor;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await this.userManager.FindByNameAsync(this.userAccessor.GetCurrentUserName());

                return new User
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = this.jwtGenerator.CreateToken(user),
                    Username = user.UserName
                };
            }
        }
        
    }
}