//import DOM elements
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const selectMovie = document.getElementById("movie");
const seatCount = document.getElementById("count");
const totalCount = document.getElementById("total");

updateUI();

let ticketPrice = +selectMovie.value;
// console.log(seatCount);

// Get movie Data
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
// Update UI
function updateUI() {
  //update seat cound
  const selectedSeatsCount = JSON.parse(localStorage.getItem("seatIndex"));
  console.log(selectedSeatsCount);
  if (selectedSeatsCount !== null && selectedSeatsCount.length > 0) {
    // first parameter of forEach() contains the elements and second conatains index of that element.
    seats.forEach((seat, index) => {
      if (selectedSeatsCount.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  // update selected movie index
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedSeatsCount !== null) {
    selectMovie.selectedIndex = selectedMovieIndex;
  }
}

// Update values accordint to event changes
function updateCountAndTotal() {
  const selectSeatsCount = document.querySelectorAll(".row .seat.selected");
  seatCount.innerText = selectSeatsCount.length;
  totalCount.innerText = ticketPrice * selectSeatsCount.length;
  const seatsIndex = [...selectSeatsCount].map((seat) => {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("seatIndex", JSON.stringify(seatsIndex));
}

// Add Event listener
// Movie Select
selectMovie.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  // selectedIndex returns index of selected Item
  setMovieData(e.target.selectedIndex, e.target.value);
  updateCountAndTotal();
});

// On click
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCountAndTotal();
  }
});
updateCountAndTotal();
