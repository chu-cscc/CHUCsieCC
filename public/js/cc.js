'use strict';
/* ScarWu, 2013 */

$(document).ready(function () {
	$('#services .info .mirror').siblings().hide();
});

$('body').delegate('nav a', 'click', function (event) {
	event.preventDefault();

	var target = $(this).attr('href');
	var moveTo = $(target).position().top - $('nav').height();

	$('html, body').stop().animate({ scrollTop: moveTo }, 750);
}).delegate('#services .menu .item', 'mouseover', function() {
	$(this).addClass('active');
	$(this).siblings().removeClass('active');

	var target = $(this).attr('class').split(' ')[0];
	$('#services .info .' + target).show().siblings().hide();
});

$('.top').on('click', function (event) {
	event.preventDefault();
	$('html, body').stop().animate({ scrollTop: 0 }, 750);
});

var fixed_nav_active = false;
var fixed_block_active = {};

$(window).on('scroll', function () {
	for (var index = 0;index < $('.main_block.static').size();index++) {
		var top = $('.main_block.static').eq(index).position().top;
		var block_id = $('.main_block.static').eq(index).attr('id');

		if ($(window).scrollTop() >= (top - $('nav').height())) {
			if(fixed_block_active[block_id])
				continue;

			var block = $('.main_block.static').eq(index).clone();
			block.removeClass('static').addClass('fixed').css({ 'z-index': top, top: $('nav').height()});
			$('.main_block.static').eq(index).css({ 'z-index': index });
			$('body').append(block);

			fixed_block_active[block_id] = true;
		}
		else {
			if(!fixed_block_active[block_id])
				continue;

			fixed_block_active[block_id] = false;

			$('.main_block.static').eq(index).css({ 'z-index': 5000 });
			$('.main_block.fixed').eq(index).remove();
		}
	}

	if ($(window).scrollTop() >= $('header').height()) {
		if (!fixed_nav_active) {
			var nav = $('nav').clone().addClass('fixed');
			$('body').append(nav);

			fixed_nav_active = true;
		}
	}
	else {
		$('nav.fixed').remove();

		fixed_nav_active = false;
	}
});