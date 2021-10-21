/* Nav toggle Button event*/
const nav_menu_btn = document.querySelector(".nav-menu");
const nav_close_btn = document.querySelector(".nav-links li img.close_menu");
const nav = document.querySelector("nav");
nav_menu_btn.addEventListener("click", function () {
  nav.classList.add("active");
  document.querySelector("body").classList.add("nav-active");
});
nav_close_btn.addEventListener("click", function () {
  nav.classList.remove("active");
  document.querySelector("body").classList.remove("nav-active");
});

/* main caroussel on phone view -  Control btns */
let car_count = 0;
const caroussel_btns = document.querySelectorAll(".caroussel-btn");
const caroussel_images_main = document.querySelectorAll(".carousel-img");
caroussel_btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    resetStyle_caroussel();
    if (btn.classList.contains("right-arrow")) {
      car_count == caroussel_images_main.length - 1
        ? (car_count = 0)
        : car_count++;
      caroussel_images_main[car_count].classList.add("desktop-active");
    } else {
      car_count == 0
        ? (car_count = caroussel_images_main.length - 1)
        : car_count--;
      caroussel_images_main[car_count].classList.add("desktop-active");
    }
  });
});
const resetStyle_caroussel = function () {
  caroussel_images_main.forEach((im) => im.classList.remove("desktop-active"));
};
/* Quantity Btn control events */
let quantity = document.querySelector("#quantityValue");
document.querySelector(".plus").addEventListener("click", function () {
  modifyQuantity(this, true);
});

document.querySelector(".minus").addEventListener("click", function () {
  modifyQuantity(this, false);
});
function modifyQuantity(elem, type) {
  elem.classList.add("active");
  setTimeout(() => {
    elem.classList.remove("active");
  }, 200);

  if (type) {
    quantity.innerHTML = +quantity.innerHTML + 1;
  } else {
    +quantity.innerHTML !== 0
      ? (quantity.innerHTML = +quantity.innerHTML - 1)
      : (quantity.innerHTML = 0);
  }
}

/* Add product to shopping cart functionalities*/
let cart_btn_icon = document.querySelector(".cart");
let cart = document.querySelector(".cart-info");
let cart_product_quantity = cart_btn_icon.querySelector("span");
let empty_cart_container = document.querySelector(".empty-cart");
let cart_product_info = document.querySelector(".cart-product");
let cart_checkout = document.querySelector(".checkout-btn");

