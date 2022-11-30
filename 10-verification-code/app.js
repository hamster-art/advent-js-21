function genRandomCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

const btnVerify = document.querySelector('[type="submit"]');
const btnCopy = document.querySelector(".copy-btn");
const inputs = document.querySelectorAll("input");
const codeBox = document.querySelector(".code");
let code = "";
let copiedCode;

const verificationCode = String(genRandomCode());

codeBox.textContent = verificationCode;

function clickOnVerify(e) {
  e.preventDefault();
  inputs.forEach((input) => {
    code += input.value;
  });
  if (code === verificationCode) {
    alert("Success");
  } else {
    alert("Fail");
  }
}

function clickOnCopy() {
  navigator.clipboard.writeText(verificationCode);
  navigator.clipboard.readText().then((copiedText) => {
    copiedCode = copiedText.split("");
    console.log(copiedCode);
  });
}

const onPaste = () => {
  inputs.forEach((input, i) => {
    input.value = copiedCode[i];

    if (input.nextElementSibling) {
      input.nextElementSibling.focus();
    }
  });
};

inputs.forEach((input) => {
  input.addEventListener("paste", onPaste);
});

btnVerify.addEventListener("click", clickOnVerify);

btnCopy.addEventListener("click", clickOnCopy);
