// Mobile Menu Toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Hero Slider
function setupHeroSlider() {
    const slides = document.querySelectorAll('.hero .slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Mission Slider
function setupMissionSlider() {
    const slides = document.querySelectorAll('.mission-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Gallery Slider
function setupGallerySlider() {
    const track = document.querySelector('.gallery-track');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    let currentIndex = 0;

    function updateSlider() {
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        const maxIndex = slides.length - Math.floor(track.offsetWidth / slides[0].offsetWidth);
        currentIndex = Math.min(currentIndex + 1, maxIndex);
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);
}

// Initialize all functionality when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupHeroSlider();
    setupMissionSlider();
    setupGallerySlider();

});


// Responsive menue BAr
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        }
    });

    // Resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        }
    });
    
    /// Define sections
    const sections = [
        {
            title: "Our Mission",
            content: "Every Person Deserves Access To Life Improving And Lifesaving Information, Medical Care, And Economic Opportunities To Support Their Families. We Are Dedicated To Providing Medical Care And Resources To The Economically Disadvantaged. Our Mission Is To Deploy Effective And Coordinated Efforts To Ensure People Gain Access To Qualitative Medical Care, And Economic Resources.",
            image: "img/missions.png"
        },
        {
            title: "Our Vision",
            content: "We invite doctors, both medical and academic, and other professionals to serve outside of the office. We make it easy for you to donate your time or equipment, and provide free and qualitative healthcare and support where it’s needed the most.",
            image: "img/visions.png"
        },
        {
            title: "Volunteer",
            content: "Volunteer and be a part of an organization boldly increasing access to healthcare and economic resources in vulnerable communities. Your help is needed to deliver care, education, and training in the U.S. and Africa.",
            image: "img/volunteers.png"
        },
        {
            title: "Donate",
            content: "Pick from our list of projects to help fund. Every dollar counts. You can also donate medical equipment targeted at poorly-served communities in West Africa and participate in our annual charity ball in New York.",
            image: "img/donates.png"
        }
    ];

    let currentIndex = 0;
    let autoSlideInterval;

    // Get elements
    const titleElement = document.getElementById("title");
    const contentElement = document.getElementById("content");
    const iconElement = document.getElementById("icon-image");
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");
    const indicators = document.querySelectorAll('.mission-indicators .indicator');

    // Function to update content and image with smooth transition
    function updateContent(index) {
        // Add fade-out effect
        titleElement.classList.add('fade-out');
        contentElement.classList.add('fade-out');
        iconElement.classList.add('fade-out');

        setTimeout(() => {
            // Change content and image
            titleElement.textContent = sections[index].title;
            contentElement.textContent = sections[index].content;
            iconElement.src = sections[index].image;

            // Remove fade-out and add fade-in effect
            titleElement.classList.remove('fade-out');
            contentElement.classList.remove('fade-out');
            iconElement.classList.remove('fade-out');

            titleElement.classList.add('fade-in');
            contentElement.classList.add('fade-in');
            iconElement.classList.add('fade-in');

            // Remove fade-in after animation completes
            setTimeout(() => {
                titleElement.classList.remove('fade-in');
                contentElement.classList.remove('fade-in');
                iconElement.classList.remove('fade-in');
            }, 400);
        }, 400);

        updateIndicators(index); // Update indicators
    }

    // Function to update the active indicator with animation
    function updateIndicators(index) {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    // Function to handle auto-sliding every 4 seconds
    function autoSlide() {
        clearInterval(autoSlideInterval); // Clear existing interval to avoid multiple triggers
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % sections.length; // Loop forward
            updateContent(currentIndex);
        }, 4000); // Change content every 4 seconds
    }

    // Event Listeners for buttons (pause auto-slide when clicked)
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % sections.length; // Loop forward
        updateContent(currentIndex);
        autoSlide(); // Restart auto-slide timer
    });

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + sections.length) % sections.length; // Loop backward
        updateContent(currentIndex);
        autoSlide(); // Restart auto-slide timer
    });

    // Event listeners for indicators (click to navigate & restart auto-slide)
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateContent(currentIndex);
            autoSlide(); // Restart auto-slide timer
        });
    });

    // Initialize first content and start auto-slide
    updateContent(currentIndex);
    autoSlide();




    // Function to update the active indicator
    function updateIndicators(index) {
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateIndicators(currentSlide);
        });
    });

    // Previous button click
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + indicators.length) % indicators.length;
        updateIndicators(currentSlide);
    });

    // Next button click
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % indicators.length;
        updateIndicators(currentSlide);
    });
