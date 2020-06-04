using Application.Photos;
using Microsoft.AspNetCore.Http;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        PhotoUploadResult AddPhoto(IFormFile file);

        Task<PhotoUploadResult> AddPhotoAsync(IFormFile file, CancellationToken cancellationToken = default);
            
        string DeletePhoto(string publicId);

        Task<string> DeletePhotoAsync(string publicId, CancellationToken cancellationToken = default);
    }
}