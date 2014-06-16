function ProximosPartidos(nodo)
{
	console.log('Proximos partidos');	

	var self = this;
	var ALTO_HEADER = 180;
	var altoPantalla = (window.innerHeight - ALTO_HEADER);
	var array_items = [];
	var delay = 200;
	var animando = false;
		
	self.div = document.createElement('div');
	self.div.className = 'class-cero';
	$(self.div).css({'-webkit-transform' : 'translate3d(0,0,0)'});

	$.ajax
	({
		url  : objApp.SERVER+'ws/ws-getProximosPartidos.php',
		type : 'POST',
		data : {'id' : objApp.idUsuario},
		success : onCompleteXML,
		error : onErrorXML
	});	

	var holderItems = document.createElement('div');
		$(self.div).append(holderItems);
		$(holderItems).css({'width' : 320, 'float' : 'left'});
						
	var holderTituloLightBox = document.createElement('div');
		holderTituloLightBox.className = 'wrapper-titulo-noticia';
		$(holderTituloLightBox).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
		$(holderTituloLightBox).css({'background-size' : '320px 60px'});
		$(holderItems).append(holderTituloLightBox);

	var divVolver = document.createElement('div');
		divVolver.className = 'btn-volver-seccion';
		$(holderTituloLightBox).append(divVolver);
		$(divVolver).css({'background' : 'url(img/general/volver_white.png) no-repeat'});
		$(divVolver).css({'background-size' : '16px', 'background-position' : 'left'});			
		$(divVolver).css({'color':'#FFF', 'padding-left' : '19px'});
		$(divVolver).text('VOLVER');

	var titulo = document.createElement('h1');
		$(titulo).text('PRÓXIMOS PARTIDOS');
		$(titulo).css({'color' : '#FFF', 'margin-left' : 87});
		$(holderTituloLightBox).append(titulo);

	if(objApp.isTouch())
		$(divVolver).bind('touchstart' , doClose);
	else
		$(divVolver).bind('click' , doClose);

	var icono = new Image();
		icono.width = 35;
		icono.src = 'img/general/menu/polla.png?ac=1';
		$(holderTituloLightBox).append(icono);	
		$(icono).css({'position' : 'absolute' , 'right' : 9, 'top' : 10});		
		
	var divScroll = document.createElement('div');
		divScroll.className = 'divScroll';
		$(holderItems).append(divScroll);
		$(divScroll).css({'height' : altoPantalla, 'margin-top' : '-18px'});
		$(divScroll).css({'background':'rgba(255,255,255,0.6)'});

	/*--------------------------------------------------------*/
	
		var holderApuesta = document.createElement('div');
			holderApuesta.className = 'holder-general-item';
			$(self.div).append(holderApuesta);
		
		var holderTituloApuesta = document.createElement('div');
			holderTituloApuesta.className = 'wrapper-titulo-noticia';
			$(holderTituloApuesta).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
			$(holderTituloApuesta).css({'background-size' : '320px 60px'});
			$(holderApuesta).append(holderTituloApuesta);

		var divVolverApuesta = document.createElement('div');
			divVolverApuesta.className = 'btn-volver-seccion';
			$(holderTituloApuesta).append(divVolverApuesta);
			$(divVolverApuesta).css({'background' : 'url(img/general/volver_white.png) no-repeat'});
			$(divVolverApuesta).css({'background-size' : '16px', 'background-position' : 'left'});			
			$(divVolverApuesta).css({'color':'#000'});

		var divVolverProximos = document.createElement('div');
			divVolverProximos.className = 'btn-volver-inicio';
			$(holderTituloApuesta).append(divVolverProximos);
			$(divVolverProximos).text('PRÓXIMOS PARTIDOS');
			$(divVolverProximos).css({'color':'#FFF', 'width' : 90, 'font-size' : 10});
	
		var titulo = document.createElement('h1');
			$(titulo).text('PRONÓSTICO');
			$(titulo).css({'color' : '#FFF', 'margin-left' : 130});
			$(holderTituloApuesta).append(titulo);

		if(objApp.isTouch())
		{
			$(divVolverApuesta).bind('touchstart' , doCloseApuesta);
			$(divVolverProximos).bind('touchstart' , doCloseApuesta);
		}
		else
		{
			$(divVolverApuesta).bind('click' , doCloseApuesta);
			$(divVolverProximos).bind('click' , doCloseApuesta);
		}
		
		var icono = new Image();
			icono.width = 35;
			icono.src = 'img/general/menu/noticias.png?ac=1';
			$(holderTituloApuesta).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 9, 'top' : 10});		
		
		var holderApuestaContenido = document.createElement('div');
			holderApuestaContenido.id = 'holder-apuesta-contenido';
			$(holderApuesta).append(holderApuestaContenido);	


	function onCompleteXML(xml)
	{
		objApp.ocultarCargador();
		
		if($(xml).find('partido').length == 0)
		{
			$(divScroll).append('<p class="mensaje">Actualmente no hay próximos partidos.</p>');
		}
		else
		{
			var cantidad = $(xml).find('partido').length;
			
			$(xml).find('partido').each(function(index, element) 
			{						
				var itemProximo = new ItemProximoPartido(this, true, self);
				$(divScroll).append(itemProximo.div);
				array_items.push(itemProximo);
			});
			
			for(var i = 0; i < array_items.length; ++i)	
			{
				array_items[i].inicializar(delay);
				delay +=200;
			}
		}
	}
	
	function onErrorXML(){}
	function doClose()
	{
		objApp.Navigate('polla', nodo);	
	}	
	
	self.refrescarLista = function()
	{
		delay = 200;
		array_items = [];
		$(divScroll).empty();
		
		$.ajax
		({
			url  : objApp.SERVER+'ws/ws-getProximosPartidos.php',
			type : 'POST',
			data : {'id' : objApp.idUsuario},
			success : onCompleteXML,
			error : onErrorXML
		});			
	}	
		
	self.showApuesta = function(nodo)
	{
		if(animando)
			return;

		animando = true;	
		$(holderApuestaContenido).empty();
		
		var lightboxVs = new LightBoxVersus(nodo, self);		
		$(holderApuestaContenido).append(lightboxVs.div);
				
		$(holderItems).transition({scale : 0.5, duration : 500}).transition({opacity : 0});
		$(holderApuesta).stop().delay(500).fadeIn(500, function(){animando = false;});	
	}
	function doCloseApuesta()
	{
		if(animando)
			return;

		animando = true;	
			
		$(holderApuesta).stop().fadeOut(500);
		$(holderItems).delay(500).transition({opacity : 1}).transition({scale : 1, duration : 500});
		animando = false;	
	}						
	
}