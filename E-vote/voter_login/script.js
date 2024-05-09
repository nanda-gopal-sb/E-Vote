import queryString from 'query-string';
import { gun } from "../gun";

// Function to fetch voter data from JSON file
async function fetchVoterData() {
  try {
    const response = await fetch('voter.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching voter data:', error);
    throw error; // Propagate the error to the caller
  }
}

// Function to verify voter ID
async function verifyVoterId(voterId, voterData) {
  try {
    // Debugging: Log loaded voter data
    console.log('Loaded voter data:', voterData);

    // Check if the voter ID exists in the JSON data
    const voter = voterData.voter.find(voter => voter.voterid === voterId);
    // Debugging: Log verification result
    console.log('Verification result for voter ID:', voterId, '-', !!voter);

    return !!voter; // Returns true if voter ID is found, false otherwise
  } catch (error) {
    console.error('Error verifying voter ID:', error);
    return false; // Return false in case of error
  }
}

// Event listener for form submission
document.querySelector(".voterlogin-form").addEventListener("submit", async function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the voter ID input value
  const voterId = document.getElementById("voter-id").value;

  // Fetch voter data from JSON file
  const voterData = await fetchVoterData();

  // Verify the voter ID
  const isVoterValid = await verifyVoterId(voterId, voterData);

  // If voter ID is valid, redirect to the voting page with the voter ID as a query parameter
  if (isVoterValid) {
    const queryParams = { voterId: voterId };
    const url = `../voting_page/voting.html?${queryString.stringify(queryParams)}`;
    window.location.href = url;
  } else {
    alert('Invalid voter ID. Please try again.');
  }
});

document.getElementById("submit-btn").addEventListener("click", async function(event) {
  event.preventDefault(); 
  const voterId = document.getElementById("voter-id").value;

  // Fetch voter data from JSON file
  const voterData = await fetchVoterData();
  //console.log(voterData.voter.voter.length)
  let isValidVoter = false;
  for(let i = 0 ; i < voterData.voter.voter.length; i++){
    //console.log(voterData.voter[i].voterid)
      if(voterId == voterData.voter.voter[i].voterid)
      {
          isValidVoter = true;
          let user = gun.get(`${voterId}`);
          user.put({ isLoggedin: "true" });
          break; // No need to continue checking once a valid voter ID is found
      }
  }
  
  if (isValidVoter) {
      const queryParams = { voterId: voterId };
      const url = `../voting_page/voting.html?${queryString.stringify(queryParams)}`;
      window.location.href = url;
  } else {
      alert("Invalid voter ID. Please try again.");
      
  }
});
