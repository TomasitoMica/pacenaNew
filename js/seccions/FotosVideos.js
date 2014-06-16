(function(window)
{
	function FotosVideos(nodo)
	{
		var self = this;
		var animando = false;
		var array_items = [];
		var delay = 200;		
		var ALTO_HEADER = 180;
		var altoItems = 65;
		var dataXml;
		var mostrandoCategorias = true;
		
		var altoPantalla = (window.innerHeight - ALTO_HEADER) -5;
		
		self.div = document.createElement('div');
		self.div.className = 'class-cero';

		var holderItems = document.createElement('div');
			$(self.div).append(holderItems);
			$(holderItems).css({'width' : 320, 'float' : 'left'});

		/*titulo*/
		var holderTituloNoticiaGral = document.createElement('div');
			holderTituloNoticiaGral.className = 'wrapper-titulo-noticia';
			$(holderTituloNoticiaGral).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
			$(holderTituloNoticiaGral).css({'background-size' : '320px 60px'});
			$(holderItems).append(holderTituloNoticiaGral);

		var divVolverGral = document.createElement('div');
			divVolverGral.className = 'btn-volver-inicio';
			$(holderTituloNoticiaGral).append(divVolverGral);
			$(divVolverGral).css({'background' : 'url(img/general/volver_white.png) no-repeat'});
			$(divVolverGral).css({'background-size' : '16px', 'background-position' : 'left'});			
			$(divVolverGral).css({'color':'#FFF'});
			$(divVolverGral).text('INICIO');
			$(divVolverGral).bind('click' , doBack);
	
		var titulo = document.createElement('h1');
			$(titulo).text('FOTOS Y VIDEOS');
			$(titulo).css({'color' : '#FFF', 'margin-left' : 110});
			$(holderTituloNoticiaGral).append(titulo);

		var icono = new Image();
			icono.width = 35;
			icono.src = 'img/general/menu/fotos.png?ac=1';
			$(holderTituloNoticiaGral).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 9, 'top' : 15});
			/*titulo*/

		var divScroll = document.createElement('div');
			divScroll.className = 'divScroll';
			$(holderItems).append(divScroll);
			$(divScroll).css({'height' : altoPantalla, 'margin-top' : 0});						

		var holderMedia = document.createElement('div');
			holderMedia.className = 'holder-media-item';
			$(self.div).append(holderMedia);
		
		var holderTituloMedia = document.createElement('div');
			holderTituloMedia.className = 'wrapper-titulo-media';
			$(holderTituloMedia).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
			$(holderTituloMedia).css({'background-size' : '320px 60px'});
			$(holderMedia).append(holderTituloMedia);

		var divVolver = document.createElement('div');
			divVolver.className = 'btn-volver-inicio';
			$(holderTituloMedia).append(divVolver);
			$(divVolver).css({'background' : 'url(img/general/volver_white.png) no-repeat'});
			$(divVolver).css({'background-size' : '16px', 'background-position' : 'left'});			
			$(divVolver).css({'color':'#FFF'});
			$(divVolver).text('VOLVER');
			$(divVolver).bind('click' , doCloseMedia);
	
		var titulo = document.createElement('h1');
			$(titulo).text('FOTOS Y VIDEOS');
			$(titulo).css({'color' : '#FFF', 'margin-left' : 110});
			$(holderTituloMedia).append(titulo);

		var icono = new Image();
			icono.width = 35;
			icono.src = 'img/general/menu/fotos.png?ac=1';
			$(holderTituloMedia).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 9, 'top' : 15});		
		
		var holderMediaContenido = document.createElement('div');
			holderMediaContenido.id = 'holder-media-contenido';
			$(holderMedia).append(holderMediaContenido);
			$(holderMediaContenido).css({'height' : (altoPantalla + 20)});
			
		
		$.ajax
		({
			url : objApp.SERVER+'ws/ws-getCatMedia.php',
			success : onCompleteXMLCategorias,
			error : onErrorXML
		});	
		
		function onCompleteXMLCategorias(xml)
		{
			dataXml = xml;
			mostrandoCategorias = true;
			$(divVolverGral).text('INICIO');

			objApp.ocultarCargador();
			$(divScroll).empty();
			
			$(xml).find('xml').find('categorias').find('categoria').each(function(index, element) 
			{
				objItemMediaCategoria = new ItemMediaCategoria($(this), self, index);
				$(divScroll).append(objItemMediaCategoria.div);
				$(objItemMediaCategoria.div).transition({opacity : 1, scale : 1, duration : 500});
			});
		}		
		
		function onCompleteXML(xml)
		{
			mostrandoCategorias = false;
			$(divVolverGral).text('VOLVER');

			objApp.ocultarCargador();
			$(divScroll).empty();
			array_items = [];
			delay = 200;

			if($(xml).find('xml').find('media').length != 0)
			{
				$(xml).find('xml').find('media').each(function(index, element) 
				{
					objMedia = new ItemMedia($(this), self, index);
					$(divScroll).append(objMedia.div);
					array_items.push(objMedia);
				});
			}
			else
				objApp.error('Actualmente no hay fotos ni videos');
				
			for(var i = 0; i < array_items.length; ++i)	
			{
				array_items[i].inicializar(delay);
				delay +=200;
			}	
		}

		function doGoCategorias()
		{
			objApp.mostrarCargador();
			onCompleteXMLCategorias(dataXml);
		}		
		
		function onErrorXML()
		{
			objApp.error('Ha ocurrido un error, por favor intenta más tarde');
		}

		self.showMedia = function(nodo)
		{
			if(animando)
				return;
			
			animando = true;	
			$(holderMediaContenido).empty();
			
			if(parseInt($(nodo).find('boolVideo').text()) == 0)
			{
				var imagen = new Image();
					imagen.width = 320;
					imagen.src = objApp.SERVER+'global/img/media/'+$(nodo).find('archivo').text();
					$(holderMediaContenido).append(imagen);
					$(imagen).css({'float' : 'left', 'display' : 'none'});
					$(imagen).load(function()
					{
						$(this).fadeIn();
					});
			}
			else
			{
					$(holderMediaContenido).append
					('<iframe width="320" height="180" src="http://www.youtube.com/embed/'+$(nodo).find('archivo').text()+'?rel=0" frameborder="0" allowfullscreen></iframe>');
			}
			
			var textoTitulo = $(nodo).find('titulo').text().replace(/\\/g, '');
			$(holderMediaContenido).append('<h3>'+textoTitulo+'</h3>');

			var textoP = $(nodo).find('texto').text().replace(/\\/g, '');
			var p = document.createElement('p');
				$(holderMediaContenido).append(p);
				$(p).html(textoP);		
			
			$(holderItems).transition({scale : 0.5, duration : 500}).transition({opacity : 0});
			$(holderMedia).stop().delay(500).fadeIn(500, function(){animando = false;});
		}
		
		function doCloseMedia()
		{
			$(holderMediaContenido).empty();
			$(holderMediaContenido).scrollTop(0);
			
			if(animando)
				return;

			animando = true;	
				
			$(holderMedia).stop().fadeOut(500);
			$(holderItems).delay(500).transition({opacity : 1}).transition({scale : 1, duration : 500});
			animando = false;	
		}	
		
		function doBack()
		{
			if(mostrandoCategorias)
				objApp.Navigate('inicio', null);
			else
				doGoCategorias();
		}	
		
		self.loadCategorias = function(id)
		{
			objApp.mostrarCargador();

			$.ajax
			({
				url : objApp.SERVER+'ws/ws-fotosVideos.php',
				type : 'POST',
				data : {'id' : id},
				success : onCompleteXML,
				error : onErrorXML
			});	
		}								
	}
	
	window.FotosVideos = FotosVideos;

})(window);