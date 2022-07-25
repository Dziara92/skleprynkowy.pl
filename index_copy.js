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
    id: 1,
    quantity: 1,
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

//add tittle to busket
const titleItem = document.querySelector(".title-item");
//add price to busket
const itemPrice = document.querySelector(".item-price");
//quantity item in busket
let quantity = document.querySelector(".quantity-number");
//summary-price
let summaryPrice = document.querySelector(".summary-price");
//add img to busket
const imgItemAdded = document.querySelector(".img-item-added");
//small container
const smallContainer = document.querySelector(".small-Container");

btnAddItem.forEach((elBtn, i) => {
  elBtn.setAttribute("data-id", items[i].id);
  elBtn.addEventListener("click", () => {
    const newItem = items.find(
      (el) => el.id.toString() === elBtn.getAttribute("data-id")
    );

    busket.push(newItem);
    busket.forEach((item) => {
      imgItemAdded.innerHTML = `<img src="${item.img}" alt="Zdjęcie produktu">`;
      titleItem.textContent = item.itemName;
      itemPrice.textContent = item.price;
      quantity.innerHTML = item.quantity;
      summaryPrice.textContent = item.price;

      busket = [];
    });
    if (basketIcon.classList.contains("active")) {
      return;
    } else {
      basketIcon.classList.add("active");
    }
  });
});

//Add quantity
const addQuantity = document.querySelector(".add-quantity");
addQuantity.addEventListener("click", () => {
  quantity.textContent++;
  let q = Number(itemPrice.textContent) * quantity.innerHTML;
  summaryPrice.textContent = q.toFixed(2);
});
//subtract quantity
const subtractQuantity = document.querySelector(".subtract-quantity");
subtractQuantity.addEventListener("click", () => {
  if (quantity.textContent == 1 || quantity.textContent == 0) {
    return;
  } else {
    quantity.textContent--;
    let q = Number(summaryPrice.textContent) - itemPrice.innerHTML;
    summaryPrice.textContent = q.toFixed(2);
  }
});

// Delite Item in busket
const deleteBtn = document.querySelector(".clear-busket p");
deleteBtn.addEventListener("click", () => {
  imgItemAdded.innerHTML = "";
  titleItem.textContent = "";
  itemPrice.textContent = "";
  quantity.innerHTML = "0";
  summaryPrice.textContent = "";

  if (quantity.innerHTML == "0") {
    basketIcon.classList.remove("active");
    popup.classList.remove("active");
  }
});

// Popup basket
const popup = document.querySelector(".shop-basket");
basketIcon.addEventListener("click", () => {
  const closeIcon = document.querySelector(".fa-xmark ");
  if (basketIcon.classList.contains("active")) {
    popup.classList.toggle("active");
  } else return;
  closeIcon.addEventListener("click", function () {
    popup.classList.remove("active");
  });
});
