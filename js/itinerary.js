// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ============================================================
// TIMELINE ACCORDION – REMOVED (itinerary always visible)
// ============================================================
// The itinerary items are now always expanded via CSS.
// No JavaScript is needed for them.

// ============================================================
// TERMS & CONDITIONS ACCORDION – KEPT (works as before)
// ============================================================
const termsHeaders = document.querySelectorAll('.terms-header');

termsHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const toggle = header.querySelector('.terms-toggle');

        if (content.style.display === 'block') {
            content.style.display = 'none';
            toggle.textContent = '+';
        } else {
            content.style.display = 'block';
            toggle.textContent = '−';
        }
    });
});

// Open the first terms item by default
const firstTermsContent = document.querySelector('.terms-content');
const firstTermsToggle = document.querySelector('.terms-toggle');
if (firstTermsContent && firstTermsToggle) {
    firstTermsContent.style.display = 'block';
    firstTermsToggle.textContent = '−';
}
