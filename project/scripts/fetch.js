import { displayProperties } from './display.js';

export async function fetchProperties() {
    try {
        const response = await fetch("data/properties.json");
        if (!response.ok) throw new Error("Failed to fetch property data");

        const properties = await response.json();
        const homeContainer = document.getElementById("home-properties");
        const catalogContainer = document.getElementById("catalog-properties");

        if (homeContainer) displayProperties(properties.slice(0, 3), homeContainer);
        if (catalogContainer) displayProperties(properties, catalogContainer);
    } catch (error) {
        console.error("Error fetching properties:", error);
    }
}
