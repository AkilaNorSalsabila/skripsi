// Dataset
localStorage.setItem("lastLevel", "menengah");

// Background Music
const bgMusic = new Audio("/static/sounds/hewan/effect/1.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.05;

function getLang() {
  return localStorage.getItem("gameLang") || "id";
}

function getAnimalName(animal) {
  const currentLang = getLang();
  const rawName = currentLang === "en" ? animal.nameEn : animal.name;
  return toDisplayName(rawName);
}

function getAnimalOptions(animal) {
  const currentLang = getLang();
  return currentLang === "en" ? animal.optionsEn : animal.options;
} 

const titleText        = document.getElementById("title-text");

const texts = {
  id: "Ayo Mencocokkan!",
  en: "Let's Play Match"
};

const questionBank = {
  sangatMudah: [
    
    { 
      name: "anjing", 
      nameEn: "dog",
      color: "/static/img/hewan/data_hewan/anjing.png", 
      habitatNumber: 10,
      options: ["anjing", "bintang laut"],
      optionsEn: ["dog", "starfish"],
      habitatOptions: [8, 5, 10],
      habitatIn: "Lingkungan rumah dan pekarangan",
      habitatEn: "Around the house"
    },
    { 
      name: "kucing", 
      nameEn: "cat",
      color: "/static/img/hewan/data_hewan/kucing.png", 
      habitatNumber: 10,
      options: ["kucing", "pinguin"],
      optionsEn: ["cat", "penguin"],
      habitatOptions: [7, 5, 10],
      habitatIn: "Lingkungan rumah dan pekarangan",
      habitatEn: "Around the house"
    },
    { 
      name: "ayam", 
      nameEn: "chicken",
      color: "/static/img/hewan/data_hewan/ayam.png", 
      habitatNumber: 10,
      options: ["ayam", "capung"],
      optionsEn: ["chicken", "dragonfly"],
      habitatOptions: [8, 5, 10],
      habitatIn: "Lingkungan rumah dan pekarangan",
      habitatEn: "Around the house"
    },
    { 
      name: "gajah", 
      nameEn: "elephant",
      color: "/static/img/hewan/data_hewan/gajah.png", 
      habitatNumber: 2,
      options: ["gajah", "pinguin"],
      optionsEn: ["elephant", "penguin"],
      habitatOptions: [8, 7, 2],
      habitatIn: "Lingkungan hutan dan savana",
      habitatEn: "Forest and savanna"
    },
    { 
      name: "monyet", 
      nameEn: "monkey",
      color: "/static/img/hewan/data_hewan/monyet.png", 
      habitatNumber: 9,
      options: ["monyet", "kupu-kupu"],
      optionsEn: ["monkey", "butterfly"],
      habitatOptions: [5, 8, 9],
      habitatIn: "Hutan dan pepohonan",
      habitatEn: "Forest"
    },
    { 
      name: "katak", 
      nameEn: "frog",
      color: "/static/img/hewan/data_hewan/katak.png", 
      habitatNumber: 8,
      options: ["katak", "ayam"],
      optionsEn: ["frog", "chicken"],
      habitatOptions: [2, 5, 8],
      habitatIn: "rawa dan tepi sungai",
      habitatEn: "Lakes or Swamps"
    },
    { 
      name: "jerapah", 
      nameEn: "giraffe",
      color: "/static/img/hewan/data_hewan/jerapah.png", 
      habitatNumber: 1,
      options: ["jerapah", "katak"],
      optionsEn: ["giraffe", "frog"],
      habitatOptions: [5, 8, 1],
      habitatIn: "Savana",
      habitatEn: "Savanna"
    }
  ],
  mudah: [
    { 
      name: "merak", 
      nameEn: "peacock",
      color: "/static/img/hewan/data_hewan/merak.png", 
      habitatNumber: 2,
      options: ["lebah", "merak", "kupu-kupu"],
      optionsEn: ["bee", "peacock", "butterfly"],
      habitatOptions: [2, 5, 8],
      habitatIn: "Savana",
      habitatEn: "Savanna"
    },
    { 
      name: "unta", 
      nameEn: "camel",
      color: "/static/img/hewan/data_hewan/unta.png", 
      habitatNumber: 6,
      options: ["kucing", "unta", "kuda laut"],
      optionsEn: ["cat", "camel", "seahorse"],
      habitatOptions: [6, 8, 5],
      habitatIn: "Gurun Pasir",
      habitatEn: "Desert"
    },
    { 
      name: "bintang laut", 
      nameEn: "starfish",
      color: "/static/img/hewan/data_hewan/bintang_laut.png", 
      habitatNumber: 5,
      options: ["gurita", "bintang laut", "kuda laut"],
      optionsEn: ["octopus", "starfish", "seahorse"],
      habitatOptions: [5, 2, 8],
      habitatIn: "Dasar laut",
      habitatEn: "Ocean"
    },
    { 
      name: "pinguin", 
      nameEn: "penguin",
      color: "/static/img/hewan/data_hewan/pinguin.png", 
      habitatNumber: 7,
      options: ["monyet", "pinguin", "anjing laut"],
      optionsEn: ["monkey", "penguin", "seal"],
      habitatOptions: [7, 5, 8],
      habitatIn: "Pantai es bersalju",
      habitatEn: "Icy shores"
    },
    { 
      name: "kuda laut", 
      nameEn: "seahorse",
      color: "/static/img/hewan/data_hewan/kuda_laut.png", 
      habitatNumber: 5,
      options: ["gurita", "kuda laut", "ubur-ubur"],
      optionsEn: ["octopus", "seahorse", "jellyfish"],
      habitatOptions: [5, 2, 8],
      habitatIn: "Laut",
      habitatEn: "Ocean"
    },
    { 
      name: "gurita", 
      nameEn: "octopus",
      color: "/static/img/hewan/data_hewan/gurita.png", 
      habitatNumber: 5,
      options: ["kuda laut", "gurita", "ubur-ubur"],
      optionsEn: ["seahorse", "octopus", "jellyfish"],
      habitatOptions: [5, 8, 2],
      habitatIn: "Laut",
      habitatEn: "Ocean"
    },
    { 
      name: "ubur-ubur", 
      nameEn: "jellyfish",
      color: "/static/img/hewan/data_hewan/ubur_ubur.png", 
      habitatNumber: 5,
      options: ["kuda laut", "ubur-ubur", "gurita"],
      optionsEn: ["seahorse", "jellyfish", "octopus"],
      habitatOptions: [5, 9, 1],
      habitatIn: "Laut",
      habitatEn: "Ocean"
    }
  ],
  sedang: [
    { 
      name: "badak", 
      nameEn: "rhinoceros",
      color: "/static/img/hewan/data_hewan/badak.png", 
      habitatNumber: 2,
      options: ["harimau", "zebra", "badak"],
      optionsEn: ["tiger", "zebra", "rhinoceros"],
      habitatOptions: [5, 2, 7],
      habitatIn: "Savana",
      habitatEn: "Savanna"
    },
    { 
      name: "elang", 
      nameEn: "eagle",
      color: "/static/img/hewan/data_hewan/elang.png", 
      habitatNumber: 9,
      options: ["burung hantu", "cendrawasih", "elang"],
      optionsEn: ["owl", "bird of paradise", "eagle"],
      habitatOptions: [5, 9, 8],
      habitatIn: "Hutan dan pegunungan",
      habitatEn: "Forest"
    },
    { 
      name: "lumba-lumba", 
      nameEn: "dolphin",
      color: "/static/img/hewan/data_hewan/lumba_lumba.png", 
      habitatNumber: 5,
      options: ["hiu", "paus", "lumba-lumba"],
      optionsEn: ["shark", "whale", "dolphin"],
      habitatOptions: [2, 5, 8],
      habitatIn: "Laut",
      habitatEn: "Ocean"
    },
    { 
      name: "lebah", 
      nameEn: "bee",
      color: "/static/img/hewan/data_hewan/lebah.png", 
      habitatNumber: 4,
      options: ["kupu-kupu", "capung", "lebah"],
      optionsEn: ["butterfly", "dragonfly", "bee"],
      habitatOptions: [8, 4, 5],
      habitatIn: "Taman dan kebun bunga",
      habitatEn: "Flower Garden"
    },
    { 
      name: "kupu-kupu", 
      nameEn: "butterfly",
      color: "/static/img/hewan/data_hewan/kupu.png", 
      habitatNumber: 4,
      options: ["capung", "lebah", "kupu-kupu"],
      optionsEn: ["dragonfly", "bee", "butterfly"],
      habitatOptions: [5, 4, 8],
      habitatIn: "Taman dan kebun bunga",
      habitatEn: "Flower Garden"
    },
    { 
      name: "paus", 
      nameEn: "whale",
      color: "/static/img/hewan/data_hewan/paus.png", 
      habitatNumber: 5,
      options: ["hiu", "lumba-lumba", "paus"],
      optionsEn: ["shark", "dolphin", "whale"],
      habitatOptions: [2, 5, 8],
      habitatIn: "Laut",
      habitatEn: "Ocean"
    },
    { 
      name: "burung hantu", 
      nameEn: "owl",
      color: "/static/img/hewan/data_hewan/owl.png", 
      habitatNumber: 9,
      options: ["elang", "cendrawasih", "burung hantu"],
      optionsEn: ["eagle", "bird of paradise", "owl"],
      habitatOptions: [5, 9, 8],
      habitatIn: "Hutan dan pepohonan",
      habitatEn: "Forest"
    }
  ],
  sulit: [
    { 
      name: "zebra", 
      nameEn: "zebra",
      color: "/static/img/hewan/data_hewan/zebra.png", 
      habitatNumber: 1,
      options: ["zebra", "harimau", "kucing", "landak"],
      optionsEn: ["zebra", "tiger", "cat", "hedgehog"],
      habitatOptions: [5, 7, 1],
      habitatIn: "Savana",
      habitatEn: "Savanna"
    },
    { 
      name: "pari", 
      nameEn: "stingray",
      color: "/static/img/hewan/data_hewan/pari.png", 
      habitatNumber: 5,
      options: ["pari", "merak", "kupu-kupu", "gurita"],
      optionsEn: ["stingray", "peacock", "butterfly", "octopus"],
      habitatOptions: [8, 2, 5],
      habitatIn: "Laut",
      habitatEn: "Ocean"
    },
    { 
      name: "kura", 
      nameEn: "turtle",
      color: "/static/img/hewan/data_hewan/kura.png", 
      habitatNumber: 8,
      options: ["kura", "trenggiling", "platipus", "badak"],
      optionsEn: ["turtle", "pangolin", "platypus", "rhinoceros"],
      habitatOptions: [7, 6, 8],
      habitatIn: "Sungai atau danau",
      habitatEn: "Lakes"
    },
    { 
      name: "hiu", 
      nameEn: "shark",
      color: "/static/img/hewan/data_hewan/hiu.png", 
      habitatNumber: 5,
      options: ["hiu", "lumba-lumba", "paus", "pari"],
      optionsEn: ["shark", "dolphin", "whale", "stingray"],
      habitatOptions: [2, 8, 5],
      habitatIn: "Laut",
      habitatEn: "Ocean"
    },
    { 
      name: "capung", 
      nameEn: "dragonfly",
      color: "/static/img/hewan/data_hewan/capung.png", 
      habitatNumber: 8,
      options: ["capung", "kupu-kupu", "lebah", "merak"],
      optionsEn: ["dragonfly", "butterfly", "bee", "peacock"],
      habitatOptions: [7, 5, 8],
      habitatIn: "Danau atau rawa",
      habitatEn: "Lakes or swamps"
    },
    { 
      name: "anjing laut", 
      nameEn: "seal",
      color: "/static/img/hewan/data_hewan/anjing_laut.png", 
      habitatNumber: 5,
      options: ["anjing laut", "platipus", "komodo", "lumba-lumba"],
      optionsEn: ["seal", "platypus", "komodo", "dolphin"],
      habitatOptions: [6, 8, 5],
      habitatIn: "Pulau dengan laut iklim dingin",
      habitatEn: "Ocean"
    },
    { 
      name: "koi", 
      nameEn: "koi fish",
      color: "/static/img/hewan/data_hewan/koi.png", 
      habitatNumber: 3,
      options: ["koi", "lumba-lumba", "hiu", "pari"],
      optionsEn: ["koi", "dolphin", "shark", "stingray"],
      habitatOptions: [6, 10, 3],
      habitatIn: "Kolam dan danau",
      habitatEn: "Lakes"
    }
  ],
  sangatSulit: [
    { 
      name: "komodo", 
      nameEn: "komodo dragon",
      color: "/static/img/hewan/data_hewan/komodo.png", 
      habitatNumber: 1,
      options: ["trenggiling", "platipus", "komodo", "anjing laut"],
      optionsEn: ["pangolin", "platypus", "komodo", "seal"],
      habitatOptions: [1, 5, 8],
      habitatIn: "Pulau Komodo dan Pulau Rinca",
      habitatEn: "Savanna"
    },
    { 
      name: "harimau", 
      nameEn: "tiger",
      color: "/static/img/hewan/data_hewan/harimau.png", 
      habitatNumber: 9,
      options: ["kucing", "anjing", "harimau", "zebra"],
      optionsEn: ["cat", "dog", "tiger", "zebra"],
      habitatOptions: [9, 8, 5],
      habitatIn: "Hutan",
      habitatEn: "Forest"
    },
    { 
      name: "cendrawasih", 
      nameEn: "bird of paradise",
      color: "/static/img/hewan/data_hewan/cendrawasih.png", 
      habitatNumber: 9,
      options: ["burung hantu", "elang", "cendrawasih", "pinguin"],
      optionsEn: ["owl", "eagle", "bird of paradise", "penguin"],
      habitatOptions: [9, 5, 8],
      habitatIn: "Hutan hujan Papua",
      habitatEn: "Forest"
    },
    { 
      name: "trenggiling", 
      nameEn: "pangolin",
      color: "/static/img/hewan/data_hewan/trenggiling.png", 
      habitatNumber: 2,
      options: ["landak", "bunglon", "trenggiling", "kura"],
      optionsEn: ["hedgehog", "chameleon", "pangolin", "turtle"],
      habitatOptions: [2, 5, 8],
      habitatIn: "Hutan",
      habitatEn: "Forest"
    },
    { 
      name: "landak", 
      nameEn: "hedgehog",
      color: "/static/img/hewan/data_hewan/landak.png", 
      habitatNumber: 2,
      options: ["kura", "bunglon", "landak", "trenggiling"],
      optionsEn: ["turtle", "chameleon", "hedgehog", "pangolin"],
      habitatOptions: [2, 5, 6],
      habitatIn: "Hutan",
      habitatEn: "Forest"
    },
    { 
      name: "platipus", 
      nameEn: "platypus",
      color: "/static/img/hewan/data_hewan/platipus.png", 
      habitatNumber: 8,
      options: ["komodo", "kura", "platipus", "trenggiling"],
      optionsEn: ["komodo", "turtle", "platypus", "pangolin"],
      habitatOptions: [8, 5, 2],
      habitatIn: "Sungai atau rawa",
      habitatEn: "Lakes or Swamps"
    },
    { 
      name: "bunglon", 
      nameEn: "chameleon",
      color: "/static/img/hewan/data_hewan/bunglon.png", 
      habitatNumber: 9,
      options: ["landak", "kura", "bunglon", "trenggiling"],
      optionsEn: ["hedgehog", "turtle", "chameleon", "pangolin"],
      habitatOptions: [9, 5, 6],
      habitatIn: "Hutan",
      habitatEn: "Forest"
    }
  ]
};

// random soal
function getRandomAnimal(category) {
  const animals = questionBank[category];
  const randomIndex = Math.floor(Math.random() * animals.length);
  return animals[randomIndex];
}

// Generate 5 soal: 1 dari setiap kategori
function generateSessionQuestions() {
  const selectedQuestions = [];
  
  selectedQuestions.push(getRandomAnimal('sangatMudah'));
  selectedQuestions.push(getRandomAnimal('mudah'));
  selectedQuestions.push(getRandomAnimal('sedang'));
  selectedQuestions.push(getRandomAnimal('sulit'));
  selectedQuestions.push(getRandomAnimal('sangatSulit'));
  
  return selectedQuestions;
}

const allAnimals = [
  ...questionBank.sangatMudah,
  ...questionBank.mudah,
  ...questionBank.sedang,
  ...questionBank.sulit,
  ...questionBank.sangatSulit
];

const animals = allAnimals;

//pilihan habitat
const habitats = [
  { number: 1, img: "/static/img/hewan/habitat/1.jpeg" },
  { number: 2, img: "/static/img/hewan/habitat/2.jpeg" },
  { number: 3, img: "/static/img/hewan/habitat/3.jpeg" },
  { number: 4, img: "/static/img/hewan/habitat/4.jpeg" },
  { number: 5, img: "/static/img/hewan/habitat/5.jpeg" },
  { number: 6, img: "/static/img/hewan/habitat/6.jpeg" },
  { number: 7, img: "/static/img/hewan/habitat/7.jpeg" },
  { number: 8, img: "/static/img/hewan/habitat/8.jpeg" },
  { number: 9, img: "/static/img/hewan/habitat/9.jpeg" },
  { number: 10, img: "/static/img/hewan/habitat/10.jpeg" }
];

const totalQuestions = 5;

let sessionQuestions =
  JSON.parse(localStorage.getItem("sessionQuestions_menengah")) || [];
let currentIndex =
  parseInt(localStorage.getItem("currentIndex_menengah") || "0", 10);
let score =
  parseInt(localStorage.getItem("score_menengah") || "0", 10);
let step = localStorage.getItem("step_menengah") || "hewan";
let animalAttempt = parseInt(localStorage.getItem("animalAttempt_menengah") || "0", 10);
let habitatAnswered = localStorage.getItem("habitatAnswered_menengah") === "true";
let selectedHabitat = parseInt(localStorage.getItem("selectedHabitat_menengah") || "0", 10); 

if (sessionQuestions.length === 0) {
  sessionQuestions = generateSessionQuestions();
  localStorage.setItem(
    "sessionQuestions_menengah",
    JSON.stringify(sessionQuestions)
  );
  localStorage.setItem("currentIndex_menengah", "0");
  localStorage.setItem("score_menengah", "0");
}

const siluetContainer = document.getElementById("siluet-container");
const habitatContainer = document.getElementById("habitat-container");
const pilihanContainer = document.getElementById("pilihan-container");
const progressText = document.getElementById("progress");

function showWrongOverlayThen(onDone, delay = 1500) {
  const overlay = document.getElementById("wrong-overlay");
  if (!overlay) {
    if (typeof onDone === "function") onDone();
    return;
  }

  overlay.classList.remove("hidden");
  setTimeout(() => {
    overlay.classList.add("hidden");
    if (typeof onDone === "function") onDone();
  }, delay);
}

// Timer variables
let timerInterval = null;
let timeRemaining = 0;
let timerElement = document.getElementById('timer');
const timePerQuestion = Array(totalQuestions).fill(20);
let timerStartedForQuestion = false;
let isQuestionAudioPlaying = false;

function ensureTimerStartedOnInteraction() {
  if (!timerStartedForQuestion) {
    timerStartedForQuestion = true;
    startTimerForIndex(currentIndex);
  }
}

function runAfterQuestionAudioEnds(task) {
  if (!isQuestionAudioPlaying) {
    task();
    return;
  }

  const prevOnEnded = idPlayer.onended;
  idPlayer.onended = () => {
    isQuestionAudioPlaying = false;
    if (typeof prevOnEnded === 'function') prevOnEnded();
    task();
  };
}


// Membuat siluet
function createSiluet(imageUrl, maxWidth, maxHeight, callback) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageUrl;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Preserve original aspect ratio while fitting into maxWidth/maxHeight
    const iw = img.width;
    const ih = img.height;
    const mw = maxWidth || iw;
    const mh = maxHeight || ih;
    const ratio = Math.min(mw / iw, mh / ih, 1);
    const cw = Math.round(iw * ratio);
    const ch = Math.round(ih * ratio);

    canvas.width = cw;
    canvas.height = ch;

    ctx.drawImage(img, 0, 0, cw, ch);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    callback(canvas.toDataURL());
  };
}

