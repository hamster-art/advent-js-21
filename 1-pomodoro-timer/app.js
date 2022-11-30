window.addEventListener("DOMContentLoaded", (event) => {
  const timerBox = document.querySelector(".timer");
  const minutesBox = timerBox.querySelector(".minutes");
  const secondsBox = timerBox.querySelector(".seconds");
  const editBtn = timerBox.querySelector(".settings-btn");
  const startBtn = timerBox.querySelector(".start-btn");
  let interval;
  let isPaused,
    isEdit = false;

  function setZeroFirst(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }
    return num;
  }

  function getTimeFromInputs() {
    return +minutesBox.textContent * 60 + +secondsBox.textContent;
  }

  function getRemainingTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (time <= 0) {
      clearInterval(interval);
      timerBox.style.borderColor = "#9d0000";
      return {
        total: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return {
      total: time,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function updateTime(time) {
    interval = setInterval(function () {
      countdown();
    }, 1000);

    function countdown() {
      --time;
      const t = getRemainingTime(time);
      minutesBox.textContent = setZeroFirst(t.minutes);
      secondsBox.textContent = setZeroFirst(t.seconds);
    }
  }

  function updateStartBtn(classRemove, classAdd, text) {
    startBtn.classList.remove(classRemove);
    startBtn.classList.add(classAdd);
    startBtn.textContent = text;
  }

  function updateEditBtn(classRemove, classAdd, isContentEditable) {
    editBtn.classList.remove(classRemove);
    editBtn.classList.add(classAdd);
    minutesBox.setAttribute("contenteditable", isContentEditable);
    secondsBox.setAttribute("contenteditable", isContentEditable);
  }

  function clickOnStartBtn() {
    if (startBtn.classList.contains("count")) {
      updateStartBtn("count", "pause", "pause");
      const time = getTimeFromInputs();
      updateTime(time);
    } else if (startBtn.classList.contains("pause")) {
      updateStartBtn("pause", "count", "start");
      clearInterval(interval);
    }
    isPaused = !isPaused;
  }

  function clickOnEditBtn() {
    isEdit = !isEdit;
    if (isEdit) {
      updateEditBtn("edit", "confirm", "true");
      startBtn.setAttribute("disabled", "");
    } else {
      updateEditBtn("confirm", "edit", "", "false");
      startBtn.removeAttribute("disabled");
    }
  }

  startBtn.addEventListener("click", clickOnStartBtn);

  editBtn.addEventListener("click", clickOnEditBtn);
});
