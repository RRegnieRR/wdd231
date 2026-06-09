const contactForm = document.querySelector("#contact-form");
const submissionSummary = document.querySelector("#submission-summary");

export function setupContactForm() {
    if (!contactForm) {
        return;
    }

    let interest = contactForm.querySelector("#interest");
    let savedInterest = localStorage.getItem("aureaContactInterest");

    if (savedInterest) {
        interest.value = savedInterest;
    }

    contactForm.addEventListener("change", () => {
        localStorage.setItem("aureaContactInterest", interest.value);
    });
}

export function renderSubmissionSummary() {
    if (!submissionSummary) {
        return;
    }

    const myInfo = new URLSearchParams(window.location.search);
    let entries = [
        ["Name", myInfo.get("name")],
        ["Email", myInfo.get("email")],
        ["Interest", myInfo.get("interest")],
        ["Budget", myInfo.get("budget")],
        ["Preferred Contact", myInfo.get("preferred-contact")],
        ["Message", myInfo.get("message")]
    ];

    submissionSummary.innerHTML = "";

    entries.forEach((entry) => {
        if (entry[1]) {
            let group = document.createElement("div");
            let term = document.createElement("dt");
            let description = document.createElement("dd");

            term.textContent = entry[0];
            description.textContent = entry[1];

            group.append(term, description);
            submissionSummary.appendChild(group);
        }
    });

    if (!submissionSummary.innerHTML) {
        submissionSummary.innerHTML = "<div><dt>Status</dt><dd>No form information was submitted.</dd></div>";
    }
}
