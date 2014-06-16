(function(window)
{
	function Registro()
	{
		var self = this;

		self.div = document.createElement('div');
		self.div.className = 'class-cero';
		
		var holderTituloRegistro = document.createElement('div');
			holderTituloRegistro.className = 'wrapper-titulo-registro';
			$(holderTituloRegistro).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
			$(holderTituloRegistro).css({'background-size' : '320px 60px'});
			$(self.div).append(holderTituloRegistro);
	
		var titulo = document.createElement('h1');
			$(titulo).text('REGISTRARSE');
			$(titulo).css({'color' : '#FFF'});
			$(holderTituloRegistro).append(titulo);

		var icono = new Image();
			icono.width = 30;
			icono.src = 'img/general/menu/registrarse.png?ac=1';
			$(holderTituloRegistro).append(icono);	
			$(icono).css({'position' : 'absolute' , 'right' : 15, 'top' : 8});
			
		var holderRegistro = document.createElement('div');
			holderRegistro.id = 'holder-registro';
			$(self.div).append(holderRegistro);
			
		var innerRegistroLoader = document.createElement('div');
			innerRegistroLoader.id = 'inner-holder-registro-loader';
			$(holderRegistro).append(innerRegistroLoader);
			$(innerRegistroLoader).css({opacity : 0});
			
		goConnect();
		
		objApp.ocultarCargador();

		function goConnect()
		{
			var btnConnect = new BtnConnect(self);
			innerNavigate(btnConnect);
		}	
		
		function goDatosFacebook(data)
		{
			var datosAppFace = new DatosFacebook(self, data);
			innerNavigate(datosAppFace);
		}
		
		self.goDatosApp = function (data)
		{
			var datosApp = new DatosApp(self, data);
			innerNavigate(datosApp);
		}
		
		self.goNotificaciones = function(object)
		{
			var datosNotificaciones = new DatosNotificaciones(self, object);
			innerNavigate(datosNotificaciones);
		}
		
		function innerNavigate(object)
		{
			$(innerRegistroLoader).transition({opacity : 0,  duration : 800} , 'linear');
			$(innerRegistroLoader).empty();
			
			setTimeout(function()
			{
				$(innerRegistroLoader).append(object.div);
				$(innerRegistroLoader).transition({opacity : 1,  duration : 800} , 'linear');
			
			}, 1000);
		}	
		
		self.doConnect = function($obj_usuario, $access_token)
		{
			var data = new Object();
			var cuidadOrigen;
			var cuidadActual;
			var fechaNac;

			if($obj_usuario == 'null')
			{
				data.access_token = 'hardcodetokenaaaaa';
				data.usuario_uid = 100005636947233;
				data.usuario_nombre = 'Martin Luz';
				data.usuario_email  = 'mluz@gmail.com' ;
				data.usuario_ciudad_origen = 'Montevideo';
				data.usuario_ciudad_actual = 'Montevideo';
				data.usuario_fecha_nacimento = '26/10/1987';
			}
			else
			{
				data.usuario_uid = $obj_usuario.id;
				data.access_token = $access_token
				data.usuario_nombre = $obj_usuario.name;
				
				try
				{
					data.usuario_email = $obj_usuario.email;
				}
				catch(e){}			

				try
				{
					data.usuario_ciudad_origen = (typeof $obj_usuario.hometown.name == 'undefined') ? '':$obj_usuario.hometown.name;
					data.usuario_ciudad_actual = (typeof $obj_usuario.hometown.name == 'undefined') ? '':$obj_usuario.location.name;
				}
				catch(e){}
			
				try
				{
					data.usuario_fecha_nacimento = (typeof $obj_usuario.birthday == 'undefined') ? '' : $obj_usuario.birthday;
				}
				catch(e){}				
			}
			
			var params = 
			{
				'uid' : data.usuario_uid, 
				'uuid' : objApp.UUID, 
				'pushToken' : objApp._ManagePush.token, 
				'plataforma' : objApp.PLATFORM
			}
			
			$.ajax
			({
				url : objApp.SERVER+'ws/ws-checkUserUid.php',
				type : 'POST',
				data : params,
				success : function(xml)
				{
					if(parseInt($(xml).find('existe').text()) == 0)
					{						
						goDatosFacebook(data);
					}
					else
					{
						objApp.setIdUsuario($(xml).find('idUsuario').text(), $(xml).find('nombre').text());
		
						setTimeout(function()
						{
							objApp.Navigate('inicio', null);
						
						}, 200);
					}
				},
				error : function(){ objApp.error('Ha ocurrido un error, por favor intenta más tarde.'); }
			});								
		}	
	}
	
	window.Registro = Registro;

})(window);

