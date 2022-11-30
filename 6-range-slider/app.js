const rangeSlider = document.querySelector("#priceRange");
const dollars = document.querySelector(".dollars");

function setDollars(val) {
  dollars.textContent = val;
}

const maxVal = rangeSlider.max;
const midVal = maxVal / 2;
setDollars(midVal.toFixed(2));
rangeSlider.value = midVal;

rangeSlider.addEventListener("input", (e) => {
  setDollars(parseFloat(e.target.value).toFixed(2));
});
