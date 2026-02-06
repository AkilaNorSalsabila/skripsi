const lang = localStorage.getItem("gameLang") || "id";
const toastEl = document.getElementById("toast");
const sfxCorrect = document.getElementById("sfx-correct"); 
const sfxWrong = document.getElementById("sfx-wrong");
const speakBtn = document.getElementById("btn-speak");
speakBtn.addEventListener("click", speakInstruksi);
localStorage.setItem("lastLevel", "mudah");

const idPlayer = document.getElementById("id-player");
const optionsContainer = document.getElementById("options");
const vegImage = document.getElementById("veg-image");
const titleText = document.getElementById("title-text");
const btnBack = document.getElementById("btn-back");

const texts = {
  id: "pilih nama<br>sayuran ini",
  en: "choose the name<br>of this vegetable"
};

// 🔹 jumlah soal per sesi
const totalQuestions = 5;

// 🔹 semua soal (potongan, sudah sesuai)
const bankSangatMudah = [
  {
    image: "/static/img/tomat.png",
    correctAnswer: { id: "Tomat", en: "Tomato" },
    answers: {
      id: ["Tomat", "Brokoli", "Wortel"],
      en: ["Tomato", "Broccoli", "Carrot"]
    }
  },
  {
    image: "/static/img/wortel.png",
    correctAnswer: { id: "Wortel", en: "Carrot" },
    answers: {
      id: ["Wortel", "Terong", "Kubis"],
      en: ["Carrot", "Eggplant", "Cabbage"]
    }
  },
  {
    image: "/static/img/paprika.png",
    correctAnswer: { id: "Paprika", en: "Bell Pepper" },
    answers: {
      id: ["Paprika", "Bayam", "Kentang"],
      en: ["Bell Pepper", "spinach", "potato"]
    }
  },
  {
    image: "/static/img/terong.png",
    correctAnswer: { id: "Terong", en: "Eggplant" },
    answers: {
      id: ["Terong", "Paprika", "Sawi Putih"],
      en: ["Eggplant", "Bell Pepper", "Chinese Cabbage"]
    }
  },
  {
    image: "/static/img/broccoli.png",
    correctAnswer: { id: "brokoli", en: "broccoli" },
    answers: {
      id: ["brokoli", "cabai rawit", "kentang"],
      en: ["Broccoli", "Bird's Eye Chili", "Potato"]
    }
  },
  {
    image: "/static/img/mentimun.png",
    correctAnswer: { id: "Mentimun", en: "Cucumber" },
    answers: {
      id: ["Mentimun", "Wortel", "Paprika"],
      en: ["Cucumber", "Carrot", "Bell Pepper"]
    }
  },
];

const bankMudah = [
  {
    image: "/static/img/oyong.png",
    correctAnswer: { id: "oyong", en: "luffa" },
    answers: {
      id: ["oyong", "Mentimun", "Labu Siam"],
      en: ["Luffa", "Cucumber", "Chayote"]
    }
  },
  {
    image: "/static/img/labu_siam.png",
    correctAnswer: { id: "Labu Siam", en: "Chayote" },
    answers: {
      id: ["Labu Siam", "Oyong", "Mentimun"],
      en: ["Chayote", "Luffa", "Cucumber"]
    }
  },
  {
    image: "/static/img/buncis.png",
    correctAnswer: { id: "Buncis", en: "Green Beans" },
    answers: {
      id: ["Buncis", "Kacang Panjang", "Asparagus"],
      en: ["Green Beans", "Yardlong Beans", "Asparagus"]
    }
  },
  {
    image: "/static/img/kacang_panjang.png",
    correctAnswer: { id: "Kacang Panjang", en: "Yardlong Beans" },
    answers: {
      id: ["Kacang Panjang", "Buncis", "Asparagus"],
      en: ["Yardlong Beans", "Green Bean", "Asparagus"]
    }
  },
  {
    image: "/static/img/cabai_rawit.png",
    correctAnswer: { id: "Cabai Rawit", en: "Bird's Eye Chili" },
    answers: {
      id: ["Cabai Rawit", "Paprika", "Tomat"],
      en: ["Bird's Eye Chili", "Bell Pepper", "Tomato"]
    }
  },
  {
    image: "/static/img/kentang.png",
    correctAnswer: { id: "Kentang", en: "Potato" },
    answers: {
      id: ["Kentang", "Lobak", "Wortel"],
      en: ["Potato", "Radish", "Carrot"]
    }
  },

];

