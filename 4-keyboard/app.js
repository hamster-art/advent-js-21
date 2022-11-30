document.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelectorAll("[data-key]:not(.utility)");
  const allBtns = document.querySelectorAll("[data-key]");
  const playBtns = document.querySelectorAll(".play-btn");
  const resultBox = document.querySelector(".result");
  const successNumBox = document.querySelector(".success-num");
  const failNumBox = document.querySelector(".fail-num");
  const timeBox = document.querySelector(".countdown-time");
  let currentKey, currentBtn, timeoutId, gameTimeoutId;
  let timeCount = 5;
  let successKeysNum = 0;
  let failKeysNum = 0;

  function getRandomKeyIndex() {
    return Math.floor(Math.random() * btns.length);
  }

  function setRandomKey() {
    const idx = getRandomKeyIndex();
    btns[idx].classList.add("jiggle");
    currentBtn = btns[idx];
    currentKey = currentBtn.dataset.key.toLowerCase();
  }

  function setBtnsDisabled() {
    allBtns.forEach((btn) => {
      btn.setAttribute("disabled", "");
    });
    currentBtn && currentBtn.classList.remove("jiggle");
  }

  function setBtnsEnabled() {
    allBtns.forEach((btn) => {
      btn.removeAttribute("disabled");
    });
  }

  function setTime() {
    timeBox.textContent = timeCount;
  }

  function start() {
    gameTimeoutId = setInterval(countdown, 1000);

    function countdown() {
      --timeCount;
      setTime();

      if (timeCount <= 0) {
        clearInterval(gameTimeoutId);
        document.removeEventListener("keydown", keydown);
        setBtnsDisabled();
        resultBox.removeAttribute('hidden');
        successNumBox.textContent = successKeysNum;
        failNumBox.textContent = failKeysNum;
      }
    }
  }

  function keydown(e) {
    clearTimeout(timeoutId);
    const targetKey = e.key.toLowerCase();

    if (targetKey === currentKey) {
      currentBtn.classList.add("success");
      successKeysNum += 1;
    } else {
      currentBtn.classList.add("fail");
      failKeysNum += 1;
    }
    currentBtn.classList.remove("jiggle");

    timeoutId = setTimeout(() => {
      currentBtn.classList.remove("success");
      currentBtn.classList.remove("fail");
      setRandomKey();
    }, 100);
  }

  function onclickPlay(btn) {
    btn.classList.contains("play-first") && btn.setAttribute("hidden", "");
    if(btn.classList.contains('play-again')) {
      resultBox.setAttribute("hidden", "");
      timeCount = 5;
      setTime()
    }

    setBtnsEnabled();

    setRandomKey();

    start();
  }

  setBtnsDisabled();

  setTime();

  document.addEventListener("keydown", keydown);

  playBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      onclickPlay(btn)
    });
  });
});
