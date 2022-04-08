//
function ibg() {

    let ibg = document.querySelectorAll(".ibg");

    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}
/* function ibg() {

    //let ibg = document.querySelectorAll(".ibg");
    let ibg = document.querySelector(".ibg");

    if (ibg.querySelector('img')) {
        ibg.style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';

    }
} */
ibg();
/* function ibg() {

    let ibg = document.getElementById('ibg');

    ibg.style.backgroundImage = 'url(' + ibg.querySelector('img').getAttribute('src') + ')';
} */


//