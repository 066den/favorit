document.addEventListener("DOMContentLoaded", function() {

	$('.phone').on('click', function(){
		$(this).toggleClass('active');
	})

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
		margin: 96,
		loop: true,
		center: true,
		stagePadding: 550,
		nav: true,
		navText: ['<span class="arrow-left-lg"></span>','<span class="arrow-right-lg"></span>'],
		//autoplay: true,
		//autoplayTimeout:1500
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

	$(window).scroll(function(){
		var topHeight = $('.header').height();
		if($(window).scrollTop() > topHeight) {
			$('.navbar').addClass('stuck');
		} else {
			$('.navbar').removeClass('stuck');
		}
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
