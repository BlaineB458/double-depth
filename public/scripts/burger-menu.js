const menuBtn = document.querySelector('#mobile-burger-btn');
const mobileMenuElement = document.getElementById('mobile-menu');
const menuOptionButtons = document.querySelectorAll('#mobile-menu li');

const closeIcon = document.querySelector('.mobile-menu-nav p');

closeIcon.addEventListener('click', function(){
  mobileMenuElement.classList.remove('open');
})

function toggleMenu(){
  console.log('toggled mobile menu');
   mobileMenuElement.classList.toggle('open');
}

menuBtn.addEventListener('click', toggleMenu);

menuOptionButtons.forEach(function(btn){
  btn.addEventListener('click', function(){
    mobileMenuElement.classList.toggle('open');
  })
})