//fungsi load soal
function loadQuestion() {
  hideInfoText();
  if (currentIndex > 0) {
    try { localStorage.removeItem('timeRemaining_menengah_' + (currentIndex - 1)); } catch (e) {}
  }
  
  const savedStep = localStorage.getItem("step_menengah") || "hewan";
  const savedAttempt = parseInt(localStorage.getItem("animalAttempt_menengah") || "0", 10);
  const savedHabitatAnswered = localStorage.getItem("habitatAnswered_menengah") === "true";
  const savedSelectedHabitat = parseInt(localStorage.getItem("selectedHabitat_menengah") || "0", 10);
  
  if (currentIndex >= sessionQuestions.length) {
    finishGame();
    return;
  }

  const q = sessionQuestions[currentIndex];
  progressText.textContent = `Soal ${currentIndex + 1} / ${totalQuestions}`;
  titleText.innerHTML = texts[getLang()];
  
  // Reset UI first
  siluetContainer.innerHTML = "";
  habitatContainer.innerHTML = "";
  habitatContainer.classList.remove("active");
  pilihanContainer.innerHTML = "";
  
  // Restore state
  step = savedStep;
  animalAttempt = savedAttempt;
  habitatAnswered = savedHabitatAnswered;
  selectedHabitat = savedSelectedHabitat;

  
  const exitOverlay   = document.getElementById("exit-confirm");
  const cancelExitBtn = document.getElementById("cancel-exit");
  const confirmExitBtn = document.getElementById("confirm-exit");
  const exitConfirmText = document.getElementById("exit-confirm-text");
  if (exitConfirmText) {
    exitConfirmText.textContent = getLang() === "en"
      ? "Are you sure you want to end the game?"
      : "Yakin mengakhiri game?";
  }
  const backBtn = document.querySelector(".back-button");

  if (backBtn) {
    backBtn.onclick = (e) => {
      e.preventDefault();
      stopAllSounds(true);
      exitOverlay.classList.remove("hidden");
    };
  }

  cancelExitBtn.onclick = () => {
    exitOverlay.classList.add("hidden");
  };

  confirmExitBtn.onclick = () => {
    stopAllSounds(true);
    // clear timer entries and session state for menengah
    try { clearTimeRemainingMenengah(); } catch (e) {}
    localStorage.removeItem("sessionQuestions_menengah");
    localStorage.removeItem("currentIndex_menengah");
    localStorage.removeItem("score_menengah");
    localStorage.removeItem("step_menengah");
    localStorage.removeItem("animalAttempt_menengah");
    localStorage.removeItem("habitatAnswered_menengah");
    localStorage.removeItem("selectedHabitat_menengah");
    window.location.href = "/game_hewan";
  };

  createAnimalDrop(q);
  createHabitatDrop(q);
  
  // Restore UI based on saved step
  if (step === "habitat") {
    const drop = siluetContainer.querySelector(".drop-zone");
    if (drop) {
      drop.innerHTML = `<img src="${q.color}">`;
      drop.classList.add("correct");
    }
    habitatContainer.classList.add("active");
    
    if (habitatAnswered && selectedHabitat) {
      const habitatDrop = document.querySelector(".habitat-drop");
      const habitat = habitats.find(h => h.number === selectedHabitat);
      if (habitatDrop && habitat) {
        habitatDrop.innerHTML = "";
        const img = document.createElement("img");
        img.src = habitat.img;
        habitatDrop.appendChild(img);
        habitatDrop.classList.add("correct");
        hideOptions();
        
        // Stop timer, start confetti, show info panel (audio handled separately)
        try { stopTimer(); } catch(e) {}
        startConfetti();
        // showInfoText with playCorrectSound=false to avoid duplicate audio
        showInfoText(q, q.habitatNumber, () => {
          setTimeout(() => {
            infoPanel.classList.remove("show");
            currentIndex++;
            localStorage.setItem("currentIndex_menengah", currentIndex);
            localStorage.setItem("step_menengah", "hewan");
            localStorage.setItem("animalAttempt_menengah", "0");
            localStorage.removeItem("habitatAnswered_menengah");
            localStorage.removeItem("selectedHabitat_menengah");
            loadQuestion();
          }, 500);
        }, false);
        // play syllable-style then full animal then habitat audio
        const afterAudio = () => {
          setTimeout(() => {
            infoPanel.classList.remove("show");
            currentIndex++;
            localStorage.setItem("currentIndex_menengah", currentIndex);
            localStorage.setItem("step_menengah", "hewan");
            localStorage.setItem("animalAttempt_menengah", "0");
            localStorage.removeItem("habitatAnswered_menengah");
            localStorage.removeItem("selectedHabitat_menengah");
            loadQuestion();
          }, 500);
        };
        try { playCorrectAnimalSound(getAnimalName(q), afterAudio); } catch(e) {}
      } else {
        // Show habitat options if not yet answered
        const availableHabitatNumbers = q.habitatOptions || [1, 2, 3];
        const habitatOptionsToShow = availableHabitatNumbers.map(habitatNum => {
          return habitats.find(h => h.number === habitatNum);
        }).filter(h => h);
        
        showOptionsWithoutAnimation(
          habitatOptionsToShow.map(h => ({ ...h, type: "habitat" }))
        );
      }
    } else {
      // Show habitat options
      const availableHabitatNumbers = q.habitatOptions || [1, 2, 3];
      const habitatOptionsToShow = availableHabitatNumbers.map(habitatNum => {
        return habitats.find(h => h.number === habitatNum);
      }).filter(h => h);
      
      showOptionsWithoutAnimation(
        habitatOptionsToShow.map(h => ({ ...h, type: "habitat" }))
      );
    }
  } else {
    // Normal start: show animal options
    showOptions();
    showAnimalOptions(q);
  }

  // reset timer flag and show initial timer value (do not start countdown yet)
  timerStartedForQuestion = false;
  try {
    timerElement = timerElement || document.getElementById('timer');
    const saved = localStorage.getItem('timeRemaining_menengah_' + currentIndex);
    if (saved !== null && parseInt(saved, 10) > 0) {
      timeRemaining = parseInt(saved, 10);
    } else {
      timeRemaining = timePerQuestion[currentIndex] || 20;
    }
    updateTimerDisplay();
    if (timerElement) timerElement.classList.remove('warning');
  } catch (e) {}
}


