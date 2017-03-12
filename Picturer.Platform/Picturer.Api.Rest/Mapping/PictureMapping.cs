using System;
using AutoMapper;
using Picturer.Api.Rest.Models;
using Picturer.Models;

namespace Picturer.Api.Rest.Mapping
{
	public class PictureMapping : Profile
	{
		public new string ProfileName
		{
			get { return "PictureMapping"; }
		}

		[Obsolete("Use the constructor instead. Will be removed in 6.0")]
		protected override void Configure()
		{
			this.CreateMap<PictureModel, PictureViewModel>();
			this.CreateMap<PictureViewModel, PictureModel>();
		}
	}
}