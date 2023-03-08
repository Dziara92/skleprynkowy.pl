//Arow-Up
const arrowUp = document.querySelector(".arrow-up");
const header = document.querySelector("header");

//Arrow up function
window.addEventListener("scroll", function () {
  if (window.pageYOffset >= header.clientHeight) {
    arrowUp.classList.add("active");
  } else {
    arrowUp.classList.remove("active");
  }
});
//Arrow up click smooth
arrowUp.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//Scroll to section about-book
const btnMore = document.querySelector(".see-more");
const aboutBookSection = document.querySelector(".about-book");

btnMore.addEventListener("click", function () {
  window.scrollTo({ top: aboutBookSection.offsetTop, behavior: "smooth" });
});

//Scroll to section offers
const btnBuy = document.querySelector(".add-item");
const offersSection = document.querySelector("section.shop");

btnBuy.addEventListener("click", function () {
  window.scrollTo({ top: offersSection.offsetTop, behavior: "smooth" });
});

// Add item to basket
let numberItemBasket = document.querySelector("nav p");
const btnAddItem = document.querySelectorAll(".add-to-basket");
const basketIcon = document.querySelector(".basket");

const items = [
  {
    itemName: "Książka",
    img: "img/offer-img1.png",
    price: "49.99",
    quantity: 1,
    id: 1,
  },
  {
    itemName: "Książka + kubek TŚJN",
    img: "img/offer-img2.png",
    price: "69.99",
    quantity: 1,
    id: 2,
  },
  {
    itemName: "Książka + kubek TŚJN + podróże VR",
    img: "img/offer-img3.png",
    quantity: 1,
    price: "149.99",
    id: 3,
  },
];

let busket = [];
btnAddItem.forEach((btnItem) => {
  btnItem.addEventListener("click", () => {
    const item = items.find((item) => item.id.toString() === btnItem.id);
    let search = busket.find((itemElement) => itemElement.id === item.id);
    if (search === undefined) {
      busket.push(item);
    } else {
      search.quantity++;
    }

    addActiveClassToIcon();
    displayItemInPopup();
  });
});

//Add class .active to basket Icon
const addActiveClassToIcon = () => {
  if (busket.length > 0) {
    basketIcon.classList.add("active");
  }
};

const removeActiveClassToIcon = () => {
  if (busket.length === 0) {
    basketIcon.classList.remove("active");
  }
};

//Display item in popup
const popup = document.querySelector(".shop-basket");

const displayItemInPopup = () => {
  const itemInBusket = busket.map((item) => {
    return `<i class="fa-solid fa-xmark"></i>
    <div class="small-Container">
        <div class="img-item-added"> <img src=${item.img} alt="zdjęcie produktu" ></div>
        <div class="clear-busket" onclick="delateItemFromBusket(${item.id})">
            <p id=${item.id}>x</p>
        </div>

        <p>Produkt</p>
        <p class="title-item">${item.itemName}</p>
        <p>Cena</p>
        <p class="item-price">${item.price}</p>
        <p>Ilość</p>
        <div class="quantity">
            <div class="subtract-quantity" onclick="decrement(${item.id})">-</div>
            <div class="quantity-number">${item.quantity}</div>
            <div class="add-quantity" onclick="increment(${item.id})">+</div>
        </div>
      </div>`;
  });

  popup.innerHTML = itemInBusket;
  if (busket.length === 0) {
    popup.classList.remove("active");
    basketIcon.classList.remove("active");
    return;
  }
  createSumemaratyDiv();
  // Close popup
  const closeIcon = document.querySelector(".fa-xmark ");
  closeIcon.addEventListener("click", function () {
    popup.classList.remove("active");
  });
};

//Crate Element
const createSumemaratyDiv = () => {
  const totalPrice = busket
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const summararyDiv = document.createElement("div");
  summararyDiv.classList.add("summary");
  summararyDiv.innerHTML = `<h3>Podsumowanie koszyka </h3>

  <p>Kwota</p>
  <p class="summary-price">${totalPrice}</p>
  <button class="pay-delivery">Dostawa i płatność</button>`;
  popup.appendChild(summararyDiv);
};

// Popup basket
basketIcon.addEventListener("click", () => {
  popup.classList.toggle("active");
  if (busket.length === 0) {
    popup.classList.remove("active");
  }
});

const increment = (id) => {
  let searchElement = busket.find((itemElement) => itemElement.id === id);
  searchElement.quantity++;
  displayItemInPopup();
};

const decrement = (id) => {
  let searchElement = busket.find((itemElement) => itemElement.id === id);
  if (searchElement.quantity <= 1) {
    return;
  }
  searchElement.quantity--;
  displayItemInPopup();
};

const delateItemFromBusket = (id) => {
  let newBusket = busket.filter((item) => item.id !== id);
  busket = newBusket;
  displayItemInPopup();
};
