document.addEventListener("DOMContentLoaded", function() {
    const startElectionBtn = document.getElementById('start-election-btn');

    // Add event listener to the button
    startElectionBtn.addEventListener('click', function() {
        // Redirect to result.html when the button is clicked
        window.location.href = '../result_page/result.html';
    });
});
