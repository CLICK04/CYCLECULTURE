<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $contact = htmlspecialchars(strip_tags($_POST['contact']));
    $message = htmlspecialchars(strip_tags($_POST['message']));

    // Your email address where you want to receive the form submissions
    $to = "followcycleculture@gmail.com";

    // Subject of the email
    $subject = "New Contact Form Submission";

    // Email content
    $body = "You have received a new message from your contact form.\n\n".
            "Contact: $contact\n\n".
            "Message:\n$message";

    // Email headers
    $headers = "From: no-reply@yourdomain.com\r\n";
    $headers .= "Reply-To: $contact\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Success response
        echo "<p style='color: #3cff03; font-family: Glacial Indifference; text-align: center;'>Thank you for your message, we have been informed.</p>";
    } else {
        // Error response
        echo "<p style='color: red; font-family: Glacial Indifference; text-align: center;'>Oops! Something went wrong. Please try again later.</p>";
    }
}
?>
