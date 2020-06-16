
$(document).ready(() => {

    const gameContainer = document.querySelector(".container");
//     const loader = document.querySelector(".loader");
    const question = $(".question");
    const choices = $(".choice-text");
    const choicesArray = Array.from(choices);
    const questionCounterText = $("#questionCounter")
    const scoreCounter = $("#scoreCounter")
    const timeLeftText = $(".timeLeft")
    let category = localStorage.getItem("category")
    let timeLeft = 30
    let currentQuestion = {};
    let acceptingAnswers = true;
    let questionCounter = 0;
    let score = 0;
    let time = 0;
    let availableQuestions = [];
    // localStorage.removeItem("category");
    //CONSTANTS
    let scorePerQuestion = 10;
    let maxQuestions = 10;
    let questions = [];
    let file = "";

    switch (category){
        case "mathematics":
            file = "assets/js/trivia/mathematics.json";
            break;
        
        case "science":
            file = "assets/js/trivia/science.json";
            break;

        case "general-knowledge":
            file = "assets/js/trivia/general-knowledge.json";
            break;

        case "programming":
            file = "assets/js/trivia/programming.json";
            break;

        case "sports":
            file = "assets/js/trivia/sportstrivia.json";
            break;

        case "history":
            file = "assets/js/trivia/history.json";
            break;
      

    }

    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
          this.sound.play();
        }
        this.stop = function(){
          this.sound.pause();
        }
      }

  

    fetch(file).then( (response) => {
            return response.json()
        }).then( (obj) => {
            questions = obj.questions;
            
            // Function for the countdown timer

            countDown = () => {
                setInterval( () => {

                    if (timeLeft <= 0){
                        window.location.assign("/end");
                        localStorage.setItem("mostRecentScore",score);
                        
                        var myMusic = new sound("assets/coffinsong.mp3");
                        myMusic.play()
                    }

                    if (timeLeft < 5){
                        timeLeftText.parent().css("color","red");
                    }

                    document.querySelector(".indicator").style.width =  `${(timeLeft/30) * 100}%`;
                    // timeLeftText.text(timeLeft);
                    timeLeft -= 1;
                },1000)
            }

            
            // Function for startGame 
            startGame = () => {
                questionCounter = 0;
                score = 0;
                availableQuestions = [...questions] //The ... ellipsis sign is used to spread the array
                getNewQuestion()
                countDown()
                

            }

            console.log(availableQuestions.length)

            // Function for getting a New question
            getNewQuestion = () => {
                const MAX_QUESTIONS =  10;
                const SCORE_PER_QUESTION = 10;
                let SCORE = 0;
                if (availableQuestions.length === 0 || questionCounter >= maxQuestions){
                    
                    
                    
                    localStorage.setItem("mostRecentScore",score);
                    localStorage.setItem("maxScoreAttainable", MAX_QUESTIONS*SCORE_PER_QUESTION);
                    // If all available questions have been answered
                    window.location.assign("/end")
                }
                else{
                timeLeft = 30;
                questionCounter++;
                questionCounterText.text(`${questionCounter}/${maxQuestions}`)
                const questionIndex = Math.floor(Math.random() * availableQuestions.length);
                currentQuestion = availableQuestions[questionIndex];
                question.text(currentQuestion.question);

                choicesArray.forEach(choice => {
                    const number = choice.dataset["number"];
                    choice.innerHTML = currentQuestion['choice'+number]
                });

                availableQuestions.splice(questionIndex,1);
                acceptingAnswers = true;
            }}

            choicesArray.forEach( choice => {
                choice.addEventListener("click", (e) => {
                    if (!acceptingAnswers) {return}

                    acceptingAnswers = false;
                    selectedChoice = e.target;
                    selectedAnswer = selectedChoice.dataset["number"];
                    console.log(selectedAnswer == currentQuestion.answer)

                    var mySound = new sound("assets/mouseclick.mp3")
                    mySound.play()

                    let isCorrect = "incorrect"

                    if (selectedAnswer == currentQuestion.answer){
                        isCorrect = "correct"
                        incrementScore(scorePerQuestion)
                    }
                    selectedChoice.parentElement.classList.add(isCorrect)

                    setTimeout(() => {
                        selectedChoice.parentElement.classList.remove(isCorrect);
                        getNewQuestion();
                    }, 1000)
                })

                incrementScore = (num) => {
                    score += num;
                    scoreCounter.text(score);
                }

            }) 

        
//         gameContainer.classList.remove("hidden");
//         loader.classList.add("hidden");
           
            
        startGame()

        }).catch( (err) => {
            console.error(err);
        })

 
    });

