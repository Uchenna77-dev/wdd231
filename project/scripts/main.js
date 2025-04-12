import { fetchProperties } from './fetch.js';
import { saveUserDetails } from './storage.js';
import { filterProperties, setupSearchOptions } from './filter.js';

document.addEventListener("DOMContentLoaded", () => {
    fetchProperties();

        const navLinks = document.querySelectorAll("nav a");
        const currentPage = window.location.pathname.split("/").pop();
      
        navLinks.forEach(link => {
          const linkHref = link.getAttribute("href");
          if (linkHref === currentPage || (currentPage === "" && linkHref === "index.html")) {
            link.classList.add("active");
          }
      });
      

    const contactForm = document.getElementById("contact-form");
    const searchInput = document.getElementById("search-bar");

    if (contactForm) {
        contactForm.addEventListener("submit", saveUserDetails);
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterProperties);
    }

    setupSearchOptions();
});
