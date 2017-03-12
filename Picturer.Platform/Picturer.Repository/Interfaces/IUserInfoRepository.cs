using System.Threading.Tasks;
using Picturer.Models;

namespace Picturer.Repository.Interfaces
{
	public interface IUserInfoRepository
	{
		Task<bool> IsUserAuthored(string userHash);

		Task<bool> WriteUserInfo(UserInfo userInfo);
	}
}
