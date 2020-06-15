
$(document).ready(() => {

    const gameContainer = document.querySelector(".container");
    const loader = document.querySelector(".loader");
    const question = document.querySelector(".question");
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
    let endpoint = "";

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

    console.log(sessionStorage.getItem("select-category"));

    switch (sessionStorage.getItem("select-category")){
        case "random":
            endpoint = "https://opentdb.com/api.php?amount=40&difficulty=easy&type=multiple"
            break;
        
        case "generalknowledge":
            endpoint = "https://opentdb.com/api.php?amount=40&category=9&difficulty=easy&type=multiple";
            break;

        case "sports":
            endpoint = "https://opentdb.com/api.php?amount=40&category=21&difficulty=easy&type=multiple";
            break;

        case "science":
            endpoint = "https://opentdb.com/api.php?amount=40&category=17&difficulty=easy&type=multiple";
            break;

        case "computers":
            file = "https://opentdb.com/api.php?amount=30&category=18&difficulty=easy&type=multiple";
            break;

        case "books":
            file = "https://opentdb.com/api.php?amount=35&category=10&difficulty=medium&type=multiple";
            break;
        
        case "movies":
            endpoint = "https://opentdb.com/api.php?amount=40&category=11&difficulty=easy&type=multiple";
            break;
        
        case "geography":
            endpoint = "https://opentdb.com/api.php?amount=40&category=22&difficulty=easy&type=multiple";
            break;
        
        case "history":
            endpoint = "https://opentdb.com/api.php?amount=40&category=23&difficulty=easy&type=multiple";
            break;
        
        case "celebrities":
            endpoint = "https://opentdb.com/api.php?amount=25&category=26&difficulty=medium&type=multiple";
            break;
            

    }
  

    fetch(endpoint).then( (response) => {
            return response.json()
        }).then( (openQuestions) => {
            console.log(openQuestions.results.length)

            let MAX_QUESTIONS = openQuestions.results.length;

            questions = openQuestions.results.map((openQuestion) => {
                const formattedQuestion = {
                    question : openQuestion.question
                };

                // console.log(formattedQuestion)
                const answerChoices = [...openQuestion.incorrect_answers]
                formattedQuestion.answer = Math.floor(Math.random() * 3)+1;
                answerChoices.splice(
                    formattedQuestion.answer - 1,
                    0,
                    openQuestion.correct_answer
                )

                // console.log(formattedQuestion.question,formattedQuestion.answer, answerChoices)
                answerChoices.forEach((choice,index) => {
                    formattedQuestion["choice"+ (index+1)] = choice;
                })

                
                return formattedQuestion;
                return MAX_QUESTIONS;
            })

                // Function for the countdown timer

                countDown = () => {
                    setInterval( () => {
    
                        if (timeLeft <= 0){
                            window.location.assign("/final");
                            localStorage.setItem("mostRecentScore",score);
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

                    let volume = false;
                    let myMusic = new sound("assets/coffinsong.mp3");
                    function playMusic(){
                        volume = true;
                        myMusic.play();
                    }
                    function stopMusic(){
                        myMusic.stop()
                        volume = false;
                    }
                    document.querySelector(".fa-volume-up").addEventListener("click", (e)=> {
                        if (!volume){
                            playMusic()
                            e.target.style.animation = "volume .5s ease-in-out infinite";
                            // console.log(volume)
                        }
                        else{
                            stopMusic()
                            e.target.style.animation = "";
                        }
                        
                    }, false)
                }
    
                console.log(availableQuestions.length)
    
                // Function for getting a New question
                getNewQuestion = () => {
                    
                    const SCORE_PER_QUESTION = 10;
                    let SCORE = 0;
                    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
                        
                        localStorage.setItem("mostRecentScore",score);
                        localStorage.setItem("maxScoreAttainable", MAX_QUESTIONS*SCORE_PER_QUESTION);
                        // If all available questions have been answered
                        window.location.assign("/end")
                    }
                    else{
                    timeLeft = 30;
                    questionCounter++;
                    questionCounterText.text(`${questionCounter}`)
                    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
                    currentQuestion = availableQuestions[questionIndex];
                    question.innerHTML = currentQuestion.question;
    
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
    
                        else if (selectedAnswer != currentQuestion.answer){
                            const SCORE_PER_QUESTION = 10;
                            localStorage.setItem("mostRecentScore",score);
                            // localStorage.setItem("maxScoreAttainable", MAX_QUESTIONS*SCORE_PER_QUESTION);
                            setTimeout(() => {
                                window.location.assign("/final")
                            }, 700);
                            
                        }
                        selectedChoice.parentElement.classList.add(isCorrect)
    
                        setTimeout(() => {
                            selectedChoice.parentElement.classList.remove(isCorrect);
                            getNewQuestion();
                        }, 1500)
                    })
    
                    incrementScore = (num) => {
                        score += num;
                        scoreCounter.text(score);
                    }
    
                }) 
            
            document.querySelector(".indicator").classList.remove("hidden");
            gameContainer.classList.remove("hidden");
            loader.classList.add("hidden");
            
            
            startGame();
            

        }).catch( (err) => {
            console.error(err);
        })

         
        
       

 
    });

