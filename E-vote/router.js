function handleButtonClick(page) {
    window.location.hash = page;
}
// function Route(){
//     window.location.href = "./startup_page/pg.html";

// }
document.getElementById("voterBtn").addEventListener("click", function() {
    console.log("LOL");
    // Directly navigate to the "voterlogin.html" page
    window.location.href = "./voter_login/voterlogin.html";
});
document.getElementById("candidateBtn").addEventListener("click", function() {
    // Directly navigate to the "voterlogin.html" page
    window.location.href = "./candidate_page/candidate.html";
});

document.getElementById("voterControllerBtn").addEventListener("click", function() {
    // Directly navigate to the "voterlogin.html" page
    window.location.href = "./voter_controller/controlller.html";
});


document.getElementById("candidateBtn").addEventListener("click", function() {
    handleButtonClick("candidate");
});

document.getElementById("voterControllerBtn").addEventListener("click", function() {
    handleButtonClick("voterController");
});

function loadPageContent() {
    const hash = window.location.hash.substring(1);
    const contentDiv = document.getElementById("content");

    switch(hash) {
        case "voter":
            // Load "voterlogin.html" content dynamically without page reload
            fetch("voterlogin/voterlogin.html")
                .then(response => response.text())
                .then(html => contentDiv.innerHTML = html)
                .catch(error => console.error('Error fetching voter login:', error));
            break;
        case "candidate":
            // Load content for "candidate" route
            //contentDiv.innerHTML = "Candidate content"; // Update with actual content loading logic
            break;
        case "voterController":
            // Load content for "voterController" route
          //  contentDiv.innerHTML = "Voter controller content"; // Update with actual content loading logic
            break;
        default:
            // Handle other cases or default behavior
         //  contentDiv.innerHTML = "Default content"; // Update with actual default content
            break;
    }
}

window.addEventListener("hashchange", loadPageContent);
window.addEventListener("load", loadPageContent);
//document.getElementById("voter-login-form").addEventListener("submit", function(event) {
    // Prevent the default form submission behavior
  //  event.preventDefault();

    // Get the voter ID input value
    //const voterId = document.getElementById("voter-id").value;

    // Perform any necessary validation of the voter ID here

    // Redirect the user to voting.html
    //window.location.href = "./voting_page/voting.html";
//});
