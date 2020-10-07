if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}
function isHidden(elem) {
	return !elem.offsetWidth && !elem.offsetHeight;
}
function stickySide(idSticky, idStickyWrap, offset = 0) {
	if (!document.querySelector(idSticky)) return;
	if (!document.querySelector(idStickyWrap)) return;
	let sticky, stickyHeight, stickyWrap, stickyWrapHeight, stickyWrapOffsetTop;
	sticky = document.querySelector(idSticky);
	stickyHeight = sticky.offsetHeight;
	stickyWrap = document.querySelector(idStickyWrap);
	stickyWrapHeight = stickyWrap.offsetHeight;
	stickyWrapOffsetTop = stickyWrap.offsetTop;
	if (
		pageYOffset + offset >= stickyWrapOffsetTop &&
		pageYOffset + offset + stickyHeight <=
			stickyWrapOffsetTop + stickyWrapHeight
	) {
		sticky.style.position = 'relative';
		sticky.style.top = offset + pageYOffset - stickyWrapOffsetTop + 'px';
	} else {
		if (pageYOffset + offset < stickyWrapOffsetTop) {
			sticky.removeAttribute('style');
		}
		if (
			pageYOffset + offset + stickyHeight >
			stickyWrapOffsetTop + stickyWrapHeight
		) {
			sticky.style.top = stickyWrapHeight - stickyHeight + 'px';
		}
	}
}
function scrollToTop() {
	if (pageYOffset > 0) {
		window.requestAnimationFrame(scrollToTop);
		window.scrollTo(0, pageYOffset - pageYOffset / 8);
	}
}
window.addEventListener('DOMContentLoaded', () => {
	// new WOW().init();
	function activeTabMobile() {
		const tab = document.querySelectorAll('.tab-link');
		if (tab.length) {
			tab.forEach((t) => t.classList.remove('active'));
			if (window.matchMedia('(max-width: 500px)').matches) {
				tab[1].classList.add('active');
			} else {
				tab[0].classList.add('active');
			}
		}
	}
	activeTabMobile();

	document.querySelectorAll('.tab-links').forEach((el) => {
		document
			.querySelector(
				el.querySelector('.tab-link.active')?.getAttribute('data-tab')
			)
			?.classList.add('active');
		el.addEventListener('click', (e) => {
			const clickTabLink = e.target.closest('.tab-link');
			const currentTabLink = el.querySelector('.tab-link.active');
			const clickTabContent = document.querySelector(
				clickTabLink.getAttribute('data-tab')
			);
			const currentTabContent = clickTabContent.parentElement.querySelector(
				'.tab-content.active'
			);
			currentTabLink?.classList.remove('active');
			clickTabLink.classList.add('active');
			currentTabContent?.classList.remove('active');
			clickTabContent?.classList.add('active');
			window.dispatchEvent(new Event('resize'));
		});
	});
	document.querySelectorAll('.main-menu-nav .dropdown').forEach((el) => {
		const dropdown = el;
		const arrows = document.createElement('i');
		const subMenu = dropdown.querySelector('.sub-menu-wrap');
		arrows.classList.add('fa', 'fa-angle-down');
		dropdown.querySelector('a').appendChild(arrows);
		arrows.addEventListener('click', (e) => {
			e.preventDefault();
			dropdown.classList.toggle('show-sub-menu');
		});
	});
	if (
		document.getElementById('main-menu-btn') &&
		document.getElementById('main-menu') &&
		document.getElementById('main-menu-overlay')
	) {
		const mainMenuBtn = document.getElementById('main-menu-btn');
		const mainMenu = document.getElementById('main-menu');
		const mainMenuOverlay = document.getElementById('main-menu-overlay');
		mainMenuBtn.addEventListener('click', function () {
			mainMenuBtn.classList.toggle('active');
			mainMenu.classList.toggle('active');
		});
		mainMenuOverlay.addEventListener('click', function () {
			mainMenuBtn.classList.remove('active');
			mainMenu.classList.remove('active');
		});
	}
	if (document.getElementById('scroll-top')) {
		const scrollTopBtn = document.getElementById('scroll-top');
		pageYOffset >= 100
			? scrollTopBtn.classList.add('show')
			: scrollTopBtn.classList.remove('show');
		window.addEventListener('scroll', function () {
			pageYOffset >= 100
				? scrollTopBtn.classList.add('show')
				: scrollTopBtn.classList.remove('show');
		});
		scrollTopBtn.addEventListener('click', scrollToTop);
	}
	// MONA CONTENT
	document
		.querySelectorAll('.mona-content iframe[src^="https://www.youtube.com/"]')
		.forEach((el) => {
			const wrap = document.createElement('div');
			wrap.classList.add('mona-youtube-wrap');
			el.insertAdjacentElement('afterend', wrap);
			wrap.appendChild(el);
		});
	document.querySelectorAll('.mona-content table').forEach((el) => {
		const wrap = document.createElement('div');
		wrap.classList.add('mona-table-wrap');
		el.insertAdjacentElement('afterend', wrap);
		wrap.appendChild(el);
	});
	if (document.getElementById('header')) {
		window.addEventListener('load', () => {
			const header = document.getElementById('header');
			const headerHeight = header.offsetHeight;
			const headerOffset = header.offsetTop;
			if (pageYOffset >= headerOffset + headerHeight) {
				header.classList.add('fixed');
				header.nextElementSibling.style.marginTop = headerHeight + 'px';
			} else {
				header.classList.remove('fixed');
				header.nextElementSibling.style.marginTop = '';
			}
			window.addEventListener('scroll', function () {
				if (pageYOffset >= headerOffset + headerHeight) {
					header.classList.add('fixed');
					header.nextElementSibling.style.marginTop = headerHeight + 'px';
				} else {
					header.classList.remove('fixed');
					header.nextElementSibling.style.marginTop = '';
				}
			});
		});
	}
	document.querySelectorAll('.swiper-slider').forEach((el) => {
		const slider = el.querySelector('.swiper-container');
		const pagination = el.querySelector('.swiper-pagination');
		const prevBtn = el.querySelector('.swiper-button-prev');
		const nextBtn = el.querySelector('.swiper-button-next');
		new Swiper(slider, {
			speed: 600,
			autoHeight: false,
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
	});

	/* DISABLE SLIDER TOUR FOR YOU ON MOBILE */
	function disableSliderTourForYou() {
		const section = document.querySelector('.tour-for-you-slider');
		const screenWidth = window.outerWidth;
		if (screenWidth < 768 && section) {
			section.classList.add('disable-slider');
			Array.from(section.querySelectorAll('.swiper-slide-duplicate')).forEach(
				(s) => (s.style.display = 'none')
			);
		} else {
			new Swiper('.tour-for-you-slider', {
				speed: 600,
				autoHeight: false,
				slidesPerView: 'auto',
				loop: true,
			});
		}
	}
	disableSliderTourForYou();
	window.addEventListener('resize', disableSliderTourForYou);
	/* DISABLE SLIDER TOUR FOR YOU ON MOBILE - END */

	/* TURN OFF SLIDER HEADER-BOTTOM */
	// new Swiper('.header-intro-slider.is-slider .swiper-container', {
	// 	speed: 6000,
	// 	autoHeight: false,
	// 	slidesPerView: 'auto',
	// 	autoplay: {
	// 		delay: 0,
	// 	},
	// 	pagination: {
	// 		el: '.header-intro-slider .swiper-pagination',
	// 		clickable: true,
	// 	},
	// 	navigation: {
	// 		nextEl: '.header-intro-slider .swiper-button-next',
	// 		prevEl: '.header-intro-slider .swiper-button-prev',
	// 	},
	// 	loop: true,
	// });
	/* TURN OFF SLIDER HEADER-BOTTOM - END */

	const tourList = document.getElementsByClassName('tour-item');
	let sortAsc = true;

	// function sortTourList(filterBy) {
	// 	const arrTourList = Array.from(tourList);
	// 	if (filterBy === 'date') {
	// 		sortAsc = true;
	// 		const t = arrTourList.sort((a, b) => {
	// 			sortAsc
	// 				? parseInt(a.dataset.date) - parseInt(b.dataset.date)
	// 				: parseInt(b.dataset.date) - parseInt(a.dataset.date);
	// 		});
	// 		sortAsc = false;
	// 		console.log(
	// 			'date',
	// 			t.map((t) => t.dataset.date)
	// 		);
	// 	} else if (filterBy === 'price') {
	// 		const t = arrTourList.sort((a, b) => +a.dataset.price - +b.dataset.price);
	// 		console.log(
	// 			'price',
	// 			t.map((t) => t.dataset.price)
	// 		);
	// 	}
	// }
	// document.querySelectorAll('.sort').forEach((x) => {
	// 	const filterBy = x.dataset.filterBy;
	// 	x.addEventListener('click', () => sortTourList(filterBy));
	// });
});
jQuery(document).ready(function ($) {
	$('.open-popup-btn').magnificPopup({
		removalDelay: 500,
		callbacks: {
			beforeOpen: function () {
				this.st.mainClass = 'mfp-zoom-in';
			},
		},
		midClick: true,
	});
	$('.open-video-btn').magnificPopup({
		disableOn: 768,
		type: 'iframe',
		mainClass: 'mfp-zoom-in',
		removalDelay: 500,
		preloader: false,
		fixedContentPos: false,
	});

	if ($('.tour-detail-gallery').length) {
		let limit = 5;
		if ($('.tour-detail-gallery > li').length > limit) {
			let $length =
				$('.tour-detail-gallery > li').length - limit < 10
					? $('.tour-detail-gallery > li').length - limit
					: '10+';
			$(`.tour-detail-gallery > li:eq(${limit}) > a`).append(`
                <span class="show-more-overlay">
                    <span class="counter">${$length}</span>
                    <span class="title">Xem thêm</span>
                </span>
            `);
			$(`.tour-detail-gallery > li:gt(${limit})`).hide();
		}
		$('.tour-detail-gallery').lightGallery({
			selector: 'a',
			share: false,
			actualSize: false,
			download: false,
			autoplayControls: false,
			thumbnail: true,
			animateThumb: true,
			showThumbByDefault: true,
		});
	}

	$('.tour-detail-faqs-title').on('click', function () {
		$(this).next().stop().slideToggle();
	});

	$(window).on('load', function () {
		if ($('#tour-detail-sidebar').length) {
			const headerHeight = $('#header .top-header').outerHeight();
			const sidebar = $('#tour-detail-sidebar');
			const sidebarOffset = sidebar.offset().top;
			sidebar.css('top', headerHeight + 15 + 'px');
			if ($('#tour-detail-sidebar-btn').length) {
				$('#tour-detail-sidebar-btn').on('click', (e) => {
					e.preventDefault();
					$('html, body').animate(
						{scrollTop: sidebarOffset - headerHeight},
						'slow'
					);
				});
			}
		}
		if ($('#sticky-wrap').length) {
			let headerHeight = $('#header .top-header').outerHeight();
			const sticky = $('#sticky-wrap');
			const stickyHeight = sticky.outerHeight();
			//HEIGHT OF HEADER IN WORDPRESS
			if ($('body').hasClass('logged-in')) {
				headerHeight += 32;
			}
			sticky.css('top', headerHeight + 'px');
			sticky.css('opacity', 1);
			sticky.find('a').each(function () {
				const $this = $(this);
				const $target = $($this.attr('href'));
				$this.on('click', function (e) {
					e.preventDefault();
					$('html, body').animate(
						{scrollTop: $target.offset().top - headerHeight - stickyHeight},
						'medium'
					);
				});
				$(window).on('scroll', function () {
					if (
						$target.offset().top <=
							$(this).scrollTop() + headerHeight + stickyHeight + 1 &&
						$target.offset().top + $target.outerHeight() >
							$(this).scrollTop() + headerHeight + stickyHeight
					) {
						$this
							.closest('li')
							.addClass('active')
							.siblings()
							.removeClass('active');
					}
				});
			});
		}
	});

	// SORT FOR TOUR
	if ($('.grids').length) {
		var $grids = $('.grids').isotope({
			itemSelector: '.grid',
			layoutMode: 'fitRows',
			getSortData: {
				price: '[data-price] parseInt',
				date: function (elem) {
					return parseInt($(elem).data('date'));
				},
			},
		});
		$grids.imagesLoaded().progress(function () {
			$grids.isotope('layout');
		});
		$('.grid-sort').on('click', function (x) {
			/* Get the value */
			var sortValue = $(this).attr('data-sort-by');
			/* Get the sorting direction: asc||desc */
			var direction = $(this).attr('data-sort-direction');
			/* convert it to a boolean */
			var isAscending = direction === 'asc';
			var newDirection = isAscending ? 'desc' : 'asc';
			isAscending
				? $(this).children('img').attr('src', 'images/sorting-up.svg')
				: $(this).children('img').attr('src', 'images/sorting-down.svg');

			/* pass it to isotope */
			$grids.isotope({sortBy: sortValue, sortAscending: isAscending});
			/* add new direction */
			$(this).attr('data-sort-direction', newDirection);
		});
	}
	// SORT FOR TOUR - END
});
