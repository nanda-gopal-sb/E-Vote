document.addEventListener("DOMContentLoaded", async function() {
    const params = new URLSearchParams(window.location.search);
    const voterId = params.get('voterId');

    // Fetch voter data
    const voterResponse = await fetch('voter.json');
    const voterData = await voterResponse.json();

    // Find the voter
    const voter = voterData.voter.voter.find(voter => voter.voterid === voterId);

    if (voter) {
        // Display voter's name
        document.getElementById('voter-name').textContent = voter.name;

        // Display constituency name directly from voter's constituency ID
        const constituencyId = voter.constituency;
        document.getElementById('constituency-name').textContent = `Constituency: ${constituencyId}`;

        // Fetch candidate data
        const candidateResponse = await fetch('candidate.json');
        const candidateData = await candidateResponse.json();

        // Find candidates for the voter's constituency
        const candidatesForConstituency = candidateData.candidate.candidate.filter(candidate => candidate.constituency === constituencyId);

        const candidatesContainer = document.querySelector('.candidates');

        // Populate candidates dynamically
        candidatesForConstituency.forEach(candidate => {
            const candidateDiv = document.createElement('div');
            candidateDiv.classList.add('candidate');

            const candidateName = document.createElement('div');
            candidateName.classList.add('candidate-name');
            candidateName.textContent = `Candidate: ${candidate.name}`;

            const partyName = document.createElement('div');
            partyName.classList.add('party-name');
            partyName.textContent = `Party: ${candidate.party}`;

            const voteButton = document.createElement('button');
            voteButton.textContent = 'Vote';
            voteButton.addEventListener('click', function() {
                alert(`You voted for ${candidate.name}  ${candidate.party}`);
            });

            candidateDiv.appendChild(candidateName);
            candidateDiv.appendChild(partyName);
            candidateDiv.appendChild(voteButton);

            candidatesContainer.appendChild(candidateDiv);
        });
    } else {
        alert('Invalid voter ID. Please try again.');
    }
});
