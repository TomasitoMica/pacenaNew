(function(window)
{
	function Stats(nodo)
	{
		var self = this;
		var animando = false;
		var array_items = [];
		var delay = 200;		
		var ALTO_HEADER = 180;
		var altoItems = 65;
		var dataXml;
		var mostrandoCategorias = true;
		
		var altoPantalla = (window.innerHeight - ALTO_HEADER) -5;
		
		self.div = document.createElement('div');
		self.div.className = 'class-cero';

		var objTituloSeccion = new TituloSeccion(nodo);
			$(self.div).append(objTituloSeccion.div);	
			$(self.div).append('<div class="clear"></div>');

		var holderItems = document.createElement('div');
			$(self.div).append(holderItems);
			$(holderItems).css({'width' : 320, 'float' : 'left'});

		var divScroll = document.createElement('div');
			divScroll.className = 'divScroll';
			$(holderItems).append(divScroll);
			$(divScroll).css({'height' : altoPantalla, 'margin-top' : 0, 'background' :'rgba(255,255,255,0.6)'});						

			objApp.ocultarCargador();
			
	}
	
	window.Stats = Stats;

})(window);