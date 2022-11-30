document.addEventListener("DOMContentLoaded", () => {
  const cardWrapper = document.querySelector(".credit-card__wrapper");
  const cardNum = document.querySelector("#card-number");
  const cardCvv = document.querySelector("#cvv");

  function changeCard() {
    const val = this.value;
    const startValueNum = val.slice(0, 1);
    cardWrapper.className = "credit-card__wrapper";
    if (startValueNum === "3") {
      cardWrapper.classList.add("american");
    } else if (startValueNum === "4") {
      cardWrapper.classList.add("visa");
    } else if (startValueNum === "5") {
      cardWrapper.classList.add("mastercard");
    } else if (startValueNum === "6") {
      cardWrapper.classList.add("discover");
    }
  }

  function flipCard() {
    cardWrapper.classList.add("flip");
  }
  function flipBackCard() {
    cardWrapper.classList.remove("flip");
  }

  cardNum.addEventListener("focusout", changeCard);
  cardCvv.addEventListener("focus", flipCard);
  cardCvv.addEventListener("focusout", flipBackCard);
});
