import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// junta itens repetidos e garante que todo item tenha quantity
function loadCart() {
  const raw = getLocalStorage("so-cart") || [];
  const merged = [];

  raw.forEach((item) => {
    const qty = item.quantity || 1;
    const existing = merged.find((i) => i.Id === item.Id);
    if (existing) {
      existing.quantity += qty;
    } else {
      merged.push({ ...item, quantity: qty });
    }
  });

  setLocalStorage("so-cart", merged);
  return merged;
}

function renderCartTotal(cartItems) {
  const footer = document.querySelector(".cart-footer");
  if (!footer) return;

  if (cartItems.length > 0) {
    footer.classList.remove("hide");
    const total = cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * item.quantity,
      0
    );
    document.querySelector(".cart-total").innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    footer.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const image = item.Images?.PrimaryMedium ?? item.Image ?? "";
  const color = item.Colors?.[0]?.ColorName ?? "";
  const lineTotal = (item.FinalPrice * item.quantity).toFixed(2);

  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${color}</p>
  <div class="cart-card__quantity">
    <button type="button" class="qty-btn" data-action="decrease" data-id="${item.Id}" aria-label="Decrease quantity">−</button>
    <span class="qty-value">${item.quantity}</span>
    <button type="button" class="qty-btn" data-action="increase" data-id="${item.Id}" aria-label="Increase quantity">+</button>
  </div>
  <p class="cart-card__price">$${lineTotal}</p>
</li>`;
}

function renderCartContents() {
  const cartItems = loadCart();
  const list = document.querySelector(".product-list");
  list.innerHTML = cartItems.map(cartItemTemplate).join("");
  renderCartTotal(cartItems);
}

function changeQuantity(id, delta) {
  let cart = getLocalStorage("so-cart") || [];
  const item = cart.find((i) => i.Id === id);
  if (!item) return;

  item.quantity = (item.quantity || 1) + delta;
  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.Id !== id);
  }

  setLocalStorage("so-cart", cart);
  renderCartContents();
}

// um único listener, porque o HTML é recriado a cada atualização
document.querySelector(".product-list").addEventListener("click", (event) => {
  const button = event.target.closest(".qty-btn");
  if (!button) return;

  const delta = button.dataset.action === "increase" ? 1 : -1;
  changeQuantity(button.dataset.id, delta);
});

renderCartContents();