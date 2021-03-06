(function(window)
{
	function TickComponent(parent)
	{
		var self = this;
		var selected = 0;
		
		self.div = document.createElement('div');
		self.div.className = 'tick-component';
		$(self.div).bind('click' , doClick);
		
		function doClick()
		{
			if(selected)
			{
				$(self.div).css({'background' : 'url(img/secciones/registro/tick.png) no-repeat'});
				$(self.div).css({'background-size' : '31px 30px'});
				selected = 0;
			}
			else
			{
				$(self.div).css({'background' : 'url(img/secciones/registro/tick-selected.png) no-repeat'});
				$(self.div).css({'background-size' : '31px 30px'});
				selected = 1;
			}
			
			parent.sendEstado(selected);
		}	
		
		self.getEstado = function()
		{
			return selected;
		}	
	}

	window.TickComponent = TickComponent;
	
})(window);