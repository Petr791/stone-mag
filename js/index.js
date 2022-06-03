const deadline1 = new Date(2022, 05, 24);
const deadline2 = new Date(2022, 05, 18);


// класс для создание таймера обратного отсчета
class CountdownTimer {
    constructor(deadline, cbChange, cbComplete) {
        this._deadline = deadline;
        this._cbChange = cbChange;
        this._cbComplete = cbComplete;
        this._timerId = null;
        this._out = {
            days: '',
            hours: '',
            minutes: '',
            daysTitle: '',
            hoursTitle: '',
            minutesTitle: ''
        };
        this._start();
    }

    _start() {
        this._calc();
        this._timerId = setInterval(this._calc.bind(this), 1000);
    }
    _calc() {
        const diff = this._deadline - new Date();
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;

        this._out.days = days < 10 ? '0' + days : days;
        this._out.hours = hours < 10 ? '0' + hours : hours;
        this._out.minutes = minutes < 10 ? '0' + minutes : minutes;

        this._out.daysTitle = 'Дни';
        this._out.hoursTitle = 'Часы';
        this._out.minutesTitle = 'Минуты';

        this._cbChange ? this._cbChange(this._out) : null;
        if (diff <= 0) {
            clearInterval(this._timerId);
            this._cbComplete ? this._cbComplete() : null;
        }
    }
}




// класс для создания аккордиона
class ItcAccordion {
    constructor(target, config) {
        this._el = typeof target === 'string' ? document.querySelector(target) : target;
        const defaultConfig = {
            alwaysOpen: true,
            duration: 350
        };
        this._config = Object.assign(defaultConfig, config);
        this.addEventListener();
    }
    addEventListener() {
        this._el.addEventListener('click', (e) => {
            const elHeader = e.target.closest('.accordion__header');
            if (!elHeader) {
                return;
            }
            if (!this._config.alwaysOpen) {
                const elOpenItem = this._el.querySelector('.accordion__item_show');
                if (elOpenItem) {
                    elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
                }
            }
            this.toggle(elHeader.parentElement);
        });
    }
    show(el) {
        const elBody = el.querySelector('.accordion__body');
        if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
            return;
        }
        elBody.style['display'] = 'block';
        const height = elBody.offsetHeight;
        elBody.style['height'] = 0;
        elBody.style['overflow'] = 'hidden';
        elBody.style['transition'] = `height ${this._config.duration}ms ease`;
        elBody.classList.add('collapsing');
        el.classList.add('accordion__item_slidedown');
        elBody.offsetHeight;
        elBody.style['height'] = `${height}px`;
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            el.classList.remove('accordion__item_slidedown');
            elBody.classList.add('collapse');
            el.classList.add('accordion__item_show');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
        }, this._config.duration);
    }
    hide(el) {
        const elBody = el.querySelector('.accordion__body');
        if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
            return;
        }
        elBody.style['height'] = `${elBody.offsetHeight}px`;
        elBody.offsetHeight;
        elBody.style['display'] = 'block';
        elBody.style['height'] = 0;
        elBody.style['overflow'] = 'hidden';
        elBody.style['transition'] = `height ${this._config.duration}ms ease`;
        elBody.classList.remove('collapse');
        el.classList.remove('accordion__item_show');
        elBody.classList.add('collapsing');
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            elBody.classList.add('collapse');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
        }, this._config.duration);
    }
    toggle(el) {
        el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
    }
}








