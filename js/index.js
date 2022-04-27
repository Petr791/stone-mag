const deadline = new Date(2022, 04, 24);

document.addEventListener('DOMContentLoaded', function() {
    // конечная дата, например 1 июля 2022
    //const deadline = new Date(2022, 06, 01);
    /*  const deadline = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 01); */
    //const deadline = new Date(2022, 05, 01);
    //const deadline = new Date(Date.parse(new Date()) + 32 * 24 * 60 * 60 * 1000);
    //const deadline = new Date(2022, 04, 24);

    // id таймера
    let timerId = null;
    // склонение числительных
    /*  function declensionNum(num, words) {
         return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
     } */
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        //const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;



        $days.textContent = days < 10 ? '0' + days : days;
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        //$seconds.textContent = seconds < 10 ? '0' + seconds : seconds;

        $days.dataset.title = 'Дни';
        $hours.dataset.title = 'Часы';
        $minutes.dataset.title = 'Минуты';


        /* $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
        $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
        $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']); */
        // $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
    // получаем элементы, содержащие компоненты даты
    const $days = document.querySelector('.timer__days');
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    //const $seconds = document.querySelector('.timer__seconds');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);




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



})











// JS action animation
window.addEventListener("load", function() {
    const animElem = document.querySelector('.action-animation');
    const audio = document.getElementById('alarm-audio');
    const tl = document.querySelector('.action-animation__title')
    var marker = true;


    window.addEventListener('scroll', animOnScroll); // создается событие при котором функция выполняется.

    function animOnScroll() {


        const animElemHeight = animElem.offsetHeight;
        //console.log(animItem);
        const animElemOffset = offset(animElem).top;
        const animStart = 2; // регулирует момент старта анимации. одна вторая высоты объекта.

        // настройка момента старта анимации.
        let animElemPoint = window.innerHeight - animElemHeight / animStart;
        //проверка под экран
        if (animElemHeight > window.innerHeight) {
            animElemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        //добавление класс при определенных условиях. проскроленные пиксели.
        if ((pageYOffset > animElemOffset - animElemPoint) && pageYOffset < (animElemOffset + animElemHeight)) {
            if (marker) {
                setTimeout(actionAnimationTimer, 500);
                marker = false;
            }
            //если условие не выполняется, то класс убираем. чтобы повторно анимировать объект.
        }

    }
    // функция для получения положения на экране. позиция объекта сверху или слева.
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    // объявить функцию, чтобы анимация появлялась на первом  экране сразу без прокрутки.
    animOnScroll()
        // Отсрочка появления анимации или в css delay в '.active'. Или в js с помощью setTimeout.
    setTimeout(() => {
        animOnScroll();
    }, 100);
    //function actionAnimationTimer
    function actionAnimationTimer() {

        let fun = setInterval(system, 1000);
        let timeleft = 5;

        function system() {
            tl.innerText = timeleft;
            timeleft -= 1;
            if (timeleft < -1) {
                stop();
                //audioPlay.play();
                //marker = false;
                tl.innerText = '';
                setTimeout(actionAnimationFade, 100);
                setTimeout(actionAnimationNone, 1000);
            }
        }

        function stop() {
            clearInterval(fun);
        }
    }

    function actionAnimationFade() {
        animElem.classList.add('action-animation__fade');
    }

    function actionAnimationNone() {
        animElem.classList.remove('action-animation');
        animElem.classList.add('action-animation__none');
    }






    // js animation timer span
    const nowDate = new Date();
    const timeDifference = deadline - nowDate;
    //
    //console.log(deadline);
    //console.log(nowDate);
    //console.log(timeDifference);

    let timerSpans = document.querySelectorAll('.timer-span');
    let tr = document.getElementById('timerspan-right');
    //let timeSec = 5;
    let timeSec = timeDifference;
    console.log(timeSec);

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
                //audioPlay.play();
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


});







// jQuery action animation
// window.addEventListener('scroll', animOnScroll);

/* $(function() {

    var block_show = null;

    function scrollTracking() {
        var wt = $(window).scrollTop();
        var wh = $(window).height();

        var et = $('.action').offset().top - 100;
        var eh = $('.action').outerHeight();

        if (et >= wt && et + eh <= wh + wt) {
            if (block_show == null || block_show == false) {
                console.log('Элемент показан');
                if (marker) {
                    setTimeout(aaa);
                }

            }
            block_show = true;

        } else {
            if (block_show == null || block_show == true) {
                console.log('Элемент не показан');
            }
            block_show = false;
        }

    }

    $(window).scroll(function() {
        scrollTracking();
    });

    $(document).ready(function() {
        scrollTracking();

    });

}) 
;*/