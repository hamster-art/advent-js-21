document.addEventListener("DOMContentLoaded", () => {
  const toaster = document.querySelector(".toaster");
  const toasterClose = document.querySelector("#closeToaster");

  function showToasterOnMouseMove(e) {

    if (e.pageY < 200) {
      toaster.classList.remove("collapsed");
    }
  }

  function closeToaster() {
    toaster.classList.add("collapsed");
    document.removeEventListener("mousemove", showToasterOnMouseMove);
  }

  document.addEventListener("mousemove", showToasterOnMouseMove);

  toasterClose.addEventListener("click", closeToaster);
});
