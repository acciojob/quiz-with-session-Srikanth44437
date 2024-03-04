const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];


// Function to load questions into the div with id "questions"
function loadQuestions() {
  const questionsDiv = document.getElementById("questions");

  questions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.innerHTML = `<p>${q.question}</p>`;
      
      q.choices.forEach((choice, choiceIndex) => {
          const label = document.createElement("label");
          const radio = document.createElement("input");
          radio.type = "radio";
          radio.name = `question${index}`;
          radio.value = choice;
          label.appendChild(radio);
          label.innerHTML += choice;

          // Retrieve user's choice from session storage
          const savedChoice = sessionStorage.getItem(`progress_${index}`);
          if (savedChoice && savedChoice === choice) {
              radio.checked = true;
          }

          questionDiv.appendChild(label);
      });

      questionsDiv.appendChild(questionDiv);
  });
}

// Function to save progress in session storage
function saveProgress() {
  const questionsDiv = document.getElementById("questions");

  questionsDiv.addEventListener("change", function (event) {
      if (event.target.type === "radio") {
          const questionIndex = event.target.name.replace("question", "");
          sessionStorage.setItem(`progress_${questionIndex}`, event.target.value);
      }
  });
}

// Function to submit the quiz and display the score
function submitQuiz() {
  const score = calculateScore();
  const scoreDiv = document.getElementById("score");
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save the score in local storage
  localStorage.setItem("score", score);
}

// Function to calculate the score
function calculateScore() {
  let score = 0;

  questions.forEach((q, index) => {
      const userChoice = sessionStorage.getItem(`progress_${index}`);
      if (userChoice && userChoice === q.correctAnswer) {
          score++;
      }
  });

  return score;
}

// Load questions and save progress on page load
document.addEventListener("DOMContentLoaded", function () {
  loadQuestions();
  saveProgress();

  // Add click event to the submit button
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", submitQuiz);
});