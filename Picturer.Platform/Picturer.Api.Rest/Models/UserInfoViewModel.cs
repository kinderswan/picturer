using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Web;

namespace Picturer.Api.Rest.Models
{
	public class UserInfoViewModel
	{
		public string Login { get; set; }

		public string Password { get; set; }
	}
}