// create drop zone hewan
function createAnimalDrop(animal) {
  const drop = document.createElement("div");
  drop.className = "drop-zone";
  drop.dataset.answer = animal.name;

  createSiluet(animal.color, 300, 300, src => {
    drop.innerHTML = `<img src="${src}">`;
  });

  drop.addEventListener("dragover", e => e.preventDefault());
  drop.addEventListener("drop", e => {
    e.preventDefault();
    stopAllSounds();
    const draggedAnimal = e.dataTransfer.getData("text");
    
    if (draggedAnimal === animal.name) {
      onCorrectAnimalDrop(drop, animal);
    } else {
      animalAttempt++;
      localStorage.setItem("animalAttempt_menengah", animalAttempt);
      
      if (animalAttempt < 2) {
        drop.classList.add("shake");
        playTryAgainSound();
        playSound("sfx-wrong");
        showWrongOverlayThen();
        setTimeout(() => drop.classList.remove("shake"), 400);
      } else {
        playTryAgainSound();
        playSound("sfx-wrong");

        showWrongOverlayThen(() => {
          runAfterQuestionAudioEnds(() => {
            drop.innerHTML = `<img src="${animal.color}">`;
            drop.classList.add("correct");
            step = "habitat";
            localStorage.setItem("step_menengah", "habitat");
            habitatContainer.classList.add("active");

            hideOptions();
            const correctHabitat = habitats.find(h => h.number === animal.habitatNumber);
            const habitatDrop = document.querySelector(".habitat-drop");
            if (habitatDrop && correctHabitat) {
              const img = document.createElement("img");
              img.src = correctHabitat.img;
              habitatDrop.innerHTML = "";
              habitatDrop.appendChild(img);
              habitatDrop.classList.add("correct");
            }

            // show info panel (silent) then play spelling -> full animal -> habitat audio
            showInfoText(animal, animal.habitatNumber, null, false);
            playSpellingSequence(getAnimalName(animal), () => {
              setTimeout(() => {
                infoPanel.classList.remove("show");
                currentIndex++;
                localStorage.setItem("currentIndex_menengah", currentIndex);
                localStorage.setItem("step_menengah", "hewan");
                localStorage.setItem("animalAttempt_menengah", "0");
                localStorage.removeItem("habitatAnswered_menengah");
                localStorage.removeItem("selectedHabitat_menengah");
                loadQuestion();
              }, 500);
            });
          });
        });
      }
    }
  });

  siluetContainer.appendChild(drop);
}

