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



// Newsletter form submission
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNewsletterForms();
});

// Also initialize when new content loads (for SPA/AJAX)
if (typeof Turbo !== 'undefined') {
    document.addEventListener('turbo:load', initializeNewsletterForms);
}

function initializeNewsletterForms() {
    // Initialize all existing newsletter forms
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            await handleFormSubmission(this);
        });
    });

    // Initialize all subscribe text clicks
    document.querySelectorAll('.subscribe-text').forEach(span => {
        span.addEventListener('click', async function(e) {
            e.preventDefault();
            const form = this.closest('.newsletter-form');
            if (form) await handleFormSubmission(form);
        });
    });
}

async function handleFormSubmission(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const subscribeText = form.querySelector('.subscribe-text');
    const email = emailInput.value.trim();
    
    if (!email) return;
    
    // Visual feedback
    const originalText = subscribeText.textContent;
    const originalColor = getComputedStyle(subscribeText).color;
    subscribeText.textContent = 'Sending...';
    subscribeText.style.opacity = '0.7';
    subscribeText.style.pointerEvents = 'none';
    
    try {
        const formData = new FormData(form);
        formData.append('_gotcha', '');
        
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) throw new Error('Submission failed');
        
        // Success feedback
        subscribeText.innerHTML = '✓ Subscribed!';
        subscribeText.style.color = '#3aff9e';
        emailInput.value = '';
        
        // Reset after 2 seconds
        setTimeout(() => {
            subscribeText.textContent = originalText;
            subscribeText.style.color = originalColor;
            subscribeText.style.opacity = '1';
            subscribeText.style.pointerEvents = '';
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        subscribeText.textContent = 'Try Again';
        subscribeText.style.color = '#ff6b6b';
        
        setTimeout(() => {
            subscribeText.textContent = originalText;
            subscribeText.style.color = originalColor;
            subscribeText.style.opacity = '1';
            subscribeText.style.pointerEvents = '';
        }, 2000);
    }
}
