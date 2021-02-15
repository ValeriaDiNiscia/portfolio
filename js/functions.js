jQuery(function($) {
	'use strict';
	/*
		Dropdown Menu
	*/
	var dropdownMenu = function() {
		$('#sidebar nav ul .dropdown > span').on('click', function() {
			var $parent = $(this).parent();
			if (!$parent.hasClass('expanded')) {
				$('#sidebar nav ul .dropdown').removeClass('expanded');
				$('#sidebar nav ul .dropdown > ul').slideUp(300);
				$parent.find('> ul').slideDown(300);
				$parent.addClass('expanded');
			} else {
				$parent.removeClass('expanded');
				$parent.find('> ul').slideUp(300);
			}
		});
	}

	/*
		Project Carousel
	*/
	var projectCarousel = function() {
		$('#project-page #project-carousel').carousel();
	}

	/*
		Project Gallery
	*/
	var projectGallery = function() {
		$('#project-page .gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true
			},
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300,
				opener: function(element) {
					return element.find('img');
				}
			}
		});
	}

	/*
		Animsition
	*/
	var animsition = function() {
		$('.global-outer').animsition({
			transition: function(url) {
				window.open(url, '_blank');
			}
		});
	}

	/*
		Isotope
	*/
	var isotope = function() {
		var $grid = $('#works-grid');
		var $filter = $('#works-filter');

		$grid.imagesLoaded(function() {
			$grid.isotope({
				itemSelector: '.works-item',
				masonry: {
					gutter: '.gutter'
				}
			});
		});

		$filter.find('ul li').on('click', function() {
			$filter.find('ul li').removeClass('active');
			$(this).addClass('active');
			var category = $(this).attr('data-filter');
			$grid.isotope({
				filter: category
			});
			return false;
		});
	}

	$(window).on('load', isotope);
	
	$(document).ready(function() {
		dropdownMenu();
		projectCarousel();
		projectGallery();
		animsition();
	});
});