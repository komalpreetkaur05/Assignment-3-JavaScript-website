/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? -  Yes
// When do they need to be reset or updated?  
const daySelectorItems = document.querySelectorAll('.day-selector li');
const fullDayButton = document.getElementById('full');
const halfDayButton = document.getElementById('half');
const clearButton = document.getElementById('clear-button');
const calculatedCostElement = document.getElementById('calculated-cost');

let dailyRate = 35; 
let selectedDays = new Set();

/************ colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!
daySelectorItems.forEach(day => {
    day.addEventListener('click', () => {
        if (day.classList.contains('clicked')) {
            // If the day is already clicked, remove it from selection
            day.classList.remove('clicked');
            selectedDays.delete(day.id); // Remove the day from the set
        } else {
            day.classList.add('clicked');
            selectedDays.add(day.id); // Add the clicked day to the set
        }
        recalculateCost();
    });
});



// /********* clear days *********/
// // when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.
clearButton.addEventListener('click', () => {
    daySelectorItems.forEach(day => {
        day.classList.remove('clicked');
    });
    selectedDays.clear(); // Clear the set of selected days
    calculatedCostElement.innerHTML = formatCurrency(0); // Reset cost to 0
});



// /********* change rate *********/
// // when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

fullDayButton.addEventListener('click', () => {
    setDailyRate(35, fullDayButton, halfDayButton);
});

halfDayButton.addEventListener('click', () => {
    setDailyRate(20, halfDayButton, fullDayButton);
});
  
  








// /********* calculate *********/
// // when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value
function recalculateCost() {
    const totalCost = dailyRate * selectedDays.size;
    calculatedCostElement.innerHTML = totalCost;
}

function formatCurrency(amount) {
    return `${amount}`; 
}

function setDailyRate(rate, activeButton, inactiveButton) {
    dailyRate = rate;
    activeButton.classList.add('clicked');
    inactiveButton.classList.remove('clicked');
    recalculateCost();
}
