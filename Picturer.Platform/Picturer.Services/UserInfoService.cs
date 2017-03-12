using System.Threading.Tasks;
using Picturer.Models;
using Picturer.Repository.Interfaces;
using Picturer.Services.Interfaces;

namespace Picturer.Services
{
	public class UserInfoService: IUserInfoService
	{
		private readonly IUserInfoRepository _userInfoRepository;

		public UserInfoService(IUserInfoRepository userInfoRepository)
		{
			this._userInfoRepository = userInfoRepository;
		}

		public async Task<bool> IsUserAuthored(string userHash)
		{
			return await this._userInfoRepository.IsUserAuthored(userHash);
		}

		public async Task<bool> WriteUserInfo(UserInfo userInfo)
		{
			return await this._userInfoRepository.WriteUserInfo(userInfo);
		}
	}
}
