const body = document.querySelector("body");
const winWrapper = document.querySelector(".win-wrapper");
const userPickImg = winWrapper.querySelector(".your-pick img");
const computerPickImg = winWrapper.querySelector(".computer-pick img");
const playAgainBtn = document.querySelector(".play-again");
const btns = document.querySelectorAll(".btn");
const shapes = ["rock", "paper", "scissors"];
const shapesLength = shapes.length;
let userPick;
let computerPick;
const picks = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

function genComputerPick() {
  return shapes[Math.floor(Math.random() * shapesLength)];
}

computerPick = genComputerPick();

console.log(computerPick);

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    userPick = btn.dataset.key;
    if (userPick === computerPick) {
      body.classList.add("winner", "tie");
    } else if (picks[userPick] === computerPick) {
      body.classList.add("winner", "computer-wins");
    } else if (picks[userPick] !== computerPick) {
      body.classList.add("winner", "you-win");
    }
    if (userPick && computerPick) {
      userPickImg.src = `./images/${userPick}.png`;
      userPickImg.alt = userPick;
      computerPickImg.src = `./images/${computerPick}.png`;
      computerPickImg.alt = computerPick;
    }
    winWrapper.animate(
      [{ transform: "translateY(-100%)" }, { transform: "translateY(0)" }],
      { duration: 500, fill: "forwards" }
    );
  });
});
playAgainBtn.addEventListener("click", () => {
  userPick = "";
  computerPick = genComputerPick();
  console.log(computerPick);
  winWrapper.animate(
    [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
    { duration: 500, fill: "forwards" }
  );
  setTimeout(() => (body.className = ""), 500);
});
