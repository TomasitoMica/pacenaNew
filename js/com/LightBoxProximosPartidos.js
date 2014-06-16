function ProximosPartidos(xml)
{
	var self = this;
	
	self.div = document.createElement('div');
	$(self.div).css({'width' : 320});
	
	$(xml).find('proximosPartidos').find('partido').each(function(index, element) 
	{						
		var itemProximo = new ItemProximoPartido(this);
		$(self.div).append(itemProximo.div);
	});		
}