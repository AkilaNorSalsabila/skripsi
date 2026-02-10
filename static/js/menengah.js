// ==========================
// FORCE RESET BANK SOAL (DEV MODE)
// ==========================
const MENENGAH_QUESTION_VERSION = "v7";

if (localStorage.getItem("MENENGAH_Q_VERSION") !== MENENGAH_QUESTION_VERSION) {
  localStorage.removeItem("menengahQuestions");
  localStorage.removeItem("menengahCurrent");
  localStorage.removeItem("menengahScore");
  localStorage.setItem("MENENGAH_Q_VERSION", MENENGAH_QUESTION_VERSION);
}

// ==================
// MENENGAH GAME JS
// ==================
localStorage.setItem("lastLevel", "menengah");

let score = parseInt(localStorage.getItem("menengahScore") || "0", 10);
let currentQuestion = parseInt(localStorage.getItem("menengahCurrent") || "0", 10);
const language = localStorage.getItem("gameLang") || "id";

// ==================
// TIMER VARIABLES
// ==================
let timerInterval;
let timeLeft = 20;
let timeExpired = false;

// ==================
// TOUCH SUPPORT
// ==================
let draggedElement = null;
let touchClone = null;

// ==================
// ELEMENT & AUDIO
// ==================
const siluetContainer = document.getElementById("siluet-container");
const pilihanContainer = document.getElementById("pilihan-container");
const progressText = document.getElementById("progress");
const sfxCorrect = document.getElementById("sfx-correct");
const sfxWrong = document.getElementById("sfx-wrong");
const instructionEl = document.getElementById("title-text");
const sayurAudio = document.getElementById("sayurAudio") || new Audio();

const sfxDanger = new Audio("/static/sounds/Timer.mp3");
sfxDanger.loop = true;

// ==================
// TRANSLATION
// ==================
const translations = {
  id: { instruction: "Cocokkan<br>sayuran ini", time: "Waktu" },
  en: { instruction: "Match<br>the Vegetables", time: "Time" }
};
instructionEl.innerHTML = translations[language].instruction;

// ==========================
// SHUFFLE FUNCTION
// ==========================
function shuffle(arr) {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ==========================
// LEVEL FLOW RANDOM SYSTEM (FINAL)
// ==========================
let allQuestions = JSON.parse(localStorage.getItem("menengahQuestions"));

if (!allQuestions) {
  const sm = shuffle(SangatMudah);
  const m = shuffle(Mudah);
  const mid = shuffle(Menengah);
  const ms = shuffle(MenengahKeSulit);
  const h = shuffle(sulit);

  allQuestions = [sm[0], m[0], mid[0], ms[0], h[0]];

  localStorage.setItem("menengahQuestions", JSON.stringify(allQuestions));
  localStorage.setItem("menengahCurrent", "0");
  localStorage.setItem("menengahScore", "0");

  currentQuestion = 0;
  score = 0;
}

const totalQuestions = allQuestions.length;

// ==================
// TIMER LOGIC
// ==================
function startTimer() {
  stopTimer();
  timeLeft = 20;
  timeExpired = false;
  renderTimer();

  timerInterval = setInterval(() => {
    timeLeft--;
    renderTimer();
    if (timeLeft <= 0) {
      stopTimer();
      timeExpired = true;
      onTimeUp();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
  resetDangerEffects();
}

function resetDangerEffects() {
  const el = document.getElementById("timer");
  el?.classList.remove("timer-danger");
  document.body.classList.remove("screen-danger-active");
  sfxDanger.pause();
  sfxDanger.currentTime = 0;
}

function renderTimer() {
  const el = document.getElementById("timer");
  if (!el) return;

  el.textContent = `${translations[language].time} 00:${String(timeLeft).padStart(2, "0")}`;

  if (timeLeft <= 5 && timeLeft > 0) {
    el.classList.add("timer-danger");
    document.body.classList.add("screen-danger-active");
    if (sfxDanger.paused) sfxDanger.play().catch(() => {});
  } else {
    resetDangerEffects();
  }
}

function onTimeUp() {
  score = Math.max(0, score - 20);
  localStorage.setItem("menengahScore", score);

  if (sfxWrong) sfxWrong.play();
  showWrongOverlay("⏱️", language === "id" ? "Waktu Habis!" : "Time's Up!");

  setTimeout(() => {
    hideWrongOverlay();
    nextQuestion();
  }, 1500);
}

// ==================
// GAME FLOW
// ==================
function loadQuestion() {
  if (currentQuestion >= totalQuestions) {
    finishGame();
    return;
  }

  siluetContainer.innerHTML = "";
  pilihanContainer.innerHTML = "";

  if (progressText) {
    progressText.textContent =
      `${language === "id" ? "Soal" : "Question"} ${currentQuestion + 1}/${totalQuestions}`;
  }

  startTimer();
}

function nextQuestion() {
  currentQuestion++;
  localStorage.setItem("menengahCurrent", currentQuestion);
  loadQuestion();
}

function finishGame() {
  localStorage.setItem("finalScore", score);
  localStorage.setItem("correctCount", Math.floor(score / 20));
  localStorage.setItem("totalQuestions", totalQuestions);

  setTimeout(() => {
    window.location.href = "/skor";
  }, 300);
}

// ==================
// INITIALIZATION
// ==================
window.onload = () => {
  loadQuestion();
};

// ==================
// BACK BUTTON (SATU-SATUNYA RESET)
// ==================
const btnBack = document.getElementById("btn-back");
if (btnBack) {
  btnBack.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("menengahQuestions");
    localStorage.removeItem("menengahCurrent");
    localStorage.removeItem("menengahScore");
    localStorage.removeItem("lastLevel");
    window.location.href = "/pilih_level";
  });
}

// ==================
// SPEAK BUTTON
// ==================
const btnSpeak = document.getElementById("btn-speak");
if (btnSpeak) {
  btnSpeak.addEventListener("click", () => playInstructionAudio());
}
