function Cargador()
{
	var self = this;
		self.div = document.createElement('div');
		self.div.id = 'cargador';

	var holder_loading = document.createElement('div');
		holder_loading.id = 'holder_loader';
	
	$(self.div).append(holder_loading);
	$("body").append(self.div);
		
	self.mostrar = function ()
	{
		$(self.div).css({display : 'block'});		
	}
	
	self.ocultar = function ()
	{
		$(self.div).fadeOut('slow');
	}
		
	self.ocultar();
		
}