// creeate drop zone habitat
function createHabitatDrop(animal) {
  const correctHabitat = habitats.find(h => h.number === animal.habitatNumber);
  const drop = document.createElement("div");
  drop.className = "habitat-drop";
  drop.dataset.answer = animal.habitatNumber;
  drop.innerHTML = `<img src="/static/img/hewan/desain/home.png">`;

  drop.addEventListener("dragover", e => e.preventDefault());
  drop.addEventListener("drop", e => {
  if (step !== "habitat") return;

  e.preventDefault();
  stopAllSounds(); 
  const dragged = parseInt(e.dataTransfer.getData("text"));
  drop.innerHTML = "";
  const img = document.createElement("img");
  const droppedHabitat = habitats.find(h => h.number === dragged);
  if (droppedHabitat) {
    img.src = droppedHabitat.img;
    drop.appendChild(img);
  }
  if (dragged === parseInt(drop.dataset.answer)) {
  drop.classList.add("correct");
  score += 20;
  localStorage.setItem("score_menengah", score);
  localStorage.setItem("habitatAnswered_menengah", "true");
  localStorage.setItem("selectedHabitat_menengah", dragged);

  hideOptions();
  try { stopTimer(); } catch(e) {}
  startConfetti();
  
  try { console.log('habitat correct: triggering sfx-correct and playCorrectAnimalSound'); } catch(e) {}
  try { playSound('sfx-correct'); } catch(e) { console.log('playSound error', e); }
  const afterAudio2 = () => {
    setTimeout(() => {
      infoPanel.classList.remove("show");
      currentIndex++;
      localStorage.setItem("currentIndex_menengah", currentIndex);
      localStorage.setItem("step_menengah", "hewan");
      localStorage.setItem("animalAttempt_menengah", "0");
      localStorage.removeItem("habitatAnswered_menengah");
      localStorage.removeItem("selectedHabitat_menengah");
      loadQuestion();
    }, 500);
  };
  showInfoText(animal, animal.habitatNumber, afterAudio2, false);
  try { playCorrectAnimalSound(getAnimalName(animal), afterAudio2); } catch(e) {}

} else {
  drop.classList.add("shake");
  playSound("sfx-wrong"); 
  try { stopTimer(); } catch(e) {}
  setTimeout(() => drop.classList.remove("shake"), 400);

  showWrongOverlayThen(() => {
    runAfterQuestionAudioEnds(() => {
      hideOptions();
      showInfoText(animal, animal.habitatNumber, null, false);
      playSpellingSequence(getAnimalName(animal), () => {
        currentIndex++;
        localStorage.setItem("currentIndex_menengah", currentIndex);
        localStorage.setItem("step_menengah", "hewan");
        localStorage.setItem("animalAttempt_menengah", "0");
        localStorage.removeItem("habitatAnswered_menengah");
        localStorage.removeItem("selectedHabitat_menengah");
        setTimeout(() => {
          infoPanel.classList.remove("show");
          loadQuestion();
        }, 500);
      });
    });
  });
}
});
  habitatContainer.appendChild(drop);
}


// fungsi saat hewan benar
function onCorrectAnimalDrop(drop, animal) {
  drop.innerHTML = `<img src="${animal.color}">`;
  drop.classList.add("correct");

  step = "habitat";
  localStorage.setItem("step_menengah", "habitat");
  habitatContainer.classList.add("active");

  const availableHabitatNumbers = animal.habitatOptions || [1, 2, 3];
  const habitatOptionsToShow = availableHabitatNumbers.map(habitatNum => {
    return habitats.find(h => h.number === habitatNum);
  }).filter(h => h); 

  slideOptions(
    habitatOptionsToShow.map(h => ({ ...h, type: "habitat" }))
  );
}

// show options hewan
function showAnimalOptions(q) {
  const currentLang = getLang();
  const optionNames = getAnimalOptions(q);
  
  const shuffledNames = [...optionNames];

  shuffledAnimalNames = [...shuffledNames];
  
  const options = shuffledNames.map(displayName => {
    const animal = animals.find(a => 
      (currentLang === "en" ? a.nameEn === displayName : a.name === displayName)
    );
    return animal || { 
      name: displayName, 
      nameEn: displayName,
      color: `/static/img/hewan/data_hewan/${displayName.replace(/ /g, '_').replace(/-/g, '_')}.png` 
    };
  });

  showOptionsWithoutAnimation(options.map(o => ({ ...o, type: "hewan" })));
  setTimeout(speakInstruksi, 500);
}

