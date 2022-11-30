document.addEventListener("DOMContentLoaded", () => {
  const titles = document.querySelectorAll("main h3");
  let currentSelectedTitle;

  function checkIfInViewPort() {
    titles.forEach((title) => {
      const rect = title.getBoundingClientRect();

      if (rect.top < 200 || rect.bottom < 200) {
        currentSelectedTitle &&
          currentSelectedTitle.classList.remove("selected");
        const id = title.id;
        const activeLink = document.querySelector(
          `aside [data-title-id="${id}"]`
        );
        const activeListItem = activeLink.parentElement;
        activeListItem.classList.add("selected");
        currentSelectedTitle = activeListItem;
      }
    });
  }

  checkIfInViewPort();

  document.addEventListener("scroll", (e) => {
    checkIfInViewPort();
  });
});
