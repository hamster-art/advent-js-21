const starRating = document.querySelector(".star-rating");
const stars = document.querySelectorAll(".star");
let starClass = "";

function removeStarClass() {
  starRating.classList.remove(starClass);
  starClass = "";
}

stars.forEach((star, i) => {
  star.addEventListener("click", function () {
    if (starClass === `star-${i + 1}`) {
      removeStarClass();
    } else if (starClass !== `star-${i + 1}`) {
      if (starClass) {
        removeStarClass();
      }
      starRating.classList.add(`star-${i + 1}`);
      starClass = `star-${i + 1}`;
    }

  });

  star.addEventListener("mouseover", function () {
    for (let j = 0; j <= i; j++) {
      stars[j].classList.add("hover");
    }
  });

  star.addEventListener("mouseleave", function () {
    for (let j = 0; j <= i; j++) {
      stars[j].classList.remove("hover");
    }
  });
});
