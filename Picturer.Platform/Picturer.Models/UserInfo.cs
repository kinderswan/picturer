﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Picturer.RedisConnector.DataModels;

namespace Picturer.Models
{
	public class UserInfo: ISearchableEntity
	{
		public string SearchKey { get; set; }
		public string Password { get; set; }
		public string Login { get; set; }
	}
}