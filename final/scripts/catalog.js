import { getProducts } from "./data.js";

const featuredProducts = document.querySelector("#featured-products");
const productGrid = document.querySelector("#product-grid");
const collectionFilter = document.querySelector("#collection-filter");
const productCount = document.querySelector("#product-count");
const productModal = document.querySelector("#product-modal");
const modalContent = document.querySelector("#modal-content");
const closeModal = document.querySelector("#close-modal");
let modalIsReady = false;

const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});

export async function renderFeaturedProducts() {
    if (!featuredProducts) {
        return;
    }

    const products = await getProducts();
    let featured = products.filter((product) => product.availability === "In stock").slice(0, 4);

    featuredProducts.innerHTML = "";
    featured.forEach((product) => {
        featuredProducts.appendChild(createProductCard(product));
    });

    setupProductClicks(featuredProducts, products);
    setupModal();
}

export async function setupCatalog() {
    if (!productGrid || !collectionFilter || !productCount || !productModal || !modalContent || !closeModal) {
        return;
    }

    const products = await getProducts();
    let savedFilter = localStorage.getItem("aureaCollection") || "All";
    let collections = ["All", ...new Set(products.map((product) => product.collection))];

    collections.forEach((collection) => {
        let option = document.createElement("option");
        option.value = collection;
        option.textContent = collection;

        if (collection === savedFilter) {
            option.selected = true;
        }

        collectionFilter.appendChild(option);
    });

    displayProducts(products);

    collectionFilter.addEventListener("change", () => {
        localStorage.setItem("aureaCollection", collectionFilter.value);
        displayProducts(products);
    });

    setupProductClicks(productGrid, products);
    setupModal();
}

function setupModal() {
    if (!productModal || !closeModal || modalIsReady) {
        return;
    }

    closeModal.addEventListener("click", () => {
        productModal.close();
    });

    productModal.addEventListener("click", (event) => {
        if (event.target === productModal) {
            productModal.close();
        }
    });

    modalIsReady = true;
}

function setupProductClicks(container, products) {
    if (!container || !productModal || !modalContent || !closeModal) {
        return;
    }

    container.addEventListener("click", (event) => {
        let button = event.target.closest("[data-product-id]");

        if (button) {
            let selectedProduct = products.find((product) => product.id === button.dataset.productId);
            displayModal(selectedProduct);
        }
    });
}

function displayProducts(products) {
    let selectedCollection = collectionFilter.value;
    let filteredProducts = products;

    if (selectedCollection !== "All") {
        filteredProducts = products.filter((product) => product.collection === selectedCollection);
    }

    productCount.textContent = `${filteredProducts.length} pieces displayed`;
    productGrid.innerHTML = "";

    filteredProducts.forEach((product) => {
        productGrid.appendChild(createProductCard(product));
    });
}

function createProductCard(product) {
    let card = document.createElement("article");
    let visual = document.createElement("div");
    let info = document.createElement("div");
    let collection = document.createElement("p");
    let name = document.createElement("h3");
    let list = document.createElement("dl");
    let availability = document.createElement("p");
    let button = document.createElement("button");

    card.classList.add("product-card");
    visual.classList.add("product-visual");
    info.classList.add("product-info");
    collection.classList.add("eyebrow");
    availability.classList.add("availability");
    button.classList.add("text-button");

    visual.style.setProperty("--product-accent", product.accent);

    if (product.image) {
        let image = document.createElement("img");
        image.setAttribute("src", product.image);
        image.setAttribute("alt", product.alt);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", product.imageWidth);
        image.setAttribute("height", product.imageHeight);
        visual.classList.add("has-image");
        visual.appendChild(image);
    } else {
        let letter = document.createElement("span");
        letter.textContent = product.category.charAt(0);
        visual.setAttribute("aria-hidden", "true");
        visual.appendChild(letter);
    }

    collection.textContent = product.collection;
    name.textContent = product.name;
    list.append(
        createDescriptionItem("Category", product.category),
        createDescriptionItem("Metal", product.metal),
        createDescriptionItem("Stone", product.stone),
        createDescriptionItem("Price", money.format(product.price))
    );

    availability.textContent = product.availability;
    button.type = "button";
    button.textContent = "View Details";
    button.dataset.productId = product.id;

    info.append(collection, name, list, availability, button);
    card.append(visual, info);

    return card;
}

function createDescriptionItem(label, value) {
    let group = document.createElement("div");
    let term = document.createElement("dt");
    let description = document.createElement("dd");

    term.textContent = label;
    description.textContent = value;

    group.append(term, description);
    return group;
}

function displayModal(product) {
    if (!product) {
        return;
    }

    localStorage.setItem("aureaLastViewed", product.name);
    modalContent.innerHTML = `
        <img class="modal-image" src="${product.image}" alt="${product.alt}" width="${product.imageWidth}" height="${product.imageHeight}">
        <p class="eyebrow">${product.collection}</p>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <dl class="details-list"></dl>
    `;

    let detailsList = modalContent.querySelector(".details-list");
    detailsList.append(
        createDescriptionItem("Category", product.category),
        createDescriptionItem("Metal", product.metal),
        createDescriptionItem("Stone", product.stone),
        createDescriptionItem("Finish", product.finish),
        createDescriptionItem("Availability", product.availability),
        createDescriptionItem("Price", money.format(product.price))
    );

    productModal.showModal();
}
