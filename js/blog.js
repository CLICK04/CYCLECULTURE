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

// Scroll animation for sections
const sections = document.querySelectorAll('.fullscreen-section');

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



// Arrow hint to scroll to the blog content
document.querySelector('.arrow-hint')?.addEventListener('click', function() {
    document.querySelector('#blog-content').scrollIntoView({
        behavior: 'smooth'
    });
});

// Social share buttons
document.querySelectorAll('.social-share a').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('i').className.split('-')[1];
        let url = '';
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        
        switch(platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`;
                break;
        }
        
        window.open(url, '_blank', 'width=600,height=400');
    });
});

// Initialize
window.addEventListener('scroll', checkScroll);
window.addEventListener('DOMContentLoaded', checkScroll);

// Initialize section content animation
function initSectionAnimation() {
    const section = document.querySelector('#blog-content');
    const content = section.querySelector('.section-content');
    content.classList.add('active');
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', initSectionAnimation);


// Add this to your JS file to automatically use current page URL
document.querySelectorAll('.social-share a').forEach(link => {
    const url = encodeURIComponent(window.location.href);
    link.href = link.href.replace('[YOUR-URL]', url);
});