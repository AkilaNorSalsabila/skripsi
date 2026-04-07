const lang = localStorage.getItem("gameLang") || "id";
const toastEl = document.getElementById("toast");
const sfxCorrect = document.getElementById("sfx-correct");
const sfxWrong   = document.getElementById("sfx-wrong");
const speakBtn = document.getElementById("btn-speak");
speakBtn.addEventListener("click", speakInstruksi);
localStorage.setItem("lastLevel", "mudah");

// Background Music
const bgMusic = new Audio("/static/sounds/hewan/effect/1.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.05;

const idPlayer         = document.getElementById("id-player");
const optionsContainer = document.getElementById("options");
const animal_img       = document.getElementById("animal-image");
const titleText        = document.getElementById("title-text");

const texts = {
  id: "Ayo Tebak Nama<br>Hewan Ini",
  en: "Lets Guess The Name<br>Of This Animal"
};

const totalQuestions = 5;
const questionBank = {
  sangatMudah: [
    
    {
      image: "/static/img/hewan/data_hewan/anjing.png",
      correctAnswer: { id: "Anjing", en: "Dog" },
      answers: {
        id: ["Anjing", "Paus", "Monyet"],
        en: ["Dog", "Whale", "Monkey"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/kucing.png",
      correctAnswer: { id: "Kucing", en: "Cat" },
      answers: {
        id: ["Kucing", "Ayam", "Zebra"],
        en: ["Cat", "Chicken", "Zebra"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/ayam.png",
      correctAnswer: { id: "Ayam", en: "Chicken" },
      answers: {
        id: ["Ayam", "Paus", "Elang"],
        en: ["Chicken", "Whale", "Eagle"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/gajah.png",
      correctAnswer: { id: "Gajah", en: "Elephant" },
      answers: {
        id: ["Gajah", "Bunglon", "Katak"],
        en: ["Elephant", "Chameleon", "Frog"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/monyet.png",
      correctAnswer: { id: "Monyet", en: "Monkey" },
      answers: {
        id: ["Monyet", "Hiu", "Ayam"],
        en: ["Monkey", "Shark", "Chicken"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/jerapah.png",
      correctAnswer: { id: "Jerapah", en: "Giraffe" },
      answers: {
        id: ["Jerapah", "Ayam", "Kucing"],
        en: ["Giraffe", "Chicken", "Cat"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/kura.png",
      correctAnswer: { id: "Kura-Kura", en: "Turtle" },
      answers: {
        id: ["Kura-Kura", "Lebah", "Katak"],
        en: ["Turtle", "Bee", "Frog"]
      }
    },
  ],
  mudah: [
    {
      image: "/static/img/hewan/data_hewan/harimau.png",
      correctAnswer: { id: "Harimau", en: "Tiger" },
      answers: {
        id: ["Kucing", "Harimau", "Pinguin"],
        en: ["Cat", "Tiger", "Penguin"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/zebra.png",
      correctAnswer: { id: "Zebra", en: "Zebra" },
      answers: {
        id: ["Harimau", "Zebra", "Paus"],
        en: ["Tiger", "Zebra", "Whale"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/bintang_laut.png",
      correctAnswer: { id: "Bintang Laut", en: "Starfish" },
      answers: {
        id: ["Elang", "Bintang Laut", "Ubur-Ubur"],
        en: ["Eagle", "Starfish", "Jellyfish"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/pinguin.png",
      correctAnswer: { id: "Pinguin", en: "Penguin" },
      answers: {
        id: ["Anjing Laut", "Pinguin", "Ayam"],
        en: ["Seal", "Penguin", "Chicken"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/katak.png",
      correctAnswer: { id: "Katak", en: "Frog" },
      answers: {
        id: ["Kura-Kura", "Katak", "Hiu"],
        en: ["Turtle", "Frog", "Shark"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/hiu.png",
      correctAnswer: { id: "Hiu", en: "Shark" },
      answers: {
        id: ["Gurita", "Hiu", "Lumba-Lumba"],
        en: ["Octopus", "Shark", "Dolphin"]
      }
    },
     {
      image: "/static/img/hewan/data_hewan/kupu.png",
      correctAnswer: { id: "Kupu-Kupu", en: "Butterfly" },
      answers: {
        id: ["Lebah", "Kupu-Kupu", "Ayam"],
        en: ["Bee", "Butterfly", "Chicken"]
      }
    },
  ],
  sedang: [
    {
      image: "/static/img/hewan/data_hewan/unta.png",
      correctAnswer: { id: "Unta", en: "Camel" },
      answers: {
        id: ["Harimau", "Jerapah", "Unta"],
        en: ["Tiger", "Giraffe", "Camel"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/elang.png",
      correctAnswer: { id: "Elang", en: "Eagle" },
      answers: {
        id: ["Burung Hantu", "Cendrawasih", "Elang"],
        en: ["Owl", "Bird of Paradise", "Eagle"]
      }
    },
     {
      image: "/static/img/hewan/data_hewan/ubur_ubur.png",
      correctAnswer: { id: "Ubur-Ubur", en: "Jellyfish" },
      answers: {
        id: ["Bintang Laut", "Gurita", "Ubur-Ubur"],
        en: ["Starfish", "Octopus", "Jellyfish"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/lebah.png",
      correctAnswer: { id: "Lebah", en: "Bee" },
      answers: {
        id: ["Kupu-Kupu","Capung", "Lebah"],
        en: ["Butterfly", "Dragonfly", "Bee"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/lumba_lumba.png",
      correctAnswer: { id: "Lumba-Lumba", en: "Dolphin" },
      answers: {
        id: ["Paus", "Hiu", "Lumba-Lumba"],
        en: ["Whale", "Shark", "Dolphin"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/paus.png",
      correctAnswer: { id: "Paus", en: "Whale" },
      answers: {
        id: ["Lumba-Lumba", "Hiu", "Paus"],
        en: ["Dolphin", "Shark", "Whale"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/capung.png",
      correctAnswer: { id: "Capung", en: "Dragonfly" },
      answers: {
        id: ["Lebah", "Capung", "Kupu-Kupu"],
        en: ["Bee", "Dragonfly", "Butterfly"]
      }
    }
  ],
  sulit: [
    {
      image: "/static/img/hewan/data_hewan/badak.png",
      correctAnswer: { id: "Badak", en: "Rhinoceros" },
      answers: {
        id: ["Gajah", "Badak", "Unta"],
        en: ["Elephant", "Rhinoceros", "Camel"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/pari.png",
      correctAnswer: { id: "Pari", en: "Stingray" },
      answers: {
        id: ["Paus", "Pari", "Ubur-Ubur"],
        en: ["Whale", "Stingray", "Jellyfish"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/gurita.png",
      correctAnswer: { id: "Gurita", en: "Octopus" },
      answers: {
        id: ["Bintang Laut", "Gurita", "Ubur-Ubur"],
        en: ["Starfish", "Octopus", "Jellyfish"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/kuda_laut.png",
      correctAnswer: { id: "Kuda Laut", en: "Seahorse" },
      answers: {
        id: ["Gurita", "Kuda Laut", "Anjing Laut"],
        en: ["Octopus", "Seahorse", "Seal"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/owl.png",
      correctAnswer: { id: "Burung Hantu", en: "Owl" },
      answers: {
        id: ["Elang", "Cendrawasih", "Burung Hantu"],
        en: ["Eagle", "Bird of Paradise", "Owl"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/anjing_laut.png",
      correctAnswer: { id: "Anjing Laut", en: "Seal" },
      answers: {
        id: ["Lumba-Lumba", "Anjing Laut", "Pinguin"],
        en: ["Dolphin", "Seal", "Penguin"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/koi.png",
      correctAnswer: { id: "Koi", en: "Koi Fish" },
      answers: {
        id: ["Hiu", "Koi", "Lumba-Lumba"],
        en: ["Shark", "Koi Fish", "Dolphin"]
      }
    }
  ],
  sangatSulit: [
    {
      image: "/static/img/hewan/data_hewan/komodo.png",
      correctAnswer: { id: "Komodo", en: "Komodo Dragon" },
      answers: {
        id: ["Komodo", "Trenggiling", "Platipus"],
        en: ["Komodo Dragon", "Pangolin", "Platypus"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/merak.png",
      correctAnswer: { id: "Merak", en: "Peacock" },
      answers: {
        id: ["Merak", "Elang", "Cendrawasih"],
        en: ["Peacock", "Eagle", "Bird of Paradise"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/cendrawasih.png",
      correctAnswer: { id: "Cendrawasih", en: "Bird of Paradise" },
      answers: {
        id: ["Cendrawasih", "Elang", "Burung Hantu"],
        en: ["Bird of Paradise", "Eagle", "Owl"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/landak.png",
      correctAnswer: { id: "Landak", en: "Hedgehog" },
      answers: {
        id: ["Landak", "Trenggiling", "Bunglon"],
        en: ["Hedgehog", "Pangolin", "Chameleon"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/trenggiling.png",
      correctAnswer: { id: "Trenggiling", en: "Pangolin" },
      answers: {
        id: ["Trenggiling", "Landak", "Bunglon"],
        en: ["Pangolin", "Hedgehog", "Chameleon"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/bunglon.png",
      correctAnswer: { id: "Bunglon", en: "Chameleon" },
      answers: {
        id: ["Bunglon", "Landak", "Trenggiling"],
        en: ["Chameleon", "Hedgehog", "Pangolin"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/platipus.png",
      correctAnswer: { id: "Platipus", en: "Platypus" },
      answers: {
        id: ["Platipus", "Komodo", "Trenggiling"],
        en: ["Platypus", "Komodo Dragon", "Pangolin"]
      }
    }
  ]
};

// random soal
function getRandomQuestion(category) {
  const questions = questionBank[category];
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

// Generate 5 soal: 1 dari setiap kategori
function generateSessionQuestions() {
  const selectedQuestions = [];
  
  selectedQuestions.push(getRandomQuestion('sangatMudah'));
  selectedQuestions.push(getRandomQuestion('mudah'));
  selectedQuestions.push(getRandomQuestion('sedang'));
  selectedQuestions.push(getRandomQuestion('sulit'));
  selectedQuestions.push(getRandomQuestion('sangatSulit'));
  
  return selectedQuestions;
}

const allQuestions = []; 

let shuffledOpts = [];

let sessionQuestions =
  JSON.parse(localStorage.getItem("sessionQuestions_hewan_mudah")) || [];
let currentIndex =
  parseInt(localStorage.getItem("currentIndex_hewan_mudah") || "0", 10);
let correctCount =
  parseInt(localStorage.getItem("correctCount_hewan_mudah") || "0", 10);
localStorage.setItem("totalQuestions", totalQuestions);

// Timer variables
let timerInterval = null;
let timeRemaining = 0;
let timerElement = document.getElementById("timer");
const timePerQuestion = Array(totalQuestions).fill(15);
let timerStartedForQuestion = false;

if (sessionQuestions.length === 0) {
  sessionQuestions = generateSessionQuestions();
  localStorage.setItem(
    "sessionQuestions_hewan_mudah",
    JSON.stringify(sessionQuestions)
  );
  localStorage.setItem("currentIndex_hewan_mudah", "0");
  localStorage.setItem("correctCount_hewan_mudah", "0");

  currentIndex = 0;
  correctCount = 0;
}

function loadQuestion() {
  currentIndex = parseInt(
    localStorage.getItem("currentIndex_hewan_mudah") || "0",
    10
  );
  const question = sessionQuestions[currentIndex];
  if (!question) {
    finishGame();
    return;
  }

  animal_img.src = question.image;
  animal_img.alt = question.correctAnswer[lang];
  titleText.innerHTML = texts[lang];

  const opts = question.answers[lang];
  optionsContainer.innerHTML = "";
  const exitOverlay   = document.getElementById("exit-confirm");
  const cancelExitBtn = document.getElementById("cancel-exit");
  const confirmExitBtn = document.getElementById("confirm-exit");
  const exitConfirmText = document.getElementById("exit-confirm-text");
  if (exitConfirmText) {
    exitConfirmText.textContent = lang === "en" ? "Are you sure you want to end the game?" : "Yakin mengakhiri game?";
  }
  const backBtn = document.querySelector(".back-button");

  if (backBtn) {
    backBtn.onclick = (e) => {
      e.preventDefault();
      stopAllSounds();
      exitOverlay.classList.remove("hidden");
    };
  }

  cancelExitBtn.onclick = () => {
    exitOverlay.classList.add("hidden");
  };

  confirmExitBtn.onclick = () => {
    stopAllSounds();
    localStorage.removeItem("sessionQuestions_hewan_mudah");
    localStorage.removeItem("currentIndex_hewan_mudah");
    for (let i = 0; i < totalQuestions; i++) {
      localStorage.removeItem('timeRemaining_mudah_' + i);
    }
    window.location.href = "/game_hewan";
  };
  shuffledOpts = [...opts];

  shuffledOpts.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.dataset.correct =
      (opt === question.correctAnswer[lang]).toString();

    btn.addEventListener("click", () => {
      const allOptionButtons = optionsContainer.querySelectorAll(".option-btn");
      allOptionButtons.forEach((optionBtn) => {
        optionBtn.disabled = true;
        optionBtn.classList.remove("is-selected");
      });
      btn.classList.add("is-selected");

      stopAllSounds();
      localStorage.removeItem("timeRemaining_mudah_" + currentIndex);

      if (btn.dataset.correct === "true") {
        try { stopTimer(); } catch(e) {}
        localStorage.setItem(
          "notifAnm",
          JSON.stringify({
            id: question.correctAnswer.id,
            en: question.correctAnswer.en,
            img: question.image
          })
        );

        sfxCorrect.play();
    try { sfxCorrect.volume = 0.5; } catch(e) {}

        correctCount++;

        localStorage.setItem("correctCount_hewan_mudah", correctCount);
        localStorage.setItem(
          "currentIndex_hewan_mudah",
          currentIndex + 1
        );

        setTimeout(() => {
          window.location.href = "/notif_mudah";
        }, 900);
      } else {
        sfxWrong.play();

        const overlay =
          document.getElementById("wrong-overlay");

        overlay.classList.remove("hidden");

        setTimeout(() => {
          overlay.classList.add("hidden");

          if (currentIndex + 1 < totalQuestions) {
            localStorage.setItem(
              "currentIndex_hewan_mudah",
              currentIndex + 1
            );
            localStorage.removeItem("timeRemaining_mudah_" + currentIndex);
            window.location.href = "/hewan/tebak_nama";
          } else {
            finishGame();
          }
        }, 1500);
      }
    });

    optionsContainer.appendChild(btn);
  });

  document.getElementById(
    "progress"
  ).textContent = `Soal ${currentIndex + 1}/${totalQuestions}`;

  setTimeout(speakInstruksi, 500);
  timerStartedForQuestion = false;
  try {
    const saved = localStorage.getItem('timeRemaining_mudah_' + currentIndex);
    if (saved !== null && parseInt(saved, 10) > 0) {
      timeRemaining = parseInt(saved, 10);
    } else {
      timeRemaining = timePerQuestion[currentIndex] || 15;
    }
    updateTimerDisplay();
  } catch (e) {
  }
}

window.addEventListener("load", () => {
  bgMusic.play().catch(err => console.log("BG music error:", err));
  loadQuestion();
});

// Fungsi untuk menyelesaikan game dan menyimpan skor akhir
function finishGame() {
  const finalScore = Math.round(
    (correctCount / totalQuestions) * 100
  );

  localStorage.setItem("finalScore", finalScore);
  // clear namespaced session and score keys for this page
  localStorage.removeItem("sessionQuestions_hewan_mudah");
  localStorage.removeItem("currentIndex_hewan_mudah");
  localStorage.removeItem("correctCount_hewan_mudah");
  // clear per-question timers
  for (let i = 0; i < totalQuestions; i++) {
    localStorage.removeItem('timeRemaining_mudah_' + i);
  }

  window.location.href = "/skor_hewan";
}

// atur nama file audio
function normalizeFileName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '_')  
    .replace(/-/g, '_');   
}

// speak instruksi dan opsi
function speakInstruksi() {
  if (lang === "en") {
    idPlayer.src = "/static/sounds/hewan/tebak_nama/guess_name.m4a";
    try { idPlayer.volume = 1.0; } catch(e) {}
    idPlayer.play();

    idPlayer.onended = () => {
      playOptionsSequentially(shuffledOpts, "en");
    };
  } else {
    idPlayer.src = "/static/sounds/hewan/tebak_nama/tebak_nama.m4a";
    try { idPlayer.volume = 1.0; } catch(e) {}

    idPlayer.play();

    idPlayer.onended = () => {
      playOptionsSequentially(shuffledOpts, "id");
    };
  }
}

function playOptionsSequentially(options, lng) {
  let index = 0;
  const optionButtons = Array.from(document.querySelectorAll(".option-btn"));
  function playNext() {
    if (index < options.length) {
      const opt = options[index];
      
      const currentBtn = optionButtons.find(btn => btn.textContent === opt);
      if (currentBtn) {
        currentBtn.classList.add("pop-up-animation");
        setTimeout(() => {
          currentBtn.classList.remove("pop-up-animation");
        }, 600);
      }

      const fileName = normalizeFileName(opt);
      const folderLang = lng === "en" ? "en" : "in";
      const audioPath = `/static/sounds/hewan/animals/${folderLang}/${fileName}.m4a`;
      
      console.log(`Playing: ${audioPath} (Original: ${opt})`);
      
      idPlayer.src = audioPath;
      // start timer when the first option audio begins playing
      if (index === 0 && !timerStartedForQuestion) {
        timerStartedForQuestion = true;
        startTimerForIndex(currentIndex);
      }
      idPlayer.onerror = () => {
        console.error(`Audio gagal dimuat: ${audioPath}`);
        index++;
        playNext();
      };
      
      idPlayer.play().catch(err => {
        console.error(`Error playing audio: ${audioPath}`, err);
        index++;
        playNext(); 
      });
      
      index++;
      idPlayer.onended = playNext;
    }
  }

  playNext();
}

// Timer functions
function startTimerForIndex(index) {
  if (timerInterval) clearInterval(timerInterval);

  if (!timerElement) timerElement = document.getElementById('timer');

  const saved = localStorage.getItem('timeRemaining_mudah_' + index);
  if (saved !== null && parseInt(saved, 10) > 0) {
    timeRemaining = parseInt(saved, 10);
  } else {
    timeRemaining = timePerQuestion[index] || 15;
  }

  updateTimerDisplay();
  if (timerElement) timerElement.classList.remove('warning');

  timerInterval = setInterval(() => {
    timeRemaining--;
    localStorage.setItem('timeRemaining_mudah_' + index, timeRemaining);
    updateTimerDisplay();

    if (timeRemaining <= 5 && timerElement) timerElement.classList.add('warning');
    if (timeRemaining === 5) {
      try {
        const tickAudio = new Audio('/static/sounds/hewan/effect/tick.mp3');
        try { tickAudio.volume = 0.3; } catch(e) {}
        tickAudio.play().catch(() => {});
      } catch (e) {}
    }

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      handleTimeUp(index);
    }
  }, 1000);
}

function updateTimerDisplay() {
  if (!timerElement) timerElement = document.getElementById('timer');
  if (!timerElement) return;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerElement.textContent = `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function handleTimeUp(index) {
  stopTimer();
  try {
    const timesUpAudio = new Audio('/static/sounds/hewan/effect/timesup.mp3');
    try { timesUpAudio.volume = 0.3; } catch(e) {}
    timesUpAudio.play().catch(() => {});
    showTimeupOverlay();

    let processed = false;
    const fallback = setTimeout(() => {
      if (processed) return;
      processed = true;
      hideTimeupOverlay();
      proceedAfterTimeUp(index);
    }, 2500);

    timesUpAudio.onended = () => {
      if (processed) return;
      processed = true;
      clearTimeout(fallback);
      hideTimeupOverlay();
      setTimeout(() => proceedAfterTimeUp(index), 150);
    };
  } catch (e) {
    proceedAfterTimeUp(index);
  }
}

function showTimeupOverlay() {
  if (document.getElementById('timeup-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'timeup-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    background: 'rgba(255,0,0,0.20)',
    zIndex: '9999',
    pointerEvents: 'auto',
    transition: 'opacity 200ms ease'
  });
  document.body.appendChild(overlay);
}

function hideTimeupOverlay() {
  const el = document.getElementById('timeup-overlay');
  if (!el) return;
  try { el.remove(); } catch (e) { el.style.display = 'none'; }
}

function proceedAfterTimeUp(index) {
  localStorage.removeItem('timeRemaining_mudah_' + index);
  if (index + 1 < totalQuestions) {
    localStorage.setItem('currentIndex_hewan_mudah', index + 1);
    window.location.href = '/hewan/tebak_nama';
  } else {
    finishGame();
  }
}

function stopAllSounds() {
  speechSynthesis.cancel();
  idPlayer.pause();
  idPlayer.currentTime = 0;
}

const backBtnEl = document.querySelector('.back-button');
let headerEl = document.querySelector('header.header');
let timerDomEl = timerElement || document.getElementById('timer');
const backOriginal = backBtnEl ? { parent: backBtnEl.parentNode, nextSibling: backBtnEl.nextSibling } : null;
const timerOriginal = timerDomEl ? { parent: timerDomEl.parentNode, nextSibling: timerDomEl.nextSibling } : null;

function moveControlsIntoHeader() {
  if (!headerEl) headerEl = document.querySelector('header.header');
  if (!headerEl) return;
  if (backBtnEl && backBtnEl.parentNode !== headerEl) headerEl.insertBefore(backBtnEl, headerEl.firstChild);
  timerDomEl = timerElement || document.getElementById('timer');
  if (timerDomEl && timerDomEl.parentNode !== headerEl) headerEl.appendChild(timerDomEl);
  headerEl.classList.add('header--inlined');
}

function restoreControlsFromHeader() {
  if (!headerEl) headerEl = document.querySelector('header.header');
  if (!headerEl) return;
  if (backOriginal && backBtnEl && backBtnEl.parentNode === headerEl) {
    backOriginal.parent.insertBefore(backBtnEl, backOriginal.nextSibling);
  }
  timerDomEl = timerElement || document.getElementById('timer');
  if (timerOriginal && timerDomEl && timerDomEl.parentNode === headerEl) {
    timerOriginal.parent.insertBefore(timerDomEl, timerOriginal.nextSibling);
  }
  headerEl.classList.remove('header--inlined');
}

let __resizeTimeout = null;
let __lastIsMobile = window.innerWidth <= 768;

window.addEventListener('resize', () => {
  clearTimeout(__resizeTimeout);
  __resizeTimeout = setTimeout(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      moveControlsIntoHeader();
    } else {
      restoreControlsFromHeader();
    }

    if (isMobile !== __lastIsMobile) {
      __lastIsMobile = isMobile;
    }
  }, 120);
});

document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) moveControlsIntoHeader();
});


