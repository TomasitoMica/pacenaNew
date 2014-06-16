(function(window)
{
	function BtnMenu(nodo)
	{
		var self = this;
		var key     = $(nodo).attr('key');
		var color   = $(nodo).attr('color');
		var texto   = $(nodo).text();
		var imgItem = $(nodo).attr('key')+'.png';
		var colorTexto = $(nodo).attr('color-text');
		var top = parseInt($(nodo).attr('top'));	
		var right = ($(nodo).attr('key') == 'pantallas') ? 15 : 9;
		var width = ($(nodo).attr('key') == 'pantallas') ? 24 : 35;
		
		self.div = document.createElement('div');
		self.div.className = 'btn-menu';
		
		if(objApp.isTouch())
			$(self.div).bind('click' , doClick);
		else
			$(self.div).bind('click' , doClick);
		
		$(self.div).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
		$(self.div).css({'background-size' : '320px 60px', 'color' :  colorTexto});
	
		var innerBtn = document.createElement('div');
			innerBtn.className = 'inner-btn-menu';
			$(self.div).append(innerBtn);
			$(innerBtn).text(texto);
			
		var icono = new Image();
			icono.width = width;
			icono.src = 'img/general/menu/'+imgItem+'?ac=2';
			$(self.div).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : right, 'top' : top});
			
		self.inicializar = function(DELAY)
		{
			$(self.div).css({scale : 0.5}).delay(DELAY).transition({opacity : 1, scale : 1, duration : 500});
		}
		
		function doClick()
		{
			objApp.Navigate(key, nodo);
		}
		
	}
	
	window.BtnMenu = BtnMenu;

})(window);