function showOptionsWithoutAnimation(newOptions) {
  pilihanContainer.innerHTML = ""; 
  
  const wrapper = document.createElement("div");
  wrapper.className = "option-wrapper";
  wrapper.style.position = "relative";
  wrapper.style.transform = "translateX(0)";

  newOptions.forEach(opt => {
    const img = document.createElement("img");
    img.src = opt.img || opt.color;
    img.classList.add(opt.type === "habitat" ? "habitat-option" : "option-img");
    img.draggable = true;
    
    if (opt.type === "habitat") {
      img.dataset.number = opt.number;
      img.addEventListener("dragstart", e => {
        ensureTimerStartedOnInteraction();
        e.dataTransfer.setData("text", opt.number);
      });
    } else {
      img.dataset.name = opt.name;
      img.addEventListener("dragstart", e => {
        ensureTimerStartedOnInteraction();
        e.dataTransfer.setData("text", opt.name);
      });
    }
    
    img.addEventListener('pointerdown', function (ev) {
      if (ev.pointerType === 'mouse') return; 
      ensureTimerStartedOnInteraction();
      ev.preventDefault();
      const rect = img.getBoundingClientRect();
      const offsetX = ev.clientX - rect.left;
      const offsetY = ev.clientY - rect.top;
      const clone = img.cloneNode(true);
      clone.classList.add('drag-clone');
      clone.style.width = rect.width + 'px';
      clone.style.height = rect.height + 'px';
      document.body.appendChild(clone);

      let lastX = ev.clientX, lastY = ev.clientY, rafId = null;
      function update() {
        clone.style.transform = `translate3d(${lastX - offsetX}px, ${lastY - offsetY}px, 0)`;
        rafId = null;
      }
      function onMove(e) { lastX = e.clientX; lastY = e.clientY; if (!rafId) rafId = requestAnimationFrame(update); }
      function onUp(e) {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const drop = el && el.closest('.drop-zone, .habitat-drop');
        if (drop) {
          const dropEv = new Event('drop', { bubbles: true });
          dropEv.dataTransfer = { getData: (k) => (k === 'text' ? (img.dataset.name || img.dataset.number) : null) };
          drop.dispatchEvent(dropEv);
        }
        clone.remove();
      }

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
      clone.style.transform = `translate3d(${ev.clientX - offsetX}px, ${ev.clientY - offsetY}px, 0)`;
    });

    wrapper.appendChild(img);
  });

  pilihanContainer.appendChild(wrapper);
}

function hideOptions() {
  pilihanContainer.classList.add("hidden");
}

function showOptions() {
  pilihanContainer.classList.remove("hidden");
}

// fungsi slide options dengan animasi
function slideOptions(newOptions) {
  const duration = 500;

  const oldWrapper = pilihanContainer.querySelector(".option-wrapper");

  const newWrapper = document.createElement("div");
  newWrapper.className = "option-wrapper";
  newWrapper.style.transform = "translateX(100%)";
  newWrapper.style.zIndex = "3";

  newOptions.forEach(opt => {
    const img = document.createElement("img");
    img.src = opt.img || opt.color;
    img.classList.add(opt.type === "habitat" ? "habitat-option" : "option-img");
    img.draggable = true;
    
    if (opt.type === "habitat") {
      img.dataset.number = opt.number;
      img.addEventListener("dragstart", e => {
        ensureTimerStartedOnInteraction();
        e.dataTransfer.setData("text", opt.number);
      });
    } else {
      img.dataset.name = opt.name;
      img.addEventListener("dragstart", e => {
        ensureTimerStartedOnInteraction();
        e.dataTransfer.setData("text", opt.name);
      });
    }
    
    img.addEventListener('pointerdown', function (ev) {
      if (ev.pointerType === 'mouse') return; 
      ensureTimerStartedOnInteraction();
      ev.preventDefault();
      const rect = img.getBoundingClientRect();
      const offsetX = ev.clientX - rect.left;
      const offsetY = ev.clientY - rect.top;
      const clone = img.cloneNode(true);
      clone.classList.add('drag-clone');
      clone.style.width = rect.width + 'px';
      clone.style.height = rect.height + 'px';
      document.body.appendChild(clone);

      let lastX = ev.clientX, lastY = ev.clientY, rafId = null;
      function update() {
        clone.style.transform = `translate3d(${lastX - offsetX}px, ${lastY - offsetY}px, 0)`;
        rafId = null;
      }
      function onMove(e) { lastX = e.clientX; lastY = e.clientY; if (!rafId) rafId = requestAnimationFrame(update); }
      function onUp(e) {
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const drop = el && el.closest('.drop-zone, .habitat-drop');
        if (drop) {
          const dropEv = new Event('drop', { bubbles: true });
          dropEv.dataTransfer = { getData: (k) => (k === 'text' ? (img.dataset.name || img.dataset.number) : null) };
          drop.dispatchEvent(dropEv);
        }
        clone.remove();
      }

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
      clone.style.transform = `translate3d(${ev.clientX - offsetX}px, ${ev.clientY - offsetY}px, 0)`;
    });

    newWrapper.appendChild(img);
  });

  pilihanContainer.appendChild(newWrapper);

  newWrapper.getBoundingClientRect();

  requestAnimationFrame(() => {
    newWrapper.classList.add("active");
    newWrapper.style.transition = `transform ${duration}ms ease`;
    newWrapper.style.transform = "translateX(0)";

    if (oldWrapper) {
      oldWrapper.classList.add("exit");
      oldWrapper.style.transition = `transform ${duration}ms ease`;
      oldWrapper.style.transform = "translateX(-100%)";
    }
  });

  setTimeout(() => {
    if (oldWrapper) oldWrapper.remove();
    newWrapper.style.position = "relative";
    newWrapper.style.transform = "translateX(0)";
  }, duration);
}


// finish game
function finishGame() {
  const finalScore = Math.round((score / (totalQuestions * 20)) * 100);
  localStorage.setItem("finalScore", finalScore);
  try { clearTimeRemainingMenengah(); } catch(e) {}
  localStorage.removeItem("sessionQuestions_menengah");
  localStorage.removeItem("currentIndex_menengah");
  localStorage.removeItem("score_menengah");
  localStorage.removeItem("step_menengah");
  localStorage.removeItem("animalAttempt_menengah");
  localStorage.removeItem("habitatAnswered_menengah");
  localStorage.removeItem("selectedHabitat_menengah");

  setTimeout(() => {
    window.location.href = "/skor_hewan";
  }, 200);
}

// panel nama dan haibitat
const infoPanel   = document.getElementById("info-panel");
const infoAnimal  = document.getElementById("info-animal");
const infoHabitat = document.getElementById("info-habitat");

function getHabitatName(habitatNumber) {
  const currentLang = getLang();
  const darat = [1, 2, 4, 6, 9, 10];
  const air = [3, 5];
  const daratAir = [7, 8];
  
  if (darat.includes(habitatNumber)) {
    return currentLang === "en" ? "Land" : "Darat";
  } else if (air.includes(habitatNumber)) {
    return currentLang === "en" ? "Water" : "Air";
  } else if (daratAir.includes(habitatNumber)) {
    return currentLang === "en" ? "Land & Water" : "Darat & Air";
  }
  return "Habitat " + habitatNumber;
}

