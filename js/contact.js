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
// Universal form handler (works for dynamically loaded content)
document.addEventListener('submit', async function(e) {
    if (e.target.classList.contains('newsletter-form')) {
        e.preventDefault();
        await handleFormSubmission(e.target);
    }
});

// Universal click handler for subscribe text
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('subscribe-text')) {
        e.preventDefault();
        const form = e.target.closest('.newsletter-form');
        if (form) form.dispatchEvent(new Event('submit'));
    }
});

async function handleFormSubmission(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const subscribeText = form.querySelector('.subscribe-text');
    const email = emailInput.value.trim();
    
    if (!email) return;
    
    // Save original state
    const originalText = subscribeText.textContent;
    const originalColor = subscribeText.style.color;
    
    // Visual feedback
    subscribeText.textContent = 'Sending...';
    subscribeText.style.opacity = '0.7';
    
    try {
        const formData = new FormData(form);
        formData.append('_gotcha', ''); // Anti-spam field
        
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
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        subscribeText.textContent = 'Try Again';
        subscribeText.style.color = '#ff6b6b';
        
        setTimeout(() => {
            subscribeText.textContent = originalText;
            subscribeText.style.color = originalColor;
            subscribeText.style.opacity = '1';
        }, 2000);
    }
}
