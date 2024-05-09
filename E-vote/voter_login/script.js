import Gun from "gun/gun";
import { gun } from "../gun";
async function fetchDataAsArray(url) {
    try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  const jsonData = await response.text();
  const jsonArray = JSON.parse(jsonData);
  return jsonArray;
} catch (error) {
  console.error("Error:", error);
  return [];
}
}
function callback(ack){
    console.log(ack.ok);
}
let voterId ; 
// Example usage:
const url = 'voter.json'; // Replace with the URL of your JSON file
const lol = await fetchDataAsArray(url);
console.log(lol);
let isLogin = false; 
document.getElementById("submit-btn").addEventListener("click", function(event) {
    event.preventDefault(); 
    voterId = document.getElementById("voter-id").value;
    console.log(voterId + " " + lol.voter.voter.length);
    for(let i = 0 ; i<lol.voter.voter.length; i++){
        if(voterId == lol.voter.voter[i].voterid)
        {
            let user = gun.get(`${voterId}`);
            user.put({isLoggedin:"true"});
        }
    }
}
);
export default voterId;