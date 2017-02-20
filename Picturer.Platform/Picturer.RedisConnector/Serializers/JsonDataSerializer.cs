using System.Text;
using Newtonsoft.Json;
using Picturer.RedisConnector.DataModels;

namespace Picturer.RedisConnector.Serializers
{
	public class JsonDataSerializer: IJsonSerializer
	{
		public T DeserializeStringDataToObject<T>(StringData data)
		{
			return JsonConvert.DeserializeObject<T>(data.Value);
		}

		public StringData SerializeToStringData<T>(T obj) where T : class, ISearchableEntity
		{
			return new StringData(obj.SearchKey, this.SerializeToString(obj));
		}

		public string SerializeToString<T>(T obj)
		{
			return JsonConvert.SerializeObject(obj);
		}
	}
}
