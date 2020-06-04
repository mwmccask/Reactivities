using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Photos
{
    public class CloudinaryPhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary cloudinary;

        public CloudinaryPhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
            this.cloudinary = new Cloudinary(account);
        }

        public PhotoUploadResult AddPhoto(IFormFile file)
        {
            var addPhotoTask = AddPhotoAsync(file);
            addPhotoTask.Wait();
            return addPhotoTask.Result;
        }

        public async Task<PhotoUploadResult> AddPhotoAsync(IFormFile file, CancellationToken cancellationToken = default)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation()
                            .Height(500)
                            .Width(500)
                            .Crop("fill")
                            .Gravity("face")
                    };
                    uploadResult = await this.cloudinary.UploadAsync(uploadParams, cancellationToken);
                }
            }

            if (uploadResult.Error != null)
            {
                throw new Exception(uploadResult.Error.Message);
            }

            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.AbsoluteUri
            };
        }

        public string DeletePhoto(string publicId)
        {
            var deletePhotoTask = DeletePhotoAsync(publicId);
            deletePhotoTask.Wait();
            return deletePhotoTask.Result;
        }

        public async Task<string> DeletePhotoAsync(string publicId, CancellationToken cancellationToken = default)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await this.cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
}