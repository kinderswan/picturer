using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Picturer.RedisConnector.DataModels
{
	public interface ISearchableEntity
	{
		string SearchKey { get; set; }
	}
}
