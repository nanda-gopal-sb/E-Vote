import { gun } from "../gun";

document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById('constituency');
    const voterCountDisplay = document.getElementById('voter-count');
    const candidateInfoBody = document.getElementById('candidate-info-body');
    const voterNameDisplay = document.getElementById('voter-name');
    const constituencyNameDisplay = document.getElementById('constituency-name');

    // Load voter data from JSON
    fetch('voter.json')
        .then(response => response.json())
        .then(data => {
            const voterData = data.voter.voter;
            const loadConstituencyData = (selectedConstituency) => {
                // Filter voter data based on selected constituency
                const votersInConstituency = voterData.filter(voter => voter.constituency === selectedConstituency);

                // Reset counts
                let realTimeVotedCount = 0;
                voterCountDisplay.textContent = 0;

                // Clear previous candidate info
                candidateInfoBody.innerHTML = '';

                // Fetch candidate data
                fetch('candidate.json')
                    .then(response => response.json())
                    .then(data => {
                        const candidateData = data.candidate.candidate;
                        // Filter candidate data based on selected constituency
                        const candidatesForConstituency = candidateData.filter(candidate => candidate.constituency === selectedConstituency);
                        console.log(candidatesForConstituency);

                        // Populate candidates with 0 votes initially
                        candidatesForConstituency.forEach(candidate => {
                            const row = document.createElement('tr');
                            row.innerHTML = `<td>${candidate.name}</td><td id="vote-count-${candidate.id}">0</td>`;
                            candidateInfoBody.appendChild(row);
                        });

                        // Calculate votes from GunDB
                        votersInConstituency.forEach(voter => {
                            gun.get(`${voter.voterid}`).get('votes').once((voteData) => {
                                if (voteData && voteData.id) {
                                    // Increment turnout
                                    realTimeVotedCount++;
                                    voterCountDisplay.textContent = realTimeVotedCount;

                                    // Increment candidate vote
                                    const countCell = document.getElementById(`vote-count-${voteData.id}`);
                                    if (countCell) {
                                        let currentCount = parseInt(countCell.textContent);
                                        countCell.textContent = currentCount + 1;
                                    }
                                }
                            });
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching candidate data:', error);
                    });
            };

            // Add event listener to the dropdown menu
            dropdown.addEventListener('change', function () {
                loadConstituencyData(this.value);
            });

            // Initial load
            loadConstituencyData(dropdown.value);
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
            const voterData = data.voter.voter;
            // Find the voter
            const voter = voterData.find(voter => voter.voterid == voterId);

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
})