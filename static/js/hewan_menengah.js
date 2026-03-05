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
  return currentLang === "en" ? animal.nameEn : animal.name;
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
      options: ["anjing", "monyet"],
      optionsEn: ["dog", "monkey"],
      habitatOptions: [8, 5, 10],
      habitatIn: "Lingkungan rumah dan pekarangan",
      habitatEn: "Around the house"
    },
    { 
      name: "kucing", 
      nameEn: "cat",
      color: "/static/img/hewan/data_hewan/kucing.png", 
      habitatNumber: 10,
      options: ["kucing", "lebah"],
      optionsEn: ["cat", "bee"],
      habitatOptions: [8, 5, 10],
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
      options: ["gajah", "jerapah"],
      optionsEn: ["elephant", "giraffe"],
      habitatOptions: [8, 5, 2],
      habitatIn: "Lingkungan hutan dan savana",
      habitatEn: "Forest and savanna"
    },
    { 
      name: "monyet", 
      nameEn: "monkey",
      color: "/static/img/hewan/data_hewan/monyet.png", 
      habitatNumber: 9,
      options: ["monyet", "ayam"],
      optionsEn: ["monkey", "chicken"],
      habitatOptions: [5, 8, 9],
      habitatIn: "Hutan dan pepohonan",
      habitatEn: "Forest"
    },
    { 
      name: "katak", 
      nameEn: "frog",
      color: "/static/img/hewan/data_hewan/katak.png", 
      habitatNumber: 8,
      options: ["katak", "monyet"],
      optionsEn: ["frog", "monkey"],
      habitatOptions: [2, 5, 8],
      habitatIn: "rawa dan tepi sungai",
      habitatEn: "Swamps"
    },
    { 
      name: "jerapah", 
      nameEn: "giraffe",
      color: "/static/img/hewan/data_hewan/jerapah.png", 
      habitatNumber: 1,
      options: ["jerapah", "landak"],
      optionsEn: ["giraffe", "hedgehog"],
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
      name: "zebra", 
      nameEn: "zebra",
      color: "/static/img/hewan/data_hewan/zebra.png", 
      habitatNumber: 2,
      options: ["harimau", "zebra", "kuda laut"],
      optionsEn: ["tiger", "zebra", "seahorse"],
      habitatOptions: [2, 8, 5],
      habitatIn: "Savana",
      habitatEn: "Savanna"
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
      name: "hiu", 
      nameEn: "shark",
      color: "/static/img/hewan/data_hewan/hiu.png", 
      habitatNumber: 5,
      options: ["lumba-lumba", "hiu", "pari"],
      optionsEn: ["dolphin", "shark", "stingray"],
      habitatOptions: [5, 2, 8],
      habitatIn: "Laut",
      habitatEn: "Ocean"
    },
    { 
      name: "kura-kura", 
      nameEn: "turtle",
      color: "/static/img/hewan/data_hewan/kura.png", 
      habitatNumber: 8,
      options: ["katak", "kura-kura", "trenggiling"],
      optionsEn: ["frog", "turtle", "pangolin"],
      habitatOptions: [8, 6, 2],
      habitatIn: "Sungai atau danau",
      habitatEn: "Lakes"
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
      options: ["gajah", "zebra", "badak"],
      optionsEn: ["elephant", "zebra", "rhinoceros"],
      habitatOptions: [5, 2, 8],
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
      name: "unta", 
      nameEn: "camel",
      color: "/static/img/hewan/data_hewan/unta.png", 
      habitatNumber: 6,
      options: ["unta", "anjing", "kucing", "harimau"],
      optionsEn: ["camel", "dog", "cat", "tiger"],
      habitatOptions: [5, 8, 6],
      habitatIn: "Gurun pasir",
      habitatEn: "Desert"
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
      name: "gurita", 
      nameEn: "octopus",
      color: "/static/img/hewan/data_hewan/gurita.png", 
      habitatNumber: 5,
      options: ["gurita", "ubur-ubur", "bintang laut", "kuda laut"],
      optionsEn: ["octopus", "jellyfish", "starfish", "seahorse"],
      habitatOptions: [8, 9, 5],
      habitatIn: "Laut",
      habitatEn: "Ocean"
    },
    { 
      name: "kuda laut", 
      nameEn: "seahorse",
      color: "/static/img/hewan/data_hewan/kuda_laut.png", 
      habitatNumber: 5,
      options: ["kuda laut", "gurita", "bintang laut", "ubur-ubur"],
      optionsEn: ["seahorse", "octopus", "starfish", "jellyfish"],
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
      options: ["anjing laut", "platipus", "komodo", "trenggiling"],
      optionsEn: ["seal", "platypus", "komodo", "pangolin"],
      habitatOptions: [6, 8, 5],
      habitatIn: "Pulau dengan laut iklim dingin",
      habitatEn: "Ocean"
    },
    { 
      name: "koi", 
      nameEn: "koi",
      color: "/static/img/hewan/data_hewan/koi.png", 
      habitatNumber: 3,
      options: ["koi", "lumba-lumba", "hiu", "paus"],
      optionsEn: ["koi", "dolphin", "shark", "whale"],
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
      habitatIn: "Pulau Komodo, Rinca dan Savana",
      habitatEn: "Savanna and islands"
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
      options: ["landak", "bunglon", "trenggiling", "kura-kura"],
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
      options: ["kura-kura", "bunglon", "landak", "trenggiling"],
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
      options: ["komodo", "kura-kura", "platipus", "trenggiling"],
      optionsEn: ["komodo", "turtle", "platypus", "pangolin"],
      habitatOptions: [8, 5, 2],
      habitatIn: "Sungai atau rawa",
      habitatEn: "Swamps"
    },
    { 
      name: "bunglon", 
      nameEn: "chameleon",
      color: "/static/img/hewan/data_hewan/bunglon.png", 
      habitatNumber: 9,
      options: ["landak", "kura-kura", "bunglon", "trenggiling"],
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
  { number: 1, img: "/static/img/hewan/habitat/1.png" },
  { number: 2, img: "/static/img/hewan/habitat/2.png" },
  { number: 3, img: "/static/img/hewan/habitat/3.png" },
  { number: 4, img: "/static/img/hewan/habitat/4.png" },
  { number: 5, img: "/static/img/hewan/habitat/5.png" },
  { number: 6, img: "/static/img/hewan/habitat/6.png" },
  { number: 7, img: "/static/img/hewan/habitat/7.png" },
  { number: 8, img: "/static/img/hewan/habitat/8.png" },
  { number: 9, img: "/static/img/hewan/habitat/9.png" },
  { number: 10, img: "/static/img/hewan/habitat/10.png" }
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
  
  // Load saved step for current question
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
      stopAllSounds();
      exitOverlay.classList.remove("hidden");
    };
  }

  cancelExitBtn.onclick = () => {
    exitOverlay.classList.add("hidden");
  };

  confirmExitBtn.onclick = () => {
    stopAllSounds();
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
    // User was already in habitat phase, restore that state
    const drop = siluetContainer.querySelector(".drop-zone");
    if (drop) {
      drop.innerHTML = `<img src="${q.color}">`;
      drop.classList.add("correct");
    }
    habitatContainer.classList.add("active");
    
    // If habitat was already answered correctly, restore that too
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
        
        // Play correct sound effect and start confetti (restore full experience)
        playSound("sfx-correct");
        startConfetti();
        
        // Show info panel and auto-proceed to next question
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
        });
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
        setTimeout(() => drop.classList.remove("shake"), 400);
      } else {
        playSound("sfx-wrong");
        
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
        
        showInfoText(animal, animal.habitatNumber, () => {
          // Setelah audio selesai, beri jeda sebentar lalu lanjut soal berikutnya
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
  playSound("sfx-correct"); 
  startConfetti();
  showInfoText(animal, animal.habitatNumber, () => {
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

} else {
  drop.classList.add("shake");
  playSound("sfx-wrong"); 
  setTimeout(() => drop.classList.remove("shake"), 400);

  hideOptions();
  showInfoText(animal, animal.habitatNumber, () => {
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
  }, false); 
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
  
  // Preserve the option order defined in questionBank (do not shuffle)
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
  pilihanContainer.innerHTML = ""; // Clear dulu
  
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
      img.addEventListener("dragstart", e =>
        e.dataTransfer.setData("text", opt.number)
      );
    } else {
      img.dataset.name = opt.name;
      img.addEventListener("dragstart", e =>
        e.dataTransfer.setData("text", opt.name)
      );
    }
    
    // Pointer fallback for touch devices: lightweight clone + rAF
    img.addEventListener('pointerdown', function (ev) {
      if (ev.pointerType === 'mouse') return; // let mouse use native drag
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
      img.addEventListener("dragstart", e =>
        e.dataTransfer.setData("text", opt.number)
      );
    } else {
      img.dataset.name = opt.name;
      img.addEventListener("dragstart", e =>
        e.dataTransfer.setData("text", opt.name)
      );
    }
    
    // Pointer fallback for touch devices: lightweight clone + rAF
    img.addEventListener('pointerdown', function (ev) {
      if (ev.pointerType === 'mouse') return; // let mouse use native drag
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
  // Capitalize each word (Title Case)
  const titleCaseName = animalName.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
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
    // remove any active drag clones
    document.querySelectorAll('.drag-clone').forEach(c => c.remove());
  } catch (e) { console.log('Error disabling interactions for info panel', e); }

  if (playCorrectSound) {
    const effectSound = currentLang === "en" ? "/static/sounds/hewan/effect/correct.m4a" : "/static/sounds/hewan/effect/benar.m4a";
    idPlayer.src = effectSound;
    try { idPlayer.volume = 0.8; } catch(e) {}
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
  }
}

function hideInfoText(){
  infoPanel.classList.remove("show");
  setTimeout(() => {
    infoPanel.classList.add("hidden");
  }, 700);

  // re-enable interactions
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
  const audio = document.getElementById(id);
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  try {
    if (id === 'sfx-correct') {
      audio.volume = 0.8;
    } else if (id === 'sfx-wrong') {
      audio.volume = 0.5;
    }
  } catch (e) {
    console.log('Error setting volume for', id, e);
  }
  audio.play().catch(err => {
    console.log("Sound error:", err);
  });
}


// Fungsi untuk play audio "benar" dan nama hewan secara berurutan
function playCorrectAnimalSound(animalName) {
  // 1. Play efek benar
  const currentLang = getLang();
  if (currentLang === "en") {
    idPlayer.src = "/static/sounds/hewan/effect/correct.m4a";
  } else {
    idPlayer.src = "/static/sounds/hewan/effect/benar.m4a";
  }
  try { idPlayer.volume = 0.8; } catch(e) {}
  idPlayer.play();
  
  // 2. play nama hewan
  idPlayer.onended = () => {
    const fileName = normalizeFileName(animalName);
    const folderLang = currentLang === "en" ? "en" : "in";
    idPlayer.src = `/static/sounds/hewan/habitat/${folderLang}/${fileName}.m4a`;
    try { idPlayer.volume = 1.0; } catch(e) {}
    idPlayer.play();
    idPlayer.onended = null;
  };
}

// Fungsi untuk play audio coba lagi
function playTryAgainSound() {
  const currentLang = getLang();
  if (currentLang === "en") {
    idPlayer.src = "/static/sounds/hewan/effect/try_again.m4a";
  } else {
    idPlayer.src = "/static/sounds/hewan/effect/coba_lagi.m4a";
  }
  
  idPlayer.play();
  idPlayer.onended = null;
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

// Fungsi speak instruksi
function speakInstruksi() {
  const currentLang = getLang();
  if (currentLang === "en") {
    idPlayer.src = "/static/sounds/hewan/tebak_bentuk/guess_shape.m4a";
    try { idPlayer.volume = 0.8; } catch(e) {}
    idPlayer.play();
    idPlayer.onended = null;
  } else {
    idPlayer.src = "/static/sounds/hewan/tebak_bentuk/tebak_bentuk.m4a";
    try { idPlayer.volume = 0.8; } catch(e) {}
    idPlayer.play();
    idPlayer.onended = null; 
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

function stopAllSounds() {
  if (idPlayer) {
    idPlayer.pause();
    idPlayer.currentTime = 0;
  }
  speechSynthesis.cancel();
}

if (speakBtn) {
  speakBtn.addEventListener("click", speakInstruksi);
}

window.onload = () => {
  bgMusic.play().catch(err => console.log("BG music error:", err));
  loadQuestion();
};
