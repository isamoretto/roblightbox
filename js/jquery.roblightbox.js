/*
robLightbox v1.0

@author Rafael Ortega Bueno

*/

(function($){
	$.fn.robLightbox = function(options){

		defaults = {
			galeria:false,
			ajax:false,
			backgroundBoxColor:'black',
			backgroundAlfa:50,
			speed:250,
			padding:'5px',
			borderRadius:false,
			molduraColor:'#aaa',
			marginTop:'100px',
			boxshadow:false,
			addBtFechar:false,
			overflow:false
		};
		options = $.extend(defaults,options);


		$(window).load(function(){
			$('.bt_lightbox').click(function(e){
				e.preventDefault();
				var content = $(this).parent().find('.content_lightbox').html();
				prepareBackgroundBox($(this));
			});
		});

		var total = 0;



		this.each(function(){

			if(options.galeria){
				galeriaImg($(this),total);
				return false;
			}

			if(options.ajax){
				carregaAjax($(this),total);
				return false;
			}


			prepareBox($(this),total);
			total++;
		});


		//Função para tratar galeria de imagens.
		function galeriaImg(elemento,id){

			return alert('Galeria de imagens');
		}

		//Função para tratar carregamento de ajax dentro do box.
		function carregaAjax(elemento,id){
			return alert('Carregar ajax');
		}

		//Função para tratar lightbox com html
		function prepareBox(elemento,id){

			var label = elemento.attr('title');
			var html = elemento.html();
			var content_width = elemento.children().width();
			var content_height = elemento.children().height();
			elemento.html('<button class="bt_lightbox" id="bt_lightbox_'+id+'"><span>'+label+'</span></button>');
			elemento.append('<div class="content_lightbox" id="id_content_lightbox_'+id+'" style="display:none;width:'+content_width+'px;heihgt:'+content_height+'px">'+html+'</div>');


		}

		//Função para criar o lightbox
		function prepareBackgroundBox(elemento){

			$('body').prepend('<div class="background_lightbox" style="position:fixed !important"></div>');
			$('.background_lightbox').css({
				'display':'none',
				'width':'100%',
				'height':'100%',
				'position':'absolute',
				'z-index':998,
				'left':0,
				'top':0,
				'background':options.backgroundBoxColor,
				'opacity':'0.'+options.backgroundAlfa,
				'-moz-opacity': '0.'+options.backgroundAlfa,
				'filter': 'alpha(opacity='+options.backgroundAlfa+')'

			}).click(function(){
				destroyLightbox();
			}).fadeIn(options.speed,function(){
				createBoxContent(elemento);
			});
		}

		//Função para criar o box do conteúdo
		function createBoxContent(elemento){

			paddingContent = parseInt(elemento.parent().find('.content_lightbox').children().css('padding-left'))+parseInt(elemento.parent().find('.content_lightbox').children().css('padding-right'));


			if(options.overflow){
				document.documentElement.style.overflow = 'hidden';  // firefox, chrome
				document.body.scroll = "no";    // ie only
			}
			padding = options.padding.split(' ');




			switch(padding.length)
			{
				case 1:
					paddingTop = padding[0].replace('px','');
					paddingRight = padding[0].replace('px','');
					paddingBottom = padding[0].replace('px','');
					paddingLeft = padding[0].replace('px','');
				break;
				case 2:
					paddingTop = padding[0].replace('px','');
					paddingRight = padding[1].replace('px','');
					paddingBottom = padding[1].replace('px','');
					paddingLeft = padding[1].replace('px','');
				break;
				case 3:
					paddingTop = padding[0].replace('px','');
					paddingRight = padding[1].replace('px','');
					paddingBottom = padding[2].replace('px','');
					paddingLeft = padding[1].replace('px','');
				break;
				case 4:
					paddingTop = padding[0].replace('px','');
					paddingRight = padding[1].replace('px','');
					paddingBottom = padding[2].replace('px','');
					paddingLeft = padding[3].replace('px','');
				break;
			}

			molduraWidth = parseInt(elemento.parent().find('.content_lightbox').width())-(parseInt(paddingLeft)+parseInt(paddingRight));
			molduraHeight = parseInt(elemento.parent().find('.content_lightbox').height())-(parseInt(paddingTop)+parseInt(paddingBottom));
			molduraWReal = elemento.parent().find('.content_lightbox').width()+parseInt(paddingContent);

			$('body').prepend('<div class="roblightbox_moldura" style="position:fixed !important"></div>');
			if(options.borderRadius){
				$('.roblightbox_moldura').css({
					'-webkit-border-radius':options.borderRadius,
					'-moz-border-radius':options.borderRadius,
					'border-radius':options.borderRadius
				});
			}
			if(options.boxshadow){

				$('.roblightbox_moldura').css({
					'-webkit-box-shadow':'0px 0px 20px 1px '+options.boxshadow,
					'box-shadow':'0px 0px 20px 1px '+options.boxshadow
				});
			}

			molduraMarginLeft = ($(window).width() - molduraWidth) / 2;
			molduraMarginTop = ($(window).height() - molduraHeight) / 2;


			$('.roblightbox_moldura').css({
				'display':'none',
				'position':'absolute',
				'z-index':999,
				'background':options.molduraColor,
				'padding-top':paddingTop+'px',
				'padding-right':paddingRight+'px',
				'padding-bottom':paddingBottom+'px',
				'padding-left':paddingLeft+'px',
				'margin-left':parseInt(molduraMarginLeft),
				'margin-top':parseInt(options.marginTop),
				'width':parseInt(molduraWReal)
			}).html(elemento.parent().find('.content_lightbox').html()).fadeIn(options.speed);



			if(options.addBtFechar){
				if(options.addBtFechar.html){
					btFechar = $(options.addBtFechar.html).addClass('fechar');
				}else{
					btFechar = $('<button class="fechar"><span>x</span></button>');
				}

				if(options.addBtFechar.position){
					positions = options.addBtFechar.position.split(' ');
					if(positions.length){
						if(positions[0] == 'bottom'){
							btFechar.css('float',positions[1]);
							$('.roblightbox_moldura').append('<div style="clear:both;padding-top:3px;"></div>').append(btFechar);
						}
						if(positions[0] == 'top'){
							btFechar.css('float',positions[1]);
							$('.roblightbox_moldura').prepend('<div style="clear:both;padding-bottom:3px;"></div>').prepend(btFechar);
						}
					}



				}else{
					btFechar.css({'float':'right'});
					$('.roblightbox_moldura').prepend('<div style="clear:both;padding-bottom:3px"></div>').prepend(btFechar);
				}
			}

			$('.roblightbox_moldura').find('.fechar').click(function(){
				destroyLightbox();
			});

		}

		//Função para destruir o lightbox
		function destroyLightbox(){
			$('.background_lightbox').fadeOut(options.speed,function(){
				$(this).remove();
			});
			$('.roblightbox_moldura').fadeOut(options.speed,function(){
				$(this).remove();
			});
			if(options.overflow){
				document.documentElement.style.overflow = 'auto';  // firefox, chrome
				document.body.scroll = "yes";    // ie only
			}

		}


	};
})(jQuery);