const bankSedang = [
  {
    image: "/static/img/bayam.png",
    correctAnswer: { id: "Bayam", en: "Spinach" },
    answers: {
      id: ["Bayam", "Kangkung", "Sawi Hijau"],
      en: ["Spinach", "Water Spinach", "Mustard Greens"]
    }
  },
  {
    image: "/static/img/kangkung.png",
    correctAnswer: { id: "Kangkung", en: "Water Spinach" },
    answers: {
      id: ["Kangkung", "Kubis", "Sawi Hijau"],
      en: ["Water Spinach", "Cabbage", "Mustard Greens"]
    }
  },
  {
    image: "/static/img/sawi_hijau.png",
    correctAnswer: { id: "Sawi Hijau", en: "Mustard Greens" },
    answers: {
      id: ["Sawi Hijau", "Selada", "Bayam"],
      en: ["Mustard Greens", "Lettuce", "Spinach"]
    }
  },
  {
    image: "/static/img/sawi_putih.png",
    correctAnswer: { id: "Sawi Putih", en: "Chinese Cabbage" },
    answers: {
      id: ["Sawi Putih", "Kubis", "Sawi Hijau"],
      en: ["Chinese Cabbage", "Cabbage", "Mustard Greens"]
    }
  },
  {
    image: "/static/img/kubis.png",
    correctAnswer: { id: "Kubis", en: "Cabbage" },
    answers: {
      id: ["Kubis", "Sawi Putih", "Kangkung"],
      en: ["Cabbage", "Chinese Cabbage", "Water Spinach"]
    }
  },
  {
    image: "/static/img/selada.png",
    correctAnswer: { id: "Selada", en: "Lettuce" },
    answers: {
      id: ["Selada", "Kubis", "Sawi Putih"],
      en: ["Lettuce", "Cabbage", "Chinese Cabbage"]
    }
  }


];

const bankSedangkeSulit = [
  {
    image: "/static/img/seledri.png",
    correctAnswer: { id: "Seledri", en: "Celery" },
    answers: {
      id: ["Seledri", "Sawi Hijau", "Selada"],
      en: ["Celery", "Mustard Greens", "Lettuce"]
    }
  },
   {
    image: "/static/img/bawang_daun.png",
    correctAnswer: { id: "Bawang Daun", en: "Leek" },
    answers: {
      id: ["Bawang Daun", "Bawang Merah", "Bawang Putih"],
      en: ["Leek", "Shallot", "Garlic"]
    }
  },
  {
    image: "/static/img/daun_pakis.png",
    correctAnswer: { id: "Daun Pakis", en: "Fiddlehead Fern" },
    answers: {
      id: ["Daun Pakis", "Daun Bawang", "Daun Selada"],
      en: ["Fiddlehead Fern", "spring onion", "Spinach"]
    }
  },
  {
    image: "/static/img/asparagus.png",
    correctAnswer: { id: "Asparagus", en: "Asparagus" },
    answers: {
      id: ["Asparagus", "Kacang Panjang", "Buncis"],
      en: ["Asparagus", "Yardlong Bean", "Green Bean"]
    }
  },
  {
    image: "/static/img/rebung.png",
    correctAnswer: { id: "Rebung", en: "Bamboo Shoot" },
    answers: {
      id: ["Rebung", "Wortel", "Lobak"],
      en: ["Bamboo Shoot", "Carrot", "Radish"]
    }
  },
   {
    image: "/static/img/jantung_pisang.png",
    correctAnswer: { id: "jantung pisang", en: "Banana Blossom" },
    answers: {
      id: ["jantung pisang", "Jamur Kancing", "Jamur Tiram"],
      en: ["Banana Blossom", "Button Mushroom", "Oyster Mushroom"]
    }
  },

];