document.querySelector(".addTo").addEventListener("click", function (e) {
  e.preventDefault();
  let value = +quantity.innerHTML;

  if (value !== 0) {
    let carteValue = cart_btn_icon.querySelector("span").innerHTML;
    if (carteValue.length > 0) {
      cart_btn_icon.querySelector("span").innerHTML = +carteValue + value;
      updateCart(+carteValue + value);
    } else {
      cart_btn_icon.querySelector("span").innerHTML = value;
      updateCart(value);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

const updateCart = (q) => {
  document.querySelector(".price_total").innerHTML = `
  <p class="price_total">$125 x ${q} <span>$${q * 125}.00</span></p>
  `;
  cart_btn_icon.classList.add("active-btn");
  cart_btn_icon.classList.add("active");
  empty_cart_container.classList.remove("active");
  cart_product_info.classList.add("active");
  cart_checkout.classList.add("active");
};
const closeCart = (e) => {
  e.preventDefault();
  cart.classList.remove("active");
};
const openCart = (e) => {
  e.preventDefault();
  cart.classList.add("active");
  let cart_quantityVal = +cart_product_quantity.innerHTML;
  if (cart_quantityVal == 0) {
    empty_cart_container.classList.add("active");
  } else {
    empty_cart_container.classList.remove("active");
    cart_product_info.classList.add("active");
    cart_checkout.classList.add("active");
    updateCart(cart_quantityVal);
  }
};
/* open/close cart events */
let state = false;
cart_btn_icon.addEventListener("click", function (e) {
  state = !state;
  if (state) {
    openCart(e);
  } else {
    closeCart(e);
  }
});

/*  delete product from cart event */
document.querySelectorAll(".delete-product").forEach((deleteBtn) =>
  deleteBtn.addEventListener("click", function () {
    deleteBtn.parentElement.classList.remove("active");
    cart_checkout.classList.remove("active");
    empty_cart_container.classList.add("active");
    cart_btn_icon.querySelector("span").innerHTML = "";
    cart_btn_icon.classList.remove("active");
    cart_btn_icon.classList.remove("active-btn");
  })
);

/* thumbnail images events */
const caroussel_images = document.querySelectorAll(".caroussel-images img");
const thumbnail_images = document.querySelectorAll(".thumbnails a");
thumbnail_images.forEach((elem, index) => {
  elem.addEventListener("click", function (e) {
    e.preventDefault();
    caroussel_images.forEach((im) => im.classList.remove("desktop-active"));
    thumbnail_images.forEach((im) => im.classList.remove("active-thumbnail"));
    elem.classList.add("active-thumbnail");
    caroussel_images[index].classList.add("desktop-active");
  });
});

document.querySelector("body").addEventListener("click", function (e) {
  let check = e.target.closest(".cart-info");
  if (
    check == null &&
    cart.classList.contains("active") &&
    !e.target.parentElement.classList.contains("cart")
  ) {
    cart.className = "cart-info";
    cart_btn_icon.click();
  }
});

/* lightbox thumbnail images events */
const lightbox_caroussel_images = document.querySelectorAll(
  ".img-wrapper-lightbox > img"
);
const lightbox_thumbnail_images = document.querySelectorAll(
  ".lightbox-thumbnails a"
);
const lightbox_caroussel_btns = document.querySelectorAll(
  ".lightbox-control-btns > div"
);

lightbox_thumbnail_images.forEach((elem, index) => {
  elem.addEventListener("click", function (e) {
    e.preventDefault();
    resetStyle();
    elem.classList.add("active-thumbnail");
    lightbox_caroussel_images[index].classList.add("lightbox-active");
    count = index;
  });
});

let count = 0;
lightbox_caroussel_btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    resetStyle();
    if (btn.classList.contains("lightbox-right-arrow")) {
      count == lightbox_caroussel_images.length - 1 ? (count = 0) : count++;
      lightbox_caroussel_images[count].classList.add("lightbox-active");
      lightbox_thumbnail_images[count].classList.add("active-thumbnail");
    } else {
      count == 0 ? (count = lightbox_caroussel_images.length - 1) : count--;
      lightbox_caroussel_images[count].classList.add("lightbox-active");
      lightbox_thumbnail_images[count].classList.add("active-thumbnail");
    }
  });
});

const resetStyle = () => {
  lightbox_caroussel_images.forEach((im) =>
    im.classList.remove("lightbox-active")
  );
  lightbox_thumbnail_images.forEach((im) =>
    im.classList.remove("active-thumbnail")
  );
};

let mediaQueryNavCheck = window.matchMedia("(min-width: 1200px)");

window.onresize = function () {
  if (mediaQueryNavCheck.matches) {
    console.log("matched");
  } else {
    lightbox_container.classList.remove("active");
    document.querySelector("body").classList.remove("active_lightbox");
  }
};

/* show / hide lightbox  */
const lightbox_container = document.querySelector(".overflow-lightbox");
document
  .querySelector(".caroussel-images")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (
      e.target.classList.contains("desktop-active") &&
      mediaQueryNavCheck.matches
    ) {
      lightbox_container.classList.add("active");
      document.querySelector("body").classList.add("active_lightbox");
    }
  });

document
  .querySelector(".close-lightbox")
  .addEventListener("click", function (e) {
    e.preventDefault();
    lightbox_container.classList.remove("active");
    document.querySelector("body").classList.remove("active_lightbox");
  });
