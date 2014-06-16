(function(window)
{
	function Noticias(nodo)
	{
		var self = this;
		var arrayMenu = objApp.getMenu();
		var animando = false;
		var array_items = [];
		var delay = 200;		
		var ALTO_HEADER = 180;
		var altoItems = 65;
		var dataXml;
		var mostrandoCategorias = true;
		var altoPantalla = (window.innerHeight - ALTO_HEADER) - 5;
		var urlShareFace = 'http://www.facebook.com/sharer.php?u=';
		
		self.div = document.createElement('div');
		self.div.className = 'class-cero';

		var holderItems = document.createElement('div');
			$(self.div).append(holderItems);
			$(holderItems).css({'width' : 320, 'float' : 'left'});
		
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
			$(titulo).text('NOTICIAS Y CURIOSIDADES');
			$(titulo).css({'color' : '#FFF', 'margin-left' : 80});
			$(holderTituloNoticiaGral).append(titulo);

		var icono = new Image();
			icono.width = 35;
			icono.src = 'img/general/menu/noticias.png?ac=1';
			$(holderTituloNoticiaGral).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 9, 'top' : 10});						

		//holder noticia categorias
		var divScroll = document.createElement('div');
			divScroll.className = 'divScroll';
			$(holderItems).append(divScroll);
			$(divScroll).css({'height' : altoPantalla, 'margin-top' : 0});

		//holder noticia shower
		var holderNoticia = document.createElement('div');
			holderNoticia.className = 'holder-noticia-item';
			$(self.div).append(holderNoticia);
		
		var holderTituloNoticia = document.createElement('div');
			holderTituloNoticia.className = 'wrapper-titulo-noticia';
			$(holderTituloNoticia).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
			$(holderTituloNoticia).css({'background-size' : '320px 60px'});
			$(holderNoticia).append(holderTituloNoticia);

		var divVolver = document.createElement('div');
			divVolver.className = 'btn-volver-inicio';
			$(holderTituloNoticia).append(divVolver);
			$(divVolver).css({'background' : 'url(img/general/volver_white.png) no-repeat'});
			$(divVolver).css({'background-size' : '16px', 'background-position' : 'left'});			
			$(divVolver).css({'color':'#FFF'});
			$(divVolver).text('NOTICIAS');
			$(divVolver).bind('click' , doCloseNoticia);
	
		/*var titulo = document.createElement('h1');
			$(titulo).text('NOTICIAS Y CURIOSIDADES');
			$(titulo).css({'color' : '#FFF', 'margin-left' : 80});
			$(holderTituloNoticia).append(titulo);*/

		var icono = new Image();
			icono.width = 35;
			icono.src = 'img/general/menu/noticias.png?ac=1';
			$(holderTituloNoticia).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 9, 'top' : 10});		
		
		var holderNoticiaContenido = document.createElement('div');
			holderNoticiaContenido.id = 'holder-noticia-contenido';
			$(holderNoticia).append(holderNoticiaContenido);
			$(holderNoticiaContenido).css({'height' : (altoPantalla + 20)});
		
		$.ajax
		({
			url : objApp.SERVER+'ws/ws-getCatNoticias.php',
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
				objItemNovedadCategoria = new ItemNovedadCategoria($(this), self, index);
				$(divScroll).append(objItemNovedadCategoria.div);
				$(objItemNovedadCategoria.div).transition({opacity : 1, scale : 1, duration : 500});
			});
		}
		
		function doGoCategorias()
		{
			objApp.mostrarCargador();
			onCompleteXMLCategorias(dataXml);
		}
		
		self.loadCategorias = function(id)
		{
			objApp.mostrarCargador();
			
			$.ajax
			({
				url : objApp.SERVER+'ws/ws-novedades.php',
				type : 'POST',
				data : {'id' : id},
				success : onCompleteXML,
				error : onErrorXML
			});	
		}
		
		function onCompleteXML(xml)
		{
			$(divScroll).scrollTop(0);
			
			mostrandoCategorias = false;
			$(divVolverGral).text('VOLVER');

			objApp.ocultarCargador();
			$(divScroll).empty();
			array_items = [];
			delay = 200;
			
			console.log($(xml).find('xml').find('novedad').length);
			
			if($(xml).find('xml').find('novedad').length != 0)
			{
				$(xml).find('xml').find('novedad').each(function(index, element) 
				{
					objItemNovedad = new ItemNovedad($(this), self, index);
					$(divScroll).append(objItemNovedad.div);
					array_items.push(objItemNovedad);
				});
			}
			else
				objApp.error('Actualmente no hay noticias');
				
				
			for(var i = 0; i < array_items.length; ++i)	
			{
				array_items[i].inicializar(delay);
				delay +=200;
			}	
		}
		
		function doBack()
		{
			if(mostrandoCategorias)
				objApp.Navigate('inicio', null);
			else
				doGoCategorias();
		}
		
		function onErrorXML()
		{
			objApp.error('Ha ocurrido un error, por favor intenta más tarde');
		}
		self.showNoticia = function(nodo)
		{
			var url = 'https://www.facebook.com/cervezapacena/app_496101553812055?app_data=4';

			if(animando)
				return;

			animando = true;	
			$(holderNoticiaContenido).empty();
			
			if(parseInt($(nodo).find('video').text()) == 0)
			{
				var imagen = new Image();
					imagen.width = 320;
					imagen.src = objApp.SERVER+'global/img/noticias/'+$(nodo).find('archivo').text();
					$(holderNoticiaContenido).append(imagen);
					$(imagen).css({'float' : 'left', 'display' : 'none'});
					$(imagen).load(function()
					{
						$(this).fadeIn();
					});
			}
			else
			{
					$(holderNoticiaContenido).append
					('<iframe width="320" height="180" src="http://www.youtube.com/embed/'+$(nodo).find('archivo').text()+'?rel=0" frameborder="0" allowfullscreen></iframe>');
			}
			
			var titulo = $(nodo).find('titulo').text().replace(/\\/g, '');
			var textoP = $(nodo).find('descripcion').text().replace(/\\/g, '');
			
			var tituloH4 = document.createElement('h4');
				$(holderNoticiaContenido).append(tituloH4);
				$(tituloH4).html(titulo);	
				
			var p = document.createElement('p');
				$(holderNoticiaContenido).append(p);
				$(p).html(textoP);		
			
			var divSocial = document.createElement('div');
				//$(holderNoticiaContenido).append(divSocial);
				$(divSocial).css({'width' : 320, 'height' : 30, 'float' : 'left'});
								
			var like = '<iframe src="//www.facebook.com/plugins/like.php?href='+url+'" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:80px;" allowTransparency="true" id="socialFacebook"></iframe>';	
			//$(divSocial).append(like);		

			var compartir = document.createElement('div');
				$(compartir).css({'width' : 50, 'height' : 20, 'background' : '#000'});
				$(divSocial).append(compartir);
				$(compartir).bind('click', function()
				{
					window.open(urlShareFace+'mdinteractivo.com/pacena/global/share.php?seccion=4&id=2&d=Titulo', '_blank');
				});		

			$(holderItems).transition({scale : 0.5, duration : 500}).transition({opacity : 0});
			$(holderNoticia).stop().delay(500).fadeIn(500, function(){animando = false;});	
		}
		function doCloseNoticia()
		{
			if(animando)
				return;

			animando = true;	
				
			$(holderNoticia).stop().fadeOut(500);
			$(holderItems).delay(500).transition({opacity : 1}).transition({scale : 1, duration : 500});
			animando = false;	
			$(holderNoticiaContenido).scrollTop(0);
		}						
	}
	
	window.Noticias = Noticias;

})(window);