document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu");
    const navLinks = document.querySelector(".nav-links");

    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });
})

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

function filterCourses(category) {
    const courses = [
        { name: "WDD 130", category: "WDD", credits: 2, completed: true },
        { name: "WDD 131", category: "WDD", credits: 2, completed: true },
        { name: "CSE 110", category: "CSE", credits: 2, completed: true },
        { name: "CSE 111", category: "CSE", credits: 2, completed: true },
        { name: "CSE 210", category: "CSE", credits: 3, completed: true },
        { name: "WDD 231", category: "WDD", credits: 3, completed: false }
    ];
    
    let filteredCourses = category === 'All' ? courses : courses.filter(course => course.category === category);
    let totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById("total-credits").textContent = "Total number of courses listed below: " + totalCredits;
    
    let coursesContainer = document.getElementById("courses-container");
    coursesContainer.innerHTML = "";
    filteredCourses.forEach(course => {
        let courseElement = document.createElement("div");
        let checkmark = course.completed ? "✅" : "";       // Add a checkmark if completed
        courseElement.textContent = `${checkmark}  ${course.name} - ${course.credits} credits`;
        courseElement.style.background = course.completed ? "gold" : "lightgrey";
        courseElement.style.padding = "10px";
        courseElement.style.margin = "5px";
        courseElement.style.borderRadius = "5px";
        coursesContainer.appendChild(courseElement);
    });
}

filterCourses('all');