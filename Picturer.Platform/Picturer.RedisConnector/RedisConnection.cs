using System.Threading.Tasks;
using Picturer.RedisConnector.DataModels;
using StackExchange.Redis;

namespace Picturer.RedisConnector
{
	public class RedisConnection : IRedisConnection
	{
		private readonly IDatabase mCache;

		public RedisConnection()
		{
			this.mCache = this.GetCache();
		}

		public async Task<bool> WriteStringToDatabase(StringData data)
		{
			return await this.mCache.StringSetAsync(data.Key, data.Value);
		}

		public async Task<StringData> GetStringFromDatabase(string key)
		{
			RedisValue result =  await this.mCache.StringGetAsync(key);
			return new StringData(key, result);
		}

		public async Task<bool> DeleteDataInDatabase(string key)
		{
			return await this.mCache.KeyDeleteAsync(key);
		}

		private IDatabase GetCache()
		{
			return RedisConnectorHelper.Connection.GetDatabase();
		}
	}
}
