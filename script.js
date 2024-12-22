document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle the dropdown menu
    function toggleDropdown() {
        document.querySelector('.sidebar').classList.toggle('active');
    }

    // Attach toggle function to the button
    document.querySelector('.sidebar-toggle').addEventListener('click', toggleDropdown);
});



document.querySelector('.contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.reset();
            document.getElementById('formResponse').textContent = "Thank you for your message, we have been informed.";
            document.getElementById('formResponse').style.color = "#3cff03";
        } else {
            document.getElementById('formResponse').textContent = "Oops! Something went wrong. Please try again later.";
            document.getElementById('formResponse').style.color = "red";
        }
        document.getElementById('formResponse').style.display = "block";
    }).catch(error => {
        document.getElementById('formResponse').textContent = "Oops! Something went wrong. Please try again later.";
        document.getElementById('formResponse').style.color = "red";
        document.getElementById('formResponse').style.display = "block";
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const joinButton = document.getElementById('joinClubButton');
    const modal = document.getElementById('joinModal');
    const closeButton = document.getElementById('closeModal');

    // Open Modal
    joinButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        modal.style.display = 'flex'; // Show modal
    });

    // Close Modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide modal
    });

    // Close Modal When Clicking Outside Content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none'; // Hide modal
        }
    });

    // Handle Form Submission
    const form = document.getElementById('joinForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' },
        })
            .then((response) => {
                if (response.ok) {
                    form.reset();
                    document.getElementById('formResponse').textContent = 'Thank you for joining!';
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
});
