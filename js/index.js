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












window.addEventListener("load", function() {

    // JS action animation
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