using Picturer.RedisConnector.DataModels;

namespace Picturer.RedisConnector.Serializers
{
	public interface IJsonSerializer
	{
		T DeserializeStringDataToObject<T>(StringData data);

		StringData SerializeToStringData<T>(T obj) where T : class, ISearchableEntity;

		string SerializeToString<T>(T obj);
	}
}
