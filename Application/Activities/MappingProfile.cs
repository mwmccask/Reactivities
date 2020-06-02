using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDTO>();
            CreateMap<UserActivity, AttendeeDTO>()
                .ForMember(dst => dst.DisplayName, opt => opt.MapFrom(src => src.AppUser.DisplayName))
                .ForMember(dst => dst.Username, opt => opt.MapFrom(src => src.AppUser.UserName));
        }
    }
}