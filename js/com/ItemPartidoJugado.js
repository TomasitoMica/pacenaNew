(function(window)
{
	function ItemPartidoJugado(nodo, parent)
	{
		var self = this;
		self.div = document.createElement('div');
		self.div.className = 'item-partido-jugados-polla';

		var holderBanderas = document.createElement('div');
			holderBanderas.className = 'holder-banderas-partidos';	
			$(self.div).append(holderBanderas);
			
		var bandera1 = new Image();
			bandera1.src = objApp.SERVER+'global/img/banderas/bandera'+$(nodo).find('idLocal').text()+'.png?ac=2';
			bandera1.width = 71;
			$(holderBanderas).append(bandera1);
			$(bandera1).css({'position' : 'absolute', 'left' : 5 , 'top' : 5});
			
		var bandera2 = new Image();
			bandera2.src = objApp.SERVER+'global/img/banderas/bandera'+$(nodo).find('idVisita').text()+'.png?ac=2';
			bandera2.width = 71;
			$(holderBanderas).append(bandera2);	
			$(bandera2).css({'position' : 'absolute', 'left' : 57 , 'top' : 28});
		
		var textoVs = document.createElement('p');
			$(textoVs).text('VS');
			$(holderBanderas).append(textoVs);		

		var holderTextos = document.createElement('div');
			holderTextos.className = 'holder-detalles-partido-jugado';
			$(self.div).append(holderTextos);
			$(holderTextos).append('<p>'+$(nodo).find('local').text()+' VS '+$(nodo).find('visitante').text()+'</p>');
			$(holderTextos).append('<p>'+getStringFecha($(nodo).find('fecha').text())+'</p>');
			$(holderTextos).append('<p>Resultado : '+$(nodo).find('resultado').text()+'</p>');
			$(holderTextos).append('<p>¡Obtuviste '+$(nodo).find('puntos').text()+' puntos!</p>');

			$(holderTextos).css({'width' : 185, 'font-size' : 14, 'padding-top' : 6});

		self.inicializar = function(DELAY)
		{
			$(self.div).css({opacity : 0, scale : 0.5}).delay(DELAY).transition({opacity : 1, scale : 1, duration : 500});
		}	
	}
	
	window.ItemPartidoJugado = ItemPartidoJugado;
	
})(window)