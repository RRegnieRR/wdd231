const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");
const members = document.querySelector("#members");
const spotlights = document.querySelector("#spotlights");
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
    if (spotlights) {
        displaySpotlights(data.members);
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

        logo.setAttribute("src", `images/${member.image}`);
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
        level.textContent = `Membership Level: ${getMembershipName(member.membership)}`;
        description.textContent = member.description;

        card.append(logo, name, address, phone, website, level, description);
        members.appendChild(card);
    });
}

function displaySpotlights(memberList) {
    let qualifiedMembers = [];

    memberList.forEach((member) => {
        if (member.membership === 2 || member.membership === 3) {
            qualifiedMembers.push(member);
        }
    });

    qualifiedMembers.sort(() => Math.random() - 0.5);
    let spotlightMembers = qualifiedMembers.slice(0, 3);

    spotlightMembers.forEach((member) => {
        let card = document.createElement("section");
        let logo = document.createElement("img");
        let name = document.createElement("h3");
        let phone = document.createElement("p");
        let address = document.createElement("p");
        let website = document.createElement("a");
        let level = document.createElement("p");

        logo.setAttribute("src", `images/${member.image}`);
        logo.setAttribute("alt", `${member.name} logo`);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute("width", "160");
        logo.setAttribute("height", "100");

        name.textContent = member.name;
        phone.textContent = member.phone;
        address.textContent = member.address;
        website.textContent = member.website;
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        website.setAttribute("rel", "noopener");
        level.textContent = `${getMembershipName(member.membership)} Member`;

        card.append(logo, name, phone, address, website, level);
        spotlights.appendChild(card);
    });
}

function getMembershipName(level) {
    if (level === 3) {
        return "Gold";
    } else if (level === 2) {
        return "Silver";
    } else {
        return "Member";
    }
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
