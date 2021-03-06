document.addEventListener("DOMContentLoaded", function() {

	$('a[href="#"]').on('click', function(e) { e.preventDefault(); })

	$('.main-slider .owl-carousel').owlCarousel({
		items: 1,
		animateOut: 'fadeOut',
		animateIn: 'fadeUp',
		loop: true,
		autoplay: true,
		smartSpeed:450
    
	})

	$('.gallery .owl-carousel').owlCarousel({
		items: 1,
		
	})

	$('.brand-list .owl-carousel').owlCarousel({
		items: 3,
		margin: 18,
		loop: true,
		autoplay: true,
		autoplayTimeout:1500,
		responsiveClass:true,
		responsive:{
			0:{
				items: 2,
			},
			576:{},
			990:{
				margin: 48,
			},	
		}
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

	$('.selection label').on('click', function() {
		$(this).parent('li').addClass('active').siblings().removeClass('active');
	})

	$('input.control').on('click', function(){
		var control_el = $(this).parent().next();
		if ($(this).is(':checked')){
			$(control_el).removeClass('disabled');
		} else {
			$(control_el).addClass('disabled');
		}
	});

	$('.hamburger').on('click', function(){
		$(this).toggleClass('active');
		$('#navbar .navbar-nav').slideToggle();
	})

	$(window).scroll(function(){
		var topHeight = $('.header').height();
		if($(window).scrollTop() > topHeight) {
			$('.navbar').addClass('stuck');
		} else {
			$('.navbar').removeClass('stuck');
		}
	})

});

let addPrice = (event) => {
	if(event) {
		let el = event.currentTarget;
		if(el.getAttribute('type') == 'checkbox') {
			let siblings = el.parentElement.parentElement.children;
			for (let i = 0; i < siblings.length; i++) {
				let first = siblings[i].firstChild;
				if(first !== el && first.tagName == 'INPUT') {
					first.checked = false;
				}
			}
		}
	}

	let input_check = Array.prototype.slice.call(document.querySelectorAll('#data_calc input:checked'));
	let result = 0;
	input_check.forEach( (input) => {
		result += parseInt(input.value);
		console.log(input);	
	})
	console.log(price);	
	price.textContent = result;
}

var inputs_calc = Array.prototype.slice.call(document.querySelectorAll('#calculator input'));
var view = Array.prototype.slice.call(document.querySelectorAll('#view input'));
inputs_calc.forEach( (input) => {
	let name = input.getAttribute('name');
	
	let changeGlaz = () => {
		let glaz = document.querySelector('#glazing input:checked');
		let check;
		view.forEach( (el) => {
			if (el.checked) check = el;
			el.checked = false;
			if (glaz.value == el.getAttribute('name')) {
				el.setAttribute('type', 'radio');
			}else{
				el.setAttribute('type', 'hidden');
			}
		})
		let siblings = check.parentElement.children;
		for (let i = 0; i < siblings.length; i++) {
			if(siblings[i] !== check && siblings[i].tagName == 'INPUT') {
				siblings[i].checked = true;
			}
		}
	}

	if(name == 'glazing') {
		input.addEventListener("change", changeGlaz, false);
	}
	input.addEventListener("change", addPrice, false);
})

addPrice();

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
