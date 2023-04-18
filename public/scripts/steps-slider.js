const steps = document.querySelectorAll(".step-info");

steps.forEach(function(step){
    step.addEventListener('click', function(e){
        let activeStep = document.getElementById("active");
        if(step.id !== 'active' && step.contains(e.target)){
            activeStep.id = '';
            step.id = 'active';
        }
        return;
    });
})
