const deadline1 = new Date(2022, 04, 24);
const deadline2 = new Date(2022, 04, 18);


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
    const timeDifference = deadline1 - nowDate;
    //
    //console.log(deadline);
    //console.log(nowDate);
    //console.log(timeDifference);

    let timerSpans = document.querySelectorAll('.span-timer');
    //let tr = document.getElementById('timerspan-right');
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