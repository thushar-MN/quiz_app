const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let curretQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "what is highest individual score in cricket?",
    choice1: "289",
    choice2: "398",
    choice3: "400",
    choice4: "500",
    answer: 3,
  },
  {
    question: "who is known as the father of modern olympics?",
    choice1: "johnes sipher",
    choice2: "brett harris",
    choice3: "pierre de coUbertin",
    choice4: "ronaldho",
    answer: 3,
  },
  {
    question: "how many centuries sachin have ?(in ODI)",
    choice1: "51",
    choice2: "41",
    choice3: "42",
    choice4: "58",
    answer: 1,
  },
  {
    question: "'Magnus Carlsen' is associated with which sports?",
    choice1: "vollyball",
    choice2: "chess",
    choice3: "kho-kho",
    choice4: "table-tennis",
    answer: 2,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions == 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  curretQuestion = availableQuestions[questionsIndex];
  question.innerText = curretQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = curretQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == curretQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
startGame();
