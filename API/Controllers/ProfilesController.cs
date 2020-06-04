using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ProfilesController : BaseController
    {
        public ProfilesController(IMediator mediator): base(mediator) { }
        
        [HttpGet("{username}")]
        public async Task<ActionResult<UserProfile>> Get(string username, CancellationToken cancellationToken)
        {
            return await Mediator.Send(new Details.Query { Username = username }, cancellationToken);
        }
    }
}