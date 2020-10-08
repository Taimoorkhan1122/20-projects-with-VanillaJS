const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "camera", amount: +500 },
  { id: 1, text: "Salary", amount: +15000 },
  { id: 1, text: "snacks", amount: -100 },
  { id: 1, text: "grossaries", amount: -2500 },
];

let transactions = dummyTransactions;

// add Transaction to dOM list
function addTransactionDOM(transaction) {
  const sign = transaction.amount > 0 ? "+" : "-";
  const item = document.createElement("li");

  // Adding class based on sign
  item.classList.add(transaction.amount > 0 ? "plus" : "minus");
  item.innerHTML = `
          ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn">X</button>
  `;

  list.appendChild(item);
}

// init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
}
init();

// Add Transaction
function addTransaction(e) {
  e.preventDefault();
  console.log(text.value);
}

// Event Listners
form.addEventListener("submit", addTransaction);
