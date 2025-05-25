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
// Newsletter form submission - UPDATED BULLETPROOF VERSION
document.querySelector('.newsletter-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    await handleFormSubmission(this);
});

// Click handler for the subscribe text - UPDATED
document.querySelector('.subscribe-text')?.addEventListener('click', async function(e) {
    e.preventDefault();
    const form = this.closest('form');
    await handleFormSubmission(form);
});

async function handleFormSubmission(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const subscribeText = form.querySelector('.subscribe-text');
    const email = emailInput.value.trim();
    
    if (!email) return;
    
    // Visual feedback
    const originalText = subscribeText.textContent;
    subscribeText.textContent = 'Sending...';
    subscribeText.style.opacity = '0.7';
    
    try {
        // Create a new FormData object
        const formData = new FormData(form);
        
        // Add any additional fields if needed
        formData.append('_gotcha', ''); // Helps prevent spam
        
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error('Submission failed');
        
        // Success feedback
        subscribeText.innerHTML = '✓ Done!';
        subscribeText.style.color = '#3aff9e';
        emailInput.value = '';
        
        // Reset after 2 seconds
        setTimeout(() => {
            subscribeText.textContent = originalText;
            subscribeText.style.color = '';
            subscribeText.style.opacity = '1';
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        subscribeText.textContent = 'Try Again';
        subscribeText.style.color = '#ff6b6b';
        
        setTimeout(() => {
            subscribeText.textContent = originalText;
            subscribeText.style.color = '';
            subscribeText.style.opacity = '1';
        }, 2000);
    }
}
