//setTimeout(function(){
   //window.location.reload(1);
//}, 2000);

var notificationsEnabled = false;
	
	function initNotifications() {
		if (window.Notification) {
			Notification.requestPermission(function(permission) {
				if (permission === 'granted') {
					notificationsEnabled = true;
				} else {
					alert("Usted declino las notificaciones");
				}
			});
		} else {
			alert("No se soporta esta API");
		}
	}
	



var Usuario_Loggeado = 1;
var UsuarioDatos = $.post('https://dominioproyectos.com:3000/personas/obtenerdatos',{"ID_Usuario":Usuario_Loggeado}, 
	function(data){},'json');
//var d = jQuery.parseJSON(UsuarioDatos);
//alert (d.Usuario);

	

// Servicio para obtener datos del usuario loggeado
$.post('https://dominioproyectos.com:3000/personas/obtenerdatos',{"ID_Usuario":Usuario_Loggeado}, function(data) {
	var NombreUsuario = '';
	var Nombre = '';
	var Apellido = '';
	var ID_Rol = '';
	var foto_usuario = '';
	var LikesDados = '';
	var LikesRecibidos = '';
	var CantidadUploads = '';
	var Comments = '';
	var TotalPuntos = '';

	$.each(data,function(key,value){
		NombreUsuario += value.Usuario;
		Nombre += value.Nombre;
		Apellido += value.Apellido;
		ID_Rol += value.ID_Rol;
		foto_usuario += value.foto_usuario;
		LikesDados += value.LikesDados;
		LikesRecibidos += value.LikesRecibidos;
		CantidadUploads += value.CantidadUploads;
		Comments += value.Comments;
		TotalPuntos += value.TotalPuntos;
	});


	$.post('https://dominioproyectos.com:3000/noticias/obtenernoticias',{"ID_Usuario":Usuario_Loggeado}, function(data) {  // Para usar el servicio
	
    var Noticias = '';
    var contador = 0;
    $.each(data,function(key,value){
    	//onclick="myFunctionLike('+contador+','+value.Total_Reaccion+','+Usuario_Loggeado+','+value.ID_Noticia+')"

    	Noticias +='<article>';
		Noticias +='	<header>';
		Noticias +='		<img onclick="prueba();" class="image user" src="'+value.foto_usuario+'">'+value.Usuario;
		Noticias +='	</header>';

		Noticias +='	<img class="image fit" src="'+value.Imagen_1+'" alt="" />';

		Noticias +='	<h3><a href="javascript:void(0)">'+value.Encabezado+'</a></h3>';

		Noticias +='	<p>'+value.Texto1+'</p>';

		Noticias +='	<div id="imgclick_'+contador+'"><a><img onclick="LikeNoticia('+contador+','+value.Total_Reaccion+','+Usuario_Loggeado+','+value.ID_Noticia+')" src="images/Like_'+value.Flag_Reaccion+'.png" style="width:6%;height:6%; float:left;"></a></div>';
		Noticias +='	<span id="numclick_'+contador+'">'+value.Total_Reaccion+' Me gusta</span>';
		

		if (value.comments.length > 0) {

	        Noticias +=' | <a id="CantidadComentarios_'+contador+'" onclick="return toggle('+contador+')">'+value.comments.length+' Comentarios</a>';
        }
        Noticias +='	<div class="toggle-content" id="contenido_'+contador+'">';
        	var Comentarios ='';
        	$.each(value.comments,function(key2,value2){
        	Comentarios +='<div class="container-comments">';
		    Comentarios +=	'<div class="comments">';
		    Comentarios +=		'<a href="javascript:void(0)"><img class="imgUsuarioComentario" src="'+value2.com_foto_usuario+'" alt="" /></a>';
		    Comentarios +=		'<div class="info-comments" style="background-color: white">';
		    Comentarios +=			'<div class="parrafo"><p><b>'+value2.com_Usuario+'</b> '+value2.Comentario+'</p></div>';
		    Comentarios +=			'<div class="footer footer_comment">'+value2.com_Timestamp+'</div>';
		    Comentarios +=		'</div>';
		    Comentarios +=	'</div>';
		    Comentarios +='</div>';
			});
		Noticias += Comentarios; 
        Noticias +='	</div>';
       		
        	
    	Noticias +=	'<div id="contenido">';
        Noticias +=		'<div class="container-comments">';
	    Noticias +=			'<div class="comments comentario_noticia">';
	    Noticias +=				'<a href="javascript:void(0)"><img class="imgUsuarioComentario" src="'+foto_usuario+'" alt="" /></a>';
	    Noticias +=				'<div class="info-comments" style="background-color: white">';
	    Noticias +=             	'<input type="text" id="ComentarioNoticia_'+contador+'" name="ComentarioNoticia_'+contador+'" style="background-color:white; width:100%;" placeholder="¿Qué estás pensando?" />';
	    Noticias +=          	'</div>';
	    Noticias +=        '</div>';
	    Noticias +=		'</div>';
   		Noticias +=	'</div>';


        Noticias +='	<div class="comentario_noticia">';                             
        Noticias +='    	<div align="right"><a href="javascript:void(0)" onclick="ComentarNoticia('+Usuario_Loggeado+','+value.ID_Noticia+','+contador+','+value.comments.length+',\'' +foto_usuario+'\',\'' +NombreUsuario+'\');" " class="boton_comentario">Enviar</a><br></div>';
       	Noticias +='    </div>';
       																																	
        Noticias +='</article>'; 

		contador = contador+1; 

    });
    $('#noticias').append(Noticias);
    //alert(Noticias);
    //alert(Comentarios);
},'json');


	//alert(User);
	var Menu = '<li><a href="javascript:void(0)"><img class="imgUsuarioMenu" src="'+foto_usuario+'"></a></li>';
	$('#MenuNavegacion').append(Menu);
},'json');

