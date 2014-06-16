(function(window)
{
	function Inicio()
	{
		var self = this;
		var arrayMenu = objApp.getMenu();
		var array_items = [];
		var delay = 200;
		
		self.div = document.createElement('div');
		self.div.className = 'class-cero';
		
		for(var i = 0; i < arrayMenu.length; ++i)
		{
			objBtnMenu = new BtnMenu(arrayMenu[i]);
			$(self.div).append(objBtnMenu.div); 
			$(self.div).append('<div class="clear"></div>'); 
			array_items.push(objBtnMenu);
		}
		
		for(var i = 0; i < array_items.length; ++i)	
		{
			array_items[i].inicializar(delay);
			delay +=200;
		}
	}
	
	window.Inicio = Inicio;

})(window);