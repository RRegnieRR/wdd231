const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#primary-navigation");
const navLinks = document.querySelectorAll("#primary-navigation a");

export function setupNavigation(pageName) {
    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("open");
            menuButton.classList.toggle("open", isOpen);
            menuButton.setAttribute("aria-expanded", isOpen.toString());
        });
    }

    navLinks.forEach((link) => {
        if (link.dataset.page === pageName) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}

export function setFooterDates() {
    const year = document.querySelector("#year");
    const modified = document.querySelector("#last-modified");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (modified) {
        modified.textContent = `Last modified: ${document.lastModified}`;
    }
}

