using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Picturer.Models;
using Picturer.Repository.Interfaces;
using Picturer.Services.Interfaces;

namespace Picturer.Services
{
	public class UserInfoService: IUserInfoService
	{
		private IUserInfoRepository _userInfoRepository;

		public UserInfoService(IUserInfoRepository userInfoRepository)
		{
			this._userInfoRepository = userInfoRepository;
		}

		public async Task<string> IsUserAuthored(string login, string password)
		{
			return await this._userInfoRepository.IsUserAuthored(login, password);
		}

		public async Task<bool> WriteUserInfo(UserInfo userInfo)
		{
			return await this._userInfoRepository.WriteUserInfo(userInfo);
		}
	}
}
