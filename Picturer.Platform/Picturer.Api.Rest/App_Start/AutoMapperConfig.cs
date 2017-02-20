using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Picturer.Api.Rest.Mapping;

namespace Picturer.Api.Rest.App_Start
{
	public class AutoMapperConfig
	{
		public static void Configure()
		{
			Mapper.Initialize(x =>
			{
				x.AddProfile<PictureMapping>();
			});
}
	}
}