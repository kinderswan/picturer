using Picturer.RedisConnector.DataModels;

namespace Picturer.Models
{
	public class UserInfo: ISearchableEntity
	{
		public string SearchKey { get; set; }

		public string UserHash { get; set; }
	}
}
