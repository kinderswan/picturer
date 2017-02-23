using AutoMapper;
using Picturer.Api.Rest.Mapping;

namespace Picturer.Api.Rest
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