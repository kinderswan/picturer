namespace Picturer.RedisConnector.DataModels
{
	public class StringData
	{
		public string Key { get; private set; }

		public string Value { get; private set; }

		public StringData() { }

		public StringData(string key, string value)
		{
			this.Key = key;
			this.Value = value;
		}
	}
}
