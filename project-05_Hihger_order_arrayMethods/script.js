const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const double = document.getElementById("double");
const showMillionare = document.getElementById("millionare");
const sort = document.getElementById("sort");
const total = document.getElementById("culculate-wealth");

getRandomUser();
getRandomUser();
getRandomUser();

let data = [];
//fetch User data from api using aysnc await
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    pic: `${user.picture.medium}`,
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}
//Add new User
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM() {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  data.forEach((item) => {
    let element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<img src="${item.pic}"><strong>&nbsp${
      item.name
    }&nbsp &nbsp &nbsp</strong> ${formatMoeny(item.money)}`;
    main.appendChild(element);
  });
}

//format money
function formatMoeny(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Double Money
function doubleMoney() {
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });
  updateDOM();
}

//show only Millionare
function showMillionareOnly() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

//Sort by richest
function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//total wealth
function totalWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoeny(
    wealth
  )}</strong></h3>`;
  updateDOM();
  main.appendChild(wealthEl);
}

//Event Listeners
addUser.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);
showMillionare.addEventListener("click", showMillionareOnly);
sort.addEventListener("click", sortByRichest);
total.addEventListener("click", totalWealth);
