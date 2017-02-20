using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Web;

namespace Picturer.Api.Rest.Models
{
	public class PictureViewModel
	{
		public string SearchKey { get; set; }

		public string Id { get; set; }

		public string User { get; set; }

		public string Liked { get; set; }
	}
}