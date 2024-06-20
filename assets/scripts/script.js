document.addEventListener('DOMContentLoaded', function() {

    let mDScreen = 768;
    let isDesktop = window.innerWidth > mDScreen;

    /* Toast */
    function showToast(message) {

        let toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = message;

        document.body.appendChild(toast);

        setTimeout(function(){
            toast.remove();
        }, 2700)

    }

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
    if(document.querySelector('.controllable-gradient') && isDesktop){

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

    /* Skills Section */
    if(document.querySelector('.skills .description-holder')){
        
        let skills = document.querySelectorAll('.skills .content-item')

        skills.forEach(skill=>{
            
            if(skill.querySelector('.description-holder')){

                let decriptionHolder = skill.querySelector('.description-holder')

                if(isDesktop){
                    
                    skill.addEventListener('mousemove', (event) => {
                        decriptionHolder.style.visibility = 'visible';
                    
                        const mouseX = event.clientX;
                        const mouseY = event.clientY;
                    
                        const decriptionHolderWidth = decriptionHolder.offsetWidth;
                        const decriptionHolderHeight = decriptionHolder.offsetHeight;
                    
                        let leftPosition = mouseX;
                        let topPosition = mouseY;
                    
                        // Check if there is enough space on the right
                        if (mouseX + decriptionHolderWidth > window.innerWidth) {
                            // If not, render from the left
                            leftPosition = mouseX - decriptionHolderWidth;
                        }
                    
                        // Check if there is enough space at the bottom
                        if (mouseY + decriptionHolderHeight > window.innerHeight) {
                            // If not, adjust the top position
                            topPosition = window.innerHeight - decriptionHolderHeight;
                        }
                    
                        decriptionHolder.style.top = topPosition + "px";
                        decriptionHolder.style.left = leftPosition + "px";
                    });

                    skill.addEventListener('mouseleave', ()=>{
                        decriptionHolder.style.visibility = 'hidden';
                    })

                } else {

                    skill.addEventListener('click', ()=>{

                        showToast(decriptionHolder.innerHTML)

                    })
        
                }
            }
        })
    }


    // If the project has multiple images


    if(document.querySelector('.with-multiple-image')){
        let multipleImageProjects = document.querySelectorAll('.with-multiple-image');

        multipleImageProjects.forEach(project=>{

            let switchImageHolder = project.querySelector('.switch-image.glow-line')

            let images = project.querySelectorAll('.image-holder');
            let currentImage = 0;

            images.forEach((image, index)=>{
                if(index === currentImage){
                    image.classList.add('active')
                } else {
                    image.classList.remove('active')
                }
            })

            function updateIndicator(){
                project.querySelector('.indicator').innerText = `${currentImage + 1} / ${images.length}`
            }
            updateIndicator();


            function updateImage(direction){

                images[currentImage].classList.remove('active')
                
                if(direction === "left"){
                    currentImage = (currentImage - 1 + images.length) % images.length;
                } else {
                    currentImage = (currentImage + 1) % images.length;
                }
                

                images[currentImage].classList.add('active')

                updateIndicator()
            }

            project.querySelector('.next-image').addEventListener('click', ()=>{
                updateImage("right")
            })

            project.querySelector('.prev-image').addEventListener('click', ()=>{
                updateImage("left")
            })

            // switchImageHolder.addEventListener('animationend', ()=>{
            //     updateImage("right")
            // })

            switchImageHolder.addEventListener('animationend', ()=>{
                console.log("Animation Ended")
            })

            setInterval(()=>{
                updateImage("right")
                switchImageHolder.classList.add('active');
            }, 5000)

        })
    }

    // Show More Projects button


    function InitiateShowMoreProjects(){

        const showMoreBtn = document.querySelector(".see-more-projects-btn");
        const hiddenContent = document.querySelector(".more-projects");

        showMoreBtn.addEventListener("click", () => {
            if (hiddenContent.classList.contains("hidden")) {

                hiddenContent.classList.replace("hidden", "show");
                
                const height = hiddenContent.scrollHeight + "px";
                hiddenContent.style.maxHeight = height;

                hiddenContent.addEventListener('transitionend', () => {
                    showMoreBtn.querySelector('.show-less').style.display = "block";
                    showMoreBtn.querySelector('.show-more').style.display = "none";
                }, { once: true });

            } else {
                hiddenContent.style.maxHeight = 0;

                hiddenContent.addEventListener('transitionend', () => {
                    hiddenContent.classList.replace("show", "hidden");

                    showMoreBtn.querySelector('.show-less').style.display = "none";
                    showMoreBtn.querySelector('.show-more').style.display = "block";

                }, { once: true });
                
            }
        });

    }

    InitiateShowMoreProjects()

    // Text Animation

    function StartAnimatingText(){
        const grabTextElements = document.querySelectorAll('.animated-text');
        
        grabTextElements.forEach(textElement=>{
            const text = textElement.textContent.trim().replace('-', '‑').replace(/&#8232;/g, ' ');
            const textArray = text.split(' ');
            
            // Clear original text
            textElement.textContent = '';

            textArray.forEach((word, index) => {
                const spanWord = document.createElement('span');
                spanWord.className = 'word';
                
                const spanInnerWord = document.createElement('span');
                spanInnerWord.className = 'inner-word';
                spanInnerWord.textContent = index === textArray.length - 1 ? word : word + ' ';
                
                spanWord.appendChild(spanInnerWord);
                textElement.appendChild(spanWord);
            });

            const innerWords = document.querySelectorAll('.inner-word');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                if (entry.isIntersecting) {
                    innerWords.forEach((word, index) => {
                    setTimeout(() => {
                        word.classList.add('animate');
                    }, index * 75); // 75ms stagger
                    });
                    observer.disconnect(); // Stop observing once animation starts
                }
                });
            }, {
                threshold: 0.1 // Adjust this value based on when you want the animation to trigger
            });

            observer.observe(textElement);
        })
    }

    StartAnimatingText()


    //Footer

    document.getElementById("year").innerHTML = new Date().getFullYear();

});