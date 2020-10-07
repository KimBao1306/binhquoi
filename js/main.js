jQuery(document).ready(function ($) {
	if ($('.header').length) {
		/** MENU FIXED WHEN SCROLL */
		$(window).on('scroll', function () {
			if ($(window).scrollTop() > 0) {
				$('.header').addClass('--fixed');
			} else {
				$('.header').removeClass('--fixed');
			}
		});
		/** MENU FIXED WHEN SCROLL - END */
		/** MENU IN MOBILE */
		$('.header__list  .dropdown').each(function () {
			const dropdown = $(this);
			const arrows = $('<i></i>');
			arrows.addClass('fa fa-angle-down');
			dropdown.find('a').eq(0).append(arrows);
			const subMenu = dropdown.children('.sub-menu');
			console.log(subMenu);
			arrows.on('click', function (e) {
				e.preventDefault();

				dropdown.toggleClass('--show');
				// dropdown.slideToggle('--show');
				// subMenu.slideToggle('--show');
				// $(this).parents('.dropdown').toggleClass('--show');
				$(this).parent().next('ul').stop().slideToggle();
			});
		});

		// document.querySelectorAll('.header__list  .dropdown').forEach((el) => {
		// 	const dropdown = el;
		// 	const arrows = document.createElement('i');
		// 	arrows.classList.add('fa', 'fa-angle-down');
		// 	dropdown.querySelector('a').appendChild(arrows);
		// 	arrows.addEventListener('click', (e) => {
		// 		e.preventDefault();
		// 		dropdown.classList.toggle('--show');
		// 	});
		// });
		/** MENU IN MOBILE - END */
	}

	/** SCROLL TO TOP */
	if ($('.scroll-top').length) {
		$('.scroll-top').on('click', function (e) {
			e.preventDefault();
			$('html, body').animate(
				{
					// scrollTop: $("#to").offset().top //scroll đến vị trí #to
					scrollTop: 0,
				},
				500
			);
			return false;
		});

		$(window).on('scroll', function () {
			if ($(this).scrollTop() >= 10) {
				$('.scroll-top').addClass('--show');
			} else {
				$('.scroll-top').removeClass('--show');
			}
		});
	}
	/** SCROLL TO TOP - END*/

	/** LIBRARY */
	$('span[class^="tab"]').each(function () {
		$(this).on('click', function () {
			$(this).addClass('--active').siblings().removeClass('--active');

			$($('div[class^="content"]')[$(this).data('tabs') - 1])
				.addClass('--active')
				.siblings()
				.removeClass('--active');
		});
	});
	/** LIBRARY - END */

	/** LIGHTGALLERY */
	if ($('.is-lightgallery').length) {
		$('.is-lightgallery').lightGallery({
			thumbnail: true,
		});
	}
	/** LIGHTGALLERY - END*/
	/** MAGNIFICPOPUP */
	// $('.open-popup-btn').magnificPopup({
	// 	removalDelay: 500,
	// 	callbacks: {
	// 		beforeOpen: function () {
	// 			this.st.mainClass = 'mfp-zoom-in';
	// 		},
	// 	},
	// 	midClick: true,
	// });
	if ($('.video-btn').length) {
		$('.video-btn').parent().magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-zoom-in',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false,
		});
	}
	/** MAGNIFICPOPUP - END*/
	/** SWIPER */
	$('.is-slider').each(function () {
		const $swiper = $(this).find('.swiper-container');
		const nextBtn = $(this).find('.swiper-button-next');
		const prevBtn = $(this).find('.swiper-button-prev');
		const pagination = $(this).find('.swiper-pagination');
		const swiper_common = new Swiper($swiper, {
			speed: 600,
			// autoHeight: false,
			slidesPerView: 'auto',
			pagination: {
				el: pagination,
				clickable: true,
			},
			navigation: {
				nextEl: nextBtn,
				prevEl: prevBtn,
			},
			loop: true,
		});

		if (
			$('.control-swiper-button').length &&
			$(this).parents('.box-2').length
		) {
			swiper_common.destroy();
			const $swiper = $(this).find('.swiper-container');
			const swiper_box = new Swiper($swiper, {
				speed: 600,
				slidesPerView: 'auto',
				pagination: {
					el: $('.control-swiper-button .swiper-pagination'),
					clickable: true,
				},
				loop: true,
			});

			$('.fas').on('click', function () {
				if ($(this).hasClass('fa-play')) {
					$('.fa-pause').addClass('--show');
					$(this).removeClass('--show');
					swiper_box.autoplay.start();
				} else if ($(this).hasClass('fa-pause')) {
					$('.fa-play').addClass('--show');
					$(this).removeClass('--show');
					swiper_box.autoplay.stop();
				}
			});
		}
	});
	/** SWIPER - END*/

	/** MENU BUTTON */
	if (
		$('.header .hamburger-btn').length &&
		$('.header__list').length &&
		$('.overlay').length
	) {
		$('.header .hamburger-btn').on('click', function () {
			$(this).toggleClass('--active');
			$('.header__list').toggleClass('--active');
			$('.overlay').toggleClass('--show');
		});

		$('.overlay').on('click', function () {
			$(this).removeClass('--show');
			$('.hamburger-btn').removeClass('--active');
			$('.header__list').removeClass('--active');
		});
	}
	/** MENU BUTTON - END*/

	/** MENU BUTTON BANNER */
	if (
		$('.banner .hamburger-btn').length &&
		$('.banner__addr').length &&
		$('.overlay').length
	) {
		$('.banner .hamburger-btn').on('click', function () {
			$(this).toggleClass('--active');
			$('.banner__addr').toggleClass('--active');
			$('.overlay').toggleClass('--show');
		});
		$('.overlay').on('click', function () {
			$(this).removeClass('--show');
			$('.banner .hamburger-btn').removeClass('--active');
			$('.banner__addr').removeClass('--active');
		});
	}
	/** MENU BUTTON BANNER  - END*/
});
