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
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const emailInput = form.querySelector('input[type="email"]');
    const subscribeText = form.querySelector('.subscribe-text');
    const email = emailInput.value;
    
    if (!email) return;
    
    // Visual feedback while submitting
    subscribeText.textContent = 'Submitting...';
    subscribeText.style.color = '#ffffff';
    
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Form submission failed');
        
        // Success state - add tick mark and change color temporarily
        subscribeText.innerHTML = 'Subscribed ✓';
        subscribeText.style.color = '#3aff9e';
        
        // Clear the input
        emailInput.value = '';
        
        // Reset after 3 seconds
        setTimeout(() => {
            subscribeText.textContent = 'Subscribe';
            subscribeText.style.color = ''; // Reverts to original color
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);
        subscribeText.textContent = 'Try Again';
        subscribeText.style.color = '#ff6b6b'; // Red for error
        setTimeout(() => {
            subscribeText.textContent = 'Subscribe';
            subscribeText.style.color = ''; // Reverts to original color
        }, 2000);
    });
});

// Keep your existing click handler
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
