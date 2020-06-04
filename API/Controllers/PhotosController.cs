using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        public PhotosController(IMediator mediator): base(mediator) { }

        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm] Add.Command command, CancellationToken cancellationToken)
        {
            return await Mediator.Send(command, cancellationToken);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id, CancellationToken cancellationToken)
        {
            return await Mediator.Send(new Delete.Command { Id = id }, cancellationToken);
        }

        [HttpPost("{id}/setmain")]
        public async Task<ActionResult<Unit>> SetMain(string id, CancellationToken cancellationToken)
        {
            return await Mediator.Send(new SetMain.Command { Id = id }, cancellationToken);
        }
    }
}