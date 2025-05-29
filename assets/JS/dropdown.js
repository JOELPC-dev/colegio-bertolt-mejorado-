const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function(event) {
    navLinks.classList.toggle("active");
    event.stopPropagation();
});

document.addEventListener("click", function(event) {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove("active");
    }
});
window.addEventListener("scroll", function() {
    navLinks.classList.remove("active"); 
});