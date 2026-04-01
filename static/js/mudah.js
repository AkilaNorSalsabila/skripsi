const lang = localStorage.getItem("gameLang") || "id";
let timeLeft = 20;
let timerInterval;
let isAnswered = false;

function formatTime(seconds) {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function startTimer() {
  stopTimer();
  timeLeft = 20;
  isAnswered = false;

  const timerEl = document.getElementById("timer");

  function updateTimerDisplay() {
    if (!timerEl) return;
    const label = (lang === "id") ? "Waktu" : "Time";
    timerEl.textContent = `${label} ${formatTime(timeLeft)}`;
    if (timeLeft <= 5 && timeLeft > 0) {
      timerEl.classList.add("timer-danger");
      document.body.classList.add("screen-danger-active");
    } else {
      timerEl.classList.remove("timer-danger");
      document.body.classList.remove("screen-danger-active");
    }
  }

  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      stopTimer();
      onTimeUp();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

const toastEl = document.getElementById("toast");
const sfxCorrect = document.getElementById("sfx-correct");
const sfxWrong = document.getElementById("sfx-wrong");
const idPlayer = document.getElementById("id-player");
const optionsContainer = document.getElementById("options");
const vegImage = document.getElementById("veg-image");
const titleText = document.getElementById("title-text");
const btnBack = document.getElementById("btn-back");
const speakBtn = document.getElementById("btn-speak");

if (speakBtn) speakBtn.addEventListener("click", speakInstruksi);
localStorage.setItem("lastLevel", "mudah");

const texts = {
  id: "pilih nama<br>sayuran ini",
  en: "choose the name<br>of this vegetable"
};

const totalQuestions = 5;

// --- DATA BANK SOAL ---
const bankSangatMudah = [
  { image: "/static/img/tomat.png", correctAnswer: { id: "Tomat", en: "Tomato" }, answers: { id: ["Tomat", "Brokoli", "Wortel"], en: ["Tomato", "Broccoli", "Carrot"] } },
  { image: "/static/img/wortel.png", correctAnswer: { id: "Wortel", en: "Carrot" }, answers: { id: ["Wortel", "Terong", "Kubis"], en: ["Carrot", "Eggplant", "Cabbage"] } },
  { image: "/static/img/kentang.png", correctAnswer: { id: "Kentang", en: "Potato" }, answers: { id: ["Kentang", "Paprika", "Bayam"], en: ["Potato", "Bell Pepper", "Spinach"] } },
  { image: "/static/img/terong.png", correctAnswer: { id: "Terong", en: "Eggplant" }, answers: { id: ["Terong", "Paprika", "Sawi Putih"], en: ["Eggplant", "Bell Pepper", "Chinese Cabbage"] } },
  { image: "/static/img/broccoli.png", correctAnswer: { id: "Brokoli", en: "broccoli" }, answers: { id: ["Brokoli", "Cabai rawit", "Kentang"], en: ["Broccoli", "Bird's Eye Chili", "Potato"] } },
  { image: "/static/img/mentimun.png", correctAnswer: { id: "Mentimun", en: "Cucumber" }, answers: { id: ["Mentimun", "Wortel", "Paprika"], en: ["Cucumber", "Carrot", "Bell Pepper"] } }
];

const bankMudah = [
  { image: "/static/img/oyong.png", correctAnswer: { id: "Oyong", en: "luffa" }, answers: { id: ["Oyong", "Mentimun", "Labu Siam"], en: ["Luffa", "Cucumber", "Chayote"] } },
  { image: "/static/img/labu_siam.png", correctAnswer: { id: "Labu Siam", en: "Chayote" }, answers: { id: ["Labu Siam", "Oyong", "Mentimun"], en: ["Chayote", "Luffa", "Cucumber"] } },
  { image: "/static/img/buncis.png", correctAnswer: { id: "Buncis", en: "Green Beans" }, answers: { id: ["Buncis", "Kacang Panjang", "Asparagus"], en: ["Green Beans", "Yardlong Beans", "Asparagus"] } },
  { image: "/static/img/kacang_panjang.png", correctAnswer: { id: "Kacang Panjang", en: "Yardlong Beans" }, answers: { id: ["Kacang Panjang", "Buncis", "Asparagus"], en: ["Yardlong Beans", "Green Bean", "Asparagus"] } },
  { image: "/static/img/cabai_rawit.png", correctAnswer: { id: "Cabai Rawit", en: "Bird's Eye Chili" }, answers: { id: ["Cabai Rawit", "Paprika", "Tomat"], en: ["Bird's Eye Chili", "Bell Pepper", "Tomato"] } },
  { image: "/static/img/paprika.png", correctAnswer: { id: "Paprika", en: "Bell Pepper" }, answers: { id: ["Paprika", "Tomat", "Wortel"], en: ["Bell Pepper", "Tomato", "Carrot"] } }
];

const bankSedang = [
  { image: "/static/img/bayam.png", correctAnswer: { id: "Bayam", en: "Spinach" }, answers: { id: ["Bayam", "Kangkung", "Sawi Hijau"], en: ["Spinach", "Water Spinach", "Mustard Greens"] } },
  { image: "/static/img/kangkung.png", correctAnswer: { id: "Kangkung", en: "Water Spinach" }, answers: { id: ["Kangkung", "Kubis", "Sawi Hijau"], en: ["Water Spinach", "Cabbage", "Mustard Greens"] } },
  { image: "/static/img/sawi_hijau.png", correctAnswer: { id: "Sawi Hijau", en: "Mustard Greens" }, answers: { id: ["Sawi Hijau", "Selada", "Bayam"], en: ["Mustard Greens", "Lettuce", "Spinach"] } },
  { image: "/static/img/sawi_putih.png", correctAnswer: { id: "Sawi Putih", en: "Chinese Cabbage" }, answers: { id: ["Sawi Putih", "Kubis", "Sawi Hijau"], en: ["Chinese Cabbage", "Cabbage", "Mustard Greens"] } },
  { image: "/static/img/kubis.png", correctAnswer: { id: "Kubis", en: "Cabbage" }, answers: { id: ["Kubis", "Sawi Putih", "Kangkung"], en: ["Cabbage", "Chinese Cabbage", "Water Spinach"] } },
  { image: "/static/img/selada.png", correctAnswer: { id: "Selada", en: "Lettuce" }, answers: { id: ["Selada", "Kubis", "Sawi Putih"], en: ["Lettuce", "Cabbage", "Chinese Cabbage"] } }
];

const bankSedangkeSulit = [
  { image: "/static/img/daun_pakis.png", correctAnswer: { id: "Daun Pakis", en: "Fiddlehead Fern" }, answers: { id: ["Daun Pakis", "Bawang Daun", "Selada"], en: ["Fiddlehead Fern", "Leek", "Lettuce"] } },
  { image: "/static/img/asparagus.png", correctAnswer: { id: "Asparagus", en: "Asparagus" }, answers: { id: ["Asparagus", "Kacang Panjang", "Buncis"], en: ["Asparagus", "Yardlong Bean", "Green Bean"] } },
  { image: "/static/img/rebung.png", correctAnswer: { id: "Rebung", en: "Bamboo Shoot" }, answers: { id: ["Rebung", "Wortel", "Lobak"], en: ["Bamboo Shoot", "Carrot", "Radish"] } },
  { image: "/static/img/jantung_pisang.png", correctAnswer: { id: "Jantung Pisang", en: "Banana Blossom" }, answers: { id: ["Jantung Pisang", "Jamur Kancing", "Rebung"], en: ["Banana Blossom", "Button Mushroom", "Bamboo Shoot"] } }
];

const bankSulit = [
  { image: "/static/img/lobak.png", correctAnswer: { id: "Lobak", en: "Radish" }, answers: { id: ["Lobak", "Kentang", "Wortel"], en: ["Radish", "Potato", "Carrot"] } },
  { image: "/static/img/bit_merah.png", correctAnswer: { id: "Bit Merah", en: "Beetroot" }, answers: { id: ["Bit Merah", "Bawang Merah", "Bawang Bombay"], en: ["Beetroot", "Shallot", "Onion"] } },
  { image: "/static/img/jamur_kancing.png", correctAnswer: { id: "Jamur Kancing", en: "Button Mushroom" }, answers: { id: ["Jamur Kancing", "Jantung Pisang", "Bawang Bombay"], en: ["Button Mushroom", "Banana Blossom", "Onion"] } },
  { image: "/static/img/bawang_merah.png", correctAnswer: { id: "Bawang Merah", en: "Shallot" }, answers: { id: ["Bawang Merah", "Bawang Putih", "Bawang Bombay"], en: ["Shallot", "Garlic", "Onion"] } },
  { image: "/static/img/bawang_putih.png", correctAnswer: { id: "Bawang Putih", en: "Garlic" }, answers: { id: ["Bawang Putih", "Bawang Merah", "Bawang Bombay"], en: ["Garlic", "Shallot", "Onion"] } },
  { image: "/static/img/bawang_bombay.png", correctAnswer: { id: "Bawang Bombay", en: "Onion" }, answers: { id: ["Bawang Bombay", "Bawang Merah", "Bawang Putih"], en: ["Onion", "Shallot", "Garlic"] } }
];

// --- LOGIKA SESI ---
let sessionQuestions = JSON.parse(localStorage.getItem("sessionQuestions")) || [];
let currentIndex = parseInt(localStorage.getItem("currentIndex") || "0");
let correctCount = parseInt(localStorage.getItem("correctCount") || "0", 10);
let shuffledOpts = [];

if (sessionQuestions.length === 0) {
  function getRandomFrom(array) { return array[Math.floor(Math.random() * array.length)]; }
  sessionQuestions = [
    getRandomFrom(bankSangatMudah),
    getRandomFrom(bankMudah),
    getRandomFrom(bankSedang),
    getRandomFrom(bankSedangkeSulit),
    getRandomFrom(bankSulit)
  ];
  localStorage.setItem("sessionQuestions", JSON.stringify(sessionQuestions));
  currentIndex = 0;
  correctCount = 0;
}

// --- FUNGSI LOAD SOAL ---
function loadQuestion() {
  isAnswered = false;
  stopTimer();

  const timerEl = document.getElementById("timer");
  if (timerEl) {
    timerEl.classList.remove("timer-danger");
    const label = (lang === "id") ? "Waktu" : "Time";
    timerEl.textContent = `${label} 00:20`;
  }
  document.body.classList.remove("screen-danger-active");

  if (btnBack) btnBack.style.display = (currentIndex === 0) ? "block" : "none";

  let question = sessionQuestions[currentIndex];
  vegImage.src = question.image;
  titleText.innerHTML = texts[lang];

  optionsContainer.innerHTML = "";
  shuffledOpts = [...question.answers[lang]].sort(() => 0.5 - Math.random());

  shuffledOpts.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt.toLowerCase();

    btn.addEventListener("click", (e) => {
      // ✨ Efek Ripple — selalu jalan meski sudah dijawab
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);

      if (isAnswered) return;
      isAnswered = true;

      stopTimer();
      stopAllSounds();

      const isCorrect = opt.toLowerCase() === question.correctAnswer[lang].toLowerCase();

      if (isCorrect) {
        if (sfxCorrect) { sfxCorrect.currentTime = 0; sfxCorrect.play(); }
        correctCount++;
        localStorage.setItem("correctCount", correctCount);
        localStorage.setItem("notifVeg", JSON.stringify({ id: question.correctAnswer.id, en: question.correctAnswer.en, img: question.image }));
        setTimeout(() => { window.location.href = "/tebaknama_notif"; }, 800);
      } else {
        if (sfxWrong) { sfxWrong.currentTime = 0; sfxWrong.play(); }
        const gameEl = document.getElementById("game");
        if (gameEl) {
          gameEl.classList.remove("shake");
          void gameEl.offsetWidth;
          gameEl.classList.add("shake");
        }
        showWrongOverlay("✖", (lang === "id" ? "Salah!" : "Wrong!"));
        setTimeout(() => { hideWrongOverlay(); nextQuestion(); }, 1200);
      }
    });

    optionsContainer.appendChild(btn);
  });

  document.getElementById("progress").textContent = `Soal ${currentIndex + 1}/${totalQuestions}`;

  setTimeout(speakInstruksi, 600);

  setTimeout(() => {
    if (!isAnswered) {
      startTimer();
    }
  }, 8000);
}

