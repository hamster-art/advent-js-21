const wrapper = document.querySelector(".wrapper");
const monthDiv = document.querySelector(".month");
const prevBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const daysDiv = document.querySelectorAll(".day");

let date = new Date();

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function fillMonth(date) {
  let day = 1;
  const numDayOfWeek = date.getDay();
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  monthDiv.textContent = date.toLocaleString("default", { month: "long" });

  daysDiv.forEach((div, i) => {
    div.textContent = "";
    if (i >= numDayOfWeek && day <= daysInMonth) {
      div.textContent = day + "";
      if (isToday(date) && date.getDate() === day) {
        console.log(day);
      }
      day++;
    }
  });
}

fillMonth(date);

prevBtn.addEventListener("click", function () {
  date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  fillMonth(date);
});

nextBtn.addEventListener("click", function () {
  date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  fillMonth(date);
});
