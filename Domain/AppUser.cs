using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string Bio { get; set; }

        public string DisplayName { get; set; }

        public virtual ICollection<Photo> Photos { get; set; }

        public virtual ICollection<UserActivity> UserActivities { get; set; }
    }
}