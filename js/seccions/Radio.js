(function(window)
{
	function Radio(nodo)
	{
		var self = this;

		self.div = document.createElement('div');
		self.div.className = 'class-cero';	
					
		var objTituloSeccion = new TituloSeccion(nodo);
			$(self.div).append(objTituloSeccion.div);	
			$(self.div).append('<div class="clear"></div>');

		var divScroll = document.createElement('div');
			divScroll.className = 'divScroll';
			$(self.div).append(divScroll);
					
		var wrapperRadio = document.createElement('div');
			wrapperRadio.id = 'holder-radio-contenido';
			$(divScroll).append(wrapperRadio);
			
		$(wrapperRadio).append('<h3>Haz click en el siguiente link para oir la transmisión:</h3>');				
		
		var linkRadio = document.createElement('span');
			//$(linkRadio).text('www.foxsportsradio.com');
			$(wrapperRadio).append(linkRadio);
			//$(linkRadio).bind('click' , doClick);

		if(objApp.isTouch())
			$(linkRadio).bind('touchend', doClick);
		else
			$(linkRadio).bind('click', doClick);
			
		var holderTransmitiendo = document.createElement('div');
			holderTransmitiendo.id = 'holder-transmitiendo-radio';
			$(wrapperRadio).append(holderTransmitiendo);
			
		var holderTransmitiendoVertical = document.createElement('div');
			holderTransmitiendoVertical.id = 'holder-transmitiendo-vertical';
			$(holderTransmitiendo).append(holderTransmitiendoVertical);	
			
		var texto = document.createElement('p');
			texto.id = 'texto-vertical';
			$(texto).text('TRANSMITIENDO');
			$(holderTransmitiendoVertical).append(texto);
		 
		 $(texto).css({'-ms-transform': 'rotate(-90deg)'});
         $(texto).css({'-moz-transform': 'rotate(-90deg)'});
         $(texto).css({'-webkit-transform': 'rotate(-90deg)'});
         $(texto).css({'-o-transform': 'rotate(-90deg)'});
         $(texto).css({'transform': 'rotate(-90deg)'});	
		
		var holderPartido = document.createElement('div');
			holderPartido.id = 'holder-partido';
			$(holderTransmitiendo).append(holderPartido);

		$.ajax
		({
			url : objApp.SERVER+'ws/ws-getPartidoActual.php',
			success : onCompleteXML
		});	
		
		function onCompleteXML(xml)
		{
			objApp.ocultarCargador();
			
			if($(xml).find('partido').length == 0)
				$(holderPartido).append('Actualmente no hay transmision.');
			else
				$(holderPartido).append($(xml).find('partido').find('versus').text()+'<br>'+$(xml).find('partido').find('estadio').text());
		}		
					
		function doClick()
		{
			try
			{
				window.open('http://www.foxsportsradio.com', '_system');
			}
			catch(e)
			{
				window.open('http://www.foxsportsradio.com', '_blank');
			}
		}	
	}
	
	window.Radio = Radio;

})(window);