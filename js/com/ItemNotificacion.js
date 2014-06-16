(function(window)
{
	function ItemNotificacion(nodo, indice)
	{
		var self = this;
		var checkeado = 0;
		var idPais = $(nodo).find('id').text();
	
		self.div = document.createElement('div');
		self.div.className = 'item-notificacion';
		
		var check = new TickComponentNotifiacion(self);
		$(self.div).append(check.div);	
		$(check.div).css({'float' : 'left'});
		
		var divTexto = document.createElement('div');
			divTexto.className = 'div-texto-notificacion';
			$(self.div).append(divTexto);
			$(divTexto).append($(nodo).find('pais').text());
			
			
		self.getEstado = function()
		{
			return check.getEstado();
		}
		
		self.idPais = function()
		{
			return idPais;
		}
		
		self.setChecked = function()
		{
			check.setEstadoActivo();
		}
	}
	
	window.ItemNotificacion = ItemNotificacion;

})(window);