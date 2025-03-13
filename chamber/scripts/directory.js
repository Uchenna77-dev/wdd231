document.addEventListener("DOMContentLoaded", () => {
    // Footer Year and Last Modified
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    const membersContainer = document.getElementById("membersContainer");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");
    const menuButton = document.getElementById("menu");
    const navLinks = document.querySelector(".nav-links");

    // ✅ Function to Fetch Members
    async function fetchMembers() {
        try {
            const response = await fetch("/chamber/data/members.json"); 
            if (!response.ok) {
                throw new Error("Failed to fetch members.json");
            }
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    // ✅ Function to Display Members (Fixed)
    function displayMembers(members) {
        membersContainer.innerHTML = ""; 
        members.forEach(member => {
            let card = document.createElement("div");
            card.classList.add("member-card");
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}" loading = lazy>
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${member.membershipLevel}</p>
            `;
            membersContainer.appendChild(card);
        });
    }

    // ✅ Toggle Menu View
    menuButton.addEventListener("click", function() {
        navLinks.classList.toggle("links");
    });

    // ✅ Toggle Between Grid and List View
    gridViewBtn.addEventListener("click", () => {
        membersContainer.classList.add("grid");
        membersContainer.classList.remove("list");
    });

    listViewBtn.addEventListener("click", () => {
        membersContainer.classList.add("list");
        membersContainer.classList.remove("grid");
    });

    // ✅ Fetch and Display Members
    fetchMembers();
});
