const currency_1 = document.getElementById("currency-1");
const amountOne = document.getElementById("amount-one");
const currency_2 = document.getElementById("currency-2");
const amountTwo = document.getElementById("amount-two");

const rateE1 = document.getElementById("rate");
const swap = document.getElementById("swap");

//Calculate Rates
function calculate() {
  let currency_One = currency_1.value;
  let currency_Two = currency_2.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_One}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_Two];

      rateE1.innerHTML = `1 ${currency_One} = ${rate} ${currency_Two} `;
      amountTwo.value = (rate * amountOne.value).toFixed(2);
    });
}

//Event Listensers
currency_1.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currency_2.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currency_1.value;
  currency_1.value = currency_2.value;
  currency_2.value = temp;

  amountOne.value = amountTwo.value;
  calculate();
});

calculate();
