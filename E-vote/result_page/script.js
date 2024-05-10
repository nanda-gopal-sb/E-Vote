document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.getElementById('constituency');
    const voterCountDisplay = document.getElementById('voter-count');
    const candidateInfoBody = document.getElementById('candidate-info-body');
    const voterNameDisplay = document.getElementById('voter-name');
    const constituencyNameDisplay = document.getElementById('constituency-name');

    // Load voter data from JSON
    fetch('voter.json')
        .then(response => response.json())
        .then(data => {
            const voterData = data.voter;
            // Add event listener to the dropdown menu
            dropdown.addEventListener('change', function() {
                const selectedConstituency = dropdown.value;
                
                // Filter voter data based on selected constituency
                const votersInConstituency = voterData.filter(voter => voter.constituency === selectedConstituency);
                
                // Count the number of voters who have voted
                const votedCount = votersInConstituency.reduce((count, voter) => {
                    return count + (voter.isVoted === 'true' ? 1 : 0);
                }, 0);

                // Display the count on the page
                voterCountDisplay.textContent = votedCount;

                // Clear previous candidate info
                candidateInfoBody.innerHTML = '';

                // Fetch candidate data
                fetch('candidate.json')
                    .then(response => response.json())
                    .then(data => {
                        const candidateData = data.candidate;
                        // Filter candidate data based on selected constituency
                        const candidatesForConstituency = candidateData.filter(candidate => candidate.constituency === selectedConstituency);

                        // Populate candidates dynamically
                        candidatesForConstituency.forEach(candidate => {
                            const row = document.createElement('tr');
                            row.innerHTML = `<td>${candidate.name}</td><td>${candidate.votesReceived}</td>`;
                            candidateInfoBody.appendChild(row);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching candidate data:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error fetching voter data:', error);
        });

    // Fetch voter data using voterId
    const params = new URLSearchParams(window.location.search);
    const voterId = params.get('voterId');
    fetch('voter.json')
        .then(response => response.json())
        .then(data => {
            const voterData = data.voter;
            // Find the voter
            const voter = voterData.find(voter => voter.voterid === voterId);

            if (voter) {
                // Display voter's name
                voterNameDisplay.textContent = voter.name;

                // Display constituency name directly from voter's constituency ID
                const constituencyId = voter.constituency;
                constituencyNameDisplay.textContent = `Constituency: ${constituencyId}`;
            } else {
                alert('Invalid voter ID. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching voter data:', error);
        });
});

