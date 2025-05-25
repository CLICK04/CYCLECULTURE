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
