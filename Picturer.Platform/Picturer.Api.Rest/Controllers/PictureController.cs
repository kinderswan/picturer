using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using AutoMapper;
using Picturer.Api.Rest.Models;
using Picturer.Models;
using Picturer.Services.Interfaces;

namespace Picturer.Api.Rest.Controllers
{
	[RoutePrefix("api")]
	[EnableCors(origins: "*", headers: "*", methods: "*")]
	public class PictureController : ApiController
	{
		private const string PicturePrefix = "PICTURE";

		private readonly IPictureService mPictureService;

		public PictureController()
		{
			
		}

		public PictureController(IPictureService pictureService)
		{
			this.mPictureService = pictureService;
		}

		[HttpGet]
		[Route("picture/{searchKey}")]
		public async Task<IHttpActionResult> GetPicture(string searchKey)
		{
			PictureModels models = await this.mPictureService.GetPictures(PicturePrefix + searchKey);
			return this.Json(models);
		}

		[HttpPost]
		[Route("picture")]
		public async Task<IHttpActionResult> PostPicture([FromBody] PictureViewModel viewModel)
		{
			PictureModel writeModel = Mapper.Map<PictureViewModel, PictureModel>(viewModel);
			writeModel.SearchKey = PicturePrefix + viewModel.UserHash;
			return this.Json(await this.mPictureService.WritePicture(writeModel));
		}

		[HttpDelete]
		[Route("picture/{searchKey}")]
		public async Task<IHttpActionResult> DeletePicture(string searchKey)
		{
			return this.Json(await this.mPictureService.DeletePicture(PicturePrefix + searchKey));
		}

		[HttpDelete]
		[Route("picture")]
		public async Task<IHttpActionResult> DeletePictureById([FromUri]string searchKey, [FromUri]string paramToDelete)
		{
			return this.Json(await this.mPictureService.DeletePictureById(PicturePrefix + searchKey, paramToDelete));
		}
	}
}
