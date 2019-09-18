document.addEventListener("DOMContentLoaded", function() {

	$('.phone').on('click', function(){
		$(this).toggleClass('active');
	})

	$('.main-slider .owl-carousel').owlCarousel({
		items: 1
	})

});
