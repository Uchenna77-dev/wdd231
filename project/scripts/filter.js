import { displayProperties } from './display.js';

export async function filterProperties(event) {
    const query = event.target.value.toLowerCase();
    const selectedParam = document.querySelector('input[name="searchParam"]:checked').value;

    try {
        const response = await fetch("data/properties.json");
        const properties = await response.json();
        let filtered = [];

        if (selectedParam === "price") {
            const priceQuery = parseFloat(query.replace(/[^0-9.]/g, ''));
            filtered = properties.filter(property => {
                const price = parseFloat(property.price.replace(/[^0-9.]/g, ''));
                return !isNaN(priceQuery) && price <= priceQuery;
            });
        } else {
            filtered = properties.filter(property =>
                property[selectedParam].toLowerCase().includes(query)
            );
        }

        const container = document.getElementById("catalog-properties");
        if (container) displayProperties(filtered, container);
    } catch (error) {
        console.error("Error filtering properties:", error);
    }
}

export function setupSearchOptions() {
    const container = document.getElementById("search-parameters");
    const options = [
        { value: "name", label: "Name" },
        { value: "location", label: "Location" },
        { value: "price", label: "Price Range" }
    ];

    options.forEach((option, i) => {
        const label = document.createElement("label");
        label.style.marginRight = "1rem";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "searchParam";
        radio.value = option.value;
        if (i === 0) radio.checked = true;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(` ${option.label}`));
        container.appendChild(label);
    });
}
