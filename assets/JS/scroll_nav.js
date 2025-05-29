window.addEventListener("scroll", () => {
    const navbar = document.querySelector("header");
    const body = document.querySelector("body");

    if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
        body.style.marginTop = "90px"; 
    } else {
        navbar.classList.remove("scrolled");
        body.style.marginTop = "-0px"; 
    }
});
