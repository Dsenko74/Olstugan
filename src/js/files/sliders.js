/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
//import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	//це для відображення кількості слайдів та поточного
	const totalSlides = document.getElementById('total-slides');
	const currentSlide = document.getElementById('current-slide');
	if (document.querySelector('.hero__slider')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.hero__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Pagination, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			//autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			//lazy: true,


			// Ефекти
		//	effect: 'fade',
			// autoplay: {
			// 	delay: 15000,
			// 	disableOnInteraction: false,
			// },
	

			// Пагінація
	
			pagination: {
				el: '.slide-bullets',
				clickable: true,
			},

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },
			/*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// Події
			on: {
				//це для відображення кількості слайдів та поточного
				init: function () {
					totalSlides.textContent = String(this.slides.length).padStart(2, '0');
					currentSlide.textContent = String(this.realIndex + 1).padStart(2, '0');
			},
				slideChange: function () {
						currentSlide.textContent = String(this.realIndex + 1).padStart(2, '0');
				}
			}
		});
	}
	if (document.querySelector('.carte__slider')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.carte__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Pagination, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: "auto",
			spaceBetween: 20,
			//autoHeight: true,
			speed: 800,
			grabCursor: true,
			//touchRatio: 0,
			//simulateTouch: false,
			loop: false,
			//preloadImages: false,
			//lazy: true,


			// Ефекти
		//	effect: 'fade',
			// autoplay: {
			// 	delay: 15000,
			// 	disableOnInteraction: false,
			// },
	

			// Пагінація
	
			pagination: {
				el: '.carte__bullets',
				clickable: true,
			},

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},
			
			// Брейкпоінти
			// breakpoints: {
				// 320: {
				// 	slidesPerView: 1,
				// 	spaceBetween: 0,
				// },
			// 	500: {
			// 		slidesPerView: 2,
			// 		spaceBetween: 10,
			// 		loop: true,
			// 	},
			// 	// 768: {
			// 	// 	slidesPerView: 3,
			// 	// 	spaceBetween: 20,
			// 	// },
			// 	// 992: {
			// 	// 	slidesPerView: 3,
			// 	// 	spaceBetween: 20,
			// 	// },
			// 	1268: {
			// 		slidesPerView: 3,
			// 		spaceBetween: 30,
			// 	},
			// },
	
			// Події
			// on: {
			// 	//це для відображення кількості слайдів та поточного
			// 	init: function () {
			// 		totalSlides.textContent = String(this.slides.length).padStart(2, '0');
			// 		currentSlide.textContent = String(this.realIndex + 1).padStart(2, '0');
			// },
			// 	slideChange: function () {
			// 			currentSlide.textContent = String(this.realIndex + 1).padStart(2, '0');
			// 	}
			// }
		});
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});