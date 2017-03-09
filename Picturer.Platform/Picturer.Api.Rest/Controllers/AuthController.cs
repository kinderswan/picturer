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
using Picturer.Api.Rest.Models;
using Picturer.Models;
using Picturer.Services.Interfaces;

namespace Picturer.Api.Rest.Controllers
{
	[RoutePrefix("api")]
	[EnableCors(origins: "*", headers: "*", methods: "*")]
	public class AuthController : ApiController
	{
		private IUserInfoService _userInfoService;

		public AuthController(IUserInfoService userService)
		{
			this._userInfoService = userService;
		}

		[HttpPost]
		[Route("auth")]
		public async Task<IHttpActionResult> UserAuth([FromBody]UserInfoViewModel model)
		{
			string accessText = await this._userInfoService.IsUserAuthored("auth" + model.Login, model.Password);

			if (string.IsNullOrEmpty(accessText))
			{
				return this.Ok("User is authored");
			}

			return this.BadRequest(accessText);
		}
	}
}
