const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");
const members = document.querySelector("#members");
const spotlights = document.querySelector("#spotlights");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const membersUrl = "data/members.json";
const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecast = document.querySelector("#forecast");
const weatherIcon = document.querySelector("#weather-icon");
const timestamp = document.querySelector("#timestamp");
const applicationResults = document.querySelector("#application-results");
const myKey = "99eef65b0994f68f9446e9fd8ae5ec1e";
const myLat = "20.6597";
const myLon = "-103.3496";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`;

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
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error("Member data could not be loaded.");
        }

        const data = await response.json();
        if (members) {
            displayMembers(data.members);
        }
        if (spotlights) {
            displaySpotlights(data.members);
        }
    } catch (error) {
        if (members) {
            members.innerHTML = "<p>Member information is not available right now.</p>";
        }
        if (spotlights) {
            spotlights.innerHTML = "<p>Spotlight information is not available right now.</p>";
        }
    }
}

function displayMembers(memberList) {
    members.innerHTML = "";

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
    spotlights.innerHTML = "";

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
        website.textContent = `URL: ${member.website}`;
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        website.setAttribute("rel", "noopener");
        phone.textContent = `PHONE: ${member.phone}`;
        address.textContent = `ADDRESS: ${member.address}`;
        level.textContent = `${getMembershipName(member.membership)} Member`;

        card.append(name, level, logo, address, phone, website);
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

if (currentTemp) {
    getWeather();
}

if (timestamp) {
    timestamp.value = new Date().toISOString();
}

document.querySelectorAll("[data-modal]").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        let modal = document.querySelector(`#${link.dataset.modal}`);
        modal.showModal();
    });
});

document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});

if (applicationResults) {
    displayApplication();
}

async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error("Current weather could not be loaded.");
        }

        const data = await response.json();
        currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`;
        weatherDesc.textContent = toTitleCase(data.weather[0].description);
        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", data.weather[0].description);
    } catch (error) {
        currentTemp.textContent = "Unavailable";
        weatherDesc.textContent = "Weather data could not be loaded.";
        weatherIcon.setAttribute("alt", "Weather unavailable");
    }

    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error("Forecast could not be loaded.");
        }

        const data = await response.json();
        displayForecast(data.list);
    } catch (error) {
        forecast.innerHTML = "<p>Forecast data could not be loaded.</p>";
    }
}

function displayForecast(weatherList) {
    let daysShown = 0;
    forecast.innerHTML = "";

    weatherList.forEach((item) => {
        if (item.dt_txt.includes("12:00:00") && daysShown < 3) {
            let p = document.createElement("p");
            let date = new Date(item.dt_txt);
            let day = getForecastDayLabel(date, daysShown);

            p.innerHTML = `${day}: <strong>${item.main.temp.toFixed(0)}&deg;C</strong>`;
            forecast.appendChild(p);
            daysShown++;
        }
    });
}

function getForecastDayLabel(date, index) {
    if (index === 0) {
        return "Today";
    }
    if (index === 1) {
        return "Tomorrow";
    }
    return date.toLocaleDateString("en-US", { weekday: "long" });
}

function toTitleCase(value) {
    return value.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

function displayApplication() {
    const formInfo = new URLSearchParams(window.location.search);
    const submittedDate = new Date(formInfo.get("timestamp"));

    applicationResults.innerHTML = `
        <p><strong>Name:</strong> ${formInfo.get("first")} ${formInfo.get("last")}</p>
        <p><strong>Email:</strong> ${formInfo.get("email")}</p>
        <p><strong>Mobile Phone:</strong> ${formInfo.get("phone")}</p>
        <p><strong>Business:</strong> ${formInfo.get("business")}</p>
        <p><strong>Submitted:</strong> ${submittedDate.toLocaleString()}</p>
    `;
}
