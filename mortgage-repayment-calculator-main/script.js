const amount = document.querySelector(".amount");
const term = document.querySelector(".term");
const rate = document.querySelector(".rate");
const calculate = document.querySelector(".btn");
const empty = document.querySelector(".first");
const second = document.querySelector(".second");
const monthlyrepayments = document.querySelector(".monthlyrepayments");
const total = document.querySelector(".total");
const form = document.querySelector(".needs-validation");
const grouptext = document.querySelectorAll(".input-group-text");
const formcontrol = document.querySelectorAll(".form-control");
const clear = document.querySelector(".clear");
const radio2 = document.querySelector("#radio2");
const interestdisplay = document.querySelector(".interestdisplay");
const interesttotal = document.querySelector(".interesttotal");
const repaymentdisplay = document.querySelector(".repaymentdisplay");

//resetting form
clear.addEventListener("click", function () {
  form.reset();
  form.classList.remove("was-validated");
  for (let i = 0; i < 3; i++)
    grouptext[i].style.backgroundColor = "hsl(203, 41%, 72%)";
  empty.classList.remove("d-none");
  second.classList.add("d-none");
});

//function for form validation
calculate.addEventListener("click", function (e) {
  e.preventDefault();
  if (form.checkValidity()) {
    empty.classList.add("d-none");
    second.classList.remove("d-none");
    if (radio2.checked) {
      interestdisplay.classList.remove("d-none");
      repaymentdisplay.classList.add("d-none");
    }

    //variables
    let interest = Number(rate.value);
    let numOfMonths = Number(term.value * 12);
    let principal = Number(amount.value);

    paymentCalc(interest, principal, numOfMonths);

    console.log(rate.value);
  } else {
    form.classList.add("was-validated");
  }
  for (let i = 0; i < 3; i++)
    if (!formcontrol[i].checkValidity()) {
      grouptext[i].style.backgroundColor = "brown";
    } else {
      grouptext[i].style.backgroundColor = "hsl(203, 41%, 72%)";
    }
});
//function forr all calculations
function paymentCalc(rate, amount, months) {
  console.log(typeof rate, typeof amount, typeof months);
  const monthlyRate = rate / 100 / 12;

  //index
  const index = (1 + monthlyRate) ** months;

  //numerator for formula9
  const monthlyPaymentNumerator = amount * monthlyRate * index;

  //denominator for formula
  const monthlyPaymentDenominaor = index - 1;

  //calculating for the monthly payments
  const monthlyPayment = monthlyPaymentNumerator / monthlyPaymentDenominaor;
  console.log(`monthly payments: ${twoDecimal(monthlyPayment)}`);

  //total payments
  const totalPayment = monthlyPayment * months;
  console.log(`total payment: ${twoDecimal(totalPayment)}`);

  //total interest
  const totalInterest = totalPayment - amount;
  console.log(`total interest: ${twoDecimal(totalInterest)}`);

  //displaying on screen
  monthlyrepayments.textContent = `£${twoDecimal(monthlyPayment)}`;
  total.textContent = `£${twoDecimal(totalPayment)}`;
  interesttotal.textContent = `£${twoDecimal(totalInterest)}`;
}

//event listener
// calculate.addEventListener("click", function () {
//   empty.classList.add("d-none");
//   second.classList.remove("d-none");

//   //variables
//   let interest = rate.value;
//   let numOfMonths = term.value * 12;
//   let principal = amount.value;

//   paymentCalc(interest, principal, numOfMonths);

//   console.log(rate.value);
// });

//function to transform integers to two decimal places
function twoDecimal(num) {
  return Math.trunc(num * 100) / 100;
}
