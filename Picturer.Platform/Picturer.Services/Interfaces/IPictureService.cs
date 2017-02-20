using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Picturer.Models;

namespace Picturer.Services.Interfaces
{
	public interface IPictureService
	{
		Task<bool> DeletePicture(string searchKey);

		Task<bool> WritePicture(PictureModel model);

		Task<PictureModels> GetPictures(string searchKey);

		Task<bool> DeletePictureById(string searchKey, string id);
	}
}
