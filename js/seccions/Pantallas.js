(function(window)
{
	function Pantallas(nodo)
	{		
		var self = this;
		var animando = false;
		var array_tiendas = [];
		var delay = 200;
		var ALTO_HEADER = 180;
		var altoItems = 65;
		var altoPantalla = (window.innerHeight - ALTO_HEADER) - 5;
		var map;
		
		self.div = document.createElement('div');
		self.div.className = 'class-cero';	

		 if(!objApp.loadGoogleMap)
		 {
			$.getScript('http://maps.google.com/maps/api/js?sensor=false&callback=gMapsCallback');
		 }
		 
		var holderItems = document.createElement('div');
			$(self.div).append(holderItems);
			$(holderItems).css({'width' : 320, 'float' : 'left'});
			
		var objTituloSeccion = new TituloSeccion(nodo);
			$(holderItems).append(objTituloSeccion.div);	
			$(self.div).append('<div class="clear"></div>');

		var divScroll = document.createElement('div');
			divScroll.className = 'divScroll';
			$(holderItems).append(divScroll);
			$(divScroll).css({'height' : altoPantalla});
		
		var mapaWrapper = document.createElement('div');				
			mapaWrapper.id = 'mapa-wrapper';
			$(divScroll).append(mapaWrapper);
			$(mapaWrapper).css({'height' : altoPantalla});

		$.ajax
		({
			url : objApp.SERVER+'ws/ws-obtenerTiendas.php',
			success : onCompleteXML,
			error : onErrorXML
		});				
			
		function onErrorXML()
		{
			objApp.error('Ha ocurrido un error, por favor intenta más tarde');
		}		
		function onCompleteXML(xml)
		{
			objApp.ocultarCargador();

			if($(xml).find('xml').find('tienda').length != 0)
			{
				$(xml).find('xml').find('tienda').each(function(index, element) 
				{
					var o = 
					{
						'lat' : $(this).find('latitud').text(),
						'long': $(this).find('longitud').text(),
						'nombre' :$(this).find('nombre').text(),
						'dir' : $(this).find('direccion').text(),						
					}
					
					array_tiendas.push(o);
				});
			}
			
			geoLocation();	
		}

		function geoLocation()
		{
			if (navigator.geolocation)
				navigator.geolocation.getCurrentPosition(onSuccessLocation);
			else
				objApp.error("Debes habilitar la geolocalización para esta seccion.");
		}
		
		function onSuccessLocation(location)
		{
			//Location
			var lat  = location.coords.latitude;
			var long = location.coords.longitude;	
			var myLatlng = new google.maps.LatLng(lat,long);
			
			//Mapa
			var myOptions = 
			{
				zoom: 16,
				center: myLatlng,
				zoomControl : false,
				scaleControl : false,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			
			map = new google.maps.Map(document.getElementById("mapa-wrapper"), myOptions);

			//Marker
			var pinColor = '06C';
			var pinImage = 
				new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
				new google.maps.Size(21, 34),
				new google.maps.Point(0,0),
				new google.maps.Point(10, 34));
   
			var pinShadow = 
				new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
				new google.maps.Size(40, 37),
				new google.maps.Point(0, 0),
				new google.maps.Point(12, 35));	
			
			var marker = new google.maps.Marker
			({
				position  : myLatlng,
				draggable : false,
				icon: pinImage,
				shadow: pinShadow,
				animation : google.maps.Animation.DROP,
				title : ""
			});
			
			//Informacion
			var contentString = '<div id="content_map">'+
						'<div id="bodyContent">'+
						'<p class="p_map">Tu estás aquí!</p>'+
						'</div>'+
						'</div>';
	
			var infowindow = new google.maps.InfoWindow({content: contentString});

			google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker);});			
			marker.setMap(map);	
			
			construirMarkersTiendas();
		}
		
		function construirMarkersTiendas()
		{
			for(var i = 0; i < array_tiendas.length; ++i)
			{
				setMarker(array_tiendas[i]);
			}
		}		
		
		function setMarker(o)
		{
			var lat  = o.lat;
			var long = o.long;
				
			var myLatlng = new google.maps.LatLng(lat,long);
			
			var marker = new google.maps.Marker
			({
				position  : myLatlng,
				draggable : false,
				animation : google.maps.Animation.DROP,
				title : ""
			});
			
			//Informacion
			var contentString = '<div id="content_map">'+
						'<div id="bodyContent">'+
						'<h1 id="firstHeading" class="firstHeading">'+o.nombre+'</h1>'+
						'<p class="p_map">'+o.dir+'</p>'+
						'</div>'+
						'</div>';
	
			var infowindow = new google.maps.InfoWindow({content: contentString});

			google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker);});
						
			marker.setMap(map);	
		}
	}
	
	window.Pantallas = Pantallas;

})(window);