import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);

myList.init();

if (category) {
    const categoryName = category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const title = document.querySelector(".products h2");
    if (title) title.textContent = `Top Products: ${categoryName}`;
    document.title = `Sleep Outside | ${categoryName}`;
}