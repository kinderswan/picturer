using Picturer.RedisConnector.DataModels;

namespace Picturer.Models
{
	public class PictureModel : ISearchableEntity
	{
		public string SearchKey { get; set; }

		public string Id { get; set; }
	}
}
