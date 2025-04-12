// display.js
export function displayProperties(properties, container) {
    container.innerHTML = ""; // Clear the container before appending items

    properties.forEach((property, index) => {
        const card = document.createElement("div");
        card.classList.add("property-card");

        card.innerHTML = `
            <h3>${property.name}</h3>
            <img src="${property.image}" alt="${property.name}" loading="lazy">
            <p>${property.location}</p>
            <p>${property.price}</p>
            <p>${property.type}</p>
            <button type="button" class="view-details" data-index="${index}">View Details</button>
            <button onclick="saveProperty('${property.name}')">Save Property</button>

            <!-- Modal -->
            <div id="modal-${index}" class="modal">
                <div class="modal-content">
                    <span class="close" data-index="${index}">&times;</span>
                    <h3>${property.name}</h3>
                    <p><strong>Location:</strong> ${property.location}</p>
                    <p><strong>Price:</strong> ${property.price}</p>
                    <p><strong>Type:</strong> ${property.type}</p>
                    <p><strong>Description:</strong> ${property.description || "No description available."}</p>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    // Add event listeners to new "View Details" buttons
    container.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.dataset.index;
            openModal(index);
        });
    });

    // Add event listeners to close buttons
    container.querySelectorAll(".close").forEach(span => {
        span.addEventListener("click", () => {
            const index = span.dataset.index;
            closeModal(index);
        });
    });
}

// Modal controls (export if needed)
export function openModal(index) {
    const modal = document.getElementById(`modal-${index}`);
    if (modal) modal.style.display = "block";
}

export function closeModal(index) {
    const modal = document.getElementById(`modal-${index}`);
    if (modal) modal.style.display = "none";
}
