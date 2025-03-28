document.addEventListener("DOMContentLoaded", () => {
    const heroImages = document.getElementById("heroImages");
    const catalog = document.getElementById("catalog");
    const searchBox = document.getElementById("searchBox");
    const requestBtn = document.getElementById("requestBtn");
    
    const properties = [
        {src: "img1.jpg", name: "Luxury Villa"},
        {src: "img2.jpg", name: "Modern Apartment"},
        {src: "img3.jpg", name: "Cozy Cottage"}
    ];
    
    function displayImages(container, items) {
        container.innerHTML = "";
        items.forEach(item => {
            const img = document.createElement("img");
            img.src = item.src;
            img.alt = item.name;
            img.addEventListener("click", () => sessionStorage.setItem("selectedProperty", item.name));
            container.appendChild(img);
        });
    }
    
    if (heroImages) displayImages(heroImages, properties);
    if (catalog) displayImages(catalog, properties);
    
    if (searchBox) {
        searchBox.addEventListener("input", () => {
            const filtered = properties.filter(p => p.name.toLowerCase().includes(searchBox.value.toLowerCase()));
            displayImages(catalog, filtered);
        });
    }
    
    if (requestBtn) {
        requestBtn.addEventListener("click", () => window.location.href = "request.html");
    }

    document.getElementById("requestForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Request submitted successfully!");
    });
});