// --- AUDIO LOGIC ---
function speakInstruksi() {
  stopAllSounds();
  let path = (lang === "en") ? "/static/sounds/En/Tebak nama.mp3" : "/static/sounds/id/ui/pilih_nama.mp4";
  idPlayer.src = path;
  idPlayer.play().then(() => {
    idPlayer.onended = () => { setTimeout(() => playOptionsSequentially(0), 400); };
  }).catch(() => {
    if (lang === "id") {
      idPlayer.src = "/static/sounds/id/ui/pilih_nama.mp4";
      idPlayer.play().then(() => { idPlayer.onended = () => playOptionsSequentially(0); }).catch(() => playOptionsSequentially(0));
    } else { playOptionsSequentially(0); }
  });
}

function playOptionsSequentially(idx) {
  if (idx >= shuffledOpts.length || isAnswered) return;
  const currentOption = shuffledOpts[idx];
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => {
    if (btn.textContent.toLowerCase() === currentOption.toLowerCase()) {
      btn.classList.add("zoom-active");
      setTimeout(() => btn.classList.remove("zoom-active"), 1000);
    }
  });
  let folder = (lang === "en") ? "En" : "id/options";
  let fileName = (lang === "en") ? sessionQuestions[currentIndex].answers.id[sessionQuestions[currentIndex].answers.en.indexOf(currentOption)] : currentOption;
  idPlayer.src = `/static/sounds/${folder}/${fileName}.mp3`;
  idPlayer.play().then(() => {
    idPlayer.onended = () => playOptionsSequentially(idx + 1);
  }).catch(() => {
    if (lang === "id") {
      idPlayer.src = `/static/sounds/${folder}/${fileName}.mp4`;
      idPlayer.play().then(() => { idPlayer.onended = () => playOptionsSequentially(idx + 1); }).catch(() => playOptionsSequentially(idx + 1));
    } else { playOptionsSequentially(idx + 1); }
  });
}

