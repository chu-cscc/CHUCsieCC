'use strict';

$('nav a').on('click', function () {
	event.preventDefault();

	var target = $(this).attr('href');
	var moveTo = $(target).position().top - $('header').height();

	$('html, body').animate({
		scrollTop: moveTo
	}, 750);

});