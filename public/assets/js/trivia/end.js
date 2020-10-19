const saveScoreBtn = document.getElementById("save-btn")
const saveForm = document.getElementById("saveForm")
const finalScoreText =  document.getElementById("final-score")
const finalScoreTriviaText =  document.getElementById("final-score-trivia")
const nicknameInput = document.getElementById("nickname")
const percentScore = document.querySelector(".percentScore")
const category = document.querySelector(".category")
const scoreToLeaderBoard = document.getElementById("score")
const iqLevel = document.getElementById("iq-level")
const mostRecentScore = localStorage.getItem("mostRecentScore")
const maxScoreAttainable = localStorage.getItem("maxScoreAttainable")
const categoryName = localStorage.getItem("category")

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.muted = true;
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

  document.addEventListener('DOMContentLoaded', (event) => {
    var mySound = new sound("assets/coffinsong.mp3");
    mySound.play()
  });




if (finalScoreText){
    finalScoreText.innerText = mostRecentScore;
}

if (finalScoreTriviaText){
    finalScoreTriviaText.innerText = mostRecentScore;
}
let calcScore = (mostRecentScore/maxScoreAttainable)*100;

if (percentScore){
    percentScore.innerHTML = calcScore;
}

if(categoryName){
    category.innerHTML = categoryName;

}

if (iqLevel){
    if (calcScore >= 80){

        iqLevel.innerHTML = "Genius";
        iqLevel.classList.add("genius");
    }
    else if(calcScore > 20 && calcScore <80){
        iqLevel.innerHTML = "Average";
        iqLevel.classList.add("average");
    }
    else{
        iqLevel.innerHTML = "Olodo";
        iqLevel.classList.add("olodo");
    }
}

if (nicknameInput){
    nicknameInput.addEventListener("keyup", () => {

        saveScoreBtn.disabled = !nicknameInput.value;
    })

}

if (scoreToLeaderBoard){
    scoreToLeaderBoard.value = parseInt(mostRecentScore);
}


// Redirect to previous page 
playAgain = () => {
    window.history.back();
}




