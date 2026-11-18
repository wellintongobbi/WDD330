import { getLocalStorage } from "./utils.mjs";

function renderCartTotal(cartItems) {
  const footer = document.querySelector(".cart-footer");

  // só mostra o total se o carrinho não estiver vazio
  if (cartItems.length > 0) {
    footer.classList.remove("hide");

    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector(".cart-total").innerHTML = `Total: $${total.toFixed(2)}`;
  }
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  renderCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const image = item.Images?.PrimaryMedium ?? item.Image ?? "";
  const color = item.Colors?.[0]?.ColorName ?? "";

  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${color}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

renderCartContents();