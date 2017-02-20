using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Picturer.RedisConnector.DataModels;

namespace Picturer.Models
{
	public class PictureModel : ISearchableEntity
	{
		public string SearchKey { get; set; }

		public string Id { get; set; }

		public string User { get; set; }

		public string Liked { get; set; }
	}
}