/*Inner class datos facebook*/

function DatosFacebook(parent, data)
{
	var self = this;
	self.div = document.createElement('div');
	$(self.div).css({'height' : 250});
	
	var leftHolder = document.createElement('div');
		$(self.div).append(leftHolder);
		$(leftHolder).css({'width' : 200, 'min-height' : 165, 'float' : 'left', 'margin-top' : 15});
	
	$(leftHolder).append('<p class="p-registro-app-title">Nombre de usuario: <span>'+data.usuario_nombre+'</span></p>');
	$(leftHolder).append('<p class="p-registro-app-title">Ciudad de origen: <span>'+data.usuario_ciudad_origen+'</span></p>');
	$(leftHolder).append('<p class="p-registro-app-title">Ciudad Actual: <span>'+data.usuario_ciudad_actual+'</span></p>');
	$(leftHolder).append('<p class="p-registro-app-title">Fecha de nacimiento: <span>'+data.usuario_fecha_nacimento+'</span></p>');
	
	var rightHolder = document.createElement('div');
		$(self.div).append(rightHolder);
		$(rightHolder).css({'width' : 100, 'height' : 120, 'float' : 'left', 'margin-top' : 30, 'margin-left' : 5, 'overflow' : 'hidden'});
	
	var imgProfile = new Image();
		imgProfile.width = 100;
		imgProfile.src = 'http://graph.facebook.com/'+data.usuario_uid+'/picture?width=100&height=120';
		$(rightHolder).append(imgProfile);		

	var divButton = document.createElement('div');
		$(self.div).append(divButton);
		$(divButton).css({'width' : '100%', 'height' : 60, 'float' : 'left', 'position' : 'relative'});

	var btnNext = document.createElement('div');
		btnNext.className = 'btn-next';
		$(divButton).append(btnNext);
		$(btnNext).text('SIGUIENTE');	
		$(btnNext).css({'top' : 10, 'background' : '#ffc600', 'color' : '#000'});
		
		if(objApp.isTouch())
			$(btnNext).bind('touchstart' , parentNavigate);	
		else	
			$(btnNext).bind('click' , parentNavigate);
			
	function parentNavigate()
	{
		objApp.mostrarCargador();
		parent.goDatosApp(data);
	}
	
	objApp.ocultarCargador();
}

/*Inner class datos app*/

