using System.Threading.Tasks;
using Picturer.Models;

namespace Picturer.Services.Interfaces
{
	public interface IUserInfoService
	{
		Task<bool> IsUserAuthored(string userHash);

		Task<bool> WriteUserInfo(UserInfo userInfo);
	}
}
