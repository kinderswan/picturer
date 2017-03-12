using System;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Picturer.Api.Rest
{
	public class WebApiApplication : System.Web.HttpApplication
	{
		protected void Application_Start()
		{
			GlobalConfiguration.Configure(WebApiConfig.Register);
			Bootstrapper.Run();
			GlobalConfiguration.Configuration.EnsureInitialized();
			GlobalConfiguration.Configuration.Formatters.JsonFormatter.MediaTypeMappings
				.Add(new RequestHeaderMapping("Accept", "text/html", StringComparison.InvariantCultureIgnoreCase, true, "application/json"));
		}
	}
}