function DatosApp(parent, data)
{
	var self = this;
	self.div = document.createElement('div');
	self.div.id = 'wrapper-datos-app';
	
	$(self.div).css({'height' : 325, 'width' : '100%'});
	$(self.div).append('<h3>'+data.usuario_nombre+'</h3>');
	$(self.div).append('<label>Confirma tu Nombre Completo</label><br/>');
	
	var inputNombre = document.createElement('input');
		inputNombre.type = 'text';
		$(self.div).append(inputNombre);
		$(inputNombre).css({'width' : 285});
		$(inputNombre).val(data.usuario_nombre);
		
	$(self.div).append('<label>Número de Carnet</label><br/>');
	
	var inputCarnet = document.createElement('input');
		inputCarnet.type = 'number';
		$(self.div).append(inputCarnet);
		$(inputCarnet).css({'width' : 170});
		$(inputCarnet).numeric({allow : '.-'});

	$(self.div).append('<br/>');
	$(self.div).append('<label>Número de Teléfono</label><br/>');
	
	var inputTel = document.createElement('input');
		inputTel.type = 'tel';
		$(self.div).append(inputTel);
		$(inputTel).css({'width' : 170});
		
	var tick = new TickComponent(self);		
		$(self.div).append(tick.div);
		$(tick.div).css({'left' : 8});
		
		$(self.div).append('<label style="position:absolute;top: 227px; left: 43px;">Recibir Notificaciones</label>');
		
	var btnGuardar = document.createElement('div');
		btnGuardar.className = 'btn-next';
		$(self.div).append(btnGuardar);
		$(btnGuardar).text('GUARDAR');	
		$(btnGuardar).css({'top' : 265, 'background' : '#ffc600', 'color' : '#000'});	
		
		if(objApp.isTouch())
			$(btnGuardar).bind('touchstart' , checkGuardar);	
		else	
			$(btnGuardar).bind('click' , checkGuardar);
			
	var btnNext = document.createElement('div');
		btnNext.className = 'btn-next';
		$(self.div).append(btnNext);
		$(btnNext).text('SIGUIENTE');	
		$(btnNext).css({'top' : 265, 'display' : 'none', 'background' : '#ffc600', 'color' : '#000'});
		
		if(objApp.isTouch())
			$(btnNext).bind('touchstart' , goNotificaciones);	
		else	
			$(btnNext).bind('click' , goNotificaciones);
	
	self.sendEstado = function(estado)
	{
		if(estado == 1)
		{
			$(btnNext).css({'display' : 'block'});				
			$(btnGuardar).css({'display' : 'none'});			
		}
		else
		{
			$(btnGuardar).css({'display' : 'block'});
			$(btnNext).css({'display' : 'none'});				
		}
	}
	
	function goNotificaciones()
	{
		if($(inputNombre).val().length == 0)
		{
			objApp.error('No puedes dejar el campo Nombre vacío');
		}
		else if($(inputCarnet).val().length == 0)
		{
			objApp.error('No puedes dejar el campo carnet vacío');
		}
		else
		{
			objApp.mostrarCargador();
	
			var object =
			{
				  usuario_uid : data.usuario_uid,
				  usuario_at : data.access_token,
				  usuario_nombre : $(inputNombre).val(),
				  usuario_email : data.usuario_email,
				  usuario_ciudad_origen  :data.usuario_ciudad_origen,
				  usuario_ciudad_actual : data.usuario_ciudad_actual,
				  usuario_fecha_nacimiento : data.usuario_fecha_nacimento,
				  usuario_numero_carnet:$(inputCarnet).val(),
				  usuario_numero_tel:$(inputTel).val(),
				  guardo_favoritas:0,
				  uuid :objApp.UUID ,
				  pushToken : objApp._ManagePush.token,
				  plataforma : objApp.PLATFORM
			}
			
			parent.goNotificaciones(object);
		}
	}
	
	function checkGuardar()
	{
		if($(inputNombre).val().length == 0)
		{
			objApp.error('No puedes dejar el campo Nombre vacío');
		}
		else if($(inputCarnet).val().length == 0)
		{
			objApp.error('No puedes dejar el campo carnet vacío');
		}
		else
		{
			objApp.mostrarCargador();

			 var params =
			 {
				  usuario_uid : data.usuario_uid,
				  usuario_at : data.access_token,
				  usuario_nombre : $(inputNombre).val(),
				  usuario_email : data.usuario_email,
				  usuario_ciudad_origen  : data.usuario_ciudad_origen,
				  usuario_ciudad_actual : data.usuario_ciudad_actual,
				  usuario_fecha_nacimiento : data.usuario_fecha_nacimento,
				  usuario_numero_carnet:$(inputCarnet).val(),
				  usuario_numero_tel:$(inputTel).val(),
				  guardo_favoritos:0,
				  uuid :objApp.UUID ,
				  pushToken : objApp._ManagePush.token,
				  plataforma : objApp.PLATFORM
     		}
			
			$.ajax
			({
				url  : objApp.SERVER+'ws/ws-guardarUsuario.php',
				type : 'POST',
				data : params,
				success : onCompleteXML
			});	
		}
	}
	
	function onCompleteXML(xml)
	{
		objApp.ocultarCargador();
		
		if(parseInt($(xml).find('resultado').text()) == 1)
		{
			objApp.setIdUsuario($(xml).find('idUsuario').text(), $(xml).find('nombre').text());
			
			setTimeout(function()
			{
				objApp.Navigate('inicio', null);
			
			}, 500);
		}
		else
		{
			objApp.error('Ha ocurrido un error, intenta más tarde');
		}
	}
	
	objApp.ocultarCargador();
}

/*Inner class datos Notificaciones*/

