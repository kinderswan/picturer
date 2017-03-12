using System.Threading.Tasks;
using Picturer.Models;
using Picturer.Repository.Interfaces;
using Picturer.Services.Interfaces;

namespace Picturer.Services
{
	public class PictureService: IPictureService
	{
		private readonly IPictureRepository mPictureRepository;

		public PictureService(IPictureRepository pictureRepository)
		{
			this.mPictureRepository = pictureRepository;
		}

		public async Task<bool> DeletePicture(string searchKey)
		{
			return await this.mPictureRepository.DeletePicture(searchKey);
		}

		public async Task<bool> DeletePictureById(string searchKey, string id)
		{
			return await this.mPictureRepository.DeletePictureById(searchKey, id);
		}

		public async Task<bool> WritePicture(PictureModel model)
		{
			return await this.mPictureRepository.WritePicture(model);
		}

		public async Task<PictureModels> GetPictures(string searchKey)
		{
			return await this.mPictureRepository.GetPictures(searchKey);
		}
	}
}
