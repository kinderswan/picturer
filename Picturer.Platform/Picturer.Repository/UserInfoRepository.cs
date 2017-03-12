using System.Threading.Tasks;
using Picturer.Models;
using Picturer.RedisConnector;
using Picturer.RedisConnector.DataModels;
using Picturer.RedisConnector.Serializers;
using Picturer.Repository.Interfaces;

namespace Picturer.Repository
{
	public class UserInfoRepository : IUserInfoRepository
	{
		private readonly IRedisConnection mRedisConnection;

		private readonly IJsonSerializer mJsonSerializer;

		public UserInfoRepository(IRedisConnection redisConnection, IJsonSerializer jsonSerializer)
		{
			this.mRedisConnection = redisConnection;
			this.mJsonSerializer = jsonSerializer;
		}

		public async Task<bool> IsUserAuthored(string userHash)
		{
			StringData data = await this.mRedisConnection.GetStringFromDatabase(userHash);
			UserInfo result = this.mJsonSerializer.DeserializeStringDataToObject<UserInfo>(data);

			return (result != null) && !string.IsNullOrEmpty(result.UserHash);
		}

		public async Task<bool> WriteUserInfo(UserInfo userInfo)
		{
			StringData data = this.mJsonSerializer.SerializeToStringData(userInfo);
			return await this.mRedisConnection.WriteStringToDatabase(data);
		}
	}
}
