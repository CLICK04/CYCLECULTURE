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
