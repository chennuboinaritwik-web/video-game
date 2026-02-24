let xp = localStorage.getItem("xp") 
  ? parseInt(localStorage.getItem("xp")) 
  : 0;

let username = localStorage.getItem("username") 
  || prompt("Enter your username:");

localStorage.setItem("username", username);

document.getElementById("xp").textContent = xp;

function playSound(id) {
  document.getElementById(id).play();
}

function gainXP() {
  xp += 5;
  document.getElementById("xp").textContent = xp;
  localStorage.setItem("xp", xp);
  playSound("clickSound");
}

function levelUp() {
  if (xp >= 20) {
    xp = 0;
    localStorage.setItem("xp", xp);
    document.getElementById("xp").textContent = xp;
    playSound("levelSound");
    alert("Level Up! Unlock next coding challenge!");
    updateLeaderboard();
  }
}

function miniGame() {
  let random = Math.random();
  if (random > 0.5) {
    alert("You defeated the bug!");
  } else {
    alert("The bug escaped!");
  }
}

function updateLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  
  leaderboard.push({ name: username, score: xp });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  displayLeaderboard();
}

function displayLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  let list = document.getElementById("leaderboardList");
  list.innerHTML = "";
  
  leaderboard.forEach(player => {
    let li = document.createElement("li");
    li.textContent = player.name + " - " + player.score + " XP";
    list.appendChild(li);
  });
}

displayLeaderboard();