using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Photo>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;
            private readonly IPhotoAccessor photoAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
                this.photoAccessor = photoAccessor;
            }

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await this.context.Users.SingleOrDefaultAsync(u => u.UserName == this.userAccessor.GetCurrentUserName(), cancellationToken);
                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { User = "Not authorized" });
                }

                var uploadResult = await this.photoAccessor.AddPhotoAsync(request.File);

                var photo = new Photo
                {
                    Id = uploadResult.PublicId,
                    Url = uploadResult.Url
                };

                if (!user.Photos.Any(p => p.IsMain))
                {
                    photo.IsMain = true;
                }

                user.Photos.Add(photo);

                var success = await this.context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return photo;

                throw new Exception("Problem saving changes");
            }
        }        
    }
}