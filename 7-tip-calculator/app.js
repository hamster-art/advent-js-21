const billAmountInput = document.querySelector("#bill-amount");
const numOfPeopleInput = document.querySelector("#number-of-people");
const tipAmountBox = document.querySelector("#tip-amount");
const totalPerPersonBox = document.querySelector("#total-per-person");
const calculateBtn = document.querySelector("#calculate");
const dollars = document.querySelectorAll(".dollars");

function calculate() {
  const billAmount = parseFloat(billAmountInput.value);
  const numOfPeople = parseInt(numOfPeopleInput.value);
  const tipPercent = parseInt(
    document.querySelector('[name="tip"]:checked').value
  );

  const tipAmount = billAmount * (tipPercent * 0.01);
  tipAmountBox.textContent = tipAmount.toFixed(2);

  const totalPerPerson = (billAmount + tipAmount) / numOfPeople;
  totalPerPersonBox.textContent = totalPerPerson.toFixed(2);

  dollars.forEach((item) => {
    item.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500 });
  });
}

calculateBtn.addEventListener("click", calculate);
