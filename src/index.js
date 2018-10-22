import style from "./main.scss";
import jsonData from "./instagram.json";
import objectFitImages from 'object-fit-images';
import {init, animate} from "./canvas";

let startedAnimation = false;
const imagesIndex = [0,2,3,4,5,6];

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    let isVisible = (elemTop < window.innerHeight) && (elemBottom >= 0);
    return isVisible;
}

window.addEventListener('DOMContentLoaded', function(event){
    let elements = document.querySelector('#pics').children;
    let j=0;
    imagesIndex.forEach(function(i){
        elements[j].children[0].src = jsonData.data[i].images.standard_resolution.url;
        j++;
    });
})

window.addEventListener('scroll', function (event) {
    let elements = document.querySelector('#pics').children;
    let j=0;
    imagesIndex.forEach(function(i){
        if (isScrolledIntoView(elements[j])) {
            if(!elements[j].classList.contains('is-visible')) {
                elements[j].classList.add('is-visible');
            }
        } else if(elements[j].classList.contains('is-visible')){
            elements[j].classList.remove('is-visible');
        }
        j++;
    })

    // Bouncy Ball
    if (!startedAnimation && isScrolledIntoView(document.querySelector('canvas'))) {
        startedAnimation = true;
        init();
        animate();
    }
	
}, false);

// Polyfill for object-fit IE
objectFitImages();


