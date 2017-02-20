using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Web;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Picturer.RedisConnector;
using Picturer.RedisConnector.Serializers;
using Picturer.Repository.Interfaces;
using Picturer.Services.Interfaces;

namespace Picturer.Api.Rest.App_Start
{
	public class Bootstrapper
	{
		public static void Run()
		{
			SetAutofacContainer();
			AutoMapperConfig.Configure();
		}

		private static void SetAutofacContainer()
		{
			ContainerBuilder builder = new ContainerBuilder();

			builder.RegisterApiControllers(Assembly.GetExecutingAssembly()).InstancePerRequest();

			builder.RegisterAssemblyTypes(typeof(IPictureRepository).Assembly).AsImplementedInterfaces().InstancePerRequest();

			builder.RegisterAssemblyTypes(typeof(IPictureService).Assembly).AsImplementedInterfaces().InstancePerRequest();

			builder.RegisterAssemblyTypes(typeof(IRedisConnection).Assembly).AsImplementedInterfaces().InstancePerRequest();

			builder.RegisterAssemblyTypes(typeof(IJsonSerializer).Assembly).AsImplementedInterfaces().InstancePerRequest();

			IContainer container = builder.Build();
			GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
		}
	}
}