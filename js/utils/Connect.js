(function(window)
{
	function Connect(parent)
	{
		var self = this;
		
		self.conectar = function()
		{
			FB.getLoginStatus(function(response) 
			{
				if (response.status == 'connected') 
				{
					fb_connect_ok(response.authResponse.userID, response.authResponse.accessToken);
				}
				else
				{
					FB.login(function(response) 
					{
						if(response.authResponse) 
						{
							fb_connect_ok(response.authResponse.userID, response.authResponse.accessToken);
						} 
						else {}
					}
					,{ scope: objDataSite.PERMISOS });
				}
			});
		}
		
		function fb_connect_ok(_uid, _at)
		{
			parent.successConnect(_uid, _at);
		}
	}
	
	window.Connect = Connect;
	
})(window);