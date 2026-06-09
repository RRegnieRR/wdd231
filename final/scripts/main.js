import { setupNavigation, setFooterDates } from "./navigation.js";
import { renderFeaturedProducts, setupCatalog } from "./catalog.js";
import { setupContactForm, renderSubmissionSummary } from "./contact.js";

const pageName = document.body.dataset.page;

setupNavigation(pageName);
setFooterDates();
renderFeaturedProducts();
setupCatalog();
setupContactForm();
renderSubmissionSummary();

const visitNote = document.querySelector("#visit-note");

if (visitNote) {
    const visits = Number(localStorage.getItem("aureaVisits") || "0") + 1;
    const lastViewed = localStorage.getItem("aureaLastViewed");

    localStorage.setItem("aureaVisits", visits.toString());
    visitNote.textContent = lastViewed
        ? `Welcome back. Your last viewed piece was ${lastViewed}.`
        : `Welcome to Áurea Joyería. Visit ${visits} has been saved on this device.`;
}

