  
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

        // Timeline accordion
        const timelineHeaders = document.querySelectorAll('.timeline-header');
        
        timelineHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const toggle = header.querySelector('.timeline-toggle');
                
                if(content.style.display === 'block') {
                    content.style.display = 'none';
                    toggle.textContent = '+';
                } else {
                    content.style.display = 'block';
                    toggle.textContent = '-';
                }
            });
        });

        // Terms & Conditions accordion
        const termsHeaders = document.querySelectorAll('.terms-header');
        
        termsHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const toggle = header.querySelector('.terms-toggle');
                
                if(content.style.display === 'block') {
                    content.style.display = 'none';
                    toggle.textContent = '+';
                } else {
                    content.style.display = 'block';
                    toggle.textContent = '-';
                }
            });
        });

        // Open first timeline and terms items by default
        document.querySelector('.timeline-content').style.display = 'block';
        document.querySelector('.timeline-toggle').textContent = '-';
        document.querySelector('.terms-content').style.display = 'block';
        document.querySelector('.terms-toggle').textContent = '-';
   