document.addEventListener('DOMContentLoaded', function() {

    // первый таймер
    const elDays1 = document.querySelector('.action-timer .timer__days');
    const elHours1 = document.querySelector('.action-timer .timer__hours');
    const elMinutes1 = document.querySelector('.action-timer .timer__minutes');
    //console.log(elDays1);
    //console.log(elHours1);
    //console.log(elMinutes1);

    // Создадание нового объекта, используя new CountdownTimer()
    new CountdownTimer(deadline1, (timer) => {
        elDays1.textContent = timer.days;
        elHours1.textContent = timer.hours;
        elMinutes1.textContent = timer.minutes;

        elDays1.dataset.title = timer.daysTitle;
        elHours1.dataset.title = timer.hoursTitle;
        elMinutes1.dataset.title = timer.minutesTitle;
    }, () => {});


    // второй таймер
    const elDays2 = document.querySelector('.timer-action .timer__days');
    const elHours2 = document.querySelector('.timer-action .timer__hours');
    const elMinutes2 = document.querySelector('.timer-action .timer__minutes');
    // Создадание нового объекта, используя new CountdownTimer()
    new CountdownTimer(deadline2, (timer) => {
        elDays2.textContent = timer.days;
        elHours2.textContent = timer.hours;
        elMinutes2.textContent = timer.minutes;

        elDays2.dataset.title = timer.daysTitle;
        elHours2.dataset.title = timer.hoursTitle;
        elMinutes2.dataset.title = timer.minutesTitle;
    }, () => {});


    //LazyLoad
    const myLazyLoad = new LazyLoad({

        elements_selector: ".lazy"
    });



    // tabs
    const tabButtons = document.querySelectorAll('.tablinks');
    const tabs = document.querySelectorAll('.tabcontent');

    tabButtons.forEach((button) => {

        button.addEventListener('click', () => {

            //console.log(button.innerText);
            tabButtons.forEach(but => {
                if (but.classList.contains('button-bg')) {
                    but.classList.remove('button-bg');
                }
            })
            button.classList.add('button-bg');

            tabs.forEach(tab => {
                tab.classList.remove('active')
                if (button.dataset.tabContent === tab.dataset.tabContent) {

                    tab.classList.add('active')

                }
            })

        });
    });


    // accordion
    /*   new ItcAccordion(document.querySelector('.accordion'), {
        alwaysOpen: false
    });
 */
    new ItcAccordion(document.querySelector('.accordion'), {
        alwaysOpen: true
    });


    // Sticky Header

    const headerSticky = document.querySelector(".header");

    /**
     * Sticky Header
     */
    const isWindowScrolled = () => window.scrollY > 100;
    const isStickyHeaderAllowed = () => window.innerWidth >= 768;
    const headerScrolledClass = "header--scrolled";
    let lastScrollY = 0;

    function stickyHeader() {
        if (isWindowScrolled()) {
            headerSticky.classList.add(headerScrolledClass);
        } else {
            headerSticky.classList.remove(headerScrolledClass);
        }

        if (window.scrollY > lastScrollY) {
            headerSticky.classList.add("header--hidden");
        } else {
            headerSticky.classList.remove("header--hidden");
        }

        setTimeout(() => {
            lastScrollY = window.scrollY;
        }, 10);
    }

    const debounce = (callback, wait) => {
        let timeoutId = null;
        return (...args) => {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                callback.apply(null, args);
            }, wait);
        };
    };
    const headerResizeFiexer = debounce(stickyHeader, 30);

    window.addEventListener("scroll", headerResizeFiexer);
    window.addEventListener("orientationchange", headerResizeFiexer);
    headerResizeFiexer();



    // card services-card wow  animate__animated
    wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // default
        offset: 0, // default
        mobile: false, // default
        live: true // default
    })
    wow.init();



    // Событие отправки формы
    let formHero = document.querySelector('#form-hero');
    //console.log(formHero);
    formHero.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("форма 'form-hero' отправлена!");
        submitForm();
    });


    let formAction = document.querySelector('#form-action');
    formAction.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("форма 'form-action' отправлена!");
        submitForm();
    });


    let formPrice = document.querySelector('#form-price');
    formPrice.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("форма 'form-price' отправлена!");
        submitForm();
    });


    let formAnswers = document.querySelector('#form-answers');
    formAnswers.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("форма 'form-answers' отправлена!");
        submitForm();
    });


    //popup form
    let freepriceForm = document.querySelector('#freeprice-form');
    freepriceForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("форма 'freeprice-form' отправлена!");
        submitForm();
    });





    function submitForm() {
        // Get the first form with the name
        // Hopefully there is only one, but there are more, select the correct index
        var frms = document.querySelectorAll('form');
        frms.forEach(element => {
            //frm.submit(); // Submit
            element.reset(); // Reset
            return true; // Prevent page refresh
        });
        alert('Данные отправлены!');
    }







    //reviews slider
    //new Swiper('.swiper-container');
    new Swiper('.swiper-container', {
        // Вывод стрелок навигации
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        },
        // Вывод скроллбара
        /*  scrollbar: {
        	  el: '.swiper-scrollbar',
        	  draggable: true
         }, */
        // бесконечный слайдер
        loop: true,
        // скорость прокрутки
        speed: 600,
        // отступ между слайдами
        spaceBetween: 30,
    })
    myLazyLoad.update();
    //lazyLoadInstance.update();



});

//LazyLoad
/* const MmyLazyLoad = new LazyLoad({

    elements_selector: ".lazy"
}); */



