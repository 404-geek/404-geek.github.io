// ============================================
// Mobile Navigation Toggle
// ============================================
document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // Scroll Animation Observer
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible for performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Projects Data & Rendering
    // ============================================
    const projects = [
        { 
            name: "KYC System @ Natixis", 
            link: "https://github.com/404-geek/kyc-system",
            description: "Enterprise-grade KYC (Know Your Customer) system built with modern backend technologies."
        },
        { 
            name: "GSoC '24 Contribution", 
            link: "https://github.com/404-geek/gsoc-project",
            description: "Open source contributions as part of Google Summer of Code 2024 program."
        },
        { 
            name: "FinTech API Service", 
            link: "https://github.com/404-geek/fintech-api",
            description: "Scalable financial technology API service with microservices architecture."
        }
    ];

    const projectContainer = document.querySelector(".project-list");

    if (projectContainer) {
        projects.forEach((project, index) => {
            const projectElement = document.createElement("div");
            projectElement.classList.add("project", "fade-in");
            projectElement.style.animationDelay = `${index * 0.1}s`;
            projectElement.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                </a>
            `;
            projectContainer.appendChild(projectElement);
            
            // Observe the new project element for scroll animations
            observer.observe(projectElement);
        });
    }

    // ============================================
    // Parallax Effect for Hero Section
    // ============================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            // Only apply parallax when hero is still visible
            if (scrolled < heroHeight) {
                const rate = scrolled * 0.3;
                hero.style.transform = `translateY(${rate}px)`;
            } else {
                hero.style.transform = `translateY(0px)`;
            }
        });
    }

    // ============================================
    // Active Navigation Link Highlighting
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Call once on load

    // ============================================
    // Typing Animation for Hero Title (Optional Enhancement)
    // ============================================
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle && window.innerWidth > 768) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Small delay before starting
        setTimeout(typeWriter, 500);
    }

    // ============================================
    // Performance Optimization: Throttle Scroll Events
    // ============================================
    let ticking = false;

    function optimizedScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // All scroll-dependent functions here
                highlightNavigation();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Replace direct scroll listeners with throttled version for better performance
    // (Keeping individual listeners for now but could be optimized further)
});

// ============================================
// Utility: Debounce Function
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Console Easter Egg
// ============================================
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cThanks for checking out the code!', 'font-size: 14px; color: #6b7280;');
console.log('%cFeel free to reach out if you have any questions.', 'font-size: 12px; color: #9ca3af;');
