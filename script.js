// Existing function
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

// New function for AJAX form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Collect form data
    var formData = new FormData(this);

    // Send the form data via AJAX
    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Display the response message
        document.getElementById('formMessage').innerHTML = data;
    })
    .catch(error => {
        // Display an error message
        document.getElementById('formMessage').innerHTML = "<p style='color: red; font-family: Glacial Indifference; text-align: center;'>Oops! Something went wrong. Please try again later.</p>";
    });
});
