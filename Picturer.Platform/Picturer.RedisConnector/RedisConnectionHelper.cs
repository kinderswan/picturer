using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace Picturer.RedisConnector
{
	public class RedisConnectorHelper
	{
		static RedisConnectorHelper()
		{
			RedisConnectorHelper.StartRedis();
			RedisConnectorHelper.lazyConnection = new Lazy<ConnectionMultiplexer>(() => ConnectionMultiplexer.Connect("localhost"));
		}

		private static Lazy<ConnectionMultiplexer> lazyConnection;

		public static ConnectionMultiplexer Connection
		{
			get
			{
				return lazyConnection.Value;
			}
		}

		private static void StartRedis()
		{
			if (Process.GetProcessesByName("redis-server").Length != 0) return;

			ProcessStartInfo processStartInfo = new ProcessStartInfo(@"redis-server.exe", @"c:\ProgramData\chocolatey\lib\redis-64\redis-local.conf")
			{
				Verb = "runas"
			};

			Process.Start(processStartInfo);
		}
	}  

}