function stopAllSounds() {
  idPlayer.pause();
  idPlayer.currentTime = 0;
  idPlayer.onended = null;
}

function onTimeUp() {
  if (isAnswered) return;
  isAnswered = true;
  stopTimer();
  stopAllSounds();
  if (sfxWrong) { sfxWrong.currentTime = 0; sfxWrong.play(); }
  const gameEl = document.getElementById("game");
  if (gameEl) {
    gameEl.classList.remove("shake");
    void gameEl.offsetWidth;
    gameEl.classList.add("shake");
  }
  showWrongOverlay("⏰", (lang === "id" ? "Waktu habis!" : "Time's up!"));
  setTimeout(() => { hideWrongOverlay(); nextQuestion(); }, 1200);
}

function nextQuestion() {
  stopTimer();
  currentIndex++;
  localStorage.setItem("currentIndex", currentIndex);
  if (currentIndex >= totalQuestions) {
    localStorage.setItem("finalScore", correctCount * 20);
    localStorage.removeItem("sessionQuestions");
    localStorage.removeItem("currentIndex");
    setTimeout(() => { window.location.href = "/skor"; }, 800);
  } else {
    loadQuestion();
  }
}

function showWrongOverlay(icon, text) {
  const overlay = document.getElementById("wrong-overlay");
  document.getElementById("wrong-text").textContent = text;
  overlay.querySelector("h1").textContent = icon;
  overlay.classList.remove("hidden");
}

function hideWrongOverlay() {
  const overlay = document.getElementById("wrong-overlay");
  if (overlay) overlay.classList.add("hidden");
}

window.addEventListener("load", loadQuestion);