(function ($) {
	"use strict";
  
	const $window = $(window);
	const $document = $(document);
	const $header = $('header');
	const $menuTrigger = $('.menu-trigger');
	const $nav = $('.header-area .nav');
	const $scrollLinks = $('.scroll-to-section a[href^="#"]');
  
	// Page loading animation
	$window.on('load', function () {
	  $('#js-preloader').addClass('loaded');
  
	  if ($('.cover').length) {
		$('.cover').parallax({
		  imageSrc: $('.cover').data('image'),
		  zIndex: '1',
		});
	  }
  
	  $("#preloader").animate({ opacity: '0' }, 600, function () {
		setTimeout(() => {
		  $("#preloader").css("visibility", "hidden").fadeOut();
		}, 300);
	  });
	});
  
	// Header background on scroll
	$window.scroll(function () {
	  const scroll = $window.scrollTop();
	  const boxHeight = $('.header-text').height();
	  const headerHeight = $header.height();
	  $header.toggleClass("background-header", scroll >= boxHeight - headerHeight);
	});
  
	// Reload on screen width change across 767px
	let width = $window.width();
	$window.resize(function () {
	  const newWidth = $window.width();
	  if ((width > 767 && newWidth <= 767) || (width <= 767 && newWidth > 767)) {
		location.reload();
	  }
	});
  
	// Isotope filtering
	const $eventBox = document.querySelector('.event_box');
	const $filters = document.querySelector('.event_filter');
	if ($eventBox) {
	  const isotope = new Isotope($eventBox, {
		itemSelector: '.event_outer',
		layoutMode: 'masonry'
	  });
  
	  if ($filters) {
		$filters.addEventListener('click', function (e) {
		  if (e.target.matches('a')) {
			const filterValue = e.target.getAttribute('data-filter');
			isotope.arrange({ filter: filterValue });
			$filters.querySelector('.is_active')?.classList.remove('is_active');
			e.target.classList.add('is_active');
			e.preventDefault();
		  }
		});
	  }
	}
  
	// Owl Carousels
	$('.owl-banner, .owl-testimonials').owlCarousel({
	  center: true,
	  items: 1,
	  loop: true,
	  nav: true,
	  margin: 30,
	  navText: [
		'<i class="fa fa-angle-left" aria-hidden="true"></i>',
		'<i class="fa fa-angle-right" aria-hidden="true"></i>'
	  ],
	  responsive: {
		992: { items: 1 },
		1200: { items: 1 }
	  }
	});
  
	// Menu Dropdown Toggle
	if ($menuTrigger.length) {
	  $menuTrigger.on('click', function () {
		$(this).toggleClass('active');
		$nav.slideToggle(200);
	  });
	}
  
	// Smooth scroll
	function onScroll() {
	  const scrollPos = $document.scrollTop();
	  $('.nav a').each(function () {
		const $currLink = $(this);
		const $refElement = $($currLink.attr("href"));
		if ($refElement.length &&
		  $refElement.offset().top <= scrollPos &&
		  $refElement.offset().top + $refElement.outerHeight() > scrollPos) {
		  $('.nav ul li a').removeClass("active");
		  $currLink.addClass("active");
		} else {
		  $currLink.removeClass("active");
		}
	  });
	}
  
	$document.ready(function () {
	  $document.on("scroll", onScroll);
  
	  $scrollLinks.on('click', function (e) {
		e.preventDefault();
		$document.off("scroll");
  
		$scrollLinks.removeClass('active');
		$(this).addClass('active');
  
		const target = $($(this).attr('href'));
		if (target.length) {
		  const scrollOffset = target.offset().top - 79;
		  $('html, body').stop().animate({ scrollTop: scrollOffset }, 500, 'swing', function () {
			window.location.hash = target.selector;
			$document.on("scroll", onScroll);
		  });
		}
  
		if ($window.width() < 767) {
		  $menuTrigger.removeClass('active');
		  $nav.slideUp(200);
		}
	  });
	});
  
	// Dropdown submenu toggle
	$('.main-nav ul.nav .has-sub > a').each(function () {
	  $(this).on('tap click', function (e) {
		const $parent = $(this).parent('li');
		const $submenu = $parent.find('> ul.sub-menu');
		const $siblings = $parent.siblings('.has-sub');
  
		if ($submenu.is(':visible')) {
		  $submenu.slideUp(450, 'easeInOutQuad');
		  $parent.removeClass('is-open-sub');
		} else {
		  $siblings.removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad');
		  $submenu.slideDown(250, 'easeInOutQuad');
		  $parent.addClass('is-open-sub');
		}
  
		e.preventDefault();
	  });
	});
  
  })(jQuery);
  