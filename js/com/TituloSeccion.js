(function(window)
{
	function TituloSeccion(o)
	{
		var self = this;
		var color   = $(o).attr('color');
		var texto   = $(o).text();
		var imgItem = $(o).attr('key')+'.png';	
		var colorTexto = $(o).attr('color-text');		
		var top = parseInt($(o).attr('top'));	
		var right = ($(o).attr('key') == 'pantallas') ? 15 : 9;
		var width = ($(o).attr('key') == 'pantallas') ? 24 : 35;
		
		self.div = document.createElement('div');
		self.div.className = 'wrapper-titulo-seccion';
		$(self.div).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
		$(self.div).css({'background-size' : '320px 60px', 'color' :  colorTexto});
	
		var divVolver = document.createElement('div');
			divVolver.className = 'btn-volver-inicio';
			$(self.div).append(divVolver);
			$(divVolver).text('INICIO');
			$(divVolver).css({'background' : 'url(img/general/volver_'+colorTexto+'.png) no-repeat'});
			$(divVolver).css({'background-size' : '16px', 'background-position' : 'left'});			
			$(divVolver).css({'color':colorTexto});

		/*if(objApp.isTouch())
			$(divVolver).bind('touchend' , doVolver);
		else*/
			$(divVolver).bind('click' , doVolver);
		
		var titulo = document.createElement('h1');
			$(titulo).text(texto);
			$(titulo).css({'color' : colorTexto});
			$(self.div).append(titulo);
		
		var icono = new Image();
			icono.width = width;
			icono.src = 'img/general/menu/'+imgItem+'?ac=1';
			$(self.div).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : right, 'top' : top});
			
		function doVolver()
		{
			objApp.Navigate('inicio', null);
		}
	}
	
	window.TituloSeccion = TituloSeccion;
	
})(window);