// Instance using native lazy loading
/* const lazyContent = new LazyLoad({
    use_native: true // <-- there you go

}); */




/* 
// для карты
wow3 = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 0, // default
    mobile: false, // default
    live: true // default
})
wow3.init();
*/







window.addEventListener("load", function() {

    // JS action animation
    // js animation timer span
    const nowDate = new Date();
    const timeDifference = deadline1 - nowDate;


    let timerSpans = document.querySelectorAll('.span-timer');

    let timeSec = timeDifference;

    function spanFade() {
        let fun = setInterval(timerSpanFade, 1000);

        function stop() {
            clearInterval(fun);
        }

        function timerSpanFade() {
            let marker2 = true;
            timeSec -= 1;
            //console.log(timeSec);
            if (timeSec < 0) {
                marker2 = false;
                stop();
                //console.log(marker2);

            }
            for (const elem of timerSpans) {
                if (marker2) {
                    elem.classList.add('timer-span__blink');
                } else {
                    elem.classList.remove('timer-span__blink');
                }
            }
        }

    }
    setTimeout(spanFade);




    // menu
    let header = document.getElementById('header');
    let iconMenu = document.getElementById('icon-menu');
    let headerMenu = document.getElementById('header-menu');
    let hero = document.getElementById('hero');

    iconMenu.addEventListener("click", function() {
        //alert("Hello World!");

        // вертикальное мобильное меню

        // полосы меню становятся крестиком 
        this.classList.toggle('open');

        // мобильное меню
        headerMenu.classList.toggle('menu-active');

        // отступ для линии внизу header
        header.classList.toggle('header-line');

        // отступ блока hero из-за того, что header имеет position: absolute и не может подвинуть в низ hero(фоновая картинка в секции hero, а header в макете должен быть над картинкой, но он не находится в main>hero)
        hero.classList.toggle('hero-padding');

    });






});









// header and contacts. Замена телефона на текст при клике
// Второй вариат. Для массива элементов


//const headerTel = document.getElementById('header-tel');
//const headerSvg = document.getElementById('header-svg');
//const contactsTel = document.getElementById('contacts-tel');

let tels = document.querySelectorAll('.tel');
//console.log(tels);
tels.forEach(function(item, i, tels) {

    let elem = item;
    elem.addEventListener("click", function() {

        if (window.innerWidth >= 768) {
            event.preventDefault();

            function changeTelText() {
                let timeSec = 4;
                let fun = setInterval(timerСhangeTel, 1000);

                function stop() {
                    clearInterval(fun);
                }

                function timerСhangeTel() {
                    elem.textContent = 'Скопировано!';
                    timeSec -= 1;
                    if (timeSec < 0) {
                        elem.textContent = '+7 (495) 128-34-97';
                        stop();
                    }
                }
            }

            changeTelText();

        }
    });
});




// selection-button. Плавное перемещение к selection
const smoothLink = document.getElementById('selection-button');

smoothLink.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('selection').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

});


// yandex maps loading
const sectionProfit = document.getElementById('profit');
let contactsMap = document.getElementById('contacts-map');
let mapLoaded = false;
//console.log(sectionProfit);

function scrollingLoadingMap() {
    if (mapLoaded == false) {
        window.addEventListener('scroll', loadingMap);
        mapLoaded = true;
    }
    //console.log(mapLoaded);
}

function loadingMap() {
    var pos = window.innerHeight;
    let boxbottom = sectionProfit.getBoundingClientRect().bottom;

    if (boxbottom < pos) {
        contactsMap.classList.add('animate__animated', 'animate__zoomInUp', 'animate__delay-1s');
        contactsMap.innerHTML = '<a href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Москва</a><a href="https://yandex.ru/maps/213/moscow/house/grayvoronovskaya_ulitsa_20/Z04YcQRnSk0GQFtvfXtweHtkYA==/?ll=37.738204%2C55.719141&utm_medium=mapframe&utm_source=maps&z=16.8" style="color:#eee;font-size:12px;position:absolute;top:14px;">Грайвороновская улица, 20 — Яндекс Карты</a><iframe src="https://yandex.ru/map-widget/v1/-/CCUJU4eH8C" width="100%" height="400" frameborder="0" allowfullscreen="true" style="position:relative;"></iframe>';

        //console.log('Классы добавлены! Карта загружена!');
        window.removeEventListener('scroll', loadingMap);
    }
}

scrollingLoadingMap();