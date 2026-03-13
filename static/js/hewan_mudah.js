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
        id: ["Anjing", "Paus", "Koi"],
        en: ["Dog", "Whale", "Koi Fish"]
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
        id: ["Monyet", "Hiu", "Trenggiling"],
        en: ["Monkey", "Shark", "Pangolin"]
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
      image: "/static/img/hewan/data_hewan/katak.png",
      correctAnswer: { id: "Katak", en: "Frog" },
      answers: {
        id: ["Katak", "Monyet", "Pari"],
        en: ["Frog", "Monkey", "Stingray"]
      }
    }
  ],
  mudah: [
    {
      image: "/static/img/hewan/data_hewan/harimau.png",
      correctAnswer: { id: "Harimau", en: "Tiger" },
      answers: {
        id: ["Hiu", "Harimau", "Katak"],
        en: ["Shark", "Tiger", "Frog"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/zebra.png",
      correctAnswer: { id: "Zebra", en: "Zebra" },
      answers: {
        id: ["Jerapah", "Zebra", "Badak"],
        en: ["Giraffe", "Zebra", "Rhinoceros"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/bintang_laut.png",
      correctAnswer: { id: "Bintang Laut", en: "Starfish" },
      answers: {
        id: ["Badak", "Bintang Laut", "Harimau"],
        en: ["Rhinoceros", "Starfish", "Tiger"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/pinguin.png",
      correctAnswer: { id: "Pinguin", en: "Penguin" },
      answers: {
        id: ["Paus", "Pinguin", "Kupu-Kupu"],
        en: ["Whale", "Penguin", "Butterfly"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/kura.png",
      correctAnswer: { id: "Kura-Kura", en: "Turtle" },
      answers: {
        id: ["Kupu-Kupu", "Kura-Kura", "Paus"],
        en: ["Butterfly", "Turtle", "Whale"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/hiu.png",
      correctAnswer: { id: "Hiu", en: "Shark" },
      answers: {
        id: ["Harimau", "Hiu", "Kupu-Kupu"],
        en: ["Tiger", "Shark", "Butterfly"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/ubur_ubur.png",
      correctAnswer: { id: "Ubur-Ubur", en: "Jellyfish" },
      answers: {
        id: ["Unta", "Ubur-Ubur", "Koi"],
        en: ["Camel", "Jellyfish", "Koi Fish"]
      }
    }
  ],
  sedang: [
    {
      image: "/static/img/hewan/data_hewan/badak.png",
      correctAnswer: { id: "Badak", en: "Rhinoceros" },
      answers: {
        id: ["Burung Hantu", "Bunglon", "Badak"],
        en: ["Owl", "Chameleon", "Rhinoceros"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/elang.png",
      correctAnswer: { id: "Elang", en: "Eagle" },
      answers: {
        id: ["Landak", "Lebah", "Elang"],
        en: ["Hedgehog", "Bee", "Eagle"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/kupu.png",
      correctAnswer: { id: "Kupu-Kupu", en: "Butterfly" },
      answers: {
        id: ["Kura-Kura", "Kucing", "Kupu-Kupu"],
        en: ["Turtle", "Cat", "Butterfly"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/lebah.png",
      correctAnswer: { id: "Lebah", en: "Bee" },
      answers: {
        id: ["Landak","Lumba-Lumba", "Lebah"],
        en: ["Hedgehog", "Dolphin", "Bee"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/lumba_lumba.png",
      correctAnswer: { id: "Lumba-Lumba", en: "Dolphin" },
      answers: {
        id: ["Lebah", "Landak", "Lumba-Lumba"],
        en: ["Bee", "Hedgehog", "Dolphin"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/paus.png",
      correctAnswer: { id: "Paus", en: "Whale" },
      answers: {
        id: ["Pinguin", "Pari", "Paus"],
        en: ["Penguin", "Stingray", "Whale"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/owl.png",
      correctAnswer: { id: "Burung Hantu", en: "Owl" },
      answers: {
        id: ["Badak", "Bunglon", "Burung Hantu"],
        en: ["Rhinoceros", "Chameleon", "Owl"]
      }
    }
  ],
  sulit: [
    {
      image: "/static/img/hewan/data_hewan/unta.png",
      correctAnswer: { id: "Unta", en: "Camel" },
      answers: {
        id: ["Ubur-Ubur", "Unta", "Kupu-Kupu"],
        en: ["Jellyfish", "Camel", "Butterfly"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/pari.png",
      correctAnswer: { id: "Pari", en: "Stingray" },
      answers: {
        id: ["Paus", "Pari", "Pinguin"],
        en: ["Whale", "Stingray", "Penguin"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/gurita.png",
      correctAnswer: { id: "Gurita", en: "Octopus" },
      answers: {
        id: ["Gajah", "Gurita", "Unta"],
        en: ["Elephant", "Octopus", "Camel"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/kuda_laut.png",
      correctAnswer: { id: "Kuda Laut", en: "Seahorse" },
      answers: {
        id: ["Kura-Kura", "Kuda Laut", "Kupu-Kupu"],
        en: ["Turtle", "Seahorse", "Butterfly"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/capung.png",
      correctAnswer: { id: "Capung", en: "Dragonfly" },
      answers: {
        id: ["Cendrawasih", "Capung", "Kupu-Kupu"],
        en: ["Bird of Paradise", "Dragonfly", "Butterfly"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/anjing_laut.png",
      correctAnswer: { id: "Anjing Laut", en: "Seals" },
      answers: {
        id: ["Anjing", "Anjing Laut", "Ayam"],
        en: ["Dog", "Seals", "Chicken"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/koi.png",
      correctAnswer: { id: "Koi", en: "Koi Fish" },
      answers: {
        id: ["Kura-Kura", "Koi", "Kucing"],
        en: ["Turtle", "Koi Fish", "Cat"]
      }
    }
  ],
  sangatSulit: [
    {
      image: "/static/img/hewan/data_hewan/komodo.png",
      correctAnswer: { id: "Komodo", en: "Komodo Dragon" },
      answers: {
        id: ["Komodo", "Koi", "Kucing"],
        en: ["Komodo Dragon", "Koi Fish", "Cat"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/merak.png",
      correctAnswer: { id: "Merak", en: "Peacock" },
      answers: {
        id: ["Merak", "Monyet", "Katak"],
        en: ["Peacock", "Monkey", "Frog"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/cendrawasih.png",
      correctAnswer: { id: "Cendrawasih", en: "Bird of Paradise" },
      answers: {
        id: ["Cendrawasih", "Capung", "Kucing"],
        en: ["Bird of Paradise", "Dragonfly", "Cat"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/landak.png",
      correctAnswer: { id: "Landak", en: "Hedgehog" },
      answers: {
        id: ["Landak", "Badak", "Katak"],
        en: ["Hedgehog", "Rhinoceros", "Frog"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/trenggiling.png",
      correctAnswer: { id: "Trenggiling", en: "Pangolin" },
      answers: {
        id: ["Trenggiling", "Anjing", "Kucing"],
        en: ["Pangolin", "Dog", "Cat"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/bunglon.png",
      correctAnswer: { id: "Bunglon", en: "Chameleon" },
      answers: {
        id: ["Bunglon", "Burung Hantu", "Badak"],
        en: ["Chameleon", "Owl", "Rhinoceros"]
      }
    },
    {
      image: "/static/img/hewan/data_hewan/platipus.png",
      correctAnswer: { id: "Platipus", en: "Platypus" },
      answers: {
        id: ["Platipus", "Paus", "Pinguin"],
        en: ["Platypus", "Whale", "Penguin"]
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

// Initialize a fresh session for the "hewan_mudah" page to avoid reusing
// leftover session/score data_hewan from other games.
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
    window.location.href = "/game_hewan";
  };

  // shuffledOpts = [...opts].sort(() => 0.5 - Math.random());
  shuffledOpts = [...opts];

  shuffledOpts.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.dataset.correct =
      (opt === question.correctAnswer[lang]).toString();

    btn.addEventListener("click", () => {
      stopAllSounds();

      if (btn.dataset.correct === "true") {
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
            window.location.href = "/hewan_mudah";
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

  setTimeout(() => {
    window.location.href = "/skor_hewan";
  }, 800);
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
    try { idPlayer.volume = 0.6; } catch(e) {}
    idPlayer.play();

    idPlayer.onended = () => {
      playOptionsSequentially(shuffledOpts, "en");
    };
  } else {
    idPlayer.src = "/static/sounds/hewan/tebak_nama/tebak_nama.m4a";
    try { idPlayer.volume = 0.6; } catch(e) {}

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

function stopAllSounds() {
  speechSynthesis.cancel();
  idPlayer.pause();
  idPlayer.currentTime = 0;
}


