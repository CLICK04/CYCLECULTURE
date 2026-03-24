        // Mobile menu toggle
        document.querySelector('.mobile-menu-btn')?.addEventListener('click', function() {
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

        // Smooth scrolling to sections
        document.querySelectorAll('.city-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll to corresponding section
                const targetId = this.dataset.target;
                document.getElementById(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
