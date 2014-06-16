function ManagePush(){

	var self = this;
	var pushNotification;
	this.token = '';
	this.plataform = '';



	 this.registrar = function(){

		pushNotification = window.plugins.pushNotification;
	
    	if ( device.platform == 'android' || device.platform == 'Android' )
		{
		    pushNotification.register(
		        successHandler,
		        errorHandler, {
		            "senderID":"57995757235",
		            "ecb":"objApp._ManagePush.onNotificationGCM"
		        });
		    self.plataform = 'android'
		 
		}
		else
		{
		    pushNotification.register(
		        tokenHandler,
		        errorHandler, {
		            "badge":"true",
		            "sound":"true",
		            "alert":"true",
		            "ecb":"objApp._ManagePush.onNotificationAPN"
		        });
		       self.plataform = 'ios'
		}
		
	}

	this.unregistrar = function (){
		 
		try  {
	        pushNotification.unregister(
	        function(e) {
	            //unRegister Success!!!
	            //alert('unRegister Success');
	        }, 
	        function(e) {
	            //unRegister Failed!!!
	           // alert('unRegister Failed');
	        });
	    }
	    catch(err) {
	      
	      
	    }
		
	}


	function sendToken()
	{
		console.log(self.plataform) 
		console.log(self.token)
	}

	function successHandler (result) {
	  
	}
	
	function errorHandler (error) {
	  console.log(error)
	}

	function tokenHandler (result) {
	    
 		self.token = result
		sendToken()
	}
	
	// iOS
	this.onNotificationAPN = function (event) {
	  
	    if ( event.alert )
	    {
	        objeto_recibido(event)
	    }

	    if ( event.sound )
	    {
	        var snd = new Media(event.sound);
	        snd.play();
	    }

	    if ( event.badge )
	    {
	        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
	    }
	}

	// Android
	this.onNotificationGCM = function (e) {
	   
	    switch( e.event )
	    {
		    case 'registered':
		        if ( e.regid.length > 0 )
		        {
			          self.token =  e.regid
			          sendToken()
		        }
		    break;

		    case 'message':
		  		objeto_recibido(e.payload)

		    break;

		    case 'error':
		       objApp.error('ERROR -> MSG:' + e.msg);
		    break;

		    default:
		    	objApp.error('EVENT -> Unknown, an event was received and we do not know what it is');
		     
		 	   break;
		  }

	}


	function objeto_recibido($obj){

		console.log($obj)
	}
}