function showInfoText(animal, habitatNumber, onAudioEnd, playCorrectSound = true){
  const currentLang = getLang();
  const animalName = getAnimalName(animal);
  try { stopTimer(); } catch(e) {}
  const titleCaseName = toDisplayName(animalName);
  infoAnimal.textContent = titleCaseName;
  const habitatLabel = getHabitatName(habitatNumber);

  if (currentLang === "en") {
    const habEn = animal.habitatEn || '';
    const hl = habitatLabel.toLowerCase();
    let sentence = '';
    if ((hl.includes('land') && hl.includes('water')) || hl.includes('&')) {
      sentence = 'They live on land and in water';
    } else if (hl.includes('land')) {
      sentence = 'They live on land';
    } else if (hl.includes('water')) {
      sentence = 'They live in water';
    } else {
      sentence = `They live in ${habitatLabel}`;
    }

    if (habEn) sentence += `, usually in the ${habEn}`;
    sentence += '.';

    infoHabitat.textContent = sentence;
  } else {
    const habIn = animal.habitatIn || '';
    const extraId = habIn ? ` Biasanya di ${habIn}` : '';
    infoHabitat.textContent = ` Habitatnya di ${habitatLabel}.${extraId}`;
  }

  infoPanel.classList.remove("hidden");
  requestAnimationFrame(() => {
    infoPanel.classList.add("show");
  });

  // disable interactions on animal image, habitat container and options while info is visible
  try {
    const siluet = document.getElementById('siluet-container');
    const habitatEl = document.getElementById('habitat-container');
    const pilihan = document.getElementById('pilihan-container');
    if (siluet) siluet.style.pointerEvents = 'none';
    if (habitatEl) habitatEl.style.pointerEvents = 'none';
    if (pilihan) {
      pilihan.style.pointerEvents = 'none';
      pilihan.querySelectorAll('img').forEach(i => { i.draggable = false; i.style.pointerEvents = 'none'; });
    }
    document.querySelectorAll('.drag-clone').forEach(c => c.remove());
  } catch (e) { console.log('Error disabling interactions for info panel', e); }

  if (playCorrectSound) {
    const effectSound = currentLang === "en" ? "/static/sounds/hewan/effect/excellent.m4a" : "/static/sounds/hewan/effect/hebat.m4a";
    idPlayer.src = effectSound;
    try { idPlayer.volume = 1.0; } catch(e) {}
    idPlayer.play().catch(err => console.log("Error playing effect audio:", err));
    
    idPlayer.onended = () => {
      const folderLang = currentLang === "en" ? "en" : "in";
      const fileName = normalizeFileName(animalName);
      idPlayer.src = `/static/sounds/hewan/habitat/${folderLang}/${fileName}.m4a`;
      try { idPlayer.volume = 1.0; } catch(e) {}
      idPlayer.play().catch(err => console.log("Error playing habitat info audio:", err));
    
      idPlayer.onended = () => {
        if (onAudioEnd) {
          onAudioEnd();
        }
      };
    };
  } else {
    // silent mode: caller will handle audio sequence (syllables -> animals -> habitat)
    // do not set idPlayer.src or idPlayer.onended here
  }
}

function hideInfoText(){
  infoPanel.classList.remove("show");
  setTimeout(() => {
    infoPanel.classList.add("hidden");
  }, 700);

  try {
    const siluet = document.getElementById('siluet-container');
    const habitatEl = document.getElementById('habitat-container');
    const pilihan = document.getElementById('pilihan-container');
    if (siluet) siluet.style.pointerEvents = '';
    if (habitatEl) habitatEl.style.pointerEvents = '';
    if (pilihan) {
      pilihan.style.pointerEvents = '';
      pilihan.querySelectorAll('img').forEach(i => { i.draggable = true; i.style.pointerEvents = ''; });
    }
  } catch (e) { console.log('Error enabling interactions after info panel', e); }
}

// confetti
const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");

confettiCanvas.width  = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettis = [];
let confettiActive = false;

const confettiColors = [
  "#FF595E",
  "#FFCA3A",
  "#8AC926",
  "#1982C4",
  "#6A4C93"
];

function startConfetti(duration = 7000){
  confettis = [];
  confettiActive = true;

  for(let i = 0; i < 150; i++){
    confettis.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * -confettiCanvas.height,
      w: 8,
      h: 14,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      speed: 2 + Math.random() * 3,
      rotate: Math.random() * 360,
      dr: Math.random() * 10
    });
  }

  drawConfetti();

  setTimeout(() => {
    confettiActive = false;
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  }, duration);
}

function drawConfetti(){
  if(!confettiActive) return;

  ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);

  confettis.forEach(c => {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate((c.rotate * Math.PI) / 180);
    ctx.fillStyle = c.color;
    ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
    ctx.restore();

    c.y += c.speed;
    c.rotate += c.dr;

    if (c.y > confettiCanvas.height) {
      c.y = -10;
      c.x = Math.random() * confettiCanvas.width;
    }
  });

  requestAnimationFrame(drawConfetti);
}

window.addEventListener("resize", () => {
  confettiCanvas.width  = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});


// ---- Sound Effect ----
function playSound(id) {
  console.log('playSound()', id);
  const audio = document.getElementById(id);
  if (id === 'sfx-correct') {
    const effectPath = '/static/sounds/correct.mp3';
    if (audio) {
      try { audio.pause(); audio.currentTime = 0; audio.volume = 0.9; } catch (e) {}
      const p = audio.play();
      if (p && p.catch) {
        p.catch(err => console.log('sfx-correct element play rejected', err));
      }
    }
    try {
      const fallback = new Audio(effectPath);
      try { fallback.volume = 0.9; } catch (e) {}
      fallback.play().catch(err => console.log('sfx-correct fallback play failed', err));
    } catch (e) {
      console.log('sfx-correct fallback error', e);
    }
    return;
  }

  if (!audio) return;

  try { audio.pause(); audio.currentTime = 0; } catch (e) {}
  try {
    if (id === 'sfx-wrong') {
      audio.volume = 0.5;
    }
  } catch (e) { console.log('Error setting volume for', id, e); }

  const playPromise = audio.play();
  if (playPromise && playPromise.catch) {
    playPromise.catch(err => console.log('Sound play rejected for', id, err)).then(() => console.log('Sound played:', id));
  }
}


function playCorrectAnimalSound(animalName, onAudioEnd) {
  const currentLang = getLang();
  try { stopTimer(); } catch(e) {}

  const effectSrc = (currentLang === "en") ? "/static/sounds/hewan/effect/excellent.m4a" : "/static/sounds/hewan/effect/hebat.m4a";
  try { idPlayer.volume = 1.0; } catch(e) {}
  idPlayer.src = effectSrc;
  idPlayer.play().catch(()=>{});

  idPlayer.onended = async () => {
    idPlayer.onended = null;
    const folderLang = currentLang === "en" ? "en" : "in";
    const fileName = normalizeFileName(animalName);

    try {
        const sylContainer = infoAnimal;
      if (sylContainer) {
        await loadSyllableMapOnce();
        const activeAnimal = sessionQuestions[currentIndex] || null;
        let syls = getSyllablesFromMap(fileName, currentLang, activeAnimal, animalName);
        if (!syls || syls.length === 0) syls = splitSyllablesFallback(animalName);
        prepareSyllableSpans(sylContainer, syls, animalName);
      }
    } catch (e) { console.log('Error rendering syllables', e); }

    const notifPath = `/static/sounds/hewan/tebak_nama/notif/${folderLang}/${fileName}.m4a`;
    let syllableTimeouts = [];

    function animateSyllablesProgressivelyNotif(sylls) {
      const container = infoAnimal;
      if (!sylls || sylls.length === 0) return;
      container.classList.add('playing');
      container.style.pointerEvents = 'none';
      const timeouts = [];
      const introDelay = (currentLang === 'en') ? 1500 : 2000;
      const syllableGap = 1000;

      sylls.forEach((syl, idx) => {
        const delay = introDelay + (idx * syllableGap);
        const timeoutId = setTimeout(() => {
          if (window._timeUp) return;
          const spans = container.querySelectorAll('.syllable-piece');
          const targetSpan = spans[idx];
          if (targetSpan) {
            targetSpan.classList.add('syllable-piece-animate');
            setTimeout(() => { targetSpan.classList.remove('syllable-piece-animate'); }, 400);
          }
        }, delay);
        timeouts.push(timeoutId);
      });

      const cleanup = () => {
        timeouts.forEach(t => clearTimeout(t));
        container.classList.remove('playing');
        container.style.pointerEvents = '';
      };

      idPlayer.addEventListener('ended', cleanup, { once: true });
      idPlayer.addEventListener('pause', cleanup, { once: true });

      window._syllableCleanup = cleanup;
    }

    try {
      const introDelayMs = 0;
      setTimeout(() => {
        idPlayer.src = notifPath;
        try { idPlayer.volume = 1.0; } catch(e) {}

        const activeAnimal = sessionQuestions[currentIndex] || null;
        const syls = getSyllablesFromMap(fileName, currentLang, activeAnimal, animalName);
        prepareSyllableSpans(infoAnimal, syls, animalName);
        animateSyllablesProgressivelyNotif(syls);

        idPlayer.play().catch(err => {
          console.log('Notif audio play error:', err);
        });

        idPlayer.onended = () => {
          syllableTimeouts.forEach(t => clearTimeout(t));
          document.querySelectorAll('#info-animal .syllable-piece').forEach(s => s.classList.remove('syllable-piece-animate'));

          try {
            idPlayer.onended = null;
            try {
              const titleCaseName = toDisplayName(animalName);
              infoAnimal.textContent = titleCaseName;
            } catch (e) {}
            infoAnimal.classList.add('full-popup');
            const animalsPath = `/static/sounds/hewan/animals/${folderLang}/${fileName}.m4a`;
            idPlayer.src = animalsPath;
            try { idPlayer.volume = 1.0; } catch(e) {}
            idPlayer.play().catch(err => console.log('Error playing animals audio:', err));

            setTimeout(() => infoAnimal.classList.remove('full-popup'), 600);

            idPlayer.onended = () => {
              try {
                const habitatPath = `/static/sounds/hewan/habitat/${folderLang}/${fileName}.m4a`;
                idPlayer.src = habitatPath;
                idPlayer.play().catch(()=>{});
                idPlayer.onended = () => {
                  if (typeof onAudioEnd === 'function') onAudioEnd();
                };
              } catch (e) {
                if (typeof onAudioEnd === 'function') onAudioEnd();
              }
            };
          } catch (e) {
            if (typeof onAudioEnd === 'function') onAudioEnd();
          }
        };
      }, introDelayMs);
    } catch (e) {
      try {
        const animalsPath = `/static/sounds/hewan/animals/${folderLang}/${fileName}.m4a`;
        idPlayer.src = animalsPath; idPlayer.play().catch(()=>{});
        idPlayer.onended = () => {
          const habitatPath = `/static/sounds/hewan/habitat/${folderLang}/${fileName}.m4a`;
          idPlayer.src = habitatPath; idPlayer.play().catch(()=>{});
          idPlayer.onended = () => { if (typeof onAudioEnd === 'function') onAudioEnd(); };
        };
      } catch(e2) { if (typeof onAudioEnd === 'function') onAudioEnd(); }
    }
  };
}

