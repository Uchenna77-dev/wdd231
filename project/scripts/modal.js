export function openModal(index) {
    document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
    const modal = document.getElementById(`modal-${index}`);
    if (modal) modal.style.display = "block";
}

export function closeModal(index) {
    const modal = document.getElementById(`modal-${index}`);
    if (modal) modal.style.display = "none";
}

// Optional global close on outside click
window.addEventListener("click", event => {
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
    }
});
