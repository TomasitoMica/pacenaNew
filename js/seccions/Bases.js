(function(window)
{
	function Bases(nodo)
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
		$(self.div).css({'-webkit-transform' : 'translate3d(0,0,0)'});

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
			//$(divVolverGral).text('INICIO');
			$(divVolverGral).bind('click' , doBack);
	
		var titulo = document.createElement('h1');
			$(titulo).text('BASES Y CONDICIONES DEL JUEGO');
			$(titulo).css({'color' : '#FFF', 'margin-left' : 50, 'font-size' : 14,' margin-top': 10});
			$(holderTituloNoticiaGral).append(titulo);

		var icono = new Image();
			icono.width = 35;
			icono.src = 'img/general/menu/bases.png?ac=1';
			$(holderTituloNoticiaGral).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 9, 'top' : 15});
			/*titulo*/

		var divScroll = document.createElement('div');
			divScroll.className = 'divScroll';
			$(holderItems).append(divScroll);
			$(divScroll).css({'height' : altoPantalla, 'margin-top' : 0, 'background' :'rgba(255,255,255,0.6)'});						


		/*PREMIOS*/	
		var premiosWrapper = document.createElement('div');
			$(divScroll).append(premiosWrapper);
			$(premiosWrapper).css({'width' : 320, 'height' : 'auto', 'min-height' : 200});

		var tituloMarqueePremios = document.createElement('div');
			tituloMarqueePremios.className = 'titulo-marquee';
			$(premiosWrapper).append(tituloMarqueePremios);
			$(tituloMarqueePremios).append('<h1>PARTICIPA Y GANA FABULOSOS PREMIOS</h1>');

		var premios = new Image();
			premios.src = 'img/secciones/bases/premios.png';
			premios.width = 305;
			$(premiosWrapper).append(premios);
			$(premios).css({'margin-left' : 5, 'margin-top' : 15, 'margin-bottom' : 15});

		/*MECÁNICA*/	
		var mecanicaWrapper = document.createElement('div');
			$(divScroll).append(mecanicaWrapper);
			$(mecanicaWrapper).css({'width' : 320, 'height' : 'auto', 'font-family': 'Oswald', 'font-size':15});

		var tituloMarqueeMecanica = document.createElement('div');
			tituloMarqueeMecanica.className = 'titulo-marquee';
			$(mecanicaWrapper).append(tituloMarqueeMecanica);
			$(tituloMarqueeMecanica).append('<h1>PRONOSTICA Y ACUMULA PUNTOS</h1>');

		var parrafo = document.createElement('p');
			$(parrafo).css({'padding' : '8px 5px', 'text-align' : 'justify'});
			$(parrafo).text('Se otorgará una cantidad de puntos según se haya acertado al Equipo ganador o partido empatado y puntos adicionales por Acertar a resultado exacto; la cantidad de puntos otorgados variará según la fase del campeonato en que se juega en cada momento, asignando una cantidad de puntos progresivamente mayor a cada fase del torneo de la Copa Mundial Brasil 2014, según la siguiente tabla:')
		$(mecanicaWrapper).append(parrafo);

		var tabla = new Image();
			tabla.src = 'img/secciones/bases/tabla.png';
			tabla.width = 310;
			$(mecanicaWrapper).append(tabla);
			$(tabla).css({'margin-left' : 5});

		var btnBasesWrapper = document.createElement('div');
			$(btnBasesWrapper).css({'width' : '100%', 'height' : 45});
			$(divScroll).append(btnBasesWrapper);	
		
		var btnBases = document.createElement('div');
			btnBases.id = 'btn-bases';
			$(btnBases).text('BASES Y CONDICIONES');
			$(btnBasesWrapper).append(btnBases);
			$(btnBases).bind('click' , showBases);
				
		function doBack()
		{
			objApp.Navigate('inicio', null);
		}
		
		function showBases()
		{
			try
			{
				window.open('https://dejavivirlo.com/reglas/', '_system');
			}
			catch(e)
			{
				window.open('https://dejavivirlo.com/reglas/', '_blank');
			}
		}

		objApp.ocultarCargador();			
	}
	
	window.Bases = Bases;

})(window);