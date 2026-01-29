<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Paglilinis ng input data
    $fname   = strip_tags(trim($_POST["first_name"]));
    $lname   = strip_tags(trim($_POST["last_name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));

    // Detalye ng recipient
    $to = "christianbendano@gmail.com";
    $email_subject = "New Dealer Inquiry: " . ($subject ? $subject : "No Subject");
    
    // Structure ng email message
    $body = "You have received a new message from your website inquiry form.\n\n".
            "Name: $fname $lname\n".
            "Email: $email\n\n".
            "Message:\n$message";

    $headers = "From: $email";

    // Pagpapadala
    if (mail($to, $email_subject, $body, $headers)) {
        // Pwede mong palitan ito ng redirect sa isang 'Thank You' page
        echo "<script>alert('Message sent successfully!'); window.location.href='index.php';</script>";
    } else {
        echo "Error: Could not send message.";
    }
} else {
    echo "Invalid Request.";
}
?>