const toggle = document.getElementById("toggle");
const open = document.getElementById("open");
const close = document.getElementById("close");
const modal = document.getElementById("modal");

open.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

close.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

window.addEventListener("click", (e) => {
  e.target === modal ? modal.classList.remove("show-modal") : false;
});

toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// ======Form Vaidation=============
// Calling DOM elements
const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
// Show Error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show Succes
function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Check email
function checkEmail(input) {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(input.value.trim())) {
    showSuccess(input, "Perfect!");
  } else {
    showError(input, "Email is Not valid");
  }
}

// Get Field Name
function getFieldName(name) {
  return name.id.charAt(0).toUpperCase() + name.id.slice(1);
}

// Check length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} msut be at least ${min} character`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} msut be less than ${max} character`
    );
  } else {
    showSuccess(input, "Perfect!");
  }
}
// Match Password
function matchPassword(input) {
  if (input.value !== password.value) {
    showError(input, `Passwords don't match`);
  } else if (input.value && input.value === password.value) {
    showSuccess(input, `Passwords Matched!`);
  }
}

// Check Require
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value == "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input, "Perfect");
    }
  });
}

// Add event listner
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("event triggered");

  checkRequired([userName, email, password, password2]);
  checkEmail(email);
  checkLength(userName, 3, 15);
  checkLength(password, 6, 25);
  matchPassword(password2);
});
function doNothing() {}