// Fungsi untuk play audio coba lagi
function playTryAgainSound() {
  if (isQuestionAudioPlaying) return;
  const currentLang = getLang();
  if (currentLang === "en") {
    idPlayer.src = "/static/sounds/hewan/effect/try_again.m4a";
  } else {
    idPlayer.src = "/static/sounds/hewan/effect/coba_lagi.m4a";
  }
  
  idPlayer.play();
  idPlayer.onended = null;
}

// Play syllable-style notif -> full animal -> habitat (no effect sound)
async function playSpellingSequence(animalName, onDone) {
  const currentLang = getLang();
  const folderLang = currentLang === 'en' ? 'en' : 'in';
  const fileName = normalizeFileName(animalName);

  await loadSyllableMapOnce();
  try {
    const activeAnimal = sessionQuestions[currentIndex] || null;
    let syls = getSyllablesFromMap(fileName, currentLang, activeAnimal, animalName);
    if (!syls || syls.length === 0) syls = splitSyllablesFallback(animalName);
    prepareSyllableSpans(infoAnimal, syls, animalName);
  } catch (e) { console.log('playSpellingSequence: render error', e); }

  const notifPath = `/static/sounds/hewan/tebak_nama/notif/${folderLang}/${fileName}.m4a`;
  try {
    idPlayer.src = notifPath;
    try { idPlayer.volume = 1.0; } catch (e) {}
    const introDelay = (currentLang === 'en') ? 1500 : 2000;
    const syllableGap = 1000;
    const spans = infoAnimal.querySelectorAll('.syllable-piece');
    const timeouts = [];

    spans.forEach((sp, idx) => {
      const t = setTimeout(() => {
        spans.forEach(s => s.classList.remove('syllable-piece-animate'));
        sp.classList.add('syllable-piece-animate');
        setTimeout(() => sp.classList.remove('syllable-piece-animate'), 400);
      }, introDelay + (idx * syllableGap));
      timeouts.push(t);
    });

    const cleanup = () => { timeouts.forEach(t => clearTimeout(t)); spans.forEach(s => s.classList.remove('syllable-piece-animate')); };
    idPlayer.addEventListener('ended', cleanup, { once: true });
    idPlayer.addEventListener('pause', cleanup, { once: true });

    idPlayer.play().catch(err => console.log('playSpellingSequence: notif play error', err));

    idPlayer.onended = () => {
      try {
        try {
          const titleCaseName = toDisplayName(animalName);
          infoAnimal.textContent = titleCaseName;
        } catch (e) {}
        infoAnimal.classList.add('full-popup');
        const animalsPath = `/static/sounds/hewan/animals/${folderLang}/${fileName}.m4a`;
        idPlayer.src = animalsPath;
        try { idPlayer.volume = 1.0; } catch (e) {}
        idPlayer.play().catch(err => console.log('playSpellingSequence: animals play error', err));
        setTimeout(() => infoAnimal.classList.remove('full-popup'), 600);

        idPlayer.onended = () => {
          try {
            const habitatPath = `/static/sounds/hewan/habitat/${folderLang}/${fileName}.m4a`;
            idPlayer.src = habitatPath;
            idPlayer.play().catch(err => console.log('playSpellingSequence: habitat play error', err));
            idPlayer.onended = () => { if (typeof onDone === 'function') onDone(); };
          } catch (e) { if (typeof onDone === 'function') onDone(); }
        };
      } catch (e) { if (typeof onDone === 'function') onDone(); }
    };
  } catch (e) { console.log('playSpellingSequence error', e); if (typeof onDone === 'function') onDone(); }
}

const idPlayer = document.getElementById("id-player");
const speakBtn = document.getElementById("btn-speak");
let shuffledAnimalNames = []; 

function normalizeFileName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '_') 
    .replace(/-/g, '_'); 
}

function toDisplayName(name) {
  return (name || '')
    .trim()
    .split(/\s+/)
    .map(word =>
      word
        .split('-')
        .map(part => part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part)
        .join('-')
    )
    .join(' ');
}

async function loadSyllableMapOnce() {
  try {
    if (!window.syllableMap) {
      const resp = await fetch('/static/js/syllable_data.json');
      if (resp.ok) window.syllableMap = await resp.json();
    }
  } catch (e) { }
}

function getSyllablesFromMap(fileKey, currentLang, animalObj, fallbackLabel) {
  try {
    const map = window.syllableMap ? (window.syllableMap.animals || window.syllableMap) : null;
    if (!map) return [];

    const normalizeKey = (v) => normalizeFileName(String(v || ''));

    const keyCandidates = [
      animalObj && animalObj.id ? normalizeFileName(animalObj.id) : '',
      animalObj && animalObj.name ? normalizeFileName(animalObj.name) : '',
      fileKey || ''
    ].filter(Boolean);

    for (const key of keyCandidates) {
      if (map[key]) {
        const entry = map[key];
        return (currentLang === 'en')
          ? (entry.syllables_en || entry.syllables_id || [])
          : (entry.syllables_id || entry.syllables_en || []);
      }
    }

    const labelCandidates = [
      animalObj && animalObj.name ? animalObj.name : '',
      animalObj && animalObj.nameEn ? animalObj.nameEn : '',
      fallbackLabel || '',
      fileKey || ''
    ].map(normalizeKey).filter(Boolean);

    for (const mapKey of Object.keys(map)) {
      const entry = map[mapKey] || {};
      const entryId = normalizeKey(entry.id);
      const entryEn = normalizeKey(entry.en);
      if (labelCandidates.includes(entryId) || labelCandidates.includes(entryEn)) {
        return (currentLang === 'en')
          ? (entry.syllables_en || entry.syllables_id || [])
          : (entry.syllables_id || entry.syllables_en || []);
      }
    }
  } catch (e) { }

  return splitSyllablesFallback(fallbackLabel || '');
}

function splitSingleWord(word) {
  if (!word) return [];

  const cleanWord = word.toLowerCase();
  const vowels = 'aiueo';
  const syllables = [];
  let currentSyllable = '';

  for (let i = 0; i < cleanWord.length; i++) {
    const char = cleanWord[i];
    const nextChar = cleanWord[i + 1];
    const nextNextChar = cleanWord[i + 2];

    currentSyllable += char;

    if (vowels.includes(char)) {
      if (nextChar && !vowels.includes(nextChar)) {
        if ((nextChar === 'n' && nextNextChar === 'g') ||
            (nextChar === 'n' && nextNextChar === 'y')) {
          const afterSpecial = cleanWord[i + 3];
          if (afterSpecial && vowels.includes(afterSpecial)) {
            syllables.push(currentSyllable);
            currentSyllable = '';
          } else {
            currentSyllable += nextChar + nextNextChar;
            i += 2;
            syllables.push(currentSyllable);
            currentSyllable = '';
          }
        } else if (nextNextChar && vowels.includes(nextNextChar)) {
          syllables.push(currentSyllable);
          currentSyllable = '';
        } else if (nextNextChar && !vowels.includes(nextNextChar)) {
          currentSyllable += nextChar;
          i++;
          syllables.push(currentSyllable);
          currentSyllable = '';
        }
      } else if (!nextChar) {
        syllables.push(currentSyllable);
        currentSyllable = '';
      }
    }
  }

  if (currentSyllable) syllables.push(currentSyllable);
  return syllables.length > 0 ? syllables : [word];
}

