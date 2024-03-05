document.addEventListener('DOMContentLoaded', function() {

    /* Hamburger Menu */

    let everyLinkEventCreated = false;
    document.querySelector('.hamburger').addEventListener('click', ()=>{
        document.querySelector('.menu').classList.toggle('active')
        document.querySelector('body').classList.toggle('no-scroll')

        if(!everyLinkEventCreated){

            document.querySelectorAll('.menu a').forEach(link=>{
                link.addEventListener('click', ()=>{
                    document.querySelector('.menu').classList.remove('active')
                    document.querySelector('body').classList.remove('no-scroll')
                })
            })

            everyLinkEventCreated = true;
        }

    })

    /* Mouse Background Gradient */

    if(document.querySelector('.controllable-gradient') && document.querySelector('.controllable-gradient').style.display != 'none'){

        const circle = document.querySelector('.controllable-gradient');

        document.addEventListener('mousemove', function (event) {
            // Get the mouse coordinates
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // Set the circle's position
            circle.style.left = `${mouseX - circle.offsetWidth / 2}px`;
            circle.style.top = `${mouseY - circle.offsetHeight / 2}px`;

            // Ensure the circle stays within the window boundaries
            const maxX = window.innerWidth - circle.offsetWidth;
            const maxY = window.innerHeight - circle.offsetHeight;

            if (parseInt(circle.style.left) < 0) {
                circle.style.left = '0px';
            } else if (parseInt(circle.style.left) > maxX) {
                circle.style.left = `${maxX}px`;
            }

            if (parseInt(circle.style.top) < 0) {
                circle.style.top = '0px';
            } else if (parseInt(circle.style.top) > maxY) {
                circle.style.top = `${maxY}px`;
            }
        });
    }

    /* Scroll to Top */

    if(document.querySelector(".scroll-to-top")){
        
        let scrollToTopBtn = document.querySelector(".scroll-to-top");
        let rootElement = document.documentElement;

        function handleScroll() {
            let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
            if (rootElement.scrollTop / scrollTotal > 0.1) {
            scrollToTopBtn.classList.add("show");
            } else {
            scrollToTopBtn.classList.remove("show");
            }
        }

        function scrollToTop() {
            rootElement.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

        scrollToTopBtn.addEventListener("click", scrollToTop);
        document.addEventListener("scroll", handleScroll);

        document.addEventListener("keypress", function onEvent(event) {
            if (event.key === "e") {
                if(document.querySelector('.switch-text')){
                    document.querySelector('.switch-text').innerText = "माथि स्क्रोल गर्नुहोस्"
                }
            }
        });
    }

    document.getElementById("year").innerHTML = new Date().getFullYear();

});