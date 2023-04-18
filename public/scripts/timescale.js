const buttons = document.querySelectorAll('.timescale-btn');


buttons.forEach(function(button){
    button.addEventListener('click', function(button){
        let activeBtn = document.querySelector('.timescale-btn.active');    
        activeBtn.classList.remove('active');
        button.srcElement.classList.toggle('active');
})
})

const buttonsBar = document.querySelectorAll('.timescale-btn-bar');


buttonsBar.forEach(function(button){
    button.addEventListener('click', function(button){
        let activeBtn = document.querySelector('.timescale-btn-bar.active');    
        activeBtn.classList.remove('active');
        button.srcElement.classList.toggle('active');
})
})