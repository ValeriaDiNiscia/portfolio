document.addEventListener('DOMContentLoaded', function() {
	'use strict';

	var videos = document.querySelectorAll('video[data-autoplay]');
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (!videos.length || reduceMotion) {
		return;
	}

	var observer = new IntersectionObserver(function(entries) {
		entries.forEach(function(entry) {
			var video = entry.target;

			if (entry.isIntersecting) {
				var playPromise = video.play();
				if (playPromise) {
					playPromise.catch(function() {});
				}
			} else {
				video.pause();
			}
		});
	}, {
		threshold: 0.15
	});

	videos.forEach(function(video) {
		observer.observe(video);
	});
});