const bankSulit = [
  {
    image: "/static/img/lobak.png",
    correctAnswer: { id: "Lobak", en: "Radish" },
    answers: {
      id: ["Lobak", "Kentang", "Wortel"],
      en: ["Radish", "Potato", "Carrot"]
    }
  },
  {
    image: "/static/img/bit_merah.png",
    correctAnswer: { id: "Bit Merah", en: "Beetroot" },
    answers: {
      id: ["Bit Merah", "Bawang Merah", "Bawang Bombay"],
      en: ["Beetroot", "Shallot", "Onion"]
    }
  },
  {
    image: "/static/img/jamur_kancing.png",
    correctAnswer: { id: "Jamur Kancing", en: "Button Mushroom" },
    answers: {
      id: ["Jamur Kancing", "Jantung Pisang", "Jamur Tiram"],
      en: ["Button Mushroom", "Banana Blossom", "Oyster mushroom"]
    }
  },
  {
    image: "/static/img/bawang_merah.png",
    correctAnswer: { id: "Bawang Merah", en: "Shallot" },
    answers: {
      id: ["Bawang Merah", "Bawang Putih", "Bawang Bombay"],
      en: ["Shallot", "Garlic", "Onion"]
    }
  },
  {
    image: "/static/img/bawang_putih.png",
    correctAnswer: { id: "Bawang Putih", en: "Garlic" },
    answers: {
      id: ["Bawang Putih", "Bawang Merah", "Bawang Bombay"],
      en: ["Garlic", "Shallot", "Onion"]
    }
  },
  {
    image: "/static/img/bawang_bombay.png",
    correctAnswer: { id: "Bawang Bombay", en: "Onion" },
    answers: {
      id: ["Bawang Bombay", "Bawang Merah", "Bawang Putih"],
      en: ["Onion", "Shallot", "Garlic"]
    }
  }

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

    btn.addEventListener("click", () => {
      stopAllSounds();
      const isCorrect = opt.toLowerCase() === question.correctAnswer[lang].toLowerCase();
      if (isCorrect) {
        localStorage.setItem("notifVeg", JSON.stringify({
          id: question.correctAnswer.id,
          en: question.correctAnswer.en,
          img: question.image
        }));
        sfxCorrect.play();
        correctCount++;
        localStorage.setItem("correctCount", correctCount);
        setTimeout(() => { window.location.href = "/mudah_notif"; }, 800);
      } else {
        sfxWrong.play();
        showWrongOverlay("✖", (lang === "id" ? "salah!" : "wrong!"));
        setTimeout(() => { hideWrongOverlay(); nextQuestion(); }, 1200);
      }
    });
    optionsContainer.appendChild(btn);
  });

  document.getElementById("progress").textContent = `Soal ${currentIndex + 1}/${totalQuestions}`;
  setTimeout(speakInstruksi, 600);
}

// --- AUDIO LOGIC (DIREVISI TOTAL) ---
function speakInstruksi() {
  stopAllSounds();
  
  let path = (lang === "en") 
    ? "/static/sounds/En/Tebak nama.mp3" 
    : "/static/sounds/id/ui/pilih_nama.mp3";

  idPlayer.src = path;
  
  idPlayer.play().then(() => {
    idPlayer.onended = () => {
      // Jeda sebentar setelah instruksi agar telinga siap mendengar opsi 1
      setTimeout(() => {
        playOptionsSequentially(0);
      }, 400);
    };
  }).catch(e => {
    // Jika file .mp3 instruksi ID tidak ketemu, coba .m4a
    if (lang === "id") {
      idPlayer.src = "/static/sounds/id/ui/pilih_nama.m4a";
      idPlayer.play().then(() => {
        idPlayer.onended = () => playOptionsSequentially(0);
      }).catch(() => playOptionsSequentially(0));
    } else {
      playOptionsSequentially(0);
    }
  });
}

function playOptionsSequentially(idx) {
  if (idx >= shuffledOpts.length) return;

  const currentOption = shuffledOpts[idx];
  const buttons = document.querySelectorAll(".option-btn");
  
  // Efek visual zoom pada tombol yang sedang dibacakan
  buttons.forEach(btn => {
    if (btn.textContent.toLowerCase() === currentOption.toLowerCase()) {
      btn.classList.add("zoom-active");
      setTimeout(() => btn.classList.remove("zoom-active"), 1000);
    }
  });

  let folder = (lang === "en") ? "En" : "id/options";
  let fileName = "";

  if (lang === "en") {
    let question = sessionQuestions[currentIndex];
    let pos = question.answers.en.indexOf(currentOption);
    fileName = question.answers.id[pos]; // Tetap panggil file Indo di folder En
  } else {
    fileName = currentOption;
  }

  idPlayer.src = `/static/sounds/${folder}/${fileName}.mp3`;
  
  idPlayer.play().then(() => {
    idPlayer.onended = () => playOptionsSequentially(idx + 1);
  }).catch(err => {
    // Fallback .m4a jika .mp3 tidak ada
    if (lang === "id") {
      idPlayer.src = `/static/sounds/${folder}/${fileName}.m4a`;
      idPlayer.play()
        .then(() => { idPlayer.onended = () => playOptionsSequentially(idx + 1); })
        .catch(() => playOptionsSequentially(idx + 1));
    } else {
      playOptionsSequentially(idx + 1);
    }
  });
}

function stopAllSounds() {
  idPlayer.pause();
  idPlayer.currentTime = 0;
  idPlayer.onended = null;
}

function nextQuestion() {
  currentIndex++;
  localStorage.setItem("currentIndex", currentIndex);
  if (currentIndex >= totalQuestions) {
    const finalScore = correctCount * 20;
    localStorage.setItem("finalScore", finalScore);
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
  document.getElementById("wrong-overlay").classList.add("hidden");
}

window.addEventListener("load", loadQuestion);