const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "camera", amount: +500 },
//   { id: 1, text: "Salary", amount: +15000 },
//   { id: 1, text: "snacks", amount: -100 },
//   { id: 1, text: "grossaries", amount: -2500 },
// ];
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transaction")
);

let transactions =
  localStorage.getItem("transaction") !== null ? localStorageTransactions : [];

// Add Transaction to DOM list
function addTransactionDOM(transaction) {
  const sign = transaction.amount > 0 ? "+" : "-";
  const item = document.createElement("li");

  // Adding class based on sign
  item.classList.add(transaction.amount > 0 ? "plus" : "minus");
  item.innerHTML = `
          ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onClick=remTransaction(${
    transaction.id
  })>X</button>
  `;

  list.appendChild(item);
  updateLocalStorage();
}

// Add Transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value === "" || amount.value === "") {
    alert("Either details or amount are not valid");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    // console.log(transaction); //----------> remove it

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();

    text.value = "";
    amount.value = "";
  }
}

// Generate ID
function generateID() {
  return Math.floor(Math.random() * 100000);
}

// Update Values
function updateValues() {
  //get all the amounts from transaction(s) array
  let amounts = transactions.map((item) => item.amount);
  // console.log(amounts); //----------> remove it

  //get total of all amounts
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  //separate income || separate expense
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  balance.innerHTML = `$${total}`;
  money_plus.innerHTML = `$${income}`;
  money_minus.innerHTML = `$${expense * -1}`;
}

function remTransaction(id) {
  transactions = transactions.filter((item) => item.id !== id);
  updateLocalStorage();
  init();
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem("transaction", JSON.stringify(transactions));
}

// init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}
init();

// Event Listners
form.addEventListener("submit", addTransaction);
