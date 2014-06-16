(function(window)
{
	function PartidoDelDia(nodo)
	{
		var self = this;
		
		self.div = document.createElement('div');
		self.div.className = 'partido-del-dia';
			
		var holderBandera1 = document.createElement('div');
			holderBandera1.className = 'holder-banderas-partido-del-dia';	
			$(self.div).append(holderBandera1);
			$(holderBandera1).css({'margin-left' : 40});
			
		var bandera1 = new Image();
			bandera1.src = objApp.SERVER+'global/img/banderas/bandera'+$(nodo).find('idLocal').text()+'.png?ac=1';
			bandera1.width = 50;
			$(holderBandera1).append(bandera1);
			$(bandera1).css({'display' : 'none'});
			$(bandera1).load(function()
			{
				$(this).fadeIn(500);
			});
			
		var holderNombreEquipo1 = document.createElement('div');
			holderNombreEquipo1.className = 'holder-nombre-equipo';
			$(holderBandera1).append(holderNombreEquipo1);
			$(holderNombreEquipo1).append($(nodo).find('local').text());
			
		var holderHorario =  document.createElement('div');		
			holderHorario.className = 'holder-horario-partido-del-dia';
			$(self.div).append(holderHorario);
			
		var innerHorario = document.createElement('div');	
			$(innerHorario).css
			({
				'width' : 80, 
				'height' : 20, 
				'background' : '#000', 
				'position' : 'absolute', 
				'left' : '50%', 'margin-left' : -40,
				'top' : 5,
				'font-family': 'Oswald',
				'color' : '#ffc600',
				'font-size' : 14
			});
			$(holderHorario).append(innerHorario);
			$(innerHorario).text($(nodo).find('fecha').text()+' HRS');
			
		var holderBandera2 = document.createElement('div');
			holderBandera2.className = 'holder-banderas-partido-del-dia';	
			$(self.div).append(holderBandera2);
			
		var bandera2 = new Image();
			bandera2.src = objApp.SERVER+'global/img/banderas/bandera'+$(nodo).find('idVisita').text()+'.png?ac=1';
			bandera2.width = 50;
			$(holderBandera2).append(bandera2);
			$(bandera2).css({'display' : 'none'});
			$(bandera2).load(function()
			{
				$(this).fadeIn(500);
			});
			
		var holderNombreEquipo2 = document.createElement('div');
			holderNombreEquipo2.className = 'holder-nombre-equipo';
			$(holderBandera2).append(holderNombreEquipo2);
			$(holderNombreEquipo2).append($(nodo).find('visitante').text());

	}
	
	window.PartidoDelDia = PartidoDelDia;
	
})(window);
		
