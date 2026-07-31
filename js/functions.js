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
		var $grids = $('.works-grid');
		var $filter = $('#works-filter');

		$grids.each(function() {
			var $grid = $(this);
			$grid.imagesLoaded(function() {
				$grid.isotope({
					itemSelector: '.works-item',
					masonry: {
						gutter: '.gutter'
					}
				});
			});
		});

		$filter.find('ul li').on('click', function() {
			$filter.find('ul li').removeClass('active');
			$(this).addClass('active');
			var category = $(this).attr('data-filter');
			$grids.each(function() {
				var $grid = $(this);
				var hasMatches = category === '*' || $grid.find(category).length > 0;
				$grid.closest('.work-section').toggleClass('is-empty', !hasMatches);
				$grid.isotope({
					filter: category
				});
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
		$('.project-popup').magnificPopup({
			type: 'inline',
			closeBtnInside: true,
			mainClass: 'mfp-fade',
			callbacks: {
				open: function() {
					this.content.find('video[data-autoplay]').each(function() {
						var video = this;
						video.currentTime = 0;
						var playPromise = video.play();
						if (playPromise) {
							playPromise.catch(function() {});
						}
					});
				},
				close: function() {
					this.content.find('video[data-autoplay]').each(function() {
						var video = this;
						video.pause();
						video.currentTime = 0;
					});
				}
			}
		});
	});
});
