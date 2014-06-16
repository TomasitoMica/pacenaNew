var objApp;

(function(window)
{	
	App.Navigate;
	App.Cargador;
	App.CheckConnection;
	
	function App()
	{
		var self = this;
		var xmlSite;
		var seccionsSite = [];
		var historial = [];
		var ALTO_HEADER = 180;
		var xmlDataUser;
		
		var posicionesStars = 
		[
			{'left' : 150, 'top' : 9},
			{'left' : 58, 'top' : 97},
			{'left' : 63, 'top' : 125},
			{'left' : 210, 'top' : 127},
			{'left' : 300, 'top' : 63 },
			{'left' : 60, 'top' : 63 },
			{'left' : 300, 'top' : 63 },
			{'left' : 150, 'top' : 10 },
			{'left' : 201, 'top' : 272 },
			{'left' : 200, 'top' : 50 },
			{'left' : 184, 'top' : 207 },
			{'left' : 125, 'top' : 208 }
		];		
	
		var ANCHO_PANTALLA = window.innerWidth;
		var ALTO_PANTALLA = window.innerHeight;	
	
		if(navigator.userAgent.toLowerCase().indexOf("ipad") > -1 || ALTO_PANTALLA >=800)
		{
			$('body').css({'background' : 'url(img/general/background.jpg) no-repeat'});
			$('body').css({'background-size' : ANCHO_PANTALLA+'px '+ALTO_PANTALLA+'px'});			
		}
		
		/*Publics vars*/
		self._ManagePush;
		self._Facebook;
		self.idUsuario;
		self.VERSION;	
		self.TITLE;	
		self.DESCRIPTION;	
		self.FB_APP_ID;
		self.SERVER;
		self.UUID;
		self.PLATFORM;
		self.loadGoogleMap = false;
						
		var wholeWrapper = document.createElement('div');
			wholeWrapper.id = 'app';
			$(wholeWrapper).appendTo('body');	
					
		var objHeader = new Header(true);
			$(wholeWrapper).append(objHeader.div);
		
		var wrapperHolderSeccion =  document.createElement('div');
			wrapperHolderSeccion.id = 'wrapper-holder-seccion';
			$(wrapperHolderSeccion).css({'height' : (ALTO_PANTALLA - 120)});
			$(wholeWrapper).append(wrapperHolderSeccion);

		for(var k = 0; k < posicionesStars.length; ++k)
		{
			var star = new Star(posicionesStars[k]);
				//$(wrapperHolderSeccion).append(star.div);
		}			

		var holderSeccion = document.createElement('div');
			holderSeccion.id = 'holder-seccion-loader';	
			$(wrapperHolderSeccion).append(holderSeccion);
	
		$(holderSeccion).css({scale : 0.5, duration : 500}).css({x : -1000, duration : 500});
				
		/*Objects*/
		App.Navigate = new Navigate();
		App.Cargador = new Cargador();
		App.CheckConnection = new CheckConection();

		self.initialize = function() 
		{
		   //Inicializo eventos
		   document.addEventListener('deviceready', onDeviceReady, false);
		   document.addEventListener("offline", onDeviceOffLine, false);
		   document.addEventListener("online", onDeviceOnLine, false);
		   document.addEventListener("backbutton", backKeyDown, false);
		}		

		function onDeviceReady()
		{		
			self.UUID = '9bfbb8f2c53b6074';
			self.PLATFORM = 'Android';
			
			self._ManagePush = new ManagePush(); 
			if(self.is_phonegap())
			{
				self.UUID = device.uuid;
				self.PLATFORM = device.platform;
								
				if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) 
				alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
				if (typeof CDV == 'undefined') 
				alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
				if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

	    		self._ManagePush.registrar();	
   			}

			$.ajax
			({
				url : 'xml/config-site.xml?ac=1',
				success : onCompleteXML,
				error : onErrorXML
			});
		}	
		
		function onDeviceOffLine()
		{
			App.CheckConnection.mostrar();						
		}
		
		function onDeviceOnLine()
		{
			App.CheckConnection.ocultar();
		}
	
		function backKeyDown()
		{
			if(historial[historial.length-1].seccion == 'inicio' || historial.length == 0)
			{
				navigator.app.exitApp();
    			e.preventDefault();
			}
			else
			{
				self.Navigate(historial[historial.length-1].seccion, historial[historial.length-1].nodo);
			}
		}				
		function onCompleteXML(xmlSite)
		{
			//Me traigo toda la informacion de la aplicacion
			document.title   = $(xmlSite).find('site').find('title').text();
			
			self.SERVER      = $(xmlSite).find('site').find('server').text();
			self.VERSION     = $(xmlSite).find('site').find('version').text();
			self.FB_APP_ID   = $(xmlSite).find('site').find('fbappid').text();
			self.DESCRIPTION = $(xmlSite).find('site').find('description').text();
	
			$(xmlSite).find('site').find('seccions').find('seccion').each(function(index, element) 
			{						
			   seccionsSite.push($(this));
			});	
			
			if(self.is_phonegap())
			{
				self._Facebook = new Facebook();
		   		self._Facebook.init();
			}
			
			//Chequeo si ya existe este dispositivo
			checkExisteDispositivo();
		}
		
		function checkExisteDispositivo()
		{			
			$.ajax
			({
				url  : objApp.SERVER+'ws/ws-checkDispositivo.php?ac=5',
				type : 'POST',
				data : {'uuid' : self.UUID},
				success : onCompleteCheckDispositivo,
				crossDomain: true,
				error : onErrorCheckDispositivo
			});				
		}
		
		function onCompleteCheckDispositivo(xml)
		{
			if(parseInt($(xml).find('existe').text()) == 1 && parseInt($(xml).find('idUsuario').text()) != 0)
			{				
				xmlDataUser = xml;
				self.idUsuario = $(xml).find('idUsuario').text();
				
				objHeader.setUser($(xml).find('nombre').text());
				objApp.Navigate('inicio', null);
			}
			else
			{
				objApp.Navigate('registro', null);
			}
		}
		
		function onErrorXML()
		{
			//alert('SERVER DEBUG 3: '+objApp.SERVER);
			self.error('Error al inicializar la aplicación. La aplicación se cerrará');
			
			setTimeout(function()
			{
				navigator.app.exitApp();
			
			}, 3000);
		}
		
		function onErrorCheckDispositivo()
		{
			self.error('Ha ocurrido un error, por favor intenta más tarde.');
		}
			
		/*Public methods*/	
		self.is_phonegap =  function ()
		{
			try 
			{
			    if(device.platform == ''){}
			    return true;  
			} 
			catch (e) 
			{  
			    return false;   
			}
		}
		self.getMenu = function()
		{
			return seccionsSite;
		}
		self.setIdUsuario = function(id, nombre)
		{
			self.idUsuario = id;
			objHeader.setUser(nombre);
		}			
		self.setGoogleLoad = function()
		{
			self.loadGoogleMap = true;
		}
		self.Navigate = function(seccion, nodo)
		{
			if(seccion == 'inicio')
				objHeader.ocultarBtn();
			else
				objHeader.mostrarBtn();
				
			historial.push({'seccion' : seccion, 'nodo' : nodo});
			App.Navigate.to(seccion, nodo);
		}
		self.internet = function() 
		{
			try {var networkState = navigator.connection.type;}
			catch(e){return true}
			
			var states = {};
			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.CELL]     = 'Cell generic connection';
			states[Connection.NONE]     = 'No network connection';
		
			if(networkState == Connection.WIFI ||  networkState == Connection.CELL_3G || 
			networkState == Connection.CELL_4G || networkState == Connection.WIFI)
			{
				return true
			}
		
			return false
	    }
		self.error = function(error)
		{
			try
			{
				navigator.notification.alert(error, function(){}, 'ALERT');		
			}
			catch(e)
			{
				alert(error);
			}
		}	
		self.isTouch = function () 
		{  
		  try 
		  {  
			document.createEvent("TouchEvent");  
			return true;  
		  } 
		  catch (e) 
		  {  
			return false;  
		  }  
		}
		self.mostrarCargador = function()
		{
			App.Cargador.mostrar();
		}					
		self.ocultarCargador = function()
		{
			App.Cargador.ocultar();
		}	
		
		self.login_con_facebook = function(uid)
		{
			self.error(uid);
		}	
	}
	
	window.App = App;
	
})(window);