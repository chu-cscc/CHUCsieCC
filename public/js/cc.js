'use strict';
/* ScarWu, 2013 */

$(document).ready(function () {
	$('#services .info .mirror').siblings().hide();
});

$('body').delegate('nav a', 'click', function (event) {
	event.preventDefault();

	var target = $(this).attr('href');
	var moveTo = $(target).position().top - $('nav').height();

	$('html, body').stop().animate({
		scrollTop: moveTo
	}, 750);
}).delegate('#services .menu .item', 'mouseover', function() {
	$(this).addClass('active').siblings().removeClass('active');

	var target = $(this).attr('class').split(' ')[0];
	$('#services .info .' + target).show().siblings().hide();
});

$('.top').on('click', function (event) {
	event.preventDefault();

	$('html, body').stop().animate({
		scrollTop: 0
	}, 750);
});

$(window).on('scroll', function () {
	for (var index = 0;index < $('.main_block.static').size();index++) {
		var top = $('.main_block.static').eq(index).position().top;
		var id = '#' + $('.main_block.static').eq(index).attr('id');

		if ($(window).scrollTop() >= (top - $('nav').height())) {
			if($(id + '.fixed').size() != 0)
				continue;

			$(id + '.static').css({ 'z-index': index });

			var block = $(id + '.static').clone();
			block.removeClass('static').addClass('fixed').css({
				'z-index': top,
				top: $('nav').height()
			});
			$('body').append(block);
		}
		else {
			if($(id + '.fixed').size() == 0)
				continue;

			$(id + '.static').css({ 'z-index': 5000 });
			$(id + '.fixed').remove();
		}
	}

	if ($('.main_block.fixed').size() != 0) {
		var front = $('.main_block.fixed').size() - 1;
		var id = '#' + $('.main_block.fixed').eq(front).attr('id');

		var gap = $(id + '.fixed').height() - $(window).height();
		var top = $(id + '.static').position().top - $(window).scrollTop();

		if (gap > 0) {
			$(id + '.fixed').css({
			 	top: top + gap >= 0 ? top : -gap
			});
		}
	}

	if ($(window).scrollTop() >= $('header').height()) {
		if ($('nav.fixed').size() == 0) {
			var nav = $('nav').clone().addClass('fixed');
			$('body').append(nav);
		}
	}
	else
		$('nav.fixed').remove();
});