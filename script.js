// script.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting the traditional way

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Clear any previous message
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = '';  // Clear the message
    responseMessage.style.color = '';  // Reset text color

    let isValid = true;  // A flag to track form validity
    let errorMessages = '';  // To accumulate error messages

    // Email validation (check for empty and correct email format)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern for validating email

    if (!email) {
        errorMessages += 'Email is required.\n';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        errorMessages += 'Please enter a valid email address.\n';
        isValid = false;
    }

    // Password validation (check for empty and minimum length of 6 characters)
    if (!password) {
        errorMessages += 'Password is required.\n';
        isValid = false;
    } else if (password.length < 6) {
        errorMessages += 'Password must be at least 6 characters long.\n';
        isValid = false;
    }

    // Display error messages, if any
    if (!isValid) {
        responseMessage.textContent = errorMessages;
        responseMessage.style.color = 'red';
        return;
    }

    // If validations pass, proceed with the API call
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  // You can check the response in the console
        responseMessage.textContent = 'Login successful! Data received by the API.';
        responseMessage.style.color = 'green';
    })
    .catch(error => {
        console.error('Error:', error);
        responseMessage.textContent = 'Login failed! Please try again.';
        responseMessage.style.color = 'red';
    });
});
