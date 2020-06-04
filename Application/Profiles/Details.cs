using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<UserProfile>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserProfile>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<UserProfile> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await this.context.Users.SingleOrDefaultAsync(u => u.UserName == request.Username, cancellationToken);

                var result = this.mapper.Map<UserProfile>(user);

                return result;
            }
        }
        
    }
}