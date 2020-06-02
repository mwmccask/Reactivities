using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {
        public ActivitiesController(IMediator mediator): base(mediator) { }

        [HttpGet]
        public async Task<ActionResult<List<ActivityDTO>>> List(CancellationToken cancellationToken)
        {
            return await Mediator.Send(new List.Query(), cancellationToken);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDTO>> Details(Guid id, CancellationToken cancellationToken)
        {
            return await Mediator.Send(new Details.Query { Id = id }, cancellationToken);
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command, CancellationToken cancellationToken)
        {
            return await Mediator.Send(command, cancellationToken);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command, CancellationToken cancellationToken)
        {
            command.Id = id;
            return await Mediator.Send(command, cancellationToken);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Delete(Guid id, CancellationToken cancellationToken)
        {
            return await Mediator.Send(new Delete.Command { Id = id }, cancellationToken);
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend(Guid id, CancellationToken cancellationToken)
        {
            return await Mediator.Send(new Attend.Command { Id = id }, cancellationToken);
        }

        [HttpDelete("{id}/attend")]
        public async Task<ActionResult<Unit>> Unattend(Guid id, CancellationToken cancellationToken)
        {
            return await Mediator.Send(new Unattend.Command { Id = id }, cancellationToken);
        }
    }
}