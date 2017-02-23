using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Picturer.Models;

namespace Picturer.Services.Interfaces
{
	public interface IUserInfoService
	{
		Task<string> IsUserAuthored(string login, string password);

		Task<bool> WriteUserInfo(UserInfo userInfo);
	}
}
