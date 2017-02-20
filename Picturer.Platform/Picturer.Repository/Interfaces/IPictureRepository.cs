using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Picturer.Models;

namespace Picturer.Repository.Interfaces
{
	public interface IPictureRepository
	{
		Task<PictureModels> GetPictures(string searchKey);

		Task<bool> WritePicture(PictureModel model);

		Task<bool> DeletePicture(string searchKey);

		Task<bool> DeletePictureById(string searchKey, string id);
	}
}
