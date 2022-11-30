const lowercase = "abcdefghijklmnopqrstuvwxyz";
const characters = {
  uppercase: lowercase.toUpperCase(),
  numbers: "0123456789",
  symbols: "!~@#$%&*_",
  similar: "il1Lo0O",
};

const regex = {
  numbers: /[0-9]/,
  symbols: /[!~@#$%&*_]/,
};

const settings = {
  includeSymbols: true,
  includeNumbers: true,
  includeLowercase: true,
  includeUppercase: true,
  includeSimilar: true,
  length: 12,
};

const selectors = {
  copy: "copy",
  slider: "length",
  symbols: "symbols",
  numbers: "numbers",
  lowercase: "lowercase",
  uppercase: "uppercase",
  similar: "similar",
};

function checkSymbol(password) {
  const randomSymbol =
    characters.symbols[Math.floor(Math.random() * characters.symbols.length)];
  return password.substring(0, password.length - 1) + randomSymbol;
}

function checkNumber(password) {
  const randomNumber =
    characters.numbers[Math.floor(Math.random() * characters.numbers.length)];
  return randomNumber + password.substring(1, password.length);
}

function removeSimilar(chars) {
  return chars.filter((val) => !characters.similar.split("").includes(val));
}

function generatePassword() {
  let charactersList = [
    ...(settings.includeSymbols ? characters.symbols.split("") : []),
    ...(settings.includeNumbers ? characters.numbers.split("") : []),
    ...(settings.includeLowercase ? lowercase.split("") : []),
    ...(settings.includeUppercase ? characters.uppercase.split("") : []),
  ];

  if (!settings.includeSimilar) {
    charactersList = removeSimilar(charactersList);
  }

  const passwordIndexes = Array.from({ length: settings.length }, () =>
    Math.floor(Math.random() * charactersList.length)
  );

  let password = passwordIndexes.map((index) => charactersList[index]).join("");

  if (settings.includeSymbols && !regex.symbols.test(password)) {
    password = checkSymbol(password);
  }

  if (settings.includeNumbers && !regex.numbers.test(password)) {
    password = checkNumber(password);
  }

  removeSimilar(charactersList);
  document.querySelector("#password").value = password;
}

generatePassword();

document.addEventListener("click", (e) => {
  switch (e.target.id) {
    case selectors.slider:
      settings.length = e.target.valueAsNumber;
      document.querySelector("#lengthText").textContent = settings.length;
      generatePassword();
      break;

    case selectors.symbols:
      settings.includeSymbols = !settings.includeSymbols;
      generatePassword();
      break;

    case selectors.numbers:
      settings.includeNumbers = !settings.includeNumbers;
      generatePassword();
      break;

    case selectors.lowercase:
      settings.includeLowercase = !settings.includeLowercase;
      generatePassword();
      break;

    case selectors.uppercase:
      settings.includeUppercase = !settings.includeUppercase;
      generatePassword();
      break;

    case selectors.similar:
      settings.includeSimilar = !settings.includeSimilar;
      generatePassword();
      break;

    case selectors.copy:
      const copiedText = document.querySelector("#password").value;
      navigator.clipboard.writeText(copiedText);
      e.target.classList.add("copied");
      setTimeout(() => {
        e.target.classList.remove("copied");
      }, 5000);
      break;
  }
});
