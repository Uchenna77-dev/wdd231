document.addEventListener("DOMContentLoaded", () => {
    // Footer Year and Last Modified
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    const menuButton = document.getElementById("menu");
    const navLinks = document.querySelector(".nav-links");

    // ✅ Toggle Mobile Menu
    menuButton.addEventListener("click", function() {
        navLinks.classList.toggle("links");
    });
    });

    document.addEventListener("DOMContentLoaded", () => {
        const itemsContainer = document.getElementById("items-container");
        const visitMessage = document.getElementById("visitor-message");
    
        // Fetch data from JSON file
        async function fetchItems() {
            try {
                const response = await fetch("data/funPlaces.json");
                if (!response.ok) throw new Error("Failed to fetch items.json");
                const items = await response.json();
                displayItems(items);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        }
    
        // Function to display items
        function displayItems(items) {
            itemsContainer.innerHTML = ""; // Clear existing content
            items.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <h2>${item.name}</h2>
                    <figure>
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                    </figure>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <button onclick="learnMore('${item.link}')">Learn More</button>
                `;
                itemsContainer.appendChild(card);
            });
        }
    
        // Function to handle "Learn More" button click
        window.learnMore = function(url) {
            window.open(url, "_blank");
        };
    
        // Visitor tracking logic
        function trackVisitor() {
            const lastVisit = localStorage.getItem("lastVisit");
            const currentDate = Date.now();
            let message = "Welcome! Let us know if you have any questions.";
    
            if (lastVisit) {
                const daysDifference = Math.floor((currentDate - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
                if (daysDifference === 0) {
                    message = "Back so soon! Awesome!";
                } else if (daysDifference === 1) {
                    message = `You last visited 1 day ago.`;
                } else {
                    message = `You last visited ${daysDifference} days ago.`;
                }
            }
    
            visitMessage.textContent = message;
            localStorage.setItem("lastVisit", currentDate);
        }
    
        // Initialize functions
        fetchItems();
        trackVisitor();
});


