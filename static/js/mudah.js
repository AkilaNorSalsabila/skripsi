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

// 🔹 teks instruksi
const texts = {
  id: "Pilih nama<br>sayuran ini",
  en: "Choose the name<br>of this vegetable"
};

// 🔹 jumlah soal per sesi
const totalQuestions = 5;

// 🔹 semua soal (30 data)
const allQuestions = [ 
  {
    image: "/static/img/broccoli.png",
    correctAnswer: { id: "Brokoli", en: "Broccoli" },
    answers: {
      id: ["Brokoli", "Kubis", "Bayam"],
      en: ["Broccoli", "Cabbage", "Spinach"]
    }
  },
    {
    image: "/static/img/jantung_pisang.png",
    correctAnswer: { id: "Jantung Pisang", en: "Banana Blossom" },
    answers: {
      id: ["Jantung Pisang", "Lobak", "Rebung"],
      en: ["Banana Blossom", "Radish", "Bamboo Shoot"]
    }
  },
  {
    image: "/static/img/oyong.png",
    correctAnswer: { id: "Oyong", en: "Luffa" },
    answers: {
      id: ["Oyong", "Labu Siam", "Mentimun"],
      en: ["Luffa", "Chayote", "Cucumber"]
    }
  },
  {
    image: "/static/img/terong.png",
    correctAnswer: { id: "Terong", en: "Eggplant" },
    answers: {
      id: ["Terong", "Paprika", "Mentimun"],
      en: ["Eggplant", "Bell Pepper", "Cucumber"]
    }
  },
  {
    image: "/static/img/mentimun.png",
    correctAnswer: { id: "Mentimun", en: "Cucumber" },
    answers: {
      id: ["Mentimun", "Oyong", "Labu Siam"],
      en: ["Cucumber", "Luffa", "Chayote"]
    }
  },
  {
    image: "/static/img/tomat.png",
    correctAnswer: { id: "Tomat", en: "Tomato" },
    answers: {
      id: ["Tomat", "Paprika", "Cabai Rawit"],
      en: ["Tomato", "Bell Pepper", "Chili"]
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
    correctAnswer: { id: "Buncis", en: "Green Bean" },
    answers: {
      id: ["Buncis", "Kacang Panjang", "Asparagus"],
      en: ["Green Bean", "Yardlong Bean", "Asparagus"]
    }
  },
  {
    image: "/static/img/kacang_panjang.png",
    correctAnswer: { id: "Kacang Panjang", en: "Yardlong Bean" },
    answers: {
      id: ["Kacang Panjang", "Buncis", "Asparagus"],
      en: ["Yardlong Bean", "Green Bean", "Asparagus"]
    }
  },
  {
    image: "/static/img/bayam.png",
    correctAnswer: { id: "Bayam", en: "Spinach" },
    answers: {
      id: ["Bayam", "Kangkung", "Sawi Hijau"],
      en: ["Spinach", "Water Spinach", "Mustard Greens"]
    }
  },
  {
    image: "/static/img/kubis.png",
    correctAnswer: { id: "Kubis", en: "Cabbage" },
    answers: {
      id: ["Kubis", "Sawi Putih", "Selada"],
      en: ["Cabbage", "Chinese Cabbage", "Lettuce"]
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
    image: "/static/img/sawi_hijau.png",
    correctAnswer: { id: "Sawi Hijau", en: "Mustard Greens" },
    answers: {
      id: ["Sawi Hijau", "Kangkung", "Bayam"],
      en: ["Mustard Greens", "Water Spinach", "Spinach"]
    }
  },
  {
    image: "/static/img/kangkung.png",
    correctAnswer: { id: "Kangkung", en: "Water Spinach" },
    answers: {
      id: ["Kangkung", "Bayam", "Sawi Hijau"],
      en: ["Water Spinach", "Spinach", "Mustard Greens"]
    }
  },
  {
    image: "/static/img/selada.png",
    correctAnswer: { id: "Selada", en: "Lettuce" },
    answers: {
      id: ["Selada", "Kubis", "Sawi Putih"],
      en: ["Lettuce", "Cabbage", "Chinese Cabbage"]
    }
  },
  {
    image: "/static/img/lobak.png",
    correctAnswer: { id: "Lobak", en: "Radish" },
    answers: {
      id: ["Lobak", "Kentang", "Bit Merah"],
      en: ["Radish", "Potato", "Beetroot"]
    }
  },
  {
    image: "/static/img/wortel.png",
    correctAnswer: { id: "Wortel", en: "Carrot" },
    answers: {
      id: ["Wortel", "Lobak", "Kentang"],
      en: ["Carrot", "Radish", "Potato"]
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
  {
    image: "/static/img/bit_merah.png",
    correctAnswer: { id: "Bit Merah", en: "Beetroot" },
    answers: {
      id: ["Bit Merah", "Lobak", "Wortel"],
      en: ["Beetroot", "Radish", "Carrot"]
    }
  },
  {
    image: "/static/img/jamur_kancing.png",
    correctAnswer: { id: "Jamur Kancing", en: "Button Mushroom" },
    answers: {
      id: ["Jamur Kancing", "Bawang Bombay", "Bawang Putih"],
      en: ["Button Mushroom", "Onion", "Garlic"]
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
  },
  {
    image: "/static/img/paprika.png",
    correctAnswer: { id: "Paprika", en: "Bell Pepper" },
    answers: {
      id: ["Paprika", "Tomat", "Cabai Rawit"],
      en: ["Bell Pepper", "Tomato", "Chili"]
    }
  },
  {
    image: "/static/img/cabai_rawit.png",
    correctAnswer: { id: "Cabai Rawit", en: "Chili" },
    answers: {
      id: ["Cabai Rawit", "Paprika", "Tomat"],
      en: ["Chili", "Bell Pepper", "Tomato"]
    }
  },
  {
    image: "/static/img/seledri.png",
    correctAnswer: { id: "Seledri", en: "Celery" },
    answers: {
      id: ["Seledri", "Bawang Daun", "Asparagus"],
      en: ["Celery", "Spring Onion", "Asparagus"]
    }
  },
  {
    image: "/static/img/bawang_daun.png",
    correctAnswer: { id: "Bawang Daun", en: "Spring Onion" },
    answers: {
      id: ["Bawang Daun", "Seledri", "Asparagus"],
      en: ["Spring Onion", "Celery", "Asparagus"]
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
      id: ["Rebung", "Jantung Pisang", "Lobak"],
      en: ["Bamboo Shoot", "Banana Blossom", "Radish"]
    }
  },
  {
    image: "/static/img/daun_pakis.png",
    correctAnswer: { id: "Daun Pakis", en: "Fern Shoot" },
    answers: {
      id: ["Daun Pakis", "Kangkung", "Bayam"],
      en: ["Fern Shoot", "Water Spinach", "Spinach"]
    }
  }
];

// 🔹 ambil soal sesi dari localStorage
let shuffledOpts = [];
let sessionQuestions = JSON.parse(localStorage.getItem("sessionQuestions")) || [];
let currentIndex = parseInt(localStorage.getItem("currentIndex") || "0");
let correctCount = parseInt(localStorage.getItem("correctCount") || "0", 10);
localStorage.setItem("totalQuestions", totalQuestions);

// 🔹 kalau belum ada sesi → buat 5 soal random
if (sessionQuestions.length === 0) {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  sessionQuestions = shuffled.slice(0, totalQuestions);
  localStorage.setItem("sessionQuestions", JSON.stringify(sessionQuestions));
  localStorage.setItem("currentIndex", "0");
  localStorage.setItem("correctCount", "0");
  currentIndex = 0;
  correctCount = 0;
}

// 🔹 soal sekarang
let question = sessionQuestions[currentIndex];

// 🔹 render soal
// 🔹 render soal
function loadQuestion() {
  vegImage.src = question.image;
  vegImage.alt = question.correctAnswer[lang];
  titleText.innerHTML = texts[lang];

  let opts = question.answers[lang];
  optionsContainer.innerHTML = "";

  // 🔹 tampilkan tombol back hanya di soal pertama
  const backBtn = document.querySelector(".back-button");
  if (currentIndex === 0) {
    backBtn.style.display = "block"; // tampil
  } else {
    backBtn.style.display = "none";  // sembunyikan
  }
  // 🔹 Hentikan semua suara saat tombol back ditekan
  if (backBtn) {
    backBtn.onclick = () => {
      stopAllSounds();
    };
  }
  

  // 🔹 acak urutan jawaban
  shuffledOpts = [...opts].sort(() => 0.5 - Math.random());

  shuffledOpts.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.dataset.correct = (opt === question.correctAnswer[lang]).toString();

    btn.addEventListener("click", () => {
  stopAllSounds(); // 🔹 hentikan suara begitu user pilih jawaban

  if (btn.dataset.correct === "true") {
    // ✅ jawaban benar
    localStorage.setItem("notifVeg", JSON.stringify({
      id: question.correctAnswer.id,
      en: question.correctAnswer.en,
      img: question.image
    }));

    sfxCorrect.play();
    correctCount++;
    localStorage.setItem("correctCount", correctCount);

    if (currentIndex + 1 < totalQuestions) {
      setTimeout(() => {
        window.location.href = "/mudah_notif";
      }, 800);
    } else {
      finishGame();
    }
  } else {
    // ❌ jawaban salah
    sfxWrong.play();

    const overlay = document.getElementById("wrong-overlay");
    overlay.classList.remove("hidden");

    setTimeout(() => {
      overlay.classList.add("hidden");
      if (currentIndex + 1 < totalQuestions) {
        localStorage.setItem("currentIndex", currentIndex + 1);
        window.location.href = "/level_mudah";
      } else {
        finishGame();
      }
    }, 1200);
  }
});


    optionsContainer.appendChild(btn);
  });

  // 🔹 update progress soal
  document.getElementById("progress").textContent = `Soal ${currentIndex + 1}/${totalQuestions}`;

  // 🔹 auto play instruksi setelah soal muncul
  setTimeout(speakInstruksi, 500);
}

window.addEventListener("load", loadQuestion);

// 🔹 selesai game → hitung skor & redirect
function finishGame() {
  const finalScore = Math.round((correctCount / totalQuestions) * 100);
  localStorage.setItem("finalScore", finalScore);

  localStorage.removeItem("sessionQuestions");
  localStorage.removeItem("currentIndex");

  setTimeout(() => {
    window.location.href = "/skor";
  }, 800);
}

// 🔹 speak instruksi
function speakInstruksi() {
  if (lang === "en") {
    const utter = new SpeechSynthesisUtterance(
      "Choose the name of this vegetable. Options are: " + shuffledOpts.join(", ")
    );
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
  } else {
    idPlayer.src = "/static/sounds/id/ui/pilih_nama.mp3";
    idPlayer.play();

    // setelah instruksi utama selesai, lanjut sebutkan opsi acak
    idPlayer.onended = () => {
      playOptionsSequentially(shuffledOpts, "id");
    };
  }
}

// 🔹 mainkan opsi acak satu per satu (Indo)
function playOptionsSequentially(options, lang) {
  if (lang === "en") return; // English sudah ditangani di atas

  let index = 0;
  function playNext() {
    if (index < options.length) {
      const opt = options[index];
      idPlayer.src = `/static/sounds/id/options/${opt}.mp3`;
      idPlayer.play();
      index++;
      idPlayer.onended = playNext;
    }
  }
  playNext();
}

function stopAllSounds() {
  // stop TTS English
  speechSynthesis.cancel();

  // stop audio Indonesia
  idPlayer.pause();
  idPlayer.currentTime = 0;
}

