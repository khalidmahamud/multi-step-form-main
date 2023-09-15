const step1 = document.querySelector('#step-1');
const userInputs = document.querySelectorAll('#step-1 input');
const nextBtn = document.querySelectorAll('.next-btn');
const goBackBtn = document.querySelector('.go-back-btn');

const userInfo = {};

const plans = document.querySelectorAll('.plans');
const planDurations = document.querySelector('.plan-durations');
const planDurationBtn = planDurations.querySelectorAll('.plan-duration');
const slider = planDurations.querySelector('#slider');
let planPrices = document.querySelectorAll('.plans .plan-price');

let currentStep = document.querySelector('#step-1');

let currentProgress, currentProgressCircle;

let prevStep, prevProgress, prevProgressCircle;
let nextStep, nextProgress, nextProgressCircle;

let currentPlan;
let selectedPlan;
let selectedPlanPrice;

let currentPlanDuration = planDurations.querySelector('.plan-duration.selected');
let selectedPlanDuration;

window.addEventListener('DOMContentLoaded', () => {
    currentProgress = document.querySelector(`.step-progress[data-id=${currentStep.id}]`);
    currentProgressCircle = currentProgress.querySelector('.progress-circle');

    currentPlan = document.querySelector('.plans.selected');

    selectedPlan = currentPlan.id;

    selectedPlanDuration = currentPlanDuration.id;

    getPlanPrice();
});

function saveUserInfo() {
    userInfo.name = document.querySelector('input#name').value;
    userInfo.email = document.querySelector('input#email').value;
    userInfo.phone = document.querySelector('input#phone').value;
}

function getPlanPrice() {
    let currentPlanPrice = currentPlan.querySelector('.plan-price.selected');
    let currentPlanPriceAmount = currentPlanPrice.querySelector('.price-amount'); 
    
    selectedPlanPrice = Number(currentPlanPriceAmount.textContent);
}

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
    currentProgressCircle = prevProgressCircle;
}



nextBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.id === 'step-1') {
            let allInputValid = true;

            userInputs.forEach(input => {
                const invalidMsg = document.querySelector(`p[data-id=${input.id}]`);
                const isInputEmpty = input.value.trim() === '';

                if (isInputEmpty) {
                    input.classList.add('invalid');

                    invalidMsg.classList.remove('hidden');

                    allInputValid = false;
                } else {
                    input.classList.remove('invalid');

                    invalidMsg.classList.add('hidden');
                }
            });

            if (allInputValid) {
                saveUserInfo();
                goToNextStep();
            }
        }
        else if (btn.dataset.id === 'step-2') {
            getPlanPrice();
            goToNextStep();
        }
    });
});

goBackBtn.addEventListener('click', () => {
    goToPrevStep();
});

plans.forEach(plan => {
    plan.addEventListener('click', () => {
        if (plan !== currentPlan) {
            currentPlan.classList.remove('selected');

            plan.classList.add('selected');

            currentPlan = plan;
            selectedPlan = currentPlan.id;
            getPlanPrice();
        }
    });
});

planDurationBtn.forEach(durationBtn => {
    durationBtn.addEventListener('click', () => {
        if (durationBtn !== currentPlanDuration) {
            currentPlanDuration.classList.remove('selected');
            planPrices.forEach(planPriceText => {
                planPriceText.classList.remove('selected');
            });

            durationBtn.classList.add('selected');
            slider.classList.toggle('slide');

            currentPlanDuration = durationBtn;
            selectedPlanDuration = currentPlanDuration.id;

            if (selectedPlanDuration === 'monthly') {
                plans.forEach(plan => {
                    plan.querySelector('.monthly-plan-price').classList.add('selected');
                });

                planPrices = document.querySelectorAll('.monthly-plan-price');
            } else {
                plans.forEach(plan => {
                    plan.querySelector('.yearly-plan-price').classList.add('selected');
                });

                planPrices = document.querySelectorAll('.yearly-plan-price');
            }

            getPlanPrice();
        }
    });
});