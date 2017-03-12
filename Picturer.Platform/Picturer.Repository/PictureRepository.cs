using System.Collections.Generic;
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
	public class PictureRepository: IPictureRepository
	{
		private readonly IRedisConnection mRedisConnection;

		private readonly IJsonSerializer mJsonSerializer;

		public PictureRepository(IRedisConnection redisConnection, IJsonSerializer jsonSerializer)
		{
			this.mRedisConnection = redisConnection;
			this.mJsonSerializer = jsonSerializer;
		}

		public async Task<bool> WritePicture(PictureModel model)
		{
			string shouldBeWritten = await this.BuildStringThatShouldBeWrittenAsync(model);
			return await this.mRedisConnection.WriteStringToDatabase(new StringData(model.SearchKey, shouldBeWritten));
		}

		public async Task<bool> DeletePicture(string searchKey)
		{
			return await this.mRedisConnection.DeleteDataInDatabase(searchKey);
		}

		public async Task<bool> DeletePictureById(string searchKey, string id)
		{
			StringData getSaved = await this.mRedisConnection.GetStringFromDatabase(searchKey);
			List<PictureModel> models = this.mJsonSerializer.DeserializeStringDataToObject<List<PictureModel>>(getSaved)
				.Where(x => x.Id != id).ToList();
			return await this.mRedisConnection.WriteStringToDatabase(new StringData(searchKey, this.mJsonSerializer.SerializeToString(models)));
		}

		public async Task<PictureModels> GetPictures(string searchKey)
		{
			StringData result = await this.mRedisConnection.GetStringFromDatabase(searchKey);

			return new PictureModels()
			{
				Models = this.mJsonSerializer.DeserializeStringDataToObject<List<PictureModel>>(result)
			};
		}

		private async Task<string> BuildStringThatShouldBeWrittenAsync(PictureModel model)
		{
			StringBuilder sb = new StringBuilder();
			StringData savedInRedis = await this.mRedisConnection.GetStringFromDatabase(model.SearchKey);
			string strToWrite = this.mJsonSerializer.SerializeToStringData(model).Value;

			if (string.IsNullOrEmpty(savedInRedis.Value) )
			{
				sb.Append("[" + strToWrite + "]");
			}
			else if (savedInRedis.Value == "[]")
			{
				sb.Append(savedInRedis.Value).Insert(savedInRedis.Value.Length - 1, strToWrite);
			}
			else if (this.CheckIfDuplicate(savedInRedis, model))
			{
				return savedInRedis.Value;
			}
			else
			{
				sb.Append(savedInRedis.Value).Insert(savedInRedis.Value.Length - 1, "," + strToWrite);
			}

			return sb.ToString();
		}

		private bool CheckIfDuplicate(StringData data, PictureModel model)
		{
			List<PictureModel> modelsInRedis = this.mJsonSerializer.DeserializeStringDataToObject<List<PictureModel>>(data);
			return modelsInRedis.Any(x => x.Id == model.Id);
		}
	}
}
