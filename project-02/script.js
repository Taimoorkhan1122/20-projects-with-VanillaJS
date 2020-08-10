// Select all the required DOM elements
const container = document.querySelector(".container");
const seats = document.querySelector(".row .seat:not(.occupied)");
const selectMovie = document.getElementById("movie");
let count = document.getElementById("count");
let total = document.getElementById("total");
let ticketPrice = +selectMovie.value;

// Update selected Count using value from selected movie
function updateCountAndTotal() {
  const selectedSeatsCount = document.querySelectorAll(".row .seat.selected");
  count.innerHTML = selectedSeatsCount.length;
  total.innerText = selectedSeatsCount.length * ticketPrice;
  console.log(ticketPrice);
}

// Movie select eventListner
selectMovie.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateCountAndTotal();
});

// Event Listener
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateCountAndTotal();
  }
});
