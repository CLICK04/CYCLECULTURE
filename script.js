// Existing function
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}



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
