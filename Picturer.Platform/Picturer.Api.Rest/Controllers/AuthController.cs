using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using Picturer.Api.Rest.Models;
using Picturer.Models;
using Picturer.Services.Interfaces;

namespace Picturer.Api.Rest.Controllers
{
	[RoutePrefix("api")]
	[EnableCors(origins: "*", headers: "*", methods: "*")]
	public class AuthController : ApiController
	{
		private const string UserPrefixString = "AUTH";

		private readonly IUserInfoService _userInfoService;

		public AuthController(IUserInfoService userService)
		{
			this._userInfoService = userService;
		}

		[HttpPost]
		[Route("auth")]
		public async Task<IHttpActionResult> UserAuth([FromBody]UserInfoViewModel model)
		{
			bool authored = await this._userInfoService.IsUserAuthored(UserPrefixString + model.UserHash);
			if (!authored)
			{
				await this._userInfoService.WriteUserInfo(new UserInfo
				{
					SearchKey = UserPrefixString + model.UserHash,
					UserHash = model.UserHash
				});
			}

			return this.Ok();
		}
	}
}
