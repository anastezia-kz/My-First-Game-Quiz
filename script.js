const goButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-btns")
const score = document.getElementById("score")



let shuffeledQuestions, currentQuestionIndex

goButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
    goButton.classList.add("hide")
    shuffeledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffeledQuestions[currentQuestionIndex])
}
function showQuestion(question) {
    const theQuestion = document.getElementById("question")

    theQuestion.innerHTML = ""
    if(question.type === "img"){
        let imageQuestion = document.createElement("img")
        theQuestion.appendChild(imageQuestion)
        imageQuestion.classList.add("image")
        imageQuestion.src = question.questionURL
    }else if(question.type === "text"){
        theQuestion.innerHTML = ""
        let textQuestion = document.createElement("p")
        theQuestion.appendChild(textQuestion)
        textQuestion.innerText = question.question
    }else if(question.type === "sound"){
        theQuestion.innerHTML = ""
        let soundQuestion = document.createElement("audio")
        soundQuestion.setAttribute("src","questionSRC")
        soundQuestion.setAttribute("controls", "controls")
        theQuestion.appendChild(soundQuestion)
        soundQuestion.src = question.questionSRC
    }
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


// function showResult(){
//     let correctAns = 0;
// }


function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffeledQuestions.length > currentQuestionIndex+1) {
        nextButton.classList.remove("hide")
    }else {
        goButton.innerText = "Restart"
        goButton.classList.remove("hide")
        // showResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct){
        element.classList.add("correct")
    }else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element){
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const questions = [
    {
        questionURL: "./pictures/lordOfRings.jpg",
        type: "img",
        answers: [
            {text: "The Lord of the Rings", correct: true},
            {text: "The Game of Thrones", correct: false},
            {text: "Gladiator", correct: false},
            {text: "The Pirates of the Carribean", correct: false},
        ]
    },
    {
        questionURL: "./pictures/theRevenant.jpg",
        type: "img",
        answers:[
            {text:"Django Unchained", correct: false},
            {text:"The Revenant", correct: true},
            {text:"Once Upon a Time in HollyWood", correct: false},
            {text:"Titanic", correct: false}
        ]
    },
    {
        questionURL:"./pictures/run Forest.jpg",
        type: "img",
        answers: [
            {text:"Forrest Gump", correct: true},
            {text:"Big", correct: false},
            {text:"Cast Away", correct: false},
            {text:"Saving Private Ryan", correct: false},
        ]
    },
    {
        questionURL:"./pictures/the shining.jpg",
        type: "img",
        answers: [
            {text:"Scary Movie", correct: false},
            {text:"Horror", correct: false},
            {text:"The Shining", correct: true},
            {text:"A Nightmare on Elm Street", correct: false},
        ]
    },
    {
        question:`"Hasta la vista, baby."`,
        type: "text",
        answers: [
            {text:"The Godfather", correct: false},
            {text:"Instructions Not Included", correct: false},
            {text:"Terminator 2: Judgment Day", correct: true},
            {text:"The Fast and the Furious", correct: false},
        ]
    },
    {
        question:`"Houston, we have a problem."`,
        type: "text",
        answers: [
            {text:"Ad Astra", correct: false},
            {text:" Apollo 13", correct: true},
            {text:"Interstellar", correct: false},
            {text:"The Martian", correct: false},
        ]
    },
    {
        question:`“It's alive! It's alive!”`,
        type: "text",
        answers: [
            {text:"Van Helsing", correct: false},
            {text:"Frankenstein", correct: true},
            {text:"Zombieland", correct: false},
            {text:"28 Weeks Later", correct: false},
        ]
    },
    {
        question:`“May the Force be with you.”`,
        type: "text",
        answers: [
            {text:"the Gladiator", correct: false},
            {text:"Star Wars", correct: true},
            {text:"Star Treck", correct: false},
            {text:"Train to Busan", correct: false},
        ]
    },
    {
        question:` "I'm having an old friend for dinner."`,
        type: "text",
        answers: [
            {text:"The Silence of the Lambs", correct: true},
            {text:"Gravity", correct: false},
            {text:"Birdman", correct: false},
            {text:"Into the Woods", correct: false},
        ]
    },
    {
        question:`"Keep your friends close, but your enemies closer."`,
        type: "text",
        answers: [
            {text:"The Godfather, Part II", correct: true},
            {text:"The Godfather, Part I", correct: false},
            {text:"Inglourious Basterds", correct: false},
            {text:"Up in the Air", correct: false},
        ]
    },
    {
        question:`"Frankly, my dear, I don't give a damn."`,
        type: "text",
        answers: [
            {text:"Gone With the Wind", correct: true},
            {text:"The Godfather, Part I", correct: false},
            {text:"Scarface", correct: false},
            {text:"Sherlock Holmes", correct: false},
        ]
    },
    {
        questionSRC:"./sondtrack/jamesbond.mp3",
        type: "sound",
        answers:[
            {text:"James Bond", correct: true},
            {text:"A Star is Born", correct: false},
            {text:"Knives Out", correct: false},
            {text:"Mission:Impossible", correct:false}
        ]
    },
    {
        questionSRC:"./sondtrack/piratesofthecaribbean.mp3",
        type: "sound",
        answers:[
            {text:"Pirates of the Caribbean", correct: true},
            {text: "The Game of Thrones", correct: false},
            {text:"Dunkirk", correct: false},
            {text:"Arrival", correct:false}
        ]
    },
    {
        questionSRC:"./sondtrack/titanic.mp3",
        type: "sound",
        answers:[
            {text: "Logan", correct: false},
            {text:"Argo", correct: false},
            {text:"The Titanic", correct: true},
            {text:"La La Land", correct:false}
        ]
    },
    {
        questionSRC:"./sondtrack/XFiles.mp3",
        type: "sound",
        answers:[
            {text: "The X-Files", correct: true},
            {text:"Alien", correct: false},
            {text:"Coco", correct: false},
            {text:"Casablanca", correct:false}
        ]
    }    
];
