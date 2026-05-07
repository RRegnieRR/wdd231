const menu = document.querySelector("#menu");
const nav = document.querySelector("#primary-navigation");

menu.addEventListener("click", () => {
    menu.classList.toggle("open");
    nav.classList.toggle("open");

    let opened = menu.classList.contains("open");
    menu.setAttribute("aria-expanded", opened);
    menu.setAttribute("aria-label", opened ? "Close navigation" : "Open navigation");
});
