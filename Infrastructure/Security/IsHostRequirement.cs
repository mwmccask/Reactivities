using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement { }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor httContextAccessor;
        private readonly DataContext context;
        public IsHostRequirementHandler(IHttpContextAccessor httContextAccessor, DataContext context)
        {
            this.context = context;
            this.httContextAccessor = httContextAccessor;

        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var currentUserName = this.httContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var activityId = Guid.Parse(this.httContextAccessor.HttpContext.Request.RouteValues.SingleOrDefault(kv => kv.Key == "id").Value.ToString());

            var activity = this.context.Activities.Find(activityId);

            var host = activity.UserActivities.FirstOrDefault(a => a.IsHost);

            if (host?.AppUser?.UserName == currentUserName)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}