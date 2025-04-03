document.addEventListener("DOMContentLoaded", function () {
    const homePropertiesContainer = document.getElementById("home-properties");
    const catalogPropertiesContainer = document.getElementById("catalog-properties");
    const searchInput = document.getElementById("search-bar");

    const API_URL = "https://api.example.com/properties"; // Replace with actual API

    // Function to fetch properties from API
    async function fetchProperties() {
        try {
            const response = await fetch(API_URL);
            const properties = await response.json();
            return properties;
        } catch (error) {
            console.error("Error fetching properties:", error);
            return [];
        }
    }

    // Function to display properties dynamically
    function displayProperties(properties, container, limit = null) {
        container.innerHTML = ""; // Clear container
        const itemsToShow = limit ? properties.slice(0, limit) : properties;

        itemsToShow.forEach(property => {
            let propertyCard = document.createElement("div");
            propertyCard.classList.add("property-card");
            propertyCard.innerHTML = `
                <img src="${property.image}" alt="${property.name}">
                <h3>${property.name}</h3>
                <p>${property.location}</p>
                <p>Price: ${property.price}</p>
                <button class="save-property" data-id="${property.id}">Save</button>
            `;
            container.appendChild(propertyCard);
        });

        // Attach event listeners to save buttons
        document.querySelectorAll(".save-property").forEach(button => {
            button.addEventListener("click", function () {
                saveProperty(this.dataset.id);
            });
        });
    }

    // Save selected property to localStorage
    function saveProperty(propertyId) {
        let savedProperties = JSON.parse(localStorage.getItem("savedProperties")) || [];
        if (!savedProperties.includes(propertyId)) {
            savedProperties.push(propertyId);
            localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
            alert("Property saved!");
        } else {
            alert("Property already saved.");
        }
    }

    // Search functionality
    function filterProperties(event) {
        const query = event.target.value.toLowerCase();
        fetchProperties().then(properties => {
            const filtered = properties.filter(property =>
                property.name.toLowerCase().includes(query) ||
                property.location.toLowerCase().includes(query)
            );
            displayProperties(filtered, catalogPropertiesContainer);
        });
    }

    // Fetch and display properties on respective pages
    if (homePropertiesContainer) {
        fetchProperties().then(properties => displayProperties(properties, homePropertiesContainer, 3));
    }
    if (catalogPropertiesContainer) {
        fetchProperties().then(properties => displayProperties(properties, catalogPropertiesContainer));
        searchInput.addEventListener("input", filterProperties);
    }

    // Handle form submission and save user data
    const contactForm = document.querySelector("#user-details form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const userData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                address: document.getElementById("address").value,
                phone: document.getElementById("phone").value,
                city: document.getElementById("city").value,
                country: document.getElementById("country").value,
                newsletter: document.getElementById("newsletter").checked
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            alert("Your details have been saved successfully!");
            contactForm.reset();
        });
    }
});


// check later

document.addEventListener("DOMContentLoaded", () => {
    // Fetch properties for catalog and home page
    fetchProperties();

    // Capture form submissions
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", saveUserDetails);
    }
});

// Fetch and display properties dynamically
async function fetchProperties() {
    try {
        const response = await fetch("properties.json");
        if (!response.ok) throw new Error("Failed to fetch property data");

        const properties = await response.json();
        const catalogContainer = document.getElementById("catalog-properties");
        const homeContainer = document.getElementById("home-properties");

        if (homeContainer) displayProperties(properties.slice(0, 3), homeContainer);
        if (catalogContainer) displayProperties(properties, catalogContainer);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Display properties dynamically
function displayProperties(properties, container) {
    container.innerHTML = "";
    properties.forEach(property => {
        let card = document.createElement("div");
        card.classList.add("property-card");
        card.innerHTML = `
            <img src="${property.image}" alt="${property.name}">
            <h3>${property.name}</h3>
            <p>${property.details}</p>
            <button onclick="saveProperty('${property.name}')">Save Property</button>
        `;
        container.appendChild(card);
    });
}

// Save selected property to local storage
function saveProperty(propertyName) {
    let savedProperties = JSON.parse(localStorage.getItem("savedProperties")) || [];
    if (!savedProperties.includes(propertyName)) {
        savedProperties.push(propertyName);
        localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
        alert(`${propertyName} has been saved for later!`);
    } else {
        alert(`${propertyName} is already saved.`);
    }
}

// Save user contact details to local storage
function saveUserDetails(event) {
    event.preventDefault();

    const userDetails = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value
    };

    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    alert("Thank you! Your details have been saved.");
}
