// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
    this.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.mobile-menu-btn').classList.remove('active');
    });
});

// Scroll-based menu highlighting
const sections = document.querySelectorAll('.fullscreen-section');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightMenu() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll animation for sections
function checkScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        
        if (sectionTop < window.innerHeight * 0.75 && sectionBottom > 0) {
            const content = section.querySelector('.section-content');
            if (content) content.classList.add('active');
        }
    });
}
// Arrow hint to scroll to the spotlight section
document.querySelector('.arrow-hint')?.addEventListener('click', function() {
  document.querySelector('#spotlight').scrollIntoView({
    behavior: 'smooth'
  });
});

// Newsletter form submission
// Newsletter form submission
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (!email) return;
    
    alert(`Thank you for subscribing with ${email}! We'll keep you updated.`);
    emailInput.value = '';
    
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Form submission failed');
    })
    .catch(error => console.error('Error:', error));
});


// Add this to your existing JavaScript
document.querySelector('.subscribe-text')?.addEventListener('click', function() {
    document.querySelector('.newsletter-form')?.submit();
});  

// Initialize
window.addEventListener('scroll', () => {
    highlightMenu();
    checkScroll();
});

// Initial checks
highlightMenu();
checkScroll();


// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
    this.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.mobile-menu-btn').classList.remove('active');
    });
});

// Initialize section content animation
function initSectionAnimation() {
    const section = document.querySelector('#spotlight');
    const content = section.querySelector('.section-content');
    
    // Immediately show content (remove the fade-in animation)
    content.classList.add('active');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize
window.addEventListener('DOMContentLoaded', initSectionAnimation);

// Remove scroll-based highlighting since we only have one section
// Keep this if you plan to add more sections later
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollPosition = window.scrollY;
    
    // Highlight spotlight link when scrolled to top
    if (scrollPosition < 100) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#spotlight') {
                link.classList.add('active');
            }
        });
    }
});
