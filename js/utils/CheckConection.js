(function(window)
{
	function CheckConection()
	{
		var self = this;
			self.div = document.createElement('div');
			self.div.id = 'check-connection-wrapper';
	
		var holderContenido = document.createElement('div');
			holderContenido.id = 'holder-contenido-check-connection';
		
		var logo = new Image();
			logo.src = 'img/general/logo-pacena.png';
			$(holderContenido).append(logo);
			$(logo).css({'margin-left' : 70, 'float' : 'left'});
		
		$(self.div).append(holderContenido);
		$(holderContenido).append('<span>DEBES ESTAR CONECTADO PARA UTILIZAR LA APLICACION <br> POR FAVOR VERIFICA TU CONEXIÓN</span>');
		
		$("body").append(self.div);
			
		self.mostrar = function ()
		{
			$(self.div).css({display : 'block'});		
		}
		
		self.ocultar = function ()
		{
			$(self.div).css({'display' : 'none'});
		}
			
		self.ocultar();
		
	}
	
	window.CheckConection = CheckConection;
	
})(window);