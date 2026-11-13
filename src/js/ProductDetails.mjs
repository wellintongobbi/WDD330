import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cart = getLocalStorage("so-cart") || [];
        cart.push(this.product);
        setLocalStorage("so-cart", cart);

        // feedback opcional
        const button = document.getElementById("addToCart");
        button.textContent = "Added!";
        setTimeout(() => (button.textContent = "Add to Cart"), 1000);
    }

    renderProductDetails() {
        const p = this.product;

        document.title = `Sleep Outside | ${p.Name}`;
        document.querySelector(".product-detail h3").textContent = p.Brand.Name;
        document.querySelector(".product-detail h2").textContent = p.NameWithoutBrand;

        const img = document.querySelector(".product-detail img");
        img.src = p.Image;
        img.alt = p.NameWithoutBrand;

        document.querySelector(".product-card__price").textContent = `$${p.FinalPrice.toFixed(2)}`;
        document.querySelector(".product__color").textContent = p.Colors[0].ColorName;
        document.querySelector(".product__description").innerHTML = p.DescriptionHtmlSimple;

        document.getElementById("addToCart").dataset.id = p.Id;
    }
}