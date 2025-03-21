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

    // ✅ Fetch Weather & Spotlight Members
    fetchWeather();
fetchSpotlightMembers();

async function fetchWeather() {
    const apiKey = "c8022dbf4a5b0af344dec84c1dca11a7"; 
    const city = "Lagos"; 
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather data not found");
        const data = await response.json();

        // ✅ Current Weather
        document.getElementById("temperature").textContent = `Temperature: ${data.list[0].main.temp.toFixed(1)}°C`;
        document.getElementById("weather-description").textContent = `Weather Description: ${data.list[0].weather[0].description}`;
        document.getElementById("humidity").textContent = `Humidity: ${data.list[0].main.humidity}%`;

        // ✅ Forecast for the next 3 days
        const forecastContainer = document.getElementById("forecast");
        forecastContainer.innerHTML = ""; 

        let seenDays = new Set(); 
        let forecastCount = 0;

        data.list.forEach(entry => {
            const date = new Date(entry.dt * 1000);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

            if (!seenDays.has(dayName) && forecastCount < 3) {
                seenDays.add(dayName);
                forecastCount++;

                const forecastItem = document.createElement("p");
                forecastItem.innerHTML = `${dayName}: <strong>${entry.main.temp.toFixed(1)}°F</strong>`;
                forecastContainer.appendChild(forecastItem);
            }
        });

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

    async function fetchSpotlightMembers() {
        try {
            const response = await fetch("https://uchenna77-dev.github.io/wdd231/chamber/data/members.json");
            if (!response.ok) throw new Error("Failed to load members");
            const members = await response.json();
            
            const spotlightMembers = members.filter(member => member.membershipLevel === 1 || member.membershipLevel === 2);
            const randomSpotlights = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
            
            const spotlightsContainer = document.getElementById("spotlights");
            spotlightsContainer.innerHTML = "";
            
            randomSpotlights.forEach(member => {
                let card = document.createElement("div");
                card.classList.add("spotlight-card");
                card.innerHTML = `
                    <div class-"business-name">
                        <h3 class="member-tagline">${member.name}</h3>
                    </div>     
                    <div class="spotlight-content">
                        <img src="${member.image}" alt="${member.name}" class="member-image">
                        <div class="member-info">
                            <p><strong>EMAIL:</strong> info@gmail.com</p>
                            <p><strong>ADDRESS:</strong> ${member.address}</p>
                            <p><strong>PHONE:</strong> ${member.phone}</p>
                            <p><strong>URL:</strong><a href="${member.website}" target="_blank">Visit Website</a></p>
                            <p><strong>MEMBERSHIP LEVEL:</strong> ${member.membershipLevel}</p>
                        </div>
                    </div>
                `;
                spotlightsContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Error fetching spotlight members:", error);
        }
    }  
});
