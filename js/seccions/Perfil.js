(function(window)
{
	function Perfil(nodo)
	{
		var self = this;
		var array_checks = [];
		var mostrandoEquipos = false;
		var ALTO_HEADER = 180;
		var altoItems = 65;
		var array_favoritos = [];
		
		var altoPantalla = (window.innerHeight - ALTO_HEADER) + 10;
		
		self.div = document.createElement('div');
		self.div.className = 'class-cero';

		//Titulo
		var holderTituloRegistro = document.createElement('div');
			holderTituloRegistro.className = 'wrapper-titulo-registro';
			$(holderTituloRegistro).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
			$(holderTituloRegistro).css({'background-size' : '320px 60px'});
			$(self.div).append(holderTituloRegistro);
	
		var titulo = document.createElement('h1');
			$(titulo).text('REGISTRARSE');
			$(titulo).css({'color' : '#FFF', 'margin-left' : 105});
			$(holderTituloRegistro).append(titulo);

		var icono = new Image();
			icono.width = 30;
			icono.src = 'img/general/menu/registrarse.png?ac=1';
			$(holderTituloRegistro).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 15, 'top' : 8});

		var divVolverAPolla = document.createElement('div');
			divVolverAPolla.className = 'btn-volver-seccion';
			$(holderTituloRegistro).append(divVolverAPolla);
			$(divVolverAPolla).css({'background' : 'url(img/general/volver_white.png) no-repeat'});
			$(divVolverAPolla).css({'background-size' : '16px', 'background-position' : 'left'});			
			$(divVolverAPolla).css({'color':'#FFF', 'padding-left': 18});
			$(divVolverAPolla).text('VOLVER');
			$(divVolverAPolla).bind('click' , doVolver);
					
		var holderItems = document.createElement('div');
			holderItems.id = 'wrapper-datos-notificaciones-perfil';
			$(self.div).append(holderItems);

		var divScroll = document.createElement('div');
			divScroll.className = 'divScroll';
			$(holderItems).append(divScroll);
			$(divScroll).css({'height' : altoPantalla, 'margin-top' : -18, 'background' : 'rgba(255,255,255,0.6)'});
	
		var divAuxiliar = document.createElement('div');
			$(divScroll).append(divAuxiliar);
			$(divAuxiliar).css({'width' : 315, 'margin-left' : 5});	
			
		$(divAuxiliar).append('<h3>Deseo recibir notificaciones de:<h3>');
	
		var holderNotificacionesGenerales = document.createElement('div');
			$(holderNotificacionesGenerales).css({'width' : '100%','float' : 'left', 'position' : 'relative', 'height' : '50px'});
			$(divAuxiliar).append(holderNotificacionesGenerales);	
					
		var tickInicioPartido = new TickComponentNotifiacion(self);
			$(holderNotificacionesGenerales).append(tickInicioPartido.div);
	
		var textInicioPartido = document.createElement('p');
			$(textInicioPartido).text('Inicio de partido');
			$(holderNotificacionesGenerales).append(textInicioPartido);
			$(textInicioPartido).css({'position' : 'absolute', 'left' : 32, 'top' : 8});
	
		var tickFinalPartido = new TickComponentNotifiacion(self);
			$(holderNotificacionesGenerales).append(tickFinalPartido.div);
			$(tickFinalPartido.div).css({'left' : 163});
	
		var textFinalPartido = document.createElement('p');
			$(textFinalPartido).text('Final de partido');
			$(holderNotificacionesGenerales).append(textFinalPartido);
			$(textFinalPartido).css({'position' : 'absolute', 'left' : 195, 'top' : 8});
	
		/**/
		var holderNotificacionesFavNoticias = document.createElement('div');
			$(holderNotificacionesFavNoticias).css({'width' : '100%', 'height' : 45, 'float' : 'left', 'position' : 'relative'});
			$(divAuxiliar).append(holderNotificacionesFavNoticias);	
		
		//Goles	
		var tickGoles = new TickComponentNotifiacion(self);
			$(holderNotificacionesFavNoticias).append(tickGoles.div);
	
		var textGoles = document.createElement('p');
			$(textGoles).text('Goles');
			$(holderNotificacionesFavNoticias).append(textGoles);
			$(textGoles).css({'position' : 'absolute', 'left' : 32, 'top' : 8});
	
		//Noticias
		var tickNoticias = new TickComponentNotifiacion(self);
			$(holderNotificacionesFavNoticias).append(tickNoticias.div);
			$(tickNoticias.div).css({'left' : 163});
	
		var textNoticias = document.createElement('p');
			$(textNoticias).text('Noticias');
			$(holderNotificacionesFavNoticias).append(textNoticias);
			$(textNoticias).css({'position' : 'absolute', 'left' : 195, 'top' : 8});
			
		/**/
		var holderEquipos = document.createElement('div');
			$(holderEquipos).css({'width' : '100%', 'height' : 27, 'float' : 'left', 'position' : 'relative'});
			$(divAuxiliar).append(holderEquipos);	
	
		var textEquipos = document.createElement('p');
			$(textEquipos).text('Equipos Favoritos');
			$(holderEquipos).append(textEquipos);
			$(textEquipos).css({'float' : 'left', 'margin-top' : 2});
			
		var flechaDown = new Image();
			flechaDown.src = 'img/secciones/registro/flecha-down.png';	
			flechaDown.width = 22;
			$(holderEquipos).append(flechaDown);
			$(flechaDown).css({'float' : 'left', 'margin-left' : 5, 'margin-top' : 5});
			$(holderEquipos).append('<div class="clear"></div>');
			
			$(flechaDown).bind('click' , slideDownEquipos);
			$(textEquipos).bind('click' , slideDownEquipos);
	
		/**/	
		var holderEquiposResize = document.createElement('div');
			$(divAuxiliar).append(holderEquiposResize);
			$(holderEquiposResize).css
			({
				'width' : '98%', 'height': 'auto', 'float' : 'left', 
				'position' : 'relative', 'background' : 'rgba(180, 178, 178, 0.6)', 
				'overflow' : 'hidden', 'display' : 'none', 'border-top' : '#000 solid 1px',
				'border-bottom' : '#000 solid 1px'
			});

		$(divAuxiliar).append('<h3>Notificaciones juegos de pronósticos:<h3>');
	
		var holderAcertastes = document.createElement('div');
			$(holderAcertastes).css({'width' : '100%', 'height' : 45, 'float' : 'left', 'position' : 'relative'});
			$(divAuxiliar).append(holderAcertastes);	
					
		var tickAcertasteResultado = new TickComponentNotifiacion(self);
			$(holderAcertastes).append(tickAcertasteResultado.div);
	
		var textAcertasteResultado = document.createElement('p');
			$(textAcertasteResultado).text('Acertaste pronóstico');
			$(holderAcertastes).append(textAcertasteResultado);
			$(textAcertasteResultado).css({'position' : 'absolute', 'left' : 32, 'top' : 8});
	
		var ticPartidoCerrarse = new TickComponentNotifiacion(self);
			$(holderAcertastes).append(ticPartidoCerrarse.div);
			$(ticPartidoCerrarse.div).css({'left' : 163});
	
		var textPartidoCerrarse = document.createElement('p');
			$(textPartidoCerrarse).text('Partido por cerrarse');
			$(holderAcertastes).append(textPartidoCerrarse);
			$(textPartidoCerrarse).css({'position' : 'absolute', 'left' : 195, 'top' : 8});
	
		/**/
		var holderPartidosPuntos = document.createElement('div');
			$(holderPartidosPuntos).css({'width' : '100%', 'height' : 45, 'float' : 'left', 'position' : 'relative'});
			$(divAuxiliar).append(holderPartidosPuntos);	
	
		var tickTotalPuntos = new TickComponentNotifiacion(self);
			$(holderPartidosPuntos).append(tickTotalPuntos.div);
	
		var textTotalPuntos = document.createElement('p');
			$(textTotalPuntos).text('Total puntos');
			$(holderPartidosPuntos).append(textTotalPuntos);
			$(textTotalPuntos).css({'position' : 'absolute', 'left' : 32, 'top' : 8});										
	
		var divButton = document.createElement('div');
			$(divAuxiliar).append(divButton);
			$(divButton).css({'width' : '100%', 'height' : 60, 'float' : 'left', 'position' : 'relative'});
	
		var btnNext = document.createElement('div');
			btnNext.className = 'btn-next';
			$(divButton).append(btnNext);
			$(btnNext).text('GUARDAR');	
			$(btnNext).css({'top' : 10});
			$(btnNext).bind('click' , doGuardar);

		$(divAuxiliar).append('<div class="clear"></div>');
		
		$.ajax
		({
			url  : objApp.SERVER+'ws/ws-obtenerPerfilUsuario.php',
			type : 'POST',
			data : {'id' : objApp.idUsuario},
			success : onCompleteGetPerfil
		});				
		
		function doVolver()
		{
			objApp.Navigate('polla', nodo);	
		}			
		
		function slideDownEquipos()
		{
			if(!mostrandoEquipos)
			{
				$(flechaDown).attr('src' , 'img/secciones/registro/flecha-up.png');	
				$(holderEquiposResize).slideDown("slow");
				mostrandoEquipos = true;
			}
			else
			{
				$(flechaDown).attr('src' , 'img/secciones/registro/flecha-down.png');	
				$(holderEquiposResize).slideUp("slow");
				mostrandoEquipos = false;
			}
		}
		
		function onCompleteGetPerfil(xml)
		{
			objApp.ocultarCargador();
	
			$(xml).find('selecciones').find('seleccion').each(function(index, element) 
			{
				var itemNotificacion = new ItemNotificacion(this, index);
				
				if(parseInt($(this).find('activo').text()) == 1)
					itemNotificacion.setChecked();
					
			   $(holderEquiposResize).append(itemNotificacion.div);
			   array_favoritos.push(itemNotificacion);
			});
			
			if(parseInt($(xml).find('notificaciones').find('inicioPartido').text()) == 1)
				tickInicioPartido.setEstadoActivo();

			if(parseInt($(xml).find('notificaciones').find('finPartido').text()) == 1)
				tickFinalPartido.setEstadoActivo();

			if(parseInt($(xml).find('notificaciones').find('goles').text()) == 1)
				tickGoles.setEstadoActivo();

			if(parseInt($(xml).find('notificaciones').find('noticias').text()) == 1)
				tickNoticias.setEstadoActivo();

			if(parseInt($(xml).find('notificaciones').find('pronostico').text()) == 1)
				tickAcertasteResultado.setEstadoActivo();

			if(parseInt($(xml).find('notificaciones').find('partidoCerrarse').text()) == 1)
				ticPartidoCerrarse.setEstadoActivo();

			if(parseInt($(xml).find('notificaciones').find('puntos').text()) == 1)
				tickTotalPuntos.setEstadoActivo();
		}
		
		function doGuardar()
		{
			objApp.mostrarCargador();
	
			var stringFavoritos = '';
			
			for(var i = 0; i < array_favoritos.length; ++i)
			{
				if(array_favoritos[i].getEstado() == 1)
				{
					if(i == (array_favoritos.length -1))
						stringFavoritos += array_favoritos[i].idPais();
					else
						stringFavoritos += array_favoritos[i].idPais()+',';
				}
			}
			
			var params =
			{
				'usuario_id' : objApp.idUsuario,
				'notificaciones_inicio_partido' : tickInicioPartido.getEstado(),
				'notificaciones_fin_partido' : tickFinalPartido.getEstado(),
				'notificaciones_goles' : tickGoles.getEstado(),
				'notificaciones_noticias' : tickNoticias.getEstado(),
				'notificaciones_acertaste_pronostico' : tickAcertasteResultado.getEstado(),
				'notificaciones_partido_por_cerrarse' : ticPartidoCerrarse.getEstado(),
				'notificaciones_total_puntos' : tickTotalPuntos.getEstado(),
				'selecciones_favoritas' : stringFavoritos,
				'guardo_favoritas' : 1
			}
			
			$.ajax
			({
				url  : objApp.SERVER+'ws/ws-actualizoFavoritosNotificaciones.php',
				type : 'POST',
				data : params,
				success : onCompleteXML
			});	
		}
		
		function onCompleteXML(xml)
		{
			objApp.ocultarCargador();
			objApp.error('Datos guardados correctamente.');

		}
	}

	window.Perfil = Perfil;
	
})(window);