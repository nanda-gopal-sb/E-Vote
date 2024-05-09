// Function to fetch candidate data from JSON file
async function fetchCandidateData() {
    try {
        const response = await fetch('candidate.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Access the candidate array within the "candidate" object
        return data.candidate.candidate;
    } catch (error) {
        console.error('Error fetching candidate data:', error);
        throw error; // Propagate the error to the caller
    }
}

// Function to populate candidate list based on selected constituency
async function populateCandidateList() {
    const constituencySelect = document.getElementById("constituencySelect");
    const selectedConstituency = constituencySelect.value;
    const candidateList = document.getElementById("candidateList");

    // Clear existing candidate list
    candidateList.innerHTML = "";

    try {
        // Fetch candidate data from JSON file
        const candidateData = await fetchCandidateData();

        // Filter candidates based on the selected constituency
        const filteredCandidates = candidateData.filter(candidate => candidate.constituency === selectedConstituency);

        if (filteredCandidates.length > 0) {
            // Populate candidate list for selected constituency
            filteredCandidates.forEach(candidate => {
                const listItem = document.createElement("li");
                listItem.textContent = `Name: ${candidate.name}, Party: ${candidate.party}`;
                candidateList.appendChild(listItem);
            });
        } else {
            candidateList.textContent = "No candidates available for the selected constituency.";
        }
    } catch (error) {
        console.error('Error populating candidate list:', error);
        // Display error message to the user
        candidateList.textContent = "Error fetching candidate data. Please try again later.";
    }
}

// Event listener for change event on constituency dropdown
document.getElementById("constituencySelect").addEventListener("change", populateCandidateList);

// Initial population of candidate list based on default selected constituency
populateCandidateList();

document.getElementById("backButton").addEventListener("click", function() {
    window.location.href = "/E-Vote/startup_page/pg.html";

    
    // Adjust the URL based on the actual path of your startup page
});
