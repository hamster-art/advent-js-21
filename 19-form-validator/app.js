const requiredFields = document.querySelectorAll("[required]");
const showHideBtns = document.querySelectorAll(".show-hide");
const password = document.querySelector('[name="password"]');
const passwordConfirm = document.querySelector('[name="confirm-password"]');

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function checkField(statementSuccess, errorMsg, field) {
  const parentEl = field.parentElement;
  const error = parentEl.querySelector(".error");
  const success = parentEl.querySelector(".success");

  if (statementSuccess) {
    success.removeAttribute("hidden");
    error.setAttribute("hidden", "");
  } else {
    error.removeAttribute("hidden");
    error.textContent = errorMsg;
    success.setAttribute("hidden", "");
  }
}

requiredFields.forEach((field) => {
  field.addEventListener("focusout", function () {
    checkField(this.value.length !== 0, "Field is required", this);
    if (this.type === "email" && this.value.length > 0) {
      checkField(
        regexEmail.test(this.value),
        "Email should be like test@test.test",
        this
      );
    }

    if (this === passwordConfirm && this.value.length > 0) {
      checkField(
        password.value === this.value,
        "Passwords are different",
        this
      );
    }
  });
});

showHideBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const field = btn.parentElement;
    const input = field.querySelector("input");
    field.classList.toggle("show");
    if (field.classList.contains("show")) {
      input.type = "text";
    } else {
      input.type = "password";
    }
  });
});
