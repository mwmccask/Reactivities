using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseController: ControllerBase
    {
        private readonly IMediator mediator;
        protected IMediator Mediator { get => this.mediator; }
        
        public BaseController(IMediator mediator)
        {
            this.mediator = mediator;
        }
    }
}