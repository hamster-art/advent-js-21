const questionBtns = document.querySelectorAll(".btn");
let openedItem = document.querySelector(".expand");

questionBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    openedItem && openedItem.classList.remove("expand");
    const wrapper = btn.parentElement;
    wrapper.classList.add("expand");
    openedItem = wrapper;
  });
});
