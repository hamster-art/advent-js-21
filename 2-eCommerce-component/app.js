const menuItems = [
  {
    id: 1,
    name: "French Fries with Ketchup",
    price: 2.23,
    image: "plate__french-fries.png",
    count: 0,
  },
  {
    id: 2,
    name: "Salmon and Vegetables",
    price: 5.12,
    image: "plate__salmon-vegetables.png",
    count: 0,
  },
  {
    id: 3,
    name: "Spaghetti Meat Sauce",
    price: 7.82,
    image: "plate__spaghetti-meat-sauce.png",
    count: 0,
  },
  {
    id: 4,
    name: "Bacon, Eggs, and Toast",
    price: 5.99,
    image: "plate__bacon-eggs.png",
    count: 0,
  },
  {
    id: 5,
    name: "Chicken Salad with Parmesan",
    price: 6.98,
    image: "plate__chicken-salad.png",
    count: 0,
  },
  {
    id: 6,
    name: "Fish Sticks and Fries",
    price: 6.34,
    image: "plate__fish-sticks-fries.png",
    count: 0,
  },
  {
    id: 7,
    name: "Ravioli",
    price: 6.34,
    image: "plate__ravioli.png",
    count: 0,
  },
  {
    id: 8,
    name: "Tortellini",
    price: 6.34,
    image: "plate__tortellini.png",
    count: 0,
  },
];


class MenuCard {
  constructor(item) {
    this.id = item.id;
    this.name = item.name;
    this.price = item.price;
    this.image = item.image;
    this.count = item.count;
  }

  renderMenuCard() {
    return `<div class="menu__item">
                <img class="menu__img" src="img/${this.image}" alt="${this.name}">
                <div class="menu__info">
                    <h3 class="menu__name">${this.name}</h3>
                    <p class="menu__price">$${this.price}</p>
                    <button class="menu__btn" type="button">Add to Cart</button>
                </div>
            </div>`;
  }

  renderOrderCard() {
    return `<div class="cart-item">
                <div class="cart-item__body">
                    <div class="cart-item__media" data-quantity="1">
                        <img class="cart-item__img" src="img/${
                          this.image
                        }" alt="${this.name}">
                    </div>
                    <div class="cart-item__info">
                        <h3 class="cart-item__name">${this.name}</h3>
                        <p class="cart-item__price">$${this.price}</p>
                    </div>
                </div>
                <div class="cart-item__footer">
                    <div class="actions">
                        <button class="actions__btn actions__btn--dec"></button>
                        <span class="actions__value">${this.count}</span>
                        <button class="actions__btn actions__btn--inc"></button>
                    </div>
                    <div class="cart-item__total">$${
                      this.count * this.price
                    }</div>
                </div>
            </div>`;
  }

  increaseCount() {
    this.count += 1;
  }

  decreaseCount() {
    this.count -= 1;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const menuBox = document.querySelector(".menu");
  const cartBox = document.querySelector(".cart__body");
  const cartEmpty = document.querySelector(".cart__empty");
  const priceBox = document.querySelector(".price");
  const subtotalBox = document.querySelector(".subtotal");
  const taxBox = document.querySelector(".tax");
  const totalBox = document.querySelector(".total");
  let items = [];
  let orders = [];
  menuItems.forEach((item) => {
    items.push(new MenuCard(item));
    menuBox.innerHTML += new MenuCard(item).renderMenuCard();
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    addToCart(target);
    updateCount(target);
    deleteFromCart();
    orders = getOrders();
    setTotal();
    checkCartEmptyOrNot();
  });

  function getOrders() {
    return items.filter((item) => item.count > 0);
  }

  function setActionBtnDisabled(num, btn) {
    if (num <= 0) {
      btn.setAttribute("disabled", "");
    } else if (num > 0) {
      btn.removeAttribute("disabled");
    }
  }

  function getCartElements(target) {
    const actionsBox = target.parentElement;
    const decBtn = actionsBox.querySelector(".actions__btn--dec");
    const priceBox = target.parentElement.nextElementSibling;
    const valueBox = actionsBox.querySelector(".actions__value");

    return {
      priceBox: priceBox,
      decBtn: decBtn,
      valueBox: valueBox,
    };
  }

  function getItemTotalPrice(count, price) {
    return `$${(count * price).toFixed(2)}`;
  }

  function setTotal() {
    const items = document.querySelectorAll(".cart-item");
    let subtotal = 0;

    items.forEach((item) => {
      subtotal += +item.querySelector(".cart-item__total").textContent.slice(1);
    });

    subtotalBox.textContent = `$${subtotal.toFixed(2)}`;
    const tax = 0.0975 * subtotal;
    taxBox.textContent = `$${tax.toFixed(2)}`;
    totalBox.textContent = `$${(tax + subtotal).toFixed(2)}`;
  }

  function checkCartEmptyOrNot() {
    if (orders.length > 0) {
      priceBox.removeAttribute("hidden");
      cartEmpty.setAttribute("hidden", "");
    }
    if (orders.length === 0) {
      priceBox.setAttribute("hidden", "");
      cartEmpty.removeAttribute("hidden");
    }
  }

  function deleteFromCart() {
    orders.forEach((order, i) => {
      if (order.count === 0) {
        cartBox.querySelectorAll(".cart-item")[i].remove();
        items.forEach(function (val, i) {
          if (val === order) {
            menuBox
              .querySelectorAll(".menu__btn")
              [i].classList.remove("menu__btn--added");
          }
        });
      }
    });
  }

  function updateCount(target) {
    const items = document.querySelectorAll(".cart-item");

    if (target && target.matches("button.actions__btn")) {
      items.forEach((item, i) => {
        if (target === item.querySelector(".actions__btn--inc")) {
          const elements = getCartElements(target);
          orders[i].increaseCount();
          setActionBtnDisabled(orders[i].count, elements.decBtn);
          elements.valueBox.textContent = orders[i].count;
          elements.priceBox.textContent = getItemTotalPrice(
            orders[i].count,
            orders[i].price
          );
        } else if (target === item.querySelector(".actions__btn--dec")) {
          const elements = getCartElements(target);
          orders[i].decreaseCount();
          setActionBtnDisabled(orders[i].count, target);
          elements.valueBox.textContent = orders[i].count;
          elements.priceBox.textContent = getItemTotalPrice(
            orders[i].count,
            orders[i].price
          );
        }
      });
    }
  }

  function addToCart(target) {
    const btns = document.querySelectorAll(".menu__btn");

    if (target && target.matches("button.menu__btn")) {
      target.classList.add("menu__btn--added");
      target.textContent = "In Cart";

      btns.forEach((btn, i) => {
        if (target === btn) {
          items[i].increaseCount();
          cartBox.innerHTML += items[i].renderOrderCard();
        }
      });
    }
  }
});
