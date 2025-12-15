// ===================================
// Personal Website - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initSkillBars();
    initTestimonialSlider();
    initContactForm();
    initScrollReveal();
});

// ===================================
// Navigation
// ===================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => item.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Scroll Effects
// ===================================
function initScrollEffects() {
    // Parallax effect for background images
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const speed = 0.3;
            const rect = section.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrollY * speed);
                section.style.backgroundPositionY = `${yPos}px`;
            }
        });
    });
}

// ===================================
// Skill Bars Animation
// ===================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = `${progress}%`;
                bar.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Initial check
}

// ===================================
// Testimonial Slider
// ===================================
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentIndex = 0;
    let autoSlideInterval;

    const showTestimonial = (index) => {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    };

    // Click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetAutoSlide();
        });
    });

    // Auto slide
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }, 5000);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    startAutoSlide();
}

// ===================================
// Contact Form
// ===================================
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = '';
            }
        });

        if (isValid) {
            // Simulate form submission
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Message Sent!';
                button.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
                form.reset();
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 2000);
            }, 1500);
        }
    });

    // Remove error styling on input
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
}

// ===================================
// Scroll Reveal Animation
// ===================================
function initScrollReveal() {
    // Add scroll-reveal class to elements
    const revealElements = [
        '.about-content',
        '.about-stats',
        '.skill-item',
        '.timeline-item',
        '.portfolio-item',
        '.contact-info',
        '.contact-form'
    ];

    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('scroll-reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    const revealOnScroll = () => {
        document.querySelectorAll('.scroll-reveal').forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                element.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// ===================================
// Utility: Throttle function
// ===================================
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// Portfolio Item Hover Effect
// ===================================
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.portfolio-overlay').style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('.portfolio-overlay').style.opacity = '0';
    });
});

// ===================================
// Smooth scroll for scroll indicator
// ===================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            window.scrollTo({
                top: aboutSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
    scrollIndicator.style.cursor = 'pointer';
}

