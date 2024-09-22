// Reading Globally

const calculateButton = document.getElementById('calculate');
const calculateSavingsButton = document.getElementById('calculate-savings')
const HistoryButton = document.getElementById('history-tab')
const AssistantButton = document.getElementById('assistant-tab')
const ExpensesForm = document.getElementById('expense-form')
const HistorySection = document.getElementById('history-section')
const HistoryContainer = document.getElementById('history-list')
let SL = 0;

const Income = GetInputValueByID('income');
const Software = GetInputValueByID('software');
const Course = GetInputValueByID('courses');
const Books = GetInputValueByID('books');
const Internet = GetInputValueByID('internet');

// Calculation Button
calculateButton.addEventListener('click', function () {
    const Income = GetInputValueByID('income');
    const Software = GetInputValueByID('software');
    const Course = GetInputValueByID('courses');
    const Books = GetInputValueByID('books');
    const Internet = GetInputValueByID('internet');

    const TotalExpense = Software + Course + Books + Internet;
    const ExpenseDisplay = document.getElementById('total-expenses');
    ExpenseDisplay.innerText = TotalExpense.toFixed(2);

    const TotalBalance = Income - TotalExpense;
    const BalanceDisplay = document.getElementById('balance');
    BalanceDisplay.innerText = TotalBalance.toFixed(2);

    const RemainingDisplay = document.getElementById('remaining-balance')
    RemainingDisplay.innerText = TotalBalance.toFixed(2);

    const Results = document.getElementById('results');
    Results.classList.remove('hidden')

    // Create Expense History Div
    const Div = document.createElement('div');
    Div.className = "bg-white p-3 rounded-md border-l-2 border-indigo-500"
    SL = SL + 1;
    Div.innerHTML = `
     <p class="text-sm text-blue-950"><span class = "font-bold">SL: </span>${SL}</p>
     <p class="text-sm text-blue-950"><span class = "font-bold">Date : </span>${new Date().toLocaleDateString()}</p>
     <p class="text-sm text-blue-950"><span class = "font-bold">Income : </span>${Income.toFixed(2)} Tk</p>
     <p class="text-sm text-blue-950"><span class = "font-bold">Expense : </span>${TotalExpense.toFixed(2)} Tk</p>
     <p class="text-sm text-blue-950"><span class = "font-bold">Balance : </span>${TotalBalance.toFixed(2)} Tk</p>

    `
    HistoryContainer.insertBefore(Div, HistoryContainer.firstChild);
})

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
    const TotalSavings = (TotalBalance * Savings) / 100;

    const SavingsDisplay = document.getElementById('savings-amount');
    SavingsDisplay.innerText = TotalSavings.toFixed(2);

    const TotalRemaining = TotalBalance - Savings;
    const RemainingDisplay = document.getElementById('remaining-balance')
    RemainingDisplay.innerText = TotalRemaining.toFixed(2);

})


// History Button
HistoryButton.addEventListener('click', function () {
    HistoryButton.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white')
    AssistantButton.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white')
    ExpensesForm.classList.add('hidden')
    HistorySection.classList.remove('hidden')
    HistoryContainer.classList.remove('hidden')

})


// Assistant Button
AssistantButton.addEventListener('click', function () {
    HistoryButton.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white')
    AssistantButton.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white')
    ExpensesForm.classList.remove('hidden')
    HistorySection.classList.add('hidden')
})




//Live Validation 

document.getElementById('income').addEventListener('input', function () {
    const Income = GetInputValueByID('income');
    if (Income <= 0 || isNaN(Income)) {
        document.getElementById('income-error').classList.remove('hidden')
        return Income;
    }
})


document.getElementById('software').addEventListener('input', function () {
    const Software = GetInputValueByID('software');
    if (Software <= 0 || isNaN(Software)) {
        document.getElementById('software-error').classList.remove('hidden')
        return;
    }
})

document.getElementById('courses').addEventListener('input', function () {
    const Course = GetInputValueByID('courses');
    if (Course <= 0 || isNaN(Course)) {
        document.getElementById('courses-error').classList.remove('hidden')
        return;
    }
})
document.getElementById('books').addEventListener('input', function () {
    const Books = GetInputValueByID('books');
    if (Books <= 0 || isNaN(Books)) {
        document.getElementById('books-error').classList.remove('hidden')
        return;
    }
})
document.getElementById('internet').addEventListener('input', function () {
    const Internet = GetInputValueByID('internet');
    if (Internet <= 0 || isNaN(Internet)) {
        document.getElementById('internet-error').classList.remove('hidden')
        return;
    }
})

// Logic Validation
document.getElementById('calculate').addEventListener('click', function () {
    const Income = GetInputValueByID('income');
    const Software = GetInputValueByID('software');
    const Course = GetInputValueByID('courses');
    const Books = GetInputValueByID('books');
    const Internet = GetInputValueByID('internet');
    const TotalExpense = Software + Course + Books + Internet;
    const TotalBalance = Income - TotalExpense;

    if (TotalExpense > Income) {
        document.getElementById('logic-error').classList.remove('hidden')
        return;
    }
})





