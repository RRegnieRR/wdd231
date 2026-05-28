import { places } from "../data/places.mjs";

const cards = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");
const lastVisitKey = "discover-last-visit";

function displayPlaces() {
    places.forEach((place) => {
        let card = document.createElement("section");
        let title = document.createElement("h2");
        let figure = document.createElement("figure");
        let image = document.createElement("img");
        let address = document.createElement("address");
        let description = document.createElement("p");
        let button = document.createElement("button");

        card.classList.add("discover-card");
        title.textContent = place.name;

        image.setAttribute("src", `images/${place.image}`);
        image.setAttribute("alt", place.name);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "300");
        image.setAttribute("height", "200");

        figure.appendChild(image);
        address.textContent = place.address;
        description.textContent = place.description;
        button.textContent = "Learn More";
        button.setAttribute("type", "button");
        button.setAttribute("aria-label", `Learn more about ${place.name}`);

        card.append(title, figure, address, description, button);
        cards.appendChild(card);
    });
}

function displayVisitMessage() {
    let lastVisit = localStorage.getItem(lastVisitKey);
    let today = Date.now();
    let message = "";

    if (lastVisit === null) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        let difference = today - Number(lastVisit);
        let days = Math.floor(difference / 86400000);

        if (days < 1) {
            message = "Back so soon! Awesome!";
        } else if (days === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${days} days ago.`;
        }
    }

    visitMessage.textContent = message;
    localStorage.setItem(lastVisitKey, today);
}

displayPlaces();
displayVisitMessage();
