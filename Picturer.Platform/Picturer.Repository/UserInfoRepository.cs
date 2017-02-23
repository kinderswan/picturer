using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Globalization;
using System.Linq;
using System.Text;
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

		public async Task<string> IsUserAuthored(string login, string password)
		{
			StringData data = await this.mRedisConnection.GetStringFromDatabase(login);
			UserInfo result = this.mJsonSerializer.DeserializeStringDataToObject<UserInfo>(data);

			var authored =  this.GetUserAuthority(result, login, password);

			if (string.IsNullOrEmpty(authored))
			{
				await this.WriteUserInfo(new UserInfo()
				{
					Login = login,
					SearchKey = login,
					Password = password
				});
			}

			return authored;
		}

		public async Task<bool> WriteUserInfo(UserInfo userInfo)
		{
			var data = this.mJsonSerializer.SerializeToStringData(userInfo);
			return await this.mRedisConnection.WriteStringToDatabase(data);
		}

		private string GetUserAuthority(UserInfo result, string login, string password)
		{
			if (result == null)
			{
				return string.Empty;
			}

			if (result != null && result.Password == password && result.Login == login)
			{
				return string.Empty;
			}
			
			if (result != null && result.Password != password)
			{
				return "Password is wrong";
			}

			return "Login is wrong";
		}
	}
}
