using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        Email = "bob@test.com",
                        Id = "a",
                        UserName = "bob"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        Email = "jane@test.com",
                        Id = "b",
                        UserName = "jane"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        Email = "tom@test.com",
                        Id = "c",
                        UserName = "tom"
                    },
                };

                foreach (var user in users)
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
                        Category = "Drinks",
                        City = "London",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Title = "Past Activity 1",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                DateJoined = DateTime.Now.AddMonths(-2),
                                IsHost = true
                            }
                        },
                        Venue = "Pub"
                    },
                    new Activity
                    {
                        Category = "Culture",
                        City = "Paris",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Title = "Past Activity 2",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                DateJoined = DateTime.Now.AddMonths(-1),
                                IsHost = true
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                DateJoined = DateTime.Now.AddMonths(-1),
                                IsHost = false
                            },
                        },
                        Venue = "The Louvre"
                    },
                    new Activity
                    {
                        Category = "Music",
                        City = "London",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Title = "Future Activity 1",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                DateJoined = DateTime.Now.AddMonths(1),
                                IsHost = true
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                DateJoined = DateTime.Now.AddMonths(1),
                                IsHost = false
                            },
                        },
                        Venue = "Wembly Stadium"
                    },
                    new Activity
                    {
                        Category = "Food",
                        City = "London",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Title = "Future Activity 2",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "c",
                                DateJoined = DateTime.Now.AddMonths(2),
                                IsHost = true
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                DateJoined = DateTime.Now.AddMonths(2),
                                IsHost = false
                            },
                        },
                        Venue = "Jamies Italian"
                    },
                    new Activity
                    {
                        Category = "Drinks",
                        City = "London",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Title = "Future Activity 3",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                DateJoined = DateTime.Now.AddMonths(3),
                                IsHost = true
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                DateJoined = DateTime.Now.AddMonths(3),
                                IsHost = false
                            },
                        },
                        Venue = "Pub"
                    },
                    new Activity
                    {
                        Category = "Culture",
                        City = "London",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Title = "Future Activity 4",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                DateJoined = DateTime.Now.AddMonths(4),
                                IsHost = true
                            }
                        },
                        Venue = "British Museum"
                    },
                    new Activity
                    {
                        Category = "Drinks",
                        City = "London",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Title = "Future Activity 5",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "c",
                                DateJoined = DateTime.Now.AddMonths(5),
                                IsHost = true
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                DateJoined = DateTime.Now.AddMonths(5),
                                IsHost = false
                            },
                        },
                        Venue = "Punch and Judy"
                    },
                    new Activity
                    {
                        Category = "Music",
                        City = "London",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Title = "Future Activity 6",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                DateJoined = DateTime.Now.AddMonths(6),
                                IsHost = true
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                DateJoined = DateTime.Now.AddMonths(6),
                                IsHost = false
                            },
                        },
                        Venue = "O2 Arena"
                    },
                    new Activity
                    {
                        Category = "Travel",
                        City = "Berlin",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 7 months in future",
                        Title = "Future Activity 7",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                DateJoined = DateTime.Now.AddMonths(7),
                                IsHost = true
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                DateJoined = DateTime.Now.AddMonths(7),
                                IsHost = false
                            },
                        },
                        Venue = "All"
                    },
                    new Activity
                    {
                        Category = "Drinks",
                        City = "London",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Title = "Future Activity 8",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                DateJoined = DateTime.Now.AddMonths(8),
                                IsHost = true
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                DateJoined = DateTime.Now.AddMonths(8),
                                IsHost = false
                            },
                        },
                        Venue = "Pub"
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}