document.addEventListener("DOMContentLoaded", () => {
  const incomeField = document.querySelector("#income");
  const expenseNameField = document.querySelector("#expense-name");
  const expenseAmountField = document.querySelector("#expense-amount");
  const errorMsg = document.querySelector(".error");
  const addBtn = document.querySelector(".add-expense-button");
  const expenseTable = document.querySelector(".expense-table");
  const incomeTotalBox = document.querySelector("#income-total");
  const expenseTotalBox = document.querySelector("#expense-total");
  const balanceTotalBox = document.querySelector("#balance-total");
  let expenses = [];
  let total = {
    income: 0,
    expense: 0,
    balance: 0,
  };

  function createHTMLExpenseItem(item) {
    return `<div class="expense-table-row">
                <div>${item.name}</div>
                <div>$${item.amount.toFixed(2)}</div>
                <button name="delete-expense" class="delete-expense">
                  <img src="./images/trash.svg" alt="Tash" />
                </button>
            </div>`;
  }

  function setTwoDigits(num) {
    return num.toFixed(2);
  }

  function setIncome() {
    total.income = +this.value;
    incomeTotalBox.textContent = `$${setTwoDigits(total.income)}`;
    calcAllExpenses();
    calcBalance();
  }

  function addExpense() {
    const expenseItem = {
      name: expenseNameField.value,
      amount: +expenseAmountField.value,
    };
    if (expenseAmountField.value && expenseNameField.value) {
      expenses.push(expenseItem);
      errorMsg.setAttribute("hidden", "");
      expenseTable.innerHTML += createHTMLExpenseItem(expenseItem);
      expenseNameField.value = "";
      expenseAmountField.value = "";
      calcAllExpenses();
      calcBalance();
    } else {
      errorMsg.removeAttribute("hidden");
    }
  }

  function deleteExpense(e) {
    const target = e.target;
    const deleteBtns = expenseTable.querySelectorAll(".delete-expense");
    deleteBtns.forEach((btn, i) => {
      if (target === btn) {
        expenses = expenses.filter((val) => val !== expenses[i]);
        const parentEl = btn.parentElement;
        parentEl.remove();
        calcAllExpenses();
        calcBalance();
      }
    });
  }

  function calcAllExpenses() {
    let sum = 0;
    expenses.forEach((item) => {
      sum += item.amount;
    });
    total.expense = sum;
    expenseTotalBox.textContent = `$${setTwoDigits(total.expense)}`;
  }

  function calcBalance() {
    total.balance = total.income - total.expense;
    balanceTotalBox.textContent = `$${setTwoDigits(total.balance)}`;

    if (total.balance > 0) {
      balanceTotalBox.classList.add("positive");
      balanceTotalBox.classList.remove("negative");
    } else if (total.balance === 0) {
      balanceTotalBox.classList.remove("positive");
      balanceTotalBox.classList.remove("negative");
    } else {
      balanceTotalBox.classList.add("negative");
      balanceTotalBox.classList.remove("positive");
    }
  }

  incomeField.addEventListener("focusout", setIncome);

  addBtn.addEventListener("click", addExpense);

  expenseTable.addEventListener("click", (e) => {
    deleteExpense(e);
  });
});
