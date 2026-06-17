// --- script.js ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. Splash Screen: fade out after 1.8s
    const splashScreen = document.querySelector('.splash-screen');
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            splashScreen.style.transition = 'opacity 0.8s ease';
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 800);
        }, 1800);
    }

    // 2. Calibration values data-attr store
    const standardBoxes = document.querySelectorAll('.cal-box .cal-val');
    standardBoxes.forEach(box => {
        box.setAttribute('data-val', box.innerText);
    });

    // 3. Sticky Header on scroll
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Intersection Observer for scroll animations
    const animTargets = document.querySelectorAll('.scroll-anim, .stagger-anim-list');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { root: null, threshold: 0.15 });

    animTargets.forEach(el => observer.observe(el));

    // 5. Smooth scrolling for nav anchor links
    const navLinks = document.querySelectorAll('.nav-links a, .header-logo');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                } else if (href === '#') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }

                // Close mobile menu after click
                navLinksList.classList.remove('nav-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // 6. Mobile hamburger menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksList = document.querySelector('.nav-links');

    if (menuToggle && navLinksList) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinksList.classList.toggle('nav-open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
    }

});
