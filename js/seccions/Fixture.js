(function(window)
{
	function Fixture(nodo)
	{
		var self = this;
		var animando = false;
		var array_items = [];
		var delay = 200;		
		var ALTO_HEADER = 180;
		var altoItems = 65;
		var animando = false;
		var altoPantalla = (window.innerHeight - ALTO_HEADER);
		
		self.div = document.createElement('div');
		self.div.className = 'class-cero';

		var holderItems = document.createElement('div');
			$(self.div).append(holderItems);
			$(holderItems).css({'width' : 320, 'float' : 'left'});
			
		var objTituloSeccion = new TituloSeccion(nodo);
			$(holderItems).append(objTituloSeccion.div);			

		var divScroll = document.createElement('div');
			divScroll.className = 'divScroll';
			$(holderItems).append(divScroll);
			$(divScroll).css({'height' : altoPantalla});
			
		/*--------------------------------------------*/
		var partidosDelDia = document.createElement('div');
			partidosDelDia.id = 'wrapper-partidos-del-dia';
			$(divScroll).append(partidosDelDia);	
			
		var tituloPartidosDia = document.createElement('div');
			tituloPartidosDia.id = 'tituloPartidosDia';
			$(partidosDelDia).append(tituloPartidosDia);
			$(tituloPartidosDia).append('<h4>PARTIDOS <span style="color:#ffc600">DEL DÍA</span></h4>');	
		
		var holderPartidosDia = document.createElement('div');
			$(holderPartidosDia).css({'width' : 320, 'height' : 225, 'float' : 'left', 'overflow-y' : 'hidden'});
			$(partidosDelDia).append(holderPartidosDia);
			
		/*--------------------------------------------*/

		var holderGrupo = document.createElement('div');
			holderGrupo.className = 'holder-noticia-item';
			$(self.div).append(holderGrupo);
			$(holderGrupo).css({'height' : altoPantalla});
		
		var holderTituloGrupo = document.createElement('div');
			holderTituloGrupo.className = 'wrapper-titulo-noticia';
			$(holderTituloGrupo).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
			$(holderTituloGrupo).css({'background-size' : '320px 60px'});
			$(holderGrupo).append(holderTituloGrupo);

		var divVolver = document.createElement('div');
			divVolver.className = 'btn-volver-inicio';
			$(holderTituloGrupo).append(divVolver);
			$(divVolver).css({'background' : 'url(img/general/volver_white.png) no-repeat'});
			$(divVolver).css({'background-size' : '16px', 'background-position' : 'left'});			
			$(divVolver).css({'color':'#FFF'});
			$(divVolver).text('VOLVER');
	
		var titulo = document.createElement('h1');
			$(titulo).text('FIXTURE DEL MUNDIAL');
			$(titulo).css({'color' : '#FFF', 'margin-left' : 82});
			$(holderTituloGrupo).append(titulo);
			$(divVolver).bind('click' , doCloseGrupo);

		var icono = new Image();
			icono.width = 35;
			icono.src = 'img/general/menu/fixture.png?ac=1';
			$(holderTituloGrupo).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 9, 'top' : 15});		
		
		var holderGrupoContenido = document.createElement('div');
			holderGrupoContenido.id = 'holder-grupo-contenido';
			holderGrupoContenido.className = 'divScroll';
			$(holderGrupo).append(holderGrupoContenido);
			$(holderGrupoContenido).css({'height' : altoPantalla, 'margin-top' : 0});

		$.ajax
		({
			url : objApp.SERVER+'ws/ws-obtenerPartidos.php',
			success : onCompleteXML,
			error : onErrorXML
		});	

		function onCompleteXML(xml)
		{
			var objContenido;
			objApp.ocultarCargador();

			if($(xml).find('partidoDelDia').find('partido').length != 0)
			{
				console.log('HAY '+$(xml).find('partidoDelDia').find('partido').length+' PARTIDOS EL DÍA DE HOY');	
				$(xml).find('partidoDelDia').find('partido').each(function(index, element) 
				{
                	var itemPartidoDelDia = new PartidoDelDia(this);
					    $(holderPartidosDia).append(itemPartidoDelDia.div);
                });			
			}
		
			if(parseInt($(xml).find('xml').find('finFases').text()) == 0)
			{
				objContenido = new FasesDeGrupo(xml, self);
			}
			else
			{
				objContenido = new Versus(xml);
			}			
			$(divScroll).append(objContenido.div);	
		}
		
		function onErrorXML()
		{
			objApp.error('Ha ocurrido un error, por favor intenta más tarde');
		}
		
		self.mostrarGrupo = function(grupo)
		{
			if(animando)
				return;

			animando = true;	
			$(holderGrupoContenido).empty();
			
			$.ajax
			({
				url : objApp.SERVER+'ws/ws-obtenerPartidosByGrupo.php',
				type : 'POST',
				data : {'grupo' : grupo},
				success : function(xml)
				{
					objVersus = new Versus(xml);
					$(holderGrupoContenido).append(objVersus.div);
					$(holderItems).transition({scale : 0.5, duration : 500}).transition({opacity : 0});
					$(holderGrupo).stop().delay(500).fadeIn(500, function(){animando = false;});	
				}
			});	
		}
		
		function doCloseGrupo()
		{
			if(animando)
				return;

			animando = true;	
				
			$(holderGrupo).stop().fadeOut(500);
			$(holderItems).delay(500).transition({opacity : 1}).transition({scale : 1, duration : 500});
			animando = false;	
		}	
					
	}
	
	window.Fixture = Fixture;

})(window);


