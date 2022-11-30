const content = [
  {
    id: "light",
    title: "Elgato Key Lights",
    description: ` <p>
              These lights are great if you shoot video at your desk.
            </p>
            <p>
              My desk is pushed up against the wall, so I didn’t have room for a large soft box. These lights still
              deliver on the
              look that I wanted. Plus, it comes with a desktop app where you can adjust the brightness and temperature.
            </p>`,
    price: "169.99",
    img: "elgato-key-light.png",
  },
  {
    id: "monitor",
    title: "Elgato Monitor",
    description: ` <p>
              These lights are great if you shoot video at your desk.
            </p>
            <p>
              My desk is pushed up against the wall, so I didn’t have room for a large soft box. These lights still
              deliver on the
              look that I wanted. Plus, it comes with a desktop app where you can adjust the brightness and temperature.
            </p>
            <p>
              My desk is pushed up against the wall, so I didn’t have room for a large soft box. These lights still
              deliver on the
              look that I wanted. Plus, it comes with a desktop app where you can adjust the brightness and temperature.
            </p>`,
    price: "1690.99",
    img: "elgato-key-light.png",
  },
];

const links = document.querySelectorAll("svg a");
const modal = document.querySelector(".overlay");
const modalTitle = document.querySelector(".modal h1");
const modalDescription = document.querySelector(".description");
const modalPrice = document.querySelector(".price");
const modalImg = document.querySelector(".product-image img");
const closeModal = document.querySelector(".close");

links.forEach((link) => {
  link.addEventListener("click", () => {
    const modalContent = content.find((obj) => obj.id === link.id);
    modalTitle.textContent = modalContent.title;
    modalDescription.innerHTML = modalContent.description;
    modalPrice.textContent = `$${modalContent.price}`;
    modalImg.src = `images/${modalContent.img}`;
    modalImg.alt = modalContent.title;
    modal.animate(
      [
        { opacity: 0, visibility: "hidden" },
        { opacity: 1, visibility: "visible" },
      ],
      { duration: 500, fill: "forwards" }
    );
  });
});

closeModal.addEventListener("click", () => {
  modal.animate(
    [
      { opacity: 1, visibility: "visible" },
      { opacity: 0, visibility: "hidden" },
    ],
    { duration: 500, fill: "forwards" }
  );

  setTimeout(() => {
    modalTitle.textContent = "";
    modalDescription.innerHTML = "";
    modalPrice.textContent = "";
    modalImg.src = "";
    modalImg.alt = "";
  }, 500);
});
