const data = [
  {
    id: 1,
    name: "Cameron Williamson",
    email: "cameron.wiliamson@example.com",
    job: "Software Developer",
  },
  {
    id: 2,
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    job: "Project Manager",
  },
  {
    id: 3,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    job: "Marketing Coordinator",
  },
  {
    id: 4,
    name: "Wade Warren",
    email: "wade.warren@example.com",
    job: "Software Tester",
  },
  {
    id: 5,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    job: "Web Designer",
  },
  {
    id: 6,
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    job: "Marketing Coordinator",
  },
  {
    id: 7,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    job: "Web Designer",
  },
  {
    id: 8,
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    job: "UI/UX Designer",
  },
  {
    id: 9,
    name: "Ralph Edwards",
    email: "ralph.edwards@example.com",
    job: "Software Tester",
  },
  {
    id: 10,
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    job: "Ethical Hacker",
  },
  {
    id: 11,
    name: "Willie Jennings",
    email: "willie.jennings@example.com",
    job: "Team Leader",
  },
  {
    id: 12,
    name: "Neveah Simmons",
    email: "neveah.simmons@example.com",
    job: "Team Leader",
  },
  {
    id: 13,
    name: "Theresa Webb",
    email: "theresa.webb@example.com",
    job: "Software Tester",
  },
  {
    id: 14,
    name: "Debbe Baker",
    email: "debbe.baker@example.com",
    job: "Software Developer",
  },
  {
    id: 15,
    name: "Ronald Richards",
    email: "ronald.richards@example.com",
    job: "Software Developer",
  },
  {
    id: 16,
    name: "Deanna Curtis",
    email: "deanna.curtis@example.com",
    job: "Scrum Master",
  },
  {
    id: 17,
    name: "Felicia Reid",
    email: "felicia.reed@example.com",
    job: "Ethical Hacker",
  },
  {
    id: 18,
    name: "Jessie Alexander",
    email: "jessie.alexander@example.com",
    job: "Project Manager",
  },
  {
    id: 19,
    name: "Sam Smith",
    email: "sam.smith@example.com",
    job: "Ethical Hacker",
  },
  {
    id: 20,
    name: "Eleanor Rigby",
    email: "eleanor.rigby@example.com",
    job: "UI/UX Designer",
  },
  {
    id: 21,
    name: "Devon Lane",
    email: "devon.lane@example.com",
    job: "Team Leader",
  },
  {
    id: 22,
    name: "Guy Hawkins",
    email: "guy.hawkins@example.com",
    job: "Team Leader",
  },
  {
    id: 23,
    name: "Jim Parks",
    email: "jim.parks@example.com",
    job: "Ethical Hacker",
  },
  {
    id: 24,
    name: "Susanne Ford",
    email: "susanne.ford@example.com",
    job: "Software Developer Manager",
  },
  {
    id: 25,
    name: "Kathryn Murphy",
    email: "kathryn.murphy@example.com",
    job: "Project Manager",
  },
  {
    id: 26,
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    job: "Software Developer",
  },
  {
    id: 27,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    job: "Software Tester",
  },
  {
    id: 28,
    name: "Karen MacAfee",
    email: "karen.macafee@example.com",
    job: "UI/UX Designer",
  },
  {
    id: 29,
    name: "Dianne Russell",
    email: "dianne.russell@example.com",
    job: "Ethical Hacker",
  },
  {
    id: 30,
    name: "Bessie Cooper",
    email: "bessie.cooper@example.com",
    job: "Scrum Master",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("tbody");
  const navBtns = document.querySelectorAll(".nav-btn");
  const numResultsBox = document.querySelector("#numResults");
  const currentPageBox = document.querySelector("#currentPage");
  const totalPagesBox = document.querySelector("#totalPages");
  let dataSorted = JSON.parse(JSON.stringify(data));
  let currentSortBtn, currentNavBtn;
  let currentPage = getCurrentPage();
  let totalPages = Math.floor(dataSorted.length / 10);

  function createTableRow(item) {
    return `<tr>
            <td>${item.id}</td>
            <td class="name">
              <input
                type="text"
                disabled="disabled"
                name="person-name-${item.id}"
                value=${item.name}
              />
            </td>
            <td>
              <input
                type="text"
                disabled="disabled"
                name="person-email-${item.id}"
                value=${item.email}
              />
            </td>
            <td>
              <input
                type="text"
                disabled="disabled"
                name="person-job-${item.id}"
                value=${item.job}
              />
            </td>
            <td>
              <button class="update" name="person-update-1" id="personUpdate1">
                <img src="./images/update.svg" alt="Update" class="update" />
              </button>
              <button class="edit" name="person-edit-1" id="personEdit1">
                <img src="./images/edit.svg" alt="Edit" class="edit" />
              </button>
            </td>
          </tr>`;
  }

  function getCurrentPage() {
    return +currentPageBox.value;
  }

  function setNavBtnDisabled(btn, val) {
    currentNavBtn && currentNavBtn.removeAttribute("disabled");
    if (val > totalPages || val < 1) {
      navBtns[0].setAttribute("disabled", "");
      navBtns[1].setAttribute("disabled", "");
    } else if (val === 1 || val === totalPages) {
      btn.setAttribute("disabled", "");
    } else {
      btn.removeAttribute("disabled");
    }
    currentNavBtn = btn;
  }

  function loadTenItems(lastIndex) {
    const selectedItems = dataSorted.slice(lastIndex - 10, lastIndex);
    tbody.innerHTML = "";
    selectedItems.forEach((item) => {
      tbody.innerHTML += createTableRow(item);
    });
  }

  function sortById(data, type) {
    data.sort((a, b) => {
      if (type === "ascending") {
        return a.id - b.id;
      } else if (type === "descending") {
        return b.id - a.id;
      }
    });
  }

  function sortByString(data, item, type) {
    data.sort((a, b) => {
      let str1 = a[item].toLowerCase();
      let str2 = b[item].toLowerCase();

      if (str1 < str2) {
        return type === "descending" ? 1 : -1;
      }
      if (str1 > str2) {
        return type === "ascending" ? 1 : -1;
      }

      return 0;
    });
  }

  function sorting(id, type) {
    switch (id) {
      case "by-id":
        sortById(dataSorted, type);
        break;
      case "by-name":
        sortByString(dataSorted, "name", type);
        break;
      case "by-email":
        sortByString(dataSorted, "email", type);
        break;
      case "by-job":
        sortByString(dataSorted, "job", type);
        break;
    }
  }

  function changeInput(e) {
    const target = e.currentTarget;
    const val = +target.value;
    currentPage = getCurrentPage();
    setNavBtnDisabled(navBtns[0], val);
    setNavBtnDisabled(navBtns[1], val);
    if (val > totalPages || val < 1) {
      target.classList.add("error");
    } else {
      target.classList.remove("error");
      loadTenItems(val * 10);
    }
  }

  function clickOnNavBtn(e) {
    const target = e.currentTarget;
    currentPage = getCurrentPage();

    if (target.classList.contains("nav-btn")) {
      if (target.id === "next") {
        currentPage += 1;
      } else if (target.id === "previous") {
        currentPage -= 1;
      }

      setNavBtnDisabled(target, currentPage);

      currentPageBox.value = currentPage;
      loadTenItems(currentPage * 10);
    }
  }

  function clickOnSort(e) {
    const target = e.target;

    if (target && target.classList.contains("sort")) {
      const isAscending = target.classList.contains("ascending");
      const isDescending = target.classList.contains("descending");
      const isEmpty =
        !target.classList.contains("ascending") &&
        !target.classList.contains("descending");

      if (currentSortBtn && currentSortBtn !== target) {
        currentSortBtn.classList.remove("ascending");
        currentSortBtn.classList.remove("descending");
      }

      if (isAscending || isEmpty) {
        target.classList.add("descending");
        target.classList.remove("ascending");
        sorting(target.id, "descending");
      } else if (isDescending) {
        target.classList.add("ascending");
        target.classList.remove("descending");
        sorting(target.id, "ascending");
      }
      loadTenItems(10);
      currentSortBtn = target;
    }
  }

  loadTenItems(10);
  setNavBtnDisabled(navBtns[0], currentPage);
  numResultsBox.innerHTML = `${dataSorted.length} results`;
  totalPagesBox.innerHTML = totalPages;

  currentPageBox.addEventListener("change", changeInput);

  navBtns.forEach((btn) => {
    btn.addEventListener("click", clickOnNavBtn);
  });

  document.addEventListener("click", clickOnSort);
});