//$.get('https://api.myjson.com/bins/zucnc', function(data) {    // Para usar el hosteado



function toggle (id) {
    var toggleable = document.querySelector('#contenido_'+id);
    
    if (!toggleable) return;
    
    if (!toggleable.style.display
        || toggleable.style.display === 'none') {
        toggleable.style.display = 'block';
    } else {
        toggleable.style.display = 'none';
    }
    
    return false;
}





function LikeNoticia(Num_Elemento,Cantidad_Likes,Id_Usuario,Id_Elemento) {
	$.post('https://dominioproyectos.com:3000/misc/reaccion',
	{"ID_Usuario":Id_Usuario, "ID_Elemento":'01-'+Id_Elemento}, 
	function(data) { 
		var Flag_Proceso = data.FlagProcess;
		var Flag_Reaccion = data.FlagReaccion;

		switch (Flag_Reaccion) {
			case 0:
			var Likes=Cantidad_Likes-1; break;
			case 1:
			var Likes=Cantidad_Likes+1;  break;
		}

		document.getElementById("numclick_"+Num_Elemento).innerHTML =	Likes+' Me gusta';
		document.getElementById("imgclick_"+Num_Elemento).innerHTML = '<img onclick="LikeNoticia('+Num_Elemento+','+Likes+','+Id_Usuario+','+Id_Elemento+')" src="images/Like_'+Flag_Reaccion+'.png" style="width:6%;height:6%; float:left;" />';

	},'json');
}


function ComentarNoticia(Id_Usuario,Id_Elemento,Num_Elemento,CantidadComentarios,FotoUsuario,NombreUsuario) {
	var Comentario = document.getElementById('ComentarioNoticia_'+Num_Elemento).value;
	if(Comentario.length > 0){
		$.post('https://dominioproyectos.com:3000/misc/comentar',{"ID_Usuario":Id_Usuario, "ID_Elemento":'01-'+Id_Elemento, "Comentario":Comentario},);
		document.getElementById("CantidadComentarios_"+Num_Elemento).innerHTML = CantidadComentarios+1 +' Comentarios';
		var ComentarioNuevo = '';
			ComentarioNuevo +='<div class="container-comments">';
		    ComentarioNuevo +=	'<div class="comments">';
		    ComentarioNuevo +=		'<a href="#"><img class="imgUsuarioComentario" src="'+FotoUsuario+'" alt="" /></a>';
		    ComentarioNuevo +=		'<div class="info-comments" style="background-color: white">';
		    ComentarioNuevo +=			'<div class="parrafo"><p><b>'+NombreUsuario+'</b> '+Comentario+'</p></div>';
		    ComentarioNuevo +=			'<div class="footer footer_comment">Hace unos momentos</div>';
		    ComentarioNuevo +=		'</div>';
		    ComentarioNuevo +=	'</div>';
		    ComentarioNuevo +='</div>';
        
        
            ////////////
        
        
        
        

	

		if (notificationsEnabled) {
			var notification = new Notification("Dominio", {
				body : Comentario,
				icon : 'http://dominioproyectos.com/images/logocover.png'
			});
			
			//setTimeout(function() { notification.close(); }, 5000);
		} else {
			alert("Las notificaciones fueron desHabilitadas");
		}
	
        
        navigator.vibrate([500]);
        
        //////////////////
		    
		    $("#contenido_"+Num_Elemento).append(ComentarioNuevo);
		
	}else{
		document.getElementById('ComentarioNoticia_'+Num_Elemento).focus();
	}
	document.getElementById('ComentarioNoticia_'+Num_Elemento).value='';
	
}


////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////














(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

})(jQuery);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./ServiceWorker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
