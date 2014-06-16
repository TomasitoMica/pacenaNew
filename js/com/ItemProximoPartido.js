(function(window)
{
	function ItemProximoPartido(nodo, bool, parent)
	{
		var self = this;
		self.div = document.createElement('div');
		self.div.className = 'item-versus-polla';

		var holderBanderas = document.createElement('div');
			holderBanderas.className = 'holder-banderas-partidos';	
			$(self.div).append(holderBanderas);
			
		var bandera1 = new Image();
			bandera1.src = objApp.SERVER+'global/img/banderas/bandera'+$(nodo).find('idLocal').text()+'.png?ac='+objApp.VERSION;
			bandera1.width = 71;
			$(holderBanderas).append(bandera1);
			$(bandera1).css({'position' : 'absolute', 'left' : 5 , 'top' : 5});
			
		var bandera2 = new Image();
			bandera2.src = objApp.SERVER+'global/img/banderas/bandera'+$(nodo).find('idVisita').text()+'.png?ac='+objApp.VERSION;
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
				
		var btnPronostico  = new Image();
			btnPronostico.className = 'btn-pronostico';
			btnPronostico.src = 'img/secciones/polla/btn-pronostico.png?ac=1';
			btnPronostico.width = 38;
			$(self.div).append(btnPronostico);

		var btnEditarPronostico = document.createElement('div');
			btnEditarPronostico.className = 'btn-editar-pronostico-oculto';
			$(self.div).append(btnEditarPronostico);
			$(btnEditarPronostico).text('EDITAR');

		if(objApp.isTouch())
		{
			$(btnPronostico).bind('touchend' , showApuesta);
			$(btnEditarPronostico).bind('touchend' , showApuesta);
		}
		else
		{
			$(btnPronostico).bind('click' , showApuesta);	
			$(btnEditarPronostico).bind('click' , showApuesta);	
		}
		
		if(bool)
		{
			$(holderTextos).css({'width' : 145, 'font-size' : 14, 'padding-top' : 10});
			
			if(parseInt($(nodo).find('apuesta').find('aposto').text()) != 0)
			{
				$(btnPronostico).css({'display' : 'none'});		
				$(btnEditarPronostico).css({'display' : 'block'});	
			}
			else
			{
				$(btnPronostico).css({'display' : 'block'});			
				$(btnEditarPronostico).css({'display' : 'none'});	
			}
		}
		else
		{
			$(holderTextos).css({'width' : 185, 'font-size' : 14, 'padding-top' : 6});
			$(btnPronostico).css({'display' : 'none'});
			$(btnEditarPronostico).css({'display' : 'none'});	
		}

		self.inicializar = function(DELAY)
		{
			$(self.div).css({opacity : 0, scale : 0.5}).delay(DELAY).transition({opacity : 1, scale : 1, duration : 500});
		}	
		
		function showApuesta()
		{
			parent.showApuesta(nodo);
		}
	}
	
	window.ItemProximoPartido = ItemProximoPartido;
	
})(window)