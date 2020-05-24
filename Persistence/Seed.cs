using Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        Email = "bob@test.com",
                        UserName = "Bob"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        Email = "tom@test.com",
                        UserName = "Tom"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        Email = "jane@test.com",
                        UserName = "Jane"
                    }
                };
                foreach(var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Category = "drinks",
                        City = "London",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Title = "Past Activity 1",
                        Venue = "Pub",
                    },
                    new Activity
                    {
                        Category = "culture",
                        City = "Paris",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Title = "Past Activity 2",
                        Venue = "Louvre",
                    },
                    new Activity
                    {
                        Category = "culture",
                        City = "London",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Title = "Future Activity 1",
                        Venue = "Natural History Museum",
                    },
                    new Activity
                    {
                        Category = "music",
                        City = "London",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Title = "Future Activity 2",
                        Venue = "O2 Arena",
                    },
                    new Activity
                    {
                        Category = "drinks",
                        City = "London",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Title = "Future Activity 3",
                        Venue = "Another pub",
                    },
                    new Activity
                    {
                        Category = "drinks",
                        City = "London",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Title = "Future Activity 4",
                        Venue = "Yet another pub",
                    },
                    new Activity
                    {
                        Category = "drinks",
                        City = "London",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Title = "Future Activity 5",
                        Venue = "Just another pub",
                    },
                    new Activity
                    {
                        Category = "music",
                        City = "London",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Title = "Future Activity 6",
                        Venue = "Roundhouse Camden",
                    },
                    new Activity
                    {
                        Category = "travel",
                        City = "London",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 2 months ago",
                        Title = "Future Activity 7",
                        Venue = "Somewhere on the Thames",
                    },
                    new Activity
                    {
                        Category = "film",
                        City = "London",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Title = "Future Activity 8",
                        Venue = "Cinema",
                    }
                };

                context.Activities.AddRange(activities);
                context.SaveChanges();
            }
        }
    }
}