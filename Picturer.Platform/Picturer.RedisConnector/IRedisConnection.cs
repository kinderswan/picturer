using System.Threading.Tasks;
using Picturer.RedisConnector.DataModels;

namespace Picturer.RedisConnector
{
	public interface IRedisConnection
	{
		Task<bool> WriteStringToDatabase(StringData data);

		Task<StringData> GetStringFromDatabase(string key);

		Task<bool> DeleteDataInDatabase(string key);
	}
}
