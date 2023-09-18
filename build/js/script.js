const step1 = document.querySelector('#step-1');
const userInputs = document.querySelectorAll('#step-1 input');
const nextBtn = document.querySelectorAll('.next-btn');
const goBackBtn = document.querySelectorAll('.go-back-btn');

const userInfo = {};

const plans = document.querySelectorAll('.plans');
const planDurations = document.querySelector('.plan-durations');
const planDurationBtn = planDurations.querySelectorAll('.plan-duration');
const slider = planDurations.querySelector('#slider');
let planPrices = document.querySelectorAll('.plans .price-text');

let addOns = document.querySelectorAll('.add-on');
const addOnCheck = document.querySelectorAll('.add-on-check');

let currentStep;

let currentProgress, currentProgressCircle;

let prevStep, prevProgress, prevProgressCircle;
let nextStep, nextProgress, nextProgressCircle;

let currentPlan;
let selectedPlan;
let selectedPlanPrice, addOnPrice = 0;

let currentPlanDuration = planDurations.querySelector('.plan-duration.selected');
let selectedPlanDuration;

window.addEventListener('DOMContentLoaded', () => {
    currentStep = document.querySelector('#step-1');

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
    let currentPlanPrice = currentPlan.querySelector('.price-text');
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

    currentStep = nextStep;
    currentProgress = nextProgress;
    currentProgressCircle = nextProgressCircle;
}

function goToPrevStep() {
    currentStep.classList.remove('active');
    currentProgressCircle.classList.remove('active');

    prevStep = currentStep.previousElementSibling;
    prevProgress = currentProgress.previousElementSibling;
    prevProgressCircle = prevProgress.querySelector('.progress-circle');
    prevStep.classList.add('active');
    prevProgressCircle.classList.add('active');

    currentStep = prevStep;
    currentProgress = prevProgress;
    currentProgressCircle = prevProgressCircle;
}

function isValid() {
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

    return allInputValid;
}

function changePrice() {
    const priceText = document.querySelectorAll('.price-text');

    priceText.forEach(text => {
        const priceAmount = text.querySelector('.price-amount').textContent;
        
        if(selectedPlanDuration === 'monthly') {
            text.innerHTML = `$<span class="price-amount">${Number(priceAmount) / 10}</span>/mo`;
        } else {
            text.innerHTML = `$<span class="price-amount">${Number(priceAmount) * 10}</span>/yr`;
        }
    });
}

function getAddOnPrice() {
    addOnPrice = 0;

    addOns = document.querySelectorAll('.add-on');

    addOns.forEach(addOn => {
        if(addOn.classList.contains('selected')) {
            const addOnPriceAmount = addOn.querySelector('.price-amount');
            
            addOnPrice += Number(addOnPriceAmount.textContent);
        }
    });

    
}

function getTotalPrice() {
    return total = selectedPlanPrice + addOnPrice;
}



nextBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.id === 'step-1') {
            if (isValid()) {
                saveUserInfo();
                goToNextStep();
            }
        }
        else if (btn.dataset.id === 'step-2') {
            getPlanPrice();
            goToNextStep();
        }
        else if(btn.dataset.id === 'step-3') {
            getAddOnPrice();
            goToNextStep();
        }
    });
});

goBackBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        goToPrevStep();
    });
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

            changePrice();
            getPlanPrice();
        }
    });
});

addOns.forEach(addOn => {
    const checkbox = addOn.querySelector('input[type=checkbox]');

    addOn.addEventListener('click', () => {
        if (checkbox.checked) {
            checkbox.checked = false;
            addOn.classList.remove('selected');
        } else {
            checkbox.checked = true;
            addOn.classList.add('selected');
        }
    });
});
