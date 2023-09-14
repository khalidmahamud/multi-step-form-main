const step1 = document.querySelector('#step-1');
const userInputs = document.querySelectorAll('#step-1 input');
const nextBtn = document.querySelectorAll('.next-btn');
const goBackBtn = document.querySelector('.go-back-btn');

let currentStep = document.querySelector('#step-1')
let currentProgress = document.querySelector(`.step-progress[data-id=${currentStep.id}]`);
let currentProgressCircle = currentProgress.querySelector('.progress-circle');

let prevStep, prevProgress, prevProgressCircle;
let nextStep, nextProgress, nextProgressCircle;

function goToNextStep() {
    currentStep.classList.remove('active');
    currentProgressCircle.classList.remove('active');

    nextStep = currentStep.nextElementSibling;
    nextProgress = currentProgress.nextElementSibling;
    nextProgressCircle = nextProgress.querySelector('.progress-circle');
    nextStep.classList.add('active');
    nextProgressCircle.classList.add('active');

    prevStep = currentStep;
    prevProgress = currentProgress;
    prevProgressCircle = currentProgressCircle;

    currentStep = nextStep;
    currentProgress = nextProgress;
    currentProgressCircle = nextProgressCircle;
}

function goToPrevStep() {
    currentStep.classList.remove('active');
    currentProgressCircle.classList.remove('active');

    prevStep.classList.add('active');
    prevProgressCircle.classList.add('active');
    
    nextStep = currentStep;
    nextProgress = currentProgress;
    nextProgressCircle = currentProgressCircle;

    currentStep = prevStep;
    currentProgress = prevProgress;
    currentProgressCircle = prevProgress;
}



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
            goToNextStep();
        }
    });
});

goBackBtn.addEventListener('click', () => {
    goToPrevStep();
});
