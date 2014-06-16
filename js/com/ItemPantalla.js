(function(window)
{
	function ItemPantalla(nodo, parent, indice)
	{
		var self = this;
		
		self.div = document.createElement('div');
		self.div.className = 'item-pantalla';
		$(self.div).css({'opacity' : 0});
		
		/*if(indice == 0)
			$(self.div).css({'margin-top' : -8});*/

		var textoVertical = document.createElement('div');
			$(textoVertical).css({'width' : 30, 'float' : 'left', 'height' : 55});
			$(self.div).append(textoVertical);

		var tituloPantalla = document.createElement('div');
			$(tituloPantalla).css({'width' : 200, 'float' : 'left', 'height' : 25, 'overflow' : 'hidden', 'margin-top' : 18});
			$(self.div).append(tituloPantalla);
			$(tituloPantalla).append('<h4>'+$(nodo).find('nombre').text()+' '+$(nodo).find('direccion').text()+'</h4>');

		var verMapa = document.createElement('div');
			verMapa.className = 'ver-mapa-btn';
			$(verMapa).css({'width' : 80, 'float' : 'left', 'height' : 37});
			$(self.div).append(verMapa);
			$(verMapa).append('<span>VER MAPA</span>');
			
		if(objApp.isTouch())
			$(verMapa).bind('click' , doClick);
		else
			$(verMapa).bind('click' , doClick);			
			
		function doClick()
		{
			parent.showMap(nodo);
		}

		self.inicializar = function(DELAY)
		{
			$(self.div).css({scale : 0.5}).delay(DELAY).transition({opacity : 1, scale : 1, duration : 500});
		}			
	}
	
	window.ItemPantalla = ItemPantalla;
	
})(window);
