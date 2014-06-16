function PartidosApostados(nodo)
{
	var self = this;
	var ALTO_HEADER = 180;
	var altoPantalla = (window.innerHeight - ALTO_HEADER);
	var array_items = [];
	var delay = 200;
	var animando = false;
		
	self.div = document.createElement('div');
	self.div.className = 'class-cero';

	$.ajax
	({
		url  : objApp.SERVER+'ws/ws-getPartidosApostados.php',
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
		$(divVolver).css({'color':'#FFF'});
		$(divVolver).text('VOLVER');

	var titulo = document.createElement('h1');
		$(titulo).text('PARTIDOS JUGADOS');
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
		$(divScroll).css({'height' : altoPantalla, 'margin-top' : 0});
		$(divScroll).css({'background':'rgba(255,255,255,0.6)'});

	function onCompleteXML(xml)
	{
		objApp.ocultarCargador();
		
		if($(xml).find('partido').length == 0)
		{
			objApp.error('No haz participado de ninguna apuesta aún.');
		}
		else
		{
			$(divScroll).empty();
			
			var cantidad = $(xml).find('partido').length;
			
			$(xml).find('partido').each(function(index, element) 
			{						
				var itemPartidoJugado = new ItemPartidoJugado(this, self);
				$(divScroll).append(itemPartidoJugado.div);
				
				array_items.push(itemPartidoJugado);
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
	
}