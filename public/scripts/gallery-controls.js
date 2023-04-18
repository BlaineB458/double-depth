const rightArrowElement = document.querySelector('.arrow-right');
const leftArrowElement = document.querySelector('.arrow-left');
const imageIndexElement = document.getElementById('image-index');

const imageArr = document.querySelector('#gallery-container').children;
let index = 0;

leftArrowElement.addEventListener('click', function(){
    console.log('left button clicked');
    if(index == 0) {
        index = imageArr.length - 1;
    } else {
        index--;
    }
    
    for(let i = 0; i < imageArr.length; i++) {
        imageArr[i].classList.remove('gallery-active');
      }
      imageArr[index].classList.add('gallery-active');  
    imageIndexElement.textContent = index + 1;
});

rightArrowElement.addEventListener('click', function(){

    index++;
    if(index == imageArr.length) {
      index = 0;
    }
    for(let i = 0; i < imageArr.length; i++) {
        imageArr[i].classList.remove('gallery-active');
      }
      imageArr[index].classList.add('gallery-active');
      imageIndexElement.textContent = index + 1;
});


