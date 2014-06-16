(function(window)
{
	function ItemMediaCategoria(nodo, parent, indice)
	{
		var self = this;
		
		self.div = document.createElement('div');
		self.div.className = 'item-media';
		$(self.div).css({'opacity' : 0});
		
		if(objApp.isTouch())
			$(self.div).bind('click' , doClick);
		else
			$(self.div).bind('click' , doClick);
					
		var imagenWrapper = document.createElement('div');
			imagenWrapper.className = 'imagen-item-media';
			$(self.div).append(imagenWrapper);
		
		if(parseInt($(nodo).find('video').text()) != 1)
		{
			var imagen = new Image();
				imagen.width = 92;
				imagen.src = objApp.SERVER+'global/img/media/'+$(nodo).find('archivo').text();
				$(imagen).css({'display' : 'none'});
				$(imagenWrapper).append(imagen);
				$(imagen).load(function()
				{
					$(this).fadeIn(500);
				});			
		}	
		else
		{
			var imagen = new Image();
				imagen.width = 92;
				imagen.src = 'http://i.ytimg.com/vi/'+$(nodo).find('archivo').text()+'/default.jpg';
				$(imagenWrapper).append(imagen);
				$(imagen).css({'display' : 'none'});
				$(imagen).load(function()
				{
					$(this).fadeIn(500);
				});	
		}
		
		var tituloPantalla = document.createElement('div');
			$(tituloPantalla).css({'width' : 218, 'float' : 'left', 'height' : 55});
			$(self.div).append(tituloPantalla);
			
			var textoH4 = $(nodo).find('nombre').text().replace(/\\/g, '');
			$(tituloPantalla).append('<h4>'+textoH4+'</h4>');
		
		function doClick()
		{
			parent.loadCategorias(parseInt($(nodo).find('id').text()));
		}
		
		self.inicializar = function(DELAY)
		{
			$(self.div).css({scale : 0.5}).delay(DELAY).transition({opacity : 1, scale : 1, duration : 500});
		}		
	}
	
	window.ItemMediaCategoria = ItemMediaCategoria;

})(window);