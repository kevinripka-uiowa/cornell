$(function(){

	var $form = $('#get-weight'),
		$input = $form.find('input'),
		weight,
		$target = $('#hunger-results'),
		sodaWeight = 4.4,
		sodas;

	$form.on('submit', function(e){
		e.preventDefault();

		$target.empty();
		weight = $input.val();

		// Check if a number
		if (isNaN(parseFloat(weight))) {
			$target.show();
			$target.html('<p>Please enter a number</p>');
			return false;
		}

		sodas = (weight * 2) / sodaWeight;
		sodas = sodas.toFixed(2);

		$target.slideDown(50);

		var sodasNoZeros = parseFloat(sodas);

		var $header = $('<h1 />');
		$header.text(sodasNoZeros + ' two-liter bottles of soda');

		var $header2 = $('<h2 />')
			.text("we don't suggest you try it");

		$target.append($header).append($header2);

		var counter = 0,
			delay = 50;

		/*
		 * Scroll only when necessary.
		 * Keeps the newest row near the bottom of the viewport.
		 */
		var scrollToBottle = function($bottle) {

			var viewportBottom =
				$(window).scrollTop() + $(window).height();

			var bottleBottom =
				$bottle.offset().top + $bottle.outerHeight();

			// Only scroll if the new row is dropping below the viewport
			if (bottleBottom > viewportBottom - 80) {

				var targetScroll =
					bottleBottom - $(window).height() + 120;

				$('html, body').stop(true).animate({
					scrollTop: targetScroll
				}, 350, 'easeInOutQuad');
			}
		};

		var makeBottle = function(i, counter){

			var $bottle = $('<div />')
				.addClass('bottle');

			if ((counter + 1) % 5 == 0) {
				$bottle.addClass('push');
			}

			var $mask = $('<div />')
				.addClass('mask');

			var $bar = $('<div />')
				.addClass('bar');

			$bottle
				.append($bar)
				.append($mask);

			$target.append($bottle);

			/*
			 * At the beginning of each new row,
			 * scroll down with the animation.
			 *
			 * counter 0  = row 1
			 * counter 10 = row 2
			 * counter 20 = row 3
			 */
			if (counter > 0 && counter % 10 === 0) {

				setTimeout(function(){
					scrollToBottle($bottle);
				}, counter * delay);
			}

			// CSS transitions on touch devices
			if (
				$('html').hasClass('csstransitions') &&
				$('html').hasClass('touch')
			) {

				if (i < 1) {

					setTimeout(function(){
						$bar.css({
							'height': (84 * i) + 'px'
						});
					}, counter * delay);

				} else {

					setTimeout(function(){
						$bar.css({
							'height': '84px'
						});
					}, counter * delay);

				}

			} else {

				if (i < 1) {

					setTimeout(function(){
						$bar.animate({
							'height': (84 * i) + 'px'
						}, 1000, 'easeOutBounce');
					}, counter * delay);

				} else {

					setTimeout(function(){
						$bar.animate({
							'height': '84px'
						}, 1000, 'easeOutBounce');
					}, counter * delay);

				}

			}

			// Clear after every 10 bottles
			if (
				counter !== 0 &&
				(counter + 1) % 10 === 0
			) {
				var $br = $('<div />')
					.addClass('clearfix');

				$target.append($br);
			}
		};

		for (var i = sodas; i > 0; i--) {
			makeBottle(i, counter);
			counter++;
		}

	});

});