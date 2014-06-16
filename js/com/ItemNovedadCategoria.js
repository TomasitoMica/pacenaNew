(function(window)
{
	function ItemNovedadCategoria(nodo, parent, indice)
	{
		var self = this;
		
		self.div = document.createElement('div');
		self.div.className = 'item-categoria-item';
		$(self.div).css({'opacity' : 0});
		
		if((indice%2) == 0) $(self.div).css({'margin-right' : 10});
		
		if(objApp.isTouch())
			$(self.div).bind('click' , doClick);
		else
			$(self.div).bind('click' , doClick);

		var tituloPantalla = document.createElement('div');
			tituloPantalla.className = 'titulo-categoria-noticias';
			$(self.div).append(tituloPantalla);
			
			var textoH4 = $(nodo).find('nombre').text().replace(/\\/g, '');
			$(tituloPantalla).append('<h4>'+textoH4+'</h4>');
					
		var imagenWrapper = document.createElement('div');
			imagenWrapper.className = 'imagen-item-categoria-noticias';
			$(self.div).append(imagenWrapper);
		
		if(parseInt($(nodo).find('video').text()) != 1)
		{
			var imagen = new Image();
				imagen.width = 155;
				imagen.src = objApp.SERVER+'global/img/noticias/'+$(nodo).find('archivo').text();
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
				imagen.width = 155;
				imagen.src = 'http://i.ytimg.com/vi/'+$(nodo).find('archivo').text()+'/hqdefault.jpg';
				$(imagenWrapper).append(imagen);
				$(imagen).css({'display' : 'none'});
				$(imagen).load(function()
				{
					$(this).fadeIn(500);
				});	
		}
		
		function doClick()
		{
			parent.loadCategorias(parseInt($(nodo).find('id').text()));
		}
		
		self.inicializar = function(DELAY)
		{
			$(self.div).css({scale : 0.5}).delay(DELAY).transition({opacity : 1, scale : 1, duration : 500});
		}		
	}
	
	window.ItemNovedadCategoria = ItemNovedadCategoria;

})(window);