document.getElementById('timestamp').value = new Date().toISOString();
        function openModal(id) { document.getElementById(id).style.display = 'block'; }
        function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// Join Page //
document.addEventListener("DOMContentLoaded", () => {
    // Set timestamp field with the current date and time
    document.getElementById("timestamp").value = new Date().toISOString();

    // Validate organization title field
    const orgTitleField = document.getElementById("organization-title");
    orgTitleField.addEventListener("input", () => {
        const pattern = /^[A-Za-z\-\s]{7,}$/;
        if (!pattern.test(orgTitleField.value)) {
            orgTitleField.setCustomValidity("Title must be at least 7 characters long and contain only letters, hyphens, or spaces.");
        } else {
            orgTitleField.setCustomValidity("");
        }
    });

    // Modal functionality
    const modalTriggers = document.querySelectorAll(".modal-trigger");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    modalTriggers.forEach(trigger => {
        trigger.addEventListener("click", (event) => {
            event.preventDefault();
            const targetModal = document.querySelector(trigger.getAttribute("href"));
            targetModal.style.display = "block";
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".modal").style.display = "none";
        });
    });

    window.addEventListener("click", (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});


// Thankyou Page //
// Function to get URL parameters and display form values
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    document.getElementById("first-name").textContent = params.get("first-name") || "N/A";
    document.getElementById("last-name").textContent = params.get("last-name") || "N/A";
    document.getElementById("email").textContent = params.get("email") || "N/A";
    document.getElementById("phone").textContent = params.get("phone") || "N/A";
    document.getElementById("business").textContent = params.get("organization") || "N/A";
    document.getElementById("timestamp").textContent = params.get("timestamp") || "N/A";
}

window.onload = getQueryParams;        