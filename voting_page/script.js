import { gun } from "../gun";
let params; 
let voterId; 
let over = false; 
document.addEventListener("DOMContentLoaded",Ac);   
async function Ac(){
    params = new URLSearchParams(window.location.search);
    voterId = params.get('voterId');

    const voter = await fetchVoter(voterId);

    if (voter) {
        displayVoterInfo(voter);

        const constituencyId = voter.constituency;
        displayConstituencyName(constituencyId);

        const candidatesForConstituency = await fetchCandidatesForConstituency(constituencyId);
        populateCandidates(candidatesForConstituency);
    } else {
        alert('Invalid voter ID. Please try again.');
    }
}
async function votes() {
    const voterResponse = await fetch('voter.json');
    const voterData = await voterResponse.json();
    return voterData;
}
async function fetchVoter(voterId) {
    const voterResponse = await fetch('voter.json');
    const voterData = await voterResponse.json();
    return voterData.voter.voter.find(voter => voter.voterid === voterId);
}

function displayVoterInfo(voter) {
    document.getElementById('voter-name').textContent = voter.name;
}

function displayConstituencyName(constituencyId) {
    document.getElementById('constituency-name').textContent = `Constituency: ${constituencyId}`;
}
async function fetchCandidatesForConstituency(constituencyId) {
    const candidateResponse = await fetch('candidate.json');
    const candidateData = await candidateResponse.json();
    return candidateData.candidate.candidate.filter(candidate => candidate.constituency === constituencyId);
}

function populateCandidates(candidatesForConstituency) {
    const candidatesContainer = document.querySelector('.candidates');
    candidatesForConstituency.forEach(candidate => {
        const candidateDiv = createCandidateElement(candidate);
        candidatesContainer.appendChild(candidateDiv);
    });
}

function createCandidateElement(candidate) {
    const candidateDiv = document.createElement('div');
    candidateDiv.classList.add('candidate');

    const candidateName = document.createElement('div');
    candidateName.classList.add('candidate-name');
    candidateName.textContent = `Candidate: ${candidate.name}`;

    const partyName = document.createElement('div');
    partyName.classList.add('party-name');
    partyName.textContent = `Party: ${candidate.party}`;

    const voteButton = createVoteButton(candidate);

    candidateDiv.appendChild(candidateName);
    candidateDiv.appendChild(partyName);
    candidateDiv.appendChild(voteButton);

    return candidateDiv;
}

function createVoteButton(candidate) {
    const voterData = votes();
    
    const voteButton = document.createElement('button');
    voteButton.textContent = 'Vote';
    voteButton.addEventListener('click', function() {
        if(!over){
            candidate.votesRecieved = 1; // Mark as voted
            gun.get(`${voterId}`).get('votes').put(candidate);
            gun.get(`${voterId}`).get('votes').once(savedCandidate => {
                console.log("Vote saved for:", savedCandidate.name);
            });
            alert(`You voted for ${candidate.name} (${candidate.party})`);
            over = true;
        }     
        else{
            alert(`already voted`);
        }     
    });
    return voteButton;
}