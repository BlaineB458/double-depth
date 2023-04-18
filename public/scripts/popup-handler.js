const crossElement = document.getElementById('exit-cross');
const bannerElement = document.getElementById('banner');


function closePopUp(){
    
    bannerElement.style.display = 'none';

}

crossElement.addEventListener('click', closePopUp);