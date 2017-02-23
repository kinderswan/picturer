using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Picturer.Models;
using Picturer.RedisConnector.DataModels;

namespace Picturer.Repository.Interfaces
{
	public interface IUserInfoRepository
	{
		Task<string> IsUserAuthored(string login, string password);

		Task<bool> WriteUserInfo(UserInfo userInfo);
	}
}
