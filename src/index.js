import style from "./main.scss";
import jsonData from "./instagram.json";
import objectFitImages from 'object-fit-images';
import {init, animate} from "./canvas";

let startedAnimation = false;

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    let isVisible = (elemTop < window.innerHeight) && (elemBottom >= 0);
    return isVisible;
}

window.addEventListener('scroll', function (event) {
    let elements = document.querySelector('#pics').children;

    for(let i=0; i<elements.length; i++) {
        if (isScrolledIntoView(elements[i])) {
            if(!elements[i].classList.contains('is-visible')) {
                elements[i].classList.add('is-visible');
                elements[i].children[0].src = jsonData.data[i].images.standard_resolution.url;
            }
        } else if(elements[i].classList.contains('is-visible')){
            elements[i].classList.remove('is-visible');
        }
    }

    // Bouncy Ball
    if (!startedAnimation && isScrolledIntoView(document.querySelector('canvas'))) {
        startedAnimation = true;
        init();
        animate();
    }
	
}, false);

// Polyfill for object-fit IE
objectFitImages();


