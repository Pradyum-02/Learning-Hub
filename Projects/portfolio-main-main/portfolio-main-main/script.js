// Global Variables
const loader = document.querySelector('.loader');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const backToTop = document.getElementById('backToTop');
const scrollProgress = document.querySelector('.scroll-progress');
const typedText = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');

// Theme Management
let isDark = localStorage.getItem('theme') !== 'light';

function initTheme() {
    if (localStorage.getItem('theme')) {
        body.setAttribute('data-theme', localStorage.getItem('theme'));
        isDark = localStorage.getItem('theme') === 'dark';
    } else {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
    updateThemeToggle();
}

function toggleTheme() {
    isDark = !isDark;
    const theme = isDark ? 'dark' : 'light';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeToggle();
}

function updateThemeToggle() {
    const toggleText = themeToggle.querySelector('.toggle-text');
    const toggleIcon = themeToggle.querySelector('.toggle-icon');
    
    if (isDark) {
        toggleText.textContent = 'Light Mode';
    } else {
        toggleText.textContent = 'Dark Mode';
    }
}

// Typing Effect
const roles = [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Learner',
    'Problem Solver'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 150;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeRole, typeSpeed);
}

// Navbar & Scroll Functionality
function updateActiveNav() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Scroll Animations
function handleScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        if (bar.getBoundingClientRect().top < window.innerHeight) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
    
    // Counter animation
    const counters = document.querySelectorAll('.number');
    counters.forEach(counter => {
        if (counter.getBoundingClientRect().top < window.innerHeight) {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => requestAnimationFrame(() => handleScrollAnimations()), 20);
            } else {
                counter.innerText = target;
            }
        }
    });
    
    // Back to top button
    if (window.pageYOffset > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    // Scroll progress
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
}

// Particles Animation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    initTheme();
    typeRole();
    createParticles();
    
    // Loading screen
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 2000);
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Window Events
window.addEventListener('scroll', () => {
    handleScrollAnimations();
    updateActiveNav();
});

window.addEventListener('resize', closeMobileMenu);

// Navbar Events
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
    });
});

hamburger.addEventListener('click', toggleMobileMenu);
themeToggle.addEventListener('click', toggleTheme);
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact Form
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});