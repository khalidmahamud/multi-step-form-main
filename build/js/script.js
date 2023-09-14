const step1 = document.querySelector('#step-1');
const userInputs = document.querySelectorAll('#step-1 input');
const nextBtn = document.querySelectorAll('.next-btn');

nextBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        let allInputValid = true;
    
        userInputs.forEach(input => {
            const invalidMsg = document.querySelector(`p[data-id=${input.id}]`);
            const isInputEmpty = input.value.trim() === '';
    
            if(isInputEmpty) {
                input.classList.add('invalid');
    
                invalidMsg.classList.remove('hidden');
    
                allInputValid = false;
            } else {
                input.classList.remove('invalid');
    
                invalidMsg.classList.add('hidden');
            }
        });
    
        if(allInputValid) {
            const currentStep = btn.parentElement.parentElement;
            const currentProgress = document.querySelector(`.step-progress[data-id=${currentStep.id}]`);
            const currentProgressCircle = currentProgress.querySelector('.progress-circle');
    
            currentStep.classList.remove('active');
            currentProgressCircle.classList.remove('active');

    
            const nextStep = currentStep.nextElementSibling;
            const nextProgress = currentProgress.nextElementSibling;
            const nextProgressCircle = nextProgress.querySelector('.progress-circle');
            nextStep.classList.add('active');
            nextProgressCircle.classList.add('active');
        }
    });
});