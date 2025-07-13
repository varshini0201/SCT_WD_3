document.addEventListener("DOMContentLoaded", function () {
  // Background gradients
  const backgrounds = [
    "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  ];

  // Utility: Shuffle array (Fisher-Yates)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Questions
  const questions = [
    {
      type: "single",
      question: " Which tag is used to insert a line break in HTML?",
      options: ["&lt;break&gt;", "&lt;lb&gt;", "&lt;br&gt;", "&lt;line&gt;"],
      answer: "&lt;br&gt;",
      marks: 10
    },
    {
      type: "multi",
      question: " Which of these are valid CSS properties?",
      options: ["color", "margin", "blink", "align"],
      answer: ["color", "margin"],
      marks: 10
    },
    {
      type: "text",
      question: " Fill in the blank: JavaScript is a ___-side scripting language.",
      answer: "client",
      marks: 10
    },
    {
      type: "single",
      question: " What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Mode",
        "Document Orientation Model",
        "Data Output Management"
      ],
      answer: "Document Object Model",
      marks: 10
    },
    {
      type: "multi",
      question: "Which are valid JavaScript data types?",
      options: ["string", "number", "character", "boolean"],
      answer: ["string", "number", "boolean"],
      marks: 10
    },
    {
      type: "text",
      question: "Fill in: CSS stands for ___ Style Sheets.",
      answer: "cascading",
      marks: 10
    },
    {
      type: "single",
      question: " Which of the following is NOT a JavaScript framework?",
      options: ["React", "Angular", "Vue", "Django"],
      answer: "Django",
      marks: 10
    },
    {
      type: "multi",
      question: " Which languages are used in front-end development?",
      options: ["HTML", "JavaScript", "PHP", "CSS"],
      answer: ["HTML", "JavaScript", "CSS"],
      marks: 10
    },
    {
      type: "text",
      question: " What keyword is used to declare a variable in JavaScript (ES6)?",
      answer: "let",
      marks: 10
    },
    {
      type: "single",
      question: " What is the output of: typeof null?",
      options: ["object", "null", "undefined", "number"],
      answer: "object",
      marks: 10
    }
  ];

  let index = 0;
  let totalScore = 0;

  const questionText = document.getElementById("question-text");
  const optionsBox = document.getElementById("options-box");
  const textInput = document.getElementById("text-input");
  const nextBtn = document.getElementById("next-btn");
  const scoreSection = document.getElementById("score-section");
  const scoreDisplay = document.getElementById("score-display");

  shuffleArray(questions); // Shuffle questions before starting
  loadQuestion();

  function loadQuestion() {
    const q = questions[index];
    questionText.innerHTML = q.question;
    optionsBox.innerHTML = "";
    textInput.classList.add("hide");
    optionsBox.classList.remove("hide");

    // Change background color
    document.body.style.background = backgrounds[index % backgrounds.length];

    if (q.type === "single" || q.type === "multi") {
      const shuffledOptions = [...q.options];
      shuffleArray(shuffledOptions); // Shuffle options (optional)

      shuffledOptions.forEach(option => {
        const div = document.createElement("div");
        div.classList.add("option");

        const inputType = q.type === "multi" ? "checkbox" : "radio";
        const nameAttr = q.type === "multi" ? "" : `name="option"`;

        div.innerHTML = `<label><input type="${inputType}" value="${option}" ${nameAttr}/> ${option}</label>`;
        optionsBox.appendChild(div);
      });
    }

    if (q.type === "text") {
      textInput.value = "";
      textInput.classList.remove("hide");
      optionsBox.classList.add("hide");
    }
  }

  function checkAnswer() {
    const q = questions[index];
    let isCorrect = false;

    if (q.type === "single") {
      const selected = document.querySelector('input[name="option"]:checked');
      if (selected && selected.value === q.answer) isCorrect = true;

    } else if (q.type === "multi") {
      const selected = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(i => i.value);
      if (arraysEqualIgnoreOrder(selected, q.answer)) isCorrect = true;

    } else if (q.type === "text") {
      if (textInput.value.trim().toLowerCase() === q.answer.toLowerCase()) isCorrect = true;
    }

    if (isCorrect) {
      totalScore += q.marks;
    }
  }

  function arraysEqualIgnoreOrder(a, b) {
    return a.length === b.length && a.every(item => b.includes(item));
  }

  nextBtn.addEventListener("click", () => {
    checkAnswer();
    index++;
    if (index < questions.length) {
      loadQuestion();
    } else {
      document.getElementById("quiz-box").classList.add("hide");
      scoreSection.classList.remove("hide");
      scoreDisplay.innerText = `You scored ${totalScore} out of 100! 🎉`;
    }
  });
});
