export function saveProperty(propertyName) {
    let saved = JSON.parse(localStorage.getItem("savedProperties")) || [];
    if (!saved.includes(propertyName)) {
        saved.push(propertyName);
        localStorage.setItem("savedProperties", JSON.stringify(saved));
        alert(`${propertyName} has been saved for later!`);
    } else {
        alert(`${propertyName} is already saved.`);
    }
}

export function saveUserDetails(event) {
    event.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        city: document.getElementById("city").value,
        country: document.getElementById("country").value,
        newsletter: document.getElementById("newsletter").checked,
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Your details have been saved successfully!");

    const form = document.getElementById("contact-form");
    if (form) form.reset();
}
