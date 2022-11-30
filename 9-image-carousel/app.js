const content = [
  {
    image: "dave-hoefler-okUIdo6NxGo-unsplash.jpg",
    caption: "Photo by Dave Hoefler on Unsplash",
  },
  {
    image: "sherman-yang-VBBGigIuaDY-unsplash.jpg",
    caption: "Photo by Sherman Yang n Unsplash",
  },
  {
    image: "jakob-owens-EwRM05V0VSI-unsplash.jpg",
    caption: "Photo by Jakob Owens on Unsplash",
  },
  {
    image: "finding-dan-dan-grinwis-O35rT6OytRo-unsplash.jpg",
    caption: "Photo by Dan Grinwis on Unsplash",
  },
  {
    image: "vincentiu-solomon-ln5drpv_ImI-unsplash.jpg",
    caption: "Photo by Vincentiu Solomon on Unsplash",
  },
  {
    image: "silas-baisch-Wn4ulyzVoD4-unsplash.jpg",
    caption: "Photo by Silas Baisch on Unsplash",
  },
  {
    image: "eugene-golovesov-EXdXp7Z4X4w-unsplash.jpg",
    caption: "Photo by Eugene Golovesov on Unsplash",
  },
  {
    image: "jennifer-reynolds-_8HI5xf4TkE-unsplash.jpg",
    caption: "Photo by Jennifer reynolds on Unsplash",
  },
  {
    image: "kellen-riggin-SIBOiXKg0Ds-unsplash.jpg",
    caption: "Photo by Kellen Riggin on Unsplash",
  },
  {
    image: "rafael-hoyos-weht-zhkAp8DGkxw-unsplash.jpg",
    caption: "Photo by Rafael Hoyos on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
  {
    image: "sonya-romanovska-wzdXhyi3AiM-unsplash.jpg",
    caption: "Photo by Sonya Romanovska on Unsplash",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const thumbnailsBox = document.querySelector(".thumbnails");
  const thumbnailsList = document.querySelector(".thumbnails ul");
  const featureBox = document.querySelector(".feature");
  const navBtns = document.querySelectorAll(".nav-btn");
  let currentThumbnail;
  let selectedIndex = 0;

  function createThumbnails(item) {
    return `<li>
            <a href="#" class="thumbnails-link">
              <img src="./images/${item.image}" alt="">
            </a>
          </li>`;
  }

  function createSelectedImage(item) {
    return `
        <img src="./images/${item.image}" alt="Featured" />
        <div class="caption">${item.caption}</div>
    `;
  }

  function setScroll(item) {
    if (item.getBoundingClientRect().left < 200) {
      thumbnailsBox.scrollLeft -= thumbnailsList.offsetWidth - 200;
    } else if (
      thumbnailsList.offsetWidth -
        item.getBoundingClientRect().left -
        item.offsetWidth <
      200
    ) {
      thumbnailsBox.scrollLeft += item.getBoundingClientRect().left;
    }
  }

  function setSelected(item) {
    currentThumbnail && currentThumbnail.classList.remove("selected");
    item.classList.add("selected");
    currentThumbnail = item;
  }

  function setSelectedImage(index) {
    featureBox.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500 });

    setTimeout(() => {
      featureBox.innerHTML = createSelectedImage(content[index]);

      featureBox.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500 });
    }, 450);
  }

  function hideNavBtn() {
    if (selectedIndex === thumbnails.length - 1) {
      navBtns[1].setAttribute("hidden", "");
    } else if (selectedIndex === 0) {
      navBtns[0].setAttribute("hidden", "");
    } else {
      navBtns[0].removeAttribute("hidden");
      navBtns[1].removeAttribute("hidden");
    }
  }

  function setState(item, index) {
    setScroll(item);
    setSelected(item);
    setSelectedImage(index);
    hideNavBtn();
  }

  content.forEach((item) => {
    thumbnailsList.innerHTML += createThumbnails(item);
  });
  const thumbnails = document.querySelectorAll(".thumbnails li");

  setState(thumbnails[selectedIndex], selectedIndex);

  document.addEventListener("click", (e) => {
    const item = e.target;
    if (item && item.matches("a.thumbnails-link")) {
      selectedIndex = [...thumbnails].indexOf(item.parentElement);
      setState(item, selectedIndex);
    }
  });

  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("left")) {
        selectedIndex -= 1;
      } else if (btn.classList.contains("right")) {
        selectedIndex += 1;
      }

      setState(thumbnails[selectedIndex], selectedIndex);
    });
  });
});
