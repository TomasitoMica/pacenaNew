function Facebook(){

	var self = this;
	var access_token = 0;
	var callback;
	var inter;
	this.init = function(){

		FB.init({
			  
			  appId: objApp.FB_APP_ID,
			  nativeInterface: CDV.FB,
			  useCachedDialogs: false

		}, function (e){

		/*	console.log('FALLA INIT');
			console.log(e);*/

		});

	}

	function get_obj_user()
	{
		clearTimeout(inter)
		objApp.mostrarCargador()


			//console.log('get_obj_user: ' + access_token)			
			$.ajax({
			  dataType: "json",
			  url: 'https://graph.facebook.com/me?access_token=' + access_token,
			  type: 'get',
			  success: function(json){
			  /*		console.log('get_obj_user success' )
			  		console.log('json: ' + json )
			  		console.log('access_token: ' + access_token )*/
			  		callback(json, access_token)
			  		objApp.ocultarCargador()
			  },
			  error: function()
			  {

			  	//console.log('get_obj_user error');

			  	/* objApp.error('Ocurrio un error. (error 1)');
			  	 objApp.ocultarCargador()*/

			  	/* FB.logout(
			  	 	function (e){
			  	 		console.log(e)
			  	 		console.log('K cerro la session correctamente')
			  	 		alert('OK cerro la session correctamente.')
			  	 	}, 

			  	    function(e){
			  	    	console.log('Error al cerrar la seccion de FB')
			  	 		alert('Error al cerrar la seccion de FB')
			  	    }

			  	 );*/

			  		/*console.log('get_obj_user error 1')


			  		FB.login(function(response2) {
		            	console.log('---2login----' )
		            	console.log(response2)

						  if (response2.authResponse) {

								access_token = response2.authResponse.accessToken;
								objApp.ocultarCargador()
						    	get_obj_user()

						   } else {

							 objApp.ocultarCargador()
						     objApp.error('User cancelled login or did not fully authorize.');

						   }
						   
					}, {scope: 'user_birthday, user_hometown, email'})
*/

			  }
			});
	}


	this.conectar = function($callback){

		callback = $callback
		objApp.mostrarCargador()

		 inter =  setTimeout(function (){
		 	objApp.ocultarCargador()
		 }, 3000);
		 
     /*	 FB.getLoginStatus(function(response) 
		 {
		 		console.log('connected' )
     			console.log(response)
	          	if (response.status == 'connected') 
				{	

						access_token = response.authResponse.accessToken;
						objApp.ocultarCargador()
						get_obj_user()

				} else {*/


				//	console.log('intentar login' )
		            FB.login(function(response2) {
		            /*	console.log('----login----' )
		            	console.log(response2)
*/
						  if (response2.authResponse) {


						  		FB.login(function(response3) {
					            	
					            	//console.log(response3)
									   
								}, {scope: 'publish_stream'})

								access_token = response2.authResponse.accessToken;
								objApp.ocultarCargador()
						    	get_obj_user()

						   } else {

							 objApp.ocultarCargador()
						     objApp.error('User cancelled login or did not fully authorize.');

						   }
						   
					}, {scope: 'user_birthday, user_hometown, email'})



	         	/*}
         });
*/
		
	}

	
}