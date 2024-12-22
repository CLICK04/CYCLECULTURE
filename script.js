// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Dropdown
    const toggleButton = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        const sidebarLinks = document.querySelectorAll('.sidebar-item a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        form.reset();
                        document.getElementById('formResponse').textContent =
                            'Thank you for your message, we have been informed.';
                        document.getElementById('formResponse').style.color = '#3cff03';
                    } else {
                        document.getElementById('formResponse').textContent =
                            'Oops! Something went wrong. Please try again later.';
                        document.getElementById('formResponse').style.color = 'red';
                    }
                    document.getElementById('formResponse').style.display = 'block';
                })
                .catch(() => {
                    document.getElementById('formResponse').textContent =
                        'Oops! Something went wrong. Please try again later.';
                    document.getElementById('formResponse').style.color = 'red';
                    document.getElementById('formResponse').style.display = 'block';
                });
        });
    }

    // Modal for Joining Club
    const joinButton = document.getElementById('joinClubButton');
    const modal = document.getElementById('joinModal');
    const closeButton = document.getElementById('closeModal');

    if (joinButton && modal && closeButton) {
        joinButton.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        const joinForm = document.getElementById('joinForm');
        joinForm?.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(joinForm);

            fetch(joinForm.action, {
                method: joinForm.method,
                body: formData,
                headers: { 'Accept': 'application/json' },
            })
                .then((response) => {
                    if (response.ok) {
                        joinForm.reset();
                        document.getElementById('formResponse').textContent =
                            'Thank you for joining!';
                        document.getElementById('formResponse').style.color = '#3cff03';
                    } else {
                        document.getElementById('formResponse').textContent =
                            'Oops! Something went wrong. Please try again.';
                        document.getElementById('formResponse').style.color = 'red';
                    }
                    document.getElementById('formResponse').style.display = 'block';
                })
                .catch(() => {
                    document.getElementById('formResponse').textContent =
                        'Oops! Something went wrong. Please try again.';
                    document.getElementById('formResponse').style.color = 'red';
                    document.getElementById('formResponse').style.display = 'block';
                });
        });
    }

    // City Filter for Community Cards
    const cityButtons = document.querySelectorAll('.city-btn');
    const communityCards = document.querySelectorAll('.community-card');

    if (cityButtons.length > 0 && communityCards.length > 0) {
        cityButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedCity = button.getAttribute('data-city');

                cityButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                communityCards.forEach(card => {
                    card.style.display =
                        selectedCity === 'all' || card.getAttribute('data-city') === selectedCity
                            ? 'block'
                            : 'none';
                });
            });
        });
    }
});
