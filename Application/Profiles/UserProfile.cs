using Domain;
using System.Collections.Generic;

namespace Application.Profiles
{
    public class UserProfile
    {
        public string Bio { get; set; }
        
        public string DisplayName { get; set; }

        public string Image { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public string Username { get; set; }
    }
}