function FasesDeGrupo(xml, parent)
{
	var self = this;
	var placeHolderGrupo;
	var grupoActual = 'R';
	var delay = 200;
	var array_items = [];
	
	self.div = document.createElement('div');
	
	if($(xml).find('xml').find('equipo').length != 0)
	{
		$(xml).find('xml').find('equipo').each(function(index, element) 
		{
			if($(this).find('grupo').text() != grupoActual)
			{
				grupoActual = $(this).find('grupo').text();				
				placeHolderGrupo = new PlaceHolderGrupo($(this).find('grupo').text(), self);
				$(self.div).append(placeHolderGrupo.div);
				array_items.push(placeHolderGrupo);
			}			
			placeHolderGrupo.add($(this));	
		});
		
		for(var i = 0; i < array_items.length; ++i)	
		{
			array_items[i].inicializar(delay);
			delay +=200;
		}		
	}
	else
		objApp.error('No hay grupos definidos');
		
	self.mostrarGrupo = function(grupo)
	{
		parent.mostrarGrupo(grupo);
	}		
}

function PlaceHolderGrupo(grupo, parent)
{
	var self = this;
	self.div = document.createElement('div');
	self.div.className = 'place-holder-grupo';
	$(self.div).bind('click' , doClick);
	$(self.div).css({opacity : 0});
	
	var vertical = document.createElement('div');
		vertical.className = 'vertical-fixture';
		$(self.div).append(vertical);

	var texto = document.createElement('p');
		$(texto).text('GRUPO '+grupo);
		$(vertical).append(texto);
	 
	 $(texto).css({'-ms-transform': 'rotate(-90deg)'});
	 $(texto).css({'-moz-transform': 'rotate(-90deg)'});
	 $(texto).css({'-webkit-transform': 'rotate(-90deg)'});
	 $(texto).css({'-o-transform': 'rotate(-90deg)'});
	 $(texto).css({'transform': 'rotate(-90deg)'});	
		
	var holderSelecciones = document.createElement('div');
		holderSelecciones.className = 'holder-selecciones';	
		$(self.div).append(holderSelecciones);
		
	self.add = function(equipo)
	{
		var divSeleccion = document.createElement('div');
			divSeleccion.className = 'seleccion-div';
			$(holderSelecciones).append(divSeleccion);
			
		var divBandera = document.createElement('div');	
			$(divSeleccion).append(divBandera);
			$(divBandera).css({'width' : '100%', 'height' : 45, 'overflow' : 'hidden', 'float' : 'left'});
			
		var bandera = new Image();
			bandera.src = objApp.SERVER+'global/img/banderas/bandera'+$(equipo).find('id').text()+'.png?ac='+objApp.VERSION;
			bandera.width = 71;
			$(divBandera).append(bandera);

		var divNombre = document.createElement('div');	
			$(divSeleccion).append(divNombre);
			$(divNombre).css({'width' : '100%', 'overflow' : 'hidden', 'float' : 'left'});
			$(divNombre).append('<p>'+$(equipo).find('nombre').text()+'</p>');
	}	
	
	self.inicializar = function(DELAY)
	{
		$(self.div).css({scale : 0.5}).delay(DELAY).transition({opacity : 1, scale : 1, duration : 500});
	}		
	
	function doClick()
	{
		parent.mostrarGrupo(grupo);
	}	
}

function Versus(xml)
{
	var self = this;
	var array_items = [];
	var DELAY = 200;
	
	self.div = document.createElement('div');
	$(self.div).css({'-webkit-overflow-scrolling' : 'touch'});
	
	if($(xml).find('partido').length == 0)
		objApp.error('Ha ocurrido un error, por favor intenta más tarde.');
	else
	{
		$(xml).find('partido').each(function(index, element) 
		{						
			var itemVersus = document.createElement('div');
				itemVersus.className = 'item-versus';
				$(self.div).append(itemVersus); 
				$(itemVersus).css({'opacity' : 0}); 
				
			var holderBanderas = document.createElement('div');
				holderBanderas.className = 'holder-banderas-partidos';	
        		$(itemVersus).append(holderBanderas);
				
			var bandera1 = new Image();
				bandera1.src = objApp.SERVER+'global/img/banderas/bandera'+$(this).find('idLocal').text()+'.png?ac='+objApp.VERSION;
				bandera1.width = 71;
				$(holderBanderas).append(bandera1);
				$(bandera1).css({'position' : 'absolute', 'left' : 5 , 'top' : 5});
				
			var bandera2 = new Image();
				bandera2.src = objApp.SERVER+'global/img/banderas/bandera'+$(this).find('idVisita').text()+'.png?ac='+objApp.VERSION;
				bandera2.width = 71;
				$(holderBanderas).append(bandera2);	
				$(bandera2).css({'position' : 'absolute', 'left' : 57 , 'top' : 28});
			
			var textoVs = document.createElement('p');
				$(textoVs).text('VS');
				$(holderBanderas).append(textoVs);	
			
			var holderTextos = document.createElement('div');
				holderTextos.className = 'holder-detalles-partido';
				$(itemVersus).append(holderTextos);
				$(holderTextos).append('<p>'+$(this).find('local').text()+' VS '+$(this).find('visitante').text()+'</p>');
				$(holderTextos).append('<p>'+getStringFecha($(this).find('fecha').text())+'</p>');
				$(holderTextos).append('<p>'+$(this).find('estadio').text()+'</p>');
				
			array_items.push(itemVersus);			
		});	
		
		for(var i = 0; i < array_items.length; ++i)	
		{
			$(array_items[i]).css({scale : 0.5}).delay(DELAY).transition({opacity : 1, scale : 1, duration : 500});
			DELAY +=200;
		}	
	}
	
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