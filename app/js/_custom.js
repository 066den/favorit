document.addEventListener("DOMContentLoaded", function() {

	$('a[href="#"]').on('click', function(e) { e.preventDefault(); })

	$('.main-slider .owl-carousel').owlCarousel({
		items: 1
	})

	$('.brand-list .owl-carousel').owlCarousel({
		items: 3,
		margin: 48,
		loop: true,
		autoplay: true,
		autoplayTimeout:1500
	})
	
	$('.reviews .owl-carousel').owlCarousel({
		items:1,
		loop: true,
		center: true,
		nav: false,
		navText: ['<span class="arrow-left-lg"></span>','<span class="arrow-right-lg"></span>'],
		//autoplay: true,
		autoplayTimeout:2500,
		smartSpeed:1000,
		responsiveClass:true,
		responsive:{
			0:{},
			600:{},
			1200:{
				items:1,
				margin: 20,
				nav: true,
			},
			1600:{
				stagePadding: 550,
				items:1,
				margin: 96,
				nav: true,
			}
		}
	})

	$('.zoom-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true,
			tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
		}
	});

	$('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		mainClass: 'mfp-zoom-in',
		focus: '#name',
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});

	$(window).scroll(function(){
		var topHeight = $('.header').height();
		if($(window).scrollTop() > topHeight) {
			$('.navbar').addClass('stuck');
		} else {
			$('.navbar').removeClass('stuck');
		}
	})

	var inputs = Array.prototype.slice.call(document.querySelectorAll('.phone-mask'));
	inputs.forEach( function(input) {
		var keyCode;
		function mask(event) {
			event.keyCode && (keyCode = event.keyCode);
			var pos = this.selectionStart;
			if (pos < 4) event.preventDefault();
			var matrix = "+7 (___) ___-____",
					i = 0,
					def = matrix.replace(/\D/g, ""),
					val = this.value.replace(/\D/g, ""),
					new_value = matrix.replace(/[_\d]/g, function(a) {
						return i < val.length ? val.charAt(i++) || def.charAt(i) : a
												});
					i = new_value.indexOf("_");
			if (i != -1) {
				i < 5 && (i = 4);
				new_value = new_value.slice(0, i)
			}
			var reg = matrix.substr(0, this.value.length).replace(/_+/g,
				function(a) {
					return "\\d{1," + a.length + "}"
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 6 || keyCode > 47 && keyCode < 58) this.value = new_value;
			if (event.type == "blur" && this.value.length < 6)  this.value = "";
		}

		input.addEventListener("input", mask, false);
		input.addEventListener("focus", mask, false);
		input.addEventListener("blur", mask, false);
		input.addEventListener("keydown", mask, false)
	})

});


function initMap(coords) {
	var coord = {};
	var coord_centr = {};
	coord.lat = coords[0];
	coord.lng = coords[1];
	coord_centr.lat = coords[0];
	coord_centr.lng = coords[1] - 0.003000;
	
	var image=new google.maps.MarkerImage(
		'assets/img/marker.png',
		new google.maps.Size(40,58),
		new google.maps.Point(0,0),
		new google.maps.Point(38,56)
		);
	var map = new google.maps.Map(document.getElementById("map-canvas"), {
		zoom: 17,
		center: coord_centr,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel:false,
		disableDefaultUI: true,
	});

	var marker = new google.maps.Marker({
		position: coord,
		map: map, 
		icon: image,
		//animation: google.maps.Animation.BOUNCE
	});
};
