using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting.Messaging;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
using AutoMapper;
using Newtonsoft.Json;
using Picturer.Api.Rest.Filters;
using Picturer.Api.Rest.Models;
using Picturer.Models;
using Picturer.Services.Interfaces;

namespace Picturer.Api.Rest.Controllers
{
	[RoutePrefix("api")]
	[EnableCors(origins: "*", headers: "*", methods: "*")]
	public class PictureController : ApiController
	{
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
			PictureModels models = await this.mPictureService.GetPictures("pictures" + searchKey);
			return this.Json(models);
		}

		[HttpPost]
		[Route("picture")]
		public async Task<IHttpActionResult> PostPicture([FromBody] PictureViewModel viewModel)
		{
			PictureModel writeModel = Mapper.Map<PictureViewModel, PictureModel>(viewModel);

			return this.Json(await this.mPictureService.WritePicture(writeModel));
		}

		[HttpDelete]
		[Route("picture/{searchKey}")]
		[CustomAuthFilterAttribute]
		public async Task<IHttpActionResult> DeletePicture(string searchKey)
		{
			return this.Json(await this.mPictureService.DeletePicture("pictures" + searchKey));
		}

		[HttpDelete]
		[Route("picture")]
		public async Task<IHttpActionResult> DeletePictureByUrl([FromUri]string searchKey, [FromUri]string paramToDelete)
		{
			return this.Json(await this.mPictureService.DeletePictureById("pictures" + searchKey, paramToDelete));
		}
	}
}
