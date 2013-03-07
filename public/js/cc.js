'use strict';
/* ScarWu, 2013 */

var setOnNavBottonClick = function () {
	$('nav a').on('click', function () {
		event.preventDefault();

		var target = $(this).attr('href');
		var moveTo = $(target).position().top - $('nav').height();

		$('html, body').stop().animate({ scrollTop: moveTo }, 750);
	});
}

$(document).ready(function () {
	setOnNavBottonClick();
	$('#services .info .mirror').siblings().hide();
});

$('.top').on('click', function () {
	event.preventDefault();
	$('html, body').stop().animate({ scrollTop: 0 }, 750);
});

$('#services .menu .item').on('mouseover', function() {
	$(this).addClass('active');
	$(this).siblings().removeClass('active');
	var target = $(this).attr('class').split(' ')[0];
	$('#services .info .' + target).show().siblings().hide();
});

var fixed_nav_active = false;
$(window).on('scroll', function () {
	if ($('body').scrollTop() >= $('header').height()) {
		if (!fixed_nav_active) {
			var nav = $('nav').clone().addClass('fixed');

			$('body').append(nav);
			setOnNavBottonClick();

			fixed_nav_active = true;
		}
	}
	else {
		$('nav.fixed').remove();

		fixed_nav_active = false;
	}
});