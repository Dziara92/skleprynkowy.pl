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
let imgItems = document.querySelectorAll(".pakiet img");

let number = 0;

btnAddItem.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    numberItemBasket.innerHTML = ++number;
    imgAdd(i, numberItemBasket); // function add img to popup
    if (basketIcon.classList.contains("active")) {
      return;
    } else {
      basketIcon.classList.add("active");
    }
  });
});

// Delite Item in busket
const deliteBtn = document.querySelector(".clear-busket p");

const deliteItemFromBusket = (
  summaryPrice,
  clonedImgItem,
  titleItem,
  quantity,
  itemPrice,
  number
) => {
  clonedImgItem.parentElement.removeChild(clonedImgItem);
  summaryPrice.textContent = 0;
  titleItem.textContent = "Wybierz produkt";
  itemPrice.textContent = 0;
  number.innerHTML = 0;
  quantity.innerHTML = 0;
  basketIcon.classList.remove("active");
};

function imgAdd(i, number) {
  //add img to busket
  const imgItemAdded = document.querySelector(".img-item-added");
  let imgItem = imgItems[i];
  let clonedImgItem = imgItem.cloneNode();
  clonedImgItem.classList.add("item-in-basket");
  imgItemAdded.appendChild(clonedImgItem);

  //add price to busket
  const itemPrice = document.querySelector(".item-price");
  const priceItems = document.querySelectorAll(".price");
  let priceItem = priceItems[i].textContent;
  itemPrice.textContent = priceItem;

  //add tittle to busket
  const titleItem = document.querySelector(".title-item");
  const titleItems = document.querySelectorAll(".title-items");
  let titleItemBusket = titleItems[i].textContent;
  titleItem.textContent = titleItemBusket;

  //summary-price
  let summaryPrice = document.querySelector(".summary-price");
  summaryPrice.textContent = itemPrice.textContent;
  if (imgItemAdded.children.length >= 2) {
    summaryPrice.textContent =
      Number(itemPrice.textContent) * Number(number.textContent);
  }

  //quantity item in busket
  let quantity = document.querySelector(".quantity-number");
  const subtractQuantity = document.querySelector(".subtract-quantity");
  const addQuantity = document.querySelector(".add-quantity");
  quantity.innerHTML = number.innerHTML;
  console.log(quantity.innerHTML);

  addQuantity.addEventListener("click", () => {
    if (imgItemAdded.children.length > 0) {
      console.log(quantity.textContent);
      let incriseNumber = quantity.textContent;
      quantity.textContent = ++incriseNumber;
      number.textContent = quantity.textContent;
      let addItemSummaryPrice = Number(itemPrice.textContent) * incriseNumber;
      summaryPrice.textContent = addItemSummaryPrice;
    } else {
      return;
    }
  });

  subtractQuantity.addEventListener("click", () => {
    if (quantity.textContent == 1 || quantity.textContent == 0) {
      return;
    } else {
      let reduceNumber = quantity.textContent;
      quantity.textContent = --reduceNumber;
      number.textContent = quantity.textContent;
      let subtractItemSummaryPrice =
        Number(summaryPrice.textContent) - Number(itemPrice.textContent);
      summaryPrice.textContent = subtractItemSummaryPrice.toFixed(2);
    }
  });

  //addEventListener delite item
  deliteBtn.addEventListener("click", () => {
    deliteItemFromBusket(
      summaryPrice,
      clonedImgItem,
      titleItem,
      quantity,
      itemPrice,
      number
    );
  });
}

// Popup basket
basketIcon.addEventListener("click", () => {
  const popup = document.querySelector(".shop-basket");
  const closeIcon = document.querySelector(".fa-xmark ");
  if (basketIcon.classList.contains("active")) {
    popup.classList.toggle("active");
  } else return;
  closeIcon.addEventListener("click", function () {
    popup.classList.remove("active");
  });
});
