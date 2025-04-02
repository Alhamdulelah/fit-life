// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.classList.contains('cta-button')) return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.boxShadow = window.scrollY > 50 
            ? '0 4px 10px rgba(0, 0, 0, 0.1)' 
            : 'none';
    }
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('checkoutModal');
    if (!modal) return;

    const modalBtns = document.querySelectorAll('.cta-button, .nav-link.cta-button');
    const closeBtn = modal.querySelector('.close');
    const form = document.getElementById('checkoutForm');

    // Open modal when any CTA button is clicked
    modalBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only prevent default for buttons without proper hrefs
            if (this.getAttribute('href') === '#' || this.classList.contains('nav-link')) {
                e.preventDefault();
                modal.style.display = 'block';
                document.body.style.position = 'fixed';
                document.body.style.top = `-${window.scrollY}px`;
            }
        });
    });

    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your enrollment! We will contact you shortly.');
            closeModal();
            this.reset();
        });
    }

    function closeModal() {
        const scrollY = document.body.style.top;
        modal.style.display = 'none';
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
});

// Tab functionality for program schedule
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and content
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabId)?.classList.add('active');
    });
});

// Simple testimonial slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
if (testimonials.length > 0) {
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-rotate testimonials every 5 seconds
    showTestimonial(0);
    setInterval(nextTestimonial, 5000);
}

// Animate progress bar on scroll
window.addEventListener('scroll', () => {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const scrollPosition = window.scrollY;
        const pageHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / pageHeight) * 100;
        progressFill.style.width = `${scrollPercentage}%`;
    }
});