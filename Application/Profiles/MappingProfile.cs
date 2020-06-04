using AutoMapper;
using Domain;
using System.Linq;

namespace Application.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUser, UserProfile>()
                .ForMember(dst => dst.Image, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}