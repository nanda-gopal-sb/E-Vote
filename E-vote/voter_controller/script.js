document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Navigate to another page after login
        window.location.href = '../start_election/start.html';
    });
});
