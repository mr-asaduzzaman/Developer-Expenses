function GetInputValueByID(id) {
    const inputValue = document.getElementById(id).value;
    const inputNumber = parseFloat(inputValue);
    return isNaN(inputNumber) ? 0 : inputNumber; // Return 0 if NaN
}

const calculateButton = document.getElementById('calculate');
const calculateSavingsButton = document.getElementById('calculate-savings');
const HistoryButton = document.getElementById('history-tab');
const AssistantButton = document.getElementById('assistant-tab');
const ExpensesForm = document.getElementById('expense-form');
const HistorySection = document.getElementById('history-section');
const HistoryContainer = document.getElementById('history-list');
let SL = 0;

function calculateExpenses() {
    const Income = GetInputValueByID('income');
    const Software = GetInputValueByID('software');
    const Course = GetInputValueByID('courses');
    const Books = GetInputValueByID('books');
    const Internet = GetInputValueByID('internet');

    const TotalExpense = Software + Course + Books + Internet;

    // Check if total expenses exceed income
    if (TotalExpense > Income) {
        document.getElementById('logic-error').classList.remove('hidden');

        // Reset results
        document.getElementById('total-expenses').innerText = "00.00";
        document.getElementById('balance').innerText = "00.00";
        document.getElementById('remaining-balance').innerText = "00.00";
        document.getElementById('savings-amount').innerText = "00.00";

        return; // Stop further execution
    }

    // Hide error if it was previously shown
    document.getElementById('logic-error').classList.add('hidden');

    const TotalBalance = Income - TotalExpense;

    document.getElementById('total-expenses').innerText = TotalExpense.toFixed(2);
    document.getElementById('balance').innerText = TotalBalance.toFixed(2);
    document.getElementById('remaining-balance').innerText = TotalBalance.toFixed(2);

    const Results = document.getElementById('results');
    Results.classList.remove('hidden');

    // Create Expense History Div
    const Div = document.createElement('div');
    Div.className = "bg-white p-3 rounded-md border-l-2 border-indigo-500";
    SL++;
    Div.innerHTML = `
        <p class="text-sm text-blue-950"><span class="font-bold">SL: </span>${SL}</p>
        <p class="text-sm text-blue-950"><span class="font-bold">Date: </span>${new Date().toLocaleDateString()}</p>
        <p class="text-sm text-blue-950"><span class="font-bold">Income: </span>${Income.toFixed(2)} Tk</p>
        <p class="text-sm text-blue-950"><span class="font-bold">Expense: </span>${TotalExpense.toFixed(2)} Tk</p>
        <p class="text-sm text-blue-950"><span class="font-bold">Balance: </span>${TotalBalance.toFixed(2)} Tk</p>
    `;
    HistoryContainer.insertBefore(Div, HistoryContainer.firstChild);
}

// Calculation Button
calculateButton.addEventListener('click', calculateExpenses);

// Savings Button
calculateSavingsButton.addEventListener('click', function () {
    const Income = GetInputValueByID('income');
    const Software = GetInputValueByID('software');
    const Course = GetInputValueByID('courses');
    const Books = GetInputValueByID('books');
    const Internet = GetInputValueByID('internet');
    const Savings = GetInputValueByID('savings');

    const TotalExpense = Software + Course + Books + Internet;
    const TotalBalance = Income - TotalExpense;

    // Only calculate savings if balance is positive
    if (TotalBalance > 0) {
        const TotalSavings = (TotalBalance * Savings) / 100;
        document.getElementById('savings-amount').innerText = TotalSavings.toFixed(2);
        const TotalRemaining = TotalBalance - TotalSavings;
        document.getElementById('remaining-balance').innerText = TotalRemaining.toFixed(2);
    } else {
        // Reset savings and remaining balance if balance is negative or zero
        document.getElementById('savings-amount').innerText = "00.00";
        document.getElementById('remaining-balance').innerText = "00.00";
    }
});

// History Button
HistoryButton.addEventListener('click', function () {
    HistoryButton.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white');
    AssistantButton.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white');
    ExpensesForm.classList.add('hidden');
    HistorySection.classList.remove('hidden');
    HistoryContainer.classList.remove('hidden');
});

// Assistant Button
AssistantButton.addEventListener('click', function () {
    HistoryButton.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white');
    AssistantButton.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white');
    ExpensesForm.classList.remove('hidden');
    HistorySection.classList.add('hidden');
});

// Live Validation
function liveValidation(id, errorId) {
    const value = GetInputValueByID(id);
    document.getElementById(errorId).classList.toggle('hidden', value > 0);
}

document.getElementById('income').addEventListener('input', function () {
    liveValidation('income', 'income-error');
});
document.getElementById('software').addEventListener('input', function () {
    liveValidation('software', 'software-error');
});
document.getElementById('courses').addEventListener('input', function () {
    liveValidation('courses', 'courses-error');
});
document.getElementById('books').addEventListener('input', function () {
    liveValidation('books', 'books-error');
});
document.getElementById('internet').addEventListener('input', function () {
    liveValidation('internet', 'internet-error');
});
