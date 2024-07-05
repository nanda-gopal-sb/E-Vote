document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Navigate to another page after login
        window.location.href = '../start_election/start.html';
    });
});
async function fetchVoter(voterId) {
    const voterResponse = await fetch('voter.json');
    const voterData = await voterResponse.json();
    return voterData.voter.voter.find(voter => voter.voterid === voterId);
}
async function fetchCandidatesForConstituency(constituencyId) {
    const candidateResponse = await fetch('candidate.json');
    const candidateData = await candidateResponse.json();
    return candidateData.candidate.candidate.filter(candidate => candidate.constituency === constituencyId);
}
