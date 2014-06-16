(function(window)
{
	function ItemVersusApuesta(nodo, parent)
	{
		var self = this;
		
		self.div = document.createElement('div');
		self.div.className = 'item-versus-polla';
			
		var holderBanderas = document.createElement('div');
			holderBanderas.className = 'holder-banderas-partidos';	
			$(self.div).append(holderBanderas);
			
		var bandera1 = new Image();
			bandera1.src = objApp.SERVER+'global/img/banderas/bandera'+$(nodo).find('idLocal').text()+'.png?ac=1';
			bandera1.width = 71;
			$(holderBanderas).append(bandera1);
			$(bandera1).css({'position' : 'absolute', 'left' : 5 , 'top' : 5});
			
		var bandera2 = new Image();
			bandera2.src = objApp.SERVER+'global/img/banderas/bandera'+$(nodo).find('idVisita').text()+'.png?ac=1';
			bandera2.width = 71;
			$(holderBanderas).append(bandera2);	
			$(bandera2).css({'position' : 'absolute', 'left' : 57 , 'top' : 28});
		
		var textoVs = document.createElement('p');
			$(textoVs).text('VS');
			$(holderBanderas).append(textoVs);	
		
		var holderTextos = document.createElement('div');
			holderTextos.className = 'holder-detalles-partido';
			$(self.div).append(holderTextos);
			$(holderTextos).append('<p>'+$(nodo).find('local').text()+' VS '+$(nodo).find('visitante').text()+'</p>');
			$(holderTextos).append('<p>'+getStringFecha($(nodo).find('fecha').text())+'</p>');
			$(holderTextos).append('<p>'+$(nodo).find('estadio').text()+'</p>');
			
		function getStringFecha(fecha)
		{
			//2014-05-28 19:04:39
			var aux = fecha.split(' ');
			var date = aux[0];
			var hour = aux[1];
			
			var auxHora = hour.split(':');	
			var hourOutSeconds = auxHora[0] +':'+ auxHora[1];
			
			var auxFecha = date.split('-');
			var day = auxFecha[2];
			var mesNumber = auxFecha[1];
			var anio = auxFecha[0];
			var mesString;
			
			switch(mesNumber)
			{
				case '01':
					mesString = 'Ene.';
				break;
				case '02':
					mesString = 'Feb.';
				break;
				case '03':
					mesString = 'Mar.';
				break;
				case '04':
					mesString = 'Abr.';
				break;
				case '05':
					mesString = 'May.';
				break;
				case '06':
					mesString = 'Jun.';
				break;	
				case '07':
					mesString = 'Jul.';
				break;
				case '08':
					mesString = 'Ago.';
				break;
				case '09':
					mesString = 'Set.';
				break;
				case '10':
					mesString = 'Oct.';
				break;
				case '11':
					mesString = 'Nov.';
				break;
				case '12':
					mesString = 'Dic.';
				break;																			
			}	
			
			return (day +' '+mesString+' '+anio+' - '+hourOutSeconds+' Hora Local');
		}			
	}
	
	window.ItemVersusApuesta = ItemVersusApuesta;
	
})(window);
		