function splitSyllablesFallback(label) {
  if (!label) return [];
  const words = label.trim().split(/\s+/);
  let allSyllables = [];
  words.forEach((w) => {
    allSyllables = allSyllables.concat(splitSingleWord(w));
  });
  return allSyllables;
}

function prepareSyllableSpans(container, syllables, originalText) {
  if (!syllables || syllables.length === 0) return;
  container.innerHTML = '';

  const words = (originalText || '').split(' ');
  let syllableIndex = 0;

  words.forEach((word, wordIdx) => {
    const hasDash = word.includes('-');
    const parts = word.split('-');

    if (hasDash) {
      parts.forEach((part, partIdx) => {
        let syllablesInPart = [];
        let reconstructed = '';

        while (syllableIndex < syllables.length) {
          const syl = syllables[syllableIndex];
          syllablesInPart.push(syl);
          reconstructed += syl.toLowerCase();
          syllableIndex++;
          if (reconstructed === part.toLowerCase()) break;
        }

        syllablesInPart.forEach((syl, sylIdx) => {
          const span = document.createElement('span');
          span.className = 'syllable-piece';
          span.textContent = syl;
          span.dataset.index = syllableIndex - syllablesInPart.length + sylIdx;
          container.appendChild(span);
        });

        if (partIdx < parts.length - 1) {
          const dash = document.createElement('span');
          dash.className = 'syllable-dash';
          dash.textContent = '-';
          container.appendChild(dash);
        }
      });
    } else {
      let syllablesInWord = [];
      let reconstructed = '';

      while (syllableIndex < syllables.length) {
        const syl = syllables[syllableIndex];
        syllablesInWord.push(syl);
        reconstructed += syl.toLowerCase();
        syllableIndex++;
        if (reconstructed === word.toLowerCase()) break;
      }

      syllablesInWord.forEach((syl, sylIdx) => {
        const span = document.createElement('span');
        span.className = 'syllable-piece';
        span.textContent = syl;
        span.dataset.index = syllableIndex - syllablesInWord.length + sylIdx;
        container.appendChild(span);
      });
    }

    if (wordIdx < words.length - 1) {
      const space = document.createElement('span');
      space.className = 'syllable-space';
      space.textContent = ' ';
      container.appendChild(space);
    }
  });
}

// Fungsi speak instruksi
function speakInstruksi() {
  const currentLang = getLang();
  isQuestionAudioPlaying = true;
  if (currentLang === "en") {
    idPlayer.src = "/static/sounds/hewan/tebak_bentuk/guess_shape.m4a";
    try { idPlayer.volume = 1.0; } catch(e) {}
    idPlayer.play().catch(() => { isQuestionAudioPlaying = false; });
    idPlayer.onended = () => {
      isQuestionAudioPlaying = false;
      if (!timerStartedForQuestion) {
        timerStartedForQuestion = true;
        startTimerForIndex(currentIndex);
      }
    };
  } else {
    idPlayer.src = "/static/sounds/hewan/tebak_bentuk/tebak_bentuk.m4a";
    try { idPlayer.volume = 1.0; } catch(e) {}
    idPlayer.play().catch(() => { isQuestionAudioPlaying = false; });
    idPlayer.onended = () => {
      isQuestionAudioPlaying = false;
      if (!timerStartedForQuestion) {
        timerStartedForQuestion = true;
        startTimerForIndex(currentIndex);
      }
    };
  }
}

// Fungsi untuk memutar opsi secara berurutan dengan animasi
function playOptionsSequentially(options, lng) {
  let index = 0;

  function playNext() {
    if (index >= options.length) return; 
    
    const opt = options[index];
    const fileName = normalizeFileName(opt);
    const folderLang = lng === "en" ? "en" : "in";
    const audioPath = `/static/sounds/hewan/habitat/${folderLang}/${fileName}.m4a`;
    
    console.log(`Playing: ${audioPath} (Original: ${opt})`);
    idPlayer.onerror = null;
    idPlayer.onended = null;
    
    idPlayer.src = audioPath;
    idPlayer.onerror = () => {
      console.error(`Audio gagal dimuat: ${audioPath}`);
      index++;
      playNext();
    };
    
    idPlayer.onended = () => {
      index++;
      playNext(); 
    };
    
    // Play audio
    idPlayer.play().catch(err => {
      console.error(` Error playing audio: ${audioPath}`, err);
      index++;
      playNext(); 
    });
  }

  playNext();
}

// Timer functions (menengah)
function startTimerForIndex(index) {
  if (timerInterval) clearInterval(timerInterval);
  if (!timerElement) timerElement = document.getElementById('timer');
  const saved = localStorage.getItem('timeRemaining_menengah_' + index);
  if (saved !== null && parseInt(saved, 10) > 0) {
    timeRemaining = parseInt(saved, 10);
  } else {
    timeRemaining = timePerQuestion[index] || 20;
  }
  updateTimerDisplay();
  if (timerElement) timerElement.classList.remove('warning');

  timerInterval = setInterval(() => {
    timeRemaining--;
    localStorage.setItem('timeRemaining_menengah_' + index, timeRemaining);
    updateTimerDisplay();
    if (timeRemaining <= 5 && timerElement) timerElement.classList.add('warning');
    if (timeRemaining === 5) {
      try { const tick = new Audio('/static/sounds/hewan/effect/tick.mp3'); try { tick.volume = 0.3; } catch(e){}; tick.play().catch(()=>{}); } catch(e){}
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
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

function showTimeupOverlay() {
  if (document.getElementById('timeup-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'timeup-overlay';
  Object.assign(overlay.style, { position: 'fixed', inset: '0', background: 'rgba(255,0,0,0.20)', zIndex: '9999', pointerEvents: 'auto', transition: 'opacity 200ms ease' });
  document.body.appendChild(overlay);
}

function hideTimeupOverlay() {
  const el = document.getElementById('timeup-overlay'); if (!el) return; try { el.remove(); } catch(e){ el.style.display='none'; }
}

function handleTimeUp(index) {
  stopTimer();
  try {
    const timesUpAudio = new Audio('/static/sounds/hewan/effect/timesup.mp3'); try { timesUpAudio.volume = 0.3; } catch(e){}
    timesUpAudio.play().catch(()=>{});
    showTimeupOverlay();
    let processed = false;
    const fallback = setTimeout(() => { if (processed) return; processed = true; hideTimeupOverlay(); proceedAfterTimeUp(index); }, 2500);
    timesUpAudio.onended = () => { if (processed) return; processed = true; clearTimeout(fallback); hideTimeupOverlay(); setTimeout(()=>proceedAfterTimeUp(index),150); };
  } catch(e) { proceedAfterTimeUp(index); }
}

function proceedAfterTimeUp(index) {
  localStorage.removeItem('timeRemaining_menengah_' + index);
  currentIndex++;
  localStorage.setItem('currentIndex_menengah', currentIndex);
  localStorage.setItem('step_menengah','hewan');
  localStorage.setItem('animalAttempt_menengah','0');
  localStorage.removeItem('habitatAnswered_menengah');
  localStorage.removeItem('selectedHabitat_menengah');
  loadQuestion();
}

function clearTimeRemainingMenengah() {
  try {
    for (let i = 0; i < totalQuestions; i++) {
      localStorage.removeItem('timeRemaining_menengah_' + i);
    }
  } catch (e) {}
}

function stopAllSounds(force = false) {
  if (idPlayer) {
    if (force || !isQuestionAudioPlaying) {
      idPlayer.pause();
      idPlayer.currentTime = 0;
    }
  }
  speechSynthesis.cancel();
}

window.addEventListener('beforeunload', () => {
  try { clearTimeRemainingMenengah(); } catch (e) {}
});

if (speakBtn) {
  speakBtn.addEventListener("click", speakInstruksi);
}

window.onload = () => {
  bgMusic.play().catch(err => console.log("BG music error:", err));
  loadQuestion();
};
