(function(window)
{
	function Polla(nodo)
	{
		var self = this;
		var ALTO_HEADER = 180;
		var altoPantalla = (window.innerHeight - ALTO_HEADER) + 20;
		var animando = false;
		var dataXml = null;
		
		self.div = document.createElement('div');
		self.div.className = 'class-cero';

		$.ajax
		({
			url  : objApp.SERVER+'ws/ws-getDatosUsuario.php',
			type : 'POST',
			data : {'id' : objApp.idUsuario},
			success : onCompleteXML,
			error : onErrorXML
		});	

		var holderItems = document.createElement('div');
			$(self.div).append(holderItems);
			$(holderItems).css({'width' : 320, 'float' : 'left'});
						
		var objTituloSeccion = new TituloSeccion(nodo);
			$(holderItems).append(objTituloSeccion.div);	
			$(self.div).append('<div class="clear"></div>');
			
		var divScroll = document.createElement('div');
			divScroll.className = 'divScroll';
			$(holderItems).append(divScroll);
			$(divScroll).css({'height' : altoPantalla, 'margin-top' : 40});
			
		var holderDatosUsuario = document.createElement('div');
			holderDatosUsuario.id = 'holder-datos-usuario';
			$(divScroll).append(holderDatosUsuario);

		var leftDatosUsuario = document.createElement('div');
			leftDatosUsuario.id = 'left-holder-datos-usuario';
			$(holderDatosUsuario).append(leftDatosUsuario);			
		
		var holderFoto = document.createElement('div');
			$(leftDatosUsuario).append(holderFoto);

		var rightDatosUsuario = document.createElement('div');
			rightDatosUsuario.id = 'right-holder-datos-usuario';
			$(holderDatosUsuario).append(rightDatosUsuario);
		
		/**/
		var nombreApellidoTitulo = document.createElement('p');
			nombreApellidoTitulo.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(nombreApellidoTitulo);
			$(nombreApellidoTitulo).text('Nombre y apellidos :');

		var nombreApellido = document.createElement('p');
			nombreApellido.className = 'holder-profile-texto';
			$(rightDatosUsuario).append(nombreApellido);
		
		/**/
		var correoTitulo = document.createElement('p');
			correoTitulo.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(correoTitulo);
			$(correoTitulo).text('Correo eléctronico :');

		var correo = document.createElement('p');
			correo.className = 'holder-profile-texto';
			$(rightDatosUsuario).append(correo);
			
		/**/
		var fechaTitulo = document.createElement('p');
			fechaTitulo.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(fechaTitulo);
			$(fechaTitulo).text('Fecha de nacimiento :');

		var fecha = document.createElement('p');
			fecha.className = 'holder-profile-texto';
			$(rightDatosUsuario).append(fecha);

		/**/
		var clasificacionTitulo = document.createElement('p');
			clasificacionTitulo.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(clasificacionTitulo);
			$(clasificacionTitulo).append('Clasificación Gral :');
			
		var clasificacionGralTexto = document.createElement('p');
			clasificacionGralTexto.className = 'holder-profile-texto';
			$(rightDatosUsuario).append(clasificacionGralTexto);	

		/**/
		var clasificacionAmigosTitulo = document.createElement('p');
			clasificacionAmigosTitulo.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(clasificacionAmigosTitulo);
			$(clasificacionAmigosTitulo).append('Clasificación entre amigos :');

		var clasificacionAmigosTexto = document.createElement('p');
			clasificacionAmigosTexto.className = 'holder-profile-texto';
			$(rightDatosUsuario).append(clasificacionAmigosTexto);	

		/**/
		var puntos = document.createElement('p');
			puntos.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(puntos);
			$(puntos).append('Puntos :');

		var puntosTexto = document.createElement('p');
			puntosTexto.className = 'holder-profile-texto';
			$(rightDatosUsuario).append(puntosTexto);
			
		/**/
		var pronosticos = document.createElement('p');
			pronosticos.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(pronosticos);
			$(pronosticos).append('Pronósticos :');

		var pronosticosTexto = document.createElement('p');
			pronosticosTexto.className = 'holder-profile-texto';
			$(rightDatosUsuario).append(pronosticosTexto);

		var equiposTitulo = document.createElement('p');
			equiposTitulo.className = 'holder-profile-titulo';
			$(rightDatosUsuario).append(equiposTitulo);
			$(equiposTitulo).text('Equipos Favoritos :');

		var ulEquipos = document.createElement('ul');
			ulEquipos.className = 'holder-profile-texto';
			$(rightDatosUsuario).append(ulEquipos);	

		var divHolderEditar = document.createElement('div');
			divHolderEditar.id = 'div-holder-editar-btn';
			$(holderDatosUsuario).append(divHolderEditar);

		var btnEditar = document.createElement('div');
			btnEditar.id = 'btn-editar';
			$(divHolderEditar).append(btnEditar);
			$(btnEditar).text('EDITAR PERFIL');
			$(btnEditar).bind('click' , doClickPerfil);		

		/*PANEL PARTICIPACIONES*/
		var holderParticipaciones = document.createElement('div');
			holderParticipaciones.id = 'holder-participaciones-polla';
			$(divScroll).append(holderParticipaciones);
			$(holderParticipaciones).bind('click' , doClickParticipaciones);
			$(holderParticipaciones).css({'margin-top' : 5});
			
		var holderPanelParticipacionesTitulo = document.createElement('div');
			holderPanelParticipacionesTitulo.className = 'wrapper-titulo-noticia';
			$(holderPanelParticipacionesTitulo).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
			$(holderPanelParticipacionesTitulo).css({'background-size' : '320px 60px'});
			$(holderParticipaciones).append(holderPanelParticipacionesTitulo);
		
		var titulo = document.createElement('h1');
			$(titulo).text('Partidos Jugados');
			$(titulo).css({'color' : '#FFF', 'margin-left' : 30});
			$(holderPanelParticipacionesTitulo).append(titulo);		

		var icono = new Image();
			icono.width = 35;
			icono.src = 'img/general/menu/polla.png?ac=1';
			$(holderPanelParticipacionesTitulo).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 9, 'top' : 10});		
		
		var holderParticipacionesContenido = document.createElement('div');
			holderParticipacionesContenido.id = 'holder-partidos-jugados-contenido';
			$(holderParticipaciones).append(holderParticipacionesContenido);
			$(holderParticipacionesContenido).css({'min-height' : 100});

		/*PANEL PROXIMOS*/
		var holderProximos = document.createElement('div');
			holderProximos.id = 'holder-proximos-polla';
			$(divScroll).append(holderProximos);
			$(holderProximos).css({'margin-top' : 5});
			
		var holderPanelProximosTitulo = document.createElement('div');
			holderPanelProximosTitulo.className = 'wrapper-titulo-noticia';
			$(holderPanelProximosTitulo).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
			$(holderPanelProximosTitulo).css({'background-size' : '320px 60px'});
			$(holderProximos).append(holderPanelProximosTitulo);
	
		var titulo = document.createElement('h1');
			$(titulo).text('Próximos partidos');
			$(titulo).css({'color' : '#FFF', 'margin-left' : 30});
			$(holderPanelProximosTitulo).append(titulo);
			$(holderProximos).bind('click' , doClickApuestas);		

		var icono = new Image();
			icono.width = 35;
			icono.src = 'img/general/menu/polla.png?ac=1';
			$(holderPanelProximosTitulo).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 9, 'top' : 10});		
		
		var holderProximosContenido = document.createElement('div');
			holderProximosContenido.id = 'holder-proximos-partidos-contenido';
			$(holderProximos).append(holderProximosContenido);
		
		function onCompleteXML(xml)
		{
			var imgProfile = new Image();
				imgProfile.width = 100;
				imgProfile.src = 'http://graph.facebook.com/'+$(xml).find('personales').find('fb_uid').text()+'/picture?width=100&height=100';
				
			$(holderFoto).append(imgProfile);
			$(nombreApellido).text($(xml).find('personales').find('nombre').text());
			$(correo).text($(xml).find('personales').find('email').text());
			$(fecha).text($(xml).find('personales').find('fechaNacimiento').text());			
			$(clasificacionGralTexto).append($(xml).find('personales').find('clasificacionGral').text());
			$(clasificacionAmigosTexto).append($(xml).find('personales').find('clasificacionAmigos').text());
			$(puntosTexto).append($(xml).find('personales').find('puntos').text());
			$(pronosticosTexto).append($(xml).find('personales').find('pronosticos').text());
			
			$(xml).find('favoritos').find('seleccion').each(function(index, element) 
			{
                $(ulEquipos).append('<li>'+$(this).find('seleccionNombre').text()+'</li>');
            });
			
			if($(xml).find('proximosPartidos').find('partido').length == 0)
			{
				$(holderProximosContenido).append('<p class="mensaje">Actualmente no hay próximos partidos.</p>');
				$(holderProximos).unbind('click' , doClickApuestas);		
			}
			else
			{
				$(xml).find('proximosPartidos').find('partido').each(function(index, element) 
				{						
					var itemProximo = new ItemProximoPartido(this, false, null);
					$(holderProximosContenido).append(itemProximo.div); 
				});	
			}
			
			if($(xml).find('partidosJugados').find('partido').length == 0)
			{
				$(holderParticipacionesContenido).append('<p class="mensaje">Aún no se han jugado los partidos <br/>dónde apostaste.</p>');
				$(holderParticipaciones).unbind('click' , doClickParticipaciones);
			}
			else
			{
				$(xml).find('partidosJugados').find('partido').each(function(index, element) 
				{						
					var itemPartidoJugado = new ItemPartidoJugado(this, self);
					$(holderParticipacionesContenido).append(itemPartidoJugado.div);
				});	
			}
			
			objApp.ocultarCargador();						
		}	
				
		function doClickApuestas()
		{
			objApp.Navigate('proximos', nodo);
		}
		
		function doClickParticipaciones()
		{
			objApp.Navigate('apostados', nodo);
		}
		
		function onErrorXML()
		{
			objApp.error('Ha ocurrido un error con la conexión');	
		}
		
		function doClickPerfil()
		{
			objApp.Navigate('perfil', nodo);
		}	
			
		self.showLightbox = function(obj)
		{
			if(animando)
				return;

			animando = true;	
			$(holderLightBoxContenido).empty();
			$(holderLightBoxContenido).append(obj.div);
			
			$(holderItems).transition({scale : 0.5, duration : 500}).transition({opacity : 0});
			$(holderLightBox).stop().delay(500).fadeIn(500, function(){animando = false;});	
		}
		function doCloseLighBox()
		{
			if(animando)
				return;

			animando = true;	
				
			$(holderLightBox).stop().fadeOut(500);
			$(holderItems).delay(500).transition({opacity : 1}).transition({scale : 1, duration : 500});
			animando = false;	
		}		
	}
	
	window.Polla = Polla;

})(window);