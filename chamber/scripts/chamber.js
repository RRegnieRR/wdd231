const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");
const members = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const membersUrl = "data/members.json";

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

if (menuButton) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        menuButton.classList.toggle("open");
        let isOpen = menuButton.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen);
    });
}

async function getMembers() {
    const response = await fetch(membersUrl);
    const data = await response.json();
    if (members) {
        displayMembers(data.members);
    }
}

function displayMembers(memberList) {
    memberList.forEach((member) => {
        let card = document.createElement("section");
        let logo = document.createElement("img");
        let name = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        let level = document.createElement("p");
        let description = document.createElement("p");

        logo.setAttribute("src", member.image ? `images/${member.image}` : "");
        logo.setAttribute("alt", `${member.name} logo`);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute("width", "160");
        logo.setAttribute("height", "100");

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        website.textContent = "Visit Website";
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        website.setAttribute("rel", "noopener");
        level.textContent = `Membership Level: ${member.membership}`;
        description.textContent = member.description;

        card.append(logo, name, address, phone, website, level, description);
        members.appendChild(card);
    });
}

if (gridButton && listButton) {
    gridButton.addEventListener("click", () => {
        members.classList.add("grid-view");
        members.classList.remove("list-view");
        gridButton.classList.add("active");
        listButton.classList.remove("active");
        gridButton.setAttribute("aria-pressed", "true");
        listButton.setAttribute("aria-pressed", "false");
    });

    listButton.addEventListener("click", () => {
        members.classList.add("list-view");
        members.classList.remove("grid-view");
        listButton.classList.add("active");
        gridButton.classList.remove("active");
        listButton.setAttribute("aria-pressed", "true");
        gridButton.setAttribute("aria-pressed", "false");
    });
}

getMembers();