function DatosNotificaciones(parent, data)
{
	var self = this;
	var array_checks = [];
	var mostrandoEquipos = false;
	var ALTO_HEADER = 180;
	var altoItems = 65;
	var array_favoritos = [];
	
	var altoPantalla = (window.innerHeight - ALTO_HEADER) -5;
	
	self.div = document.createElement('div');
	self.div.id = 'wrapper-datos-notificaciones';
	$(self.div).css({'height' : altoPantalla});
	$(self.div).append('<h3>Deseo recibir notificaciones de:<h3>');

	var holderNotificacionesGenerales = document.createElement('div');
		$(holderNotificacionesGenerales).css({'width' : '100%','float' : 'left', 'position' : 'relative', 'height' : '50px'});
		$(self.div).append(holderNotificacionesGenerales);	
				
	var tickInicioPartido = new TickComponentNotifiacion(self);
		$(holderNotificacionesGenerales).append(tickInicioPartido.div);

	var textInicioPartido = document.createElement('p');
		$(textInicioPartido).text('Inicio de partido');
		$(holderNotificacionesGenerales).append(textInicioPartido);
		$(textInicioPartido).css({'position' : 'absolute', 'left' : 32, 'top' : 8});

	var tickFinalPartido = new TickComponentNotifiacion(self);
		$(holderNotificacionesGenerales).append(tickFinalPartido.div);
		$(tickFinalPartido.div).css({'left' : 163});

	var textFinalPartido = document.createElement('p');
		$(textFinalPartido).text('Final de partido');
		$(holderNotificacionesGenerales).append(textFinalPartido);
		$(textFinalPartido).css({'position' : 'absolute', 'left' : 195, 'top' : 8});

	/**/
	var holderNotificacionesFavNoticias = document.createElement('div');
		$(holderNotificacionesFavNoticias).css({'width' : '100%', 'height' : 45, 'float' : 'left', 'position' : 'relative'});
		$(self.div).append(holderNotificacionesFavNoticias);	
	
	//Goles	
	var tickGoles = new TickComponentNotifiacion(self);
		$(holderNotificacionesFavNoticias).append(tickGoles.div);

	var textGoles = document.createElement('p');
		$(textGoles).text('Goles');
		$(holderNotificacionesFavNoticias).append(textGoles);
		$(textGoles).css({'position' : 'absolute', 'left' : 32, 'top' : 8});

	//Noticias
	var tickNoticias = new TickComponentNotifiacion(self);
		$(holderNotificacionesFavNoticias).append(tickNoticias.div);
		$(tickNoticias.div).css({'left' : 163});

	var textNoticias = document.createElement('p');
		$(textNoticias).text('Noticias');
		$(holderNotificacionesFavNoticias).append(textNoticias);
		$(textNoticias).css({'position' : 'absolute', 'left' : 195, 'top' : 8});
		
	/**/
	var holderEquipos = document.createElement('div');
		$(holderEquipos).css({'width' : '100%', 'height' : 27, 'float' : 'left', 'position' : 'relative'});
		$(self.div).append(holderEquipos);	

	var textEquipos = document.createElement('p');
		$(textEquipos).text('Equipos Favoritos');
		$(holderEquipos).append(textEquipos);
		$(textEquipos).css({'float' : 'left', 'margin-top' : 2});
		
	var flechaDown = new Image();
		flechaDown.src = 'img/secciones/registro/flecha-down.png';	
		flechaDown.width = 22;
		$(holderEquipos).append(flechaDown);
		$(flechaDown).css({'float' : 'left', 'margin-left' : 5, 'margin-top' : 5});
		$(holderEquipos).append('<div class="clear"></div>');
		
		$(flechaDown).bind('click' , slideDownEquipos);
		$(textEquipos).bind('click' , slideDownEquipos);

	/**/	
	var holderEquiposResize = document.createElement('div');
		$(self.div).append(holderEquiposResize);
		$(holderEquiposResize).css
		({
			'width' : '98%', 'height': 'auto', 'float' : 'left', 
			'position' : 'relative', 'background' : 'rgba(180, 178, 178, 0.6)', 
			'overflow' : 'hidden', 'display' : 'none', 'border-top' : '#000 solid 1px',
			'border-bottom' : '#000 solid 1px'
		});
		
	$(self.div).append('<h3>Notificaciones juegos de pronósticos:<h3>');

	var holderAcertastes = document.createElement('div');
		$(holderAcertastes).css({'width' : '100%', 'height' : 45, 'float' : 'left', 'position' : 'relative'});
		$(self.div).append(holderAcertastes);	
				
	var tickAcertasteResultado = new TickComponentNotifiacion(self);
		$(holderAcertastes).append(tickAcertasteResultado.div);

	var textAcertasteResultado = document.createElement('p');
		$(textAcertasteResultado).text('Acertaste pronóstico');
		$(holderAcertastes).append(textAcertasteResultado);
		$(textAcertasteResultado).css({'position' : 'absolute', 'left' : 32, 'top' : 8});

	var ticPartidoCerrarse = new TickComponentNotifiacion(self);
		$(holderAcertastes).append(ticPartidoCerrarse.div);
		$(ticPartidoCerrarse.div).css({'left' : 163});

	var textPartidoCerrarse = document.createElement('p');
		$(textPartidoCerrarse).text('Partido por cerrarse');
		$(holderAcertastes).append(textPartidoCerrarse);
		$(textPartidoCerrarse).css({'position' : 'absolute', 'left' : 195, 'top' : 8});

	/**/
	var holderPartidosPuntos = document.createElement('div');
		$(holderPartidosPuntos).css({'width' : '100%', 'height' : 45, 'float' : 'left', 'position' : 'relative'});
		$(self.div).append(holderPartidosPuntos);	

	var tickTotalPuntos = new TickComponentNotifiacion(self);
		$(holderPartidosPuntos).append(tickTotalPuntos.div);

	var textTotalPuntos = document.createElement('p');
		$(textTotalPuntos).text('Total puntos');
		$(holderPartidosPuntos).append(textTotalPuntos);
		$(textTotalPuntos).css({'position' : 'absolute', 'left' : 32, 'top' : 8});										

	var divButton = document.createElement('div');
		$(self.div).append(divButton);
		$(divButton).css({'width' : '100%', 'height' : 60, 'float' : 'left', 'position' : 'relative'});

	var btnGuardarRegistro = document.createElement('div');
		btnGuardarRegistro.className = 'btn-next';
		$(divButton).append(btnGuardarRegistro);
		$(btnGuardarRegistro).text('GUARDAR');	
		$(btnGuardarRegistro).css({'top' : 10, 'z-index' : 9});
		$(btnGuardarRegistro).bind('click' , doGuardar);

		
	$.ajax
	({
		url  : objApp.SERVER+'ws/ws-obtenerSelecciones.php',
		success : onCompleteGetSelecciones
	});				
	
	function slideDownEquipos()
	{
		if(!mostrandoEquipos)
		{
			$(flechaDown).attr('src' , 'img/secciones/registro/flecha-up.png');	
			$(holderEquiposResize).slideDown("slow");
			mostrandoEquipos = true;
		}
		else
		{
			$(flechaDown).attr('src' , 'img/secciones/registro/flecha-down.png');	
			$(holderEquiposResize).slideUp("slow");
			mostrandoEquipos = false;
		}
	}
	
	function onCompleteGetSelecciones(xml)
	{
		objApp.ocultarCargador();

		$(xml).find('seleccion').each(function(index, element) 
		{
			var itemNotificacion = new ItemNotificacion(this, index);
           $(holderEquiposResize).append(itemNotificacion.div);
		   array_favoritos.push(itemNotificacion);
        });
	}
	
	function doGuardar()
	{
		objApp.mostrarCargador();

		var stringFavoritos = '';
		
		for(var i = 0; i < array_favoritos.length; ++i)
		{
			if(array_favoritos[i].getEstado() == 1)
			{
				if(i == (array_favoritos.length -1))
					stringFavoritos += array_favoritos[i].idPais();
				else
					stringFavoritos += array_favoritos[i].idPais()+',';
			}
		}
		
		var params =
		{
			usuario_uid : data.usuario_uid,
			usuario_at : data.usuario_at,
			usuario_nombre : data.usuario_nombre,
			usuario_email : data.usuario_email,
			usuario_ciudad_origen  : data.usuario_ciudad_origen,
			usuario_ciudad_actual : data.usuario_ciudad_actual,
			usuario_fecha_nacimiento : data.usuario_fecha_nacimiento,
			usuario_numero_carnet: data.usuario_numero_carnet,
			usuario_numero_tel: data.usuario_numero_tel,
			guardo_favoritas: 1,
			uuid : data.uuid,
			pushToken : data.pushToken,
			plataforma : data.plataforma,
			'notificaciones_inicio_partido' : tickInicioPartido.getEstado(),
			'notificaciones_fin_partido' : tickFinalPartido.getEstado(),
			'notificaciones_goles' : tickGoles.getEstado(),
			'notificaciones_noticias' : tickNoticias.getEstado(),
			'notificaciones_acertaste_pronostico' : tickAcertasteResultado.getEstado(),
			'notificaciones_partido_por_cerrarse' : ticPartidoCerrarse.getEstado(),
			'notificaciones_total_puntos' : tickTotalPuntos.getEstado(),
			'selecciones_favoritas' : stringFavoritos
		}
		
		$.ajax
		({
			url  : objApp.SERVER+'ws/ws-guardarUsuario.php',
			type : 'POST',
			data : params,
			success : onCompleteXML
		});	
	}
	
	function onCompleteXML(xml)
	{
		if(parseInt($(xml).find('resultado').text()) == 1)
		{
			objApp.setIdUsuario($(xml).find('idUsuario').text(), $(xml).find('nombre').text());
			
			setTimeout(function()
			{
				objApp.Navigate('inicio', null);
			
			}, 500);
		}
		else
		{
			objApp.error('Ha ocurrido un error, intenta más tarde');
		}
	}
}