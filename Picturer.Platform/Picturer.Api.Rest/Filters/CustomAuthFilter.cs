using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Filters;
using System.Web.Http.Results;
using Picturer.RedisConnector;
using Picturer.Services.Interfaces;

namespace Picturer.Api.Rest.Filters
{
	public class CustomAuthFilterAttribute : Attribute, IAuthenticationFilter
	{
		private IRedisConnection _connection;

		public bool AllowMultiple { get; private set; }

		public CustomAuthFilterAttribute()
		{
			this.AllowMultiple = true;
		}

		public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
		{
			var login = context.Request.Headers.GetValues("Login").First();
			var password = context.Request.Headers.GetValues("Password").First();
			var auth = await this.CheckIfUserIsAuthored(login, password);
			if (!auth)
			{
				context.ErrorResult = new UnauthorizedResult(new AuthenticationHeaderValue[1], context.Request);
			}
		}

		public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
		{
			return Task.FromResult(0);
		}

		private async Task<bool> CheckIfUserIsAuthored(string login, string password)
		{
			this._connection = new RedisConnection();
			var data = await this._connection.GetStringFromDatabase(login);
			return data.Value == password && data.Key == login;
		}
	}
}