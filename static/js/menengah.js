// ==========================
// FORCE RESET BANK SOAL (DEV MODE)

// ==========================
const MENENGAH_QUESTION_VERSION = "v7"; // ganti kalau kamu ubah bank soal

if (localStorage.getItem("MENENGAH_Q_VERSION") !== MENENGAH_QUESTION_VERSION) {
  localStorage.removeItem("menengahQuestions");
  localStorage.removeItem("menengahCurrent");
  localStorage.removeItem("menengahScore");
  localStorage.setItem("MENENGAH_Q_VERSION", MENENGAH_QUESTION_VERSION);
}
// ==================
// MENENGAH GAME JS
// ==================

// Simpan level saat ini
localStorage.setItem("lastLevel", "menengah");
if (!localStorage.getItem("menengahStarted")) {
  localStorage.setItem("menengahStarted", "true");
  localStorage.setItem("menengahScore", "0");
  localStorage.setItem("menengahCurrent", "0");
}


// Ambil skor & progress
let score = parseInt(localStorage.getItem("menengahScore") || "0", 10);
let currentQuestion = parseInt(localStorage.getItem("menengahCurrent") || "0", 10);

// Ambil bahasa (default "id")
const language = localStorage.getItem("gameLang") || "id";

// Timer
let timerInterval;
let timeLeft = 20;
let timeExpired = false;

// ==================
// ELEMENT
// ==================
const siluetContainer = document.getElementById("siluet-container");
const pilihanContainer = document.getElementById("pilihan-container");
const progressText = document.getElementById("progress");
const sfxCorrect = document.getElementById("sfx-correct");
const sfxWrong = document.getElementById("sfx-wrong");
const instructionEl = document.getElementById("title-text");
const sayurAudio = document.getElementById("sayurAudio") || new Audio();

// ==================
// TRANSLATION
// ==================
const translations = {
  id: { instruction: "Cocokkan<br>sayuran ini", time: "Waktu" },
  en: { instruction: "Match<br>the Vegetables", time: "Time" }
};
instructionEl.innerHTML = translations[language].instruction;

// ==================
// ENGLISH MAP
// ==================
const engMap = {
  "Brokoli": "Broccoli",
  "Kubis": "Cabbage",
  "Mentimun": "Cucumber",
  "Wortel": "Carrot",
  "Tomat": "Tomato",
  "Paprika": "Bell Pepper",
  "Bayam": "Spinach",
  "Kangkung": "Water Spinach",
  "Sawi Hijau": "Mustard Greens",
  "Sawi Putih": "Chinese Cabbage",
  "Selada": "Lettuce",
  "Lobak": "Radish",
  "Kentang": "Potato",
  "Bit Merah": "Beetroot",
  "Jamur Kancing": "Button Mushroom",
  "Bawang Merah": "Shallot",
  "Bawang Putih": "Garlic",
  "Bawang Bombay": "Onion",
  "Bawang Daun": "Leek",
  "Cabai Rawit": "Bird's Eye Chili",
  "Jantung Pisang": "Banana Blossom",
  "Rebung": "Bamboo Shoot",
  "Daun Pakis": "Fiddlehead Fern",
  "Asparagus": "Asparagus",
  "Oyong": "Luffa",
  "Labu Siam": "Chayote",
  "Seledri": "Celery",
  "Buncis": "Green Beans",
  "Kacang Panjang": "Yardlong Beans",
  "Terong": "Eggplant"
};
function normalizeName(raw) {
  return raw
    .toLowerCase()
    .replace(/_full/g, "")        // ⬅️ FIX UTAMA
    .replace(/full/g, "")         // ⬅️ JAGA-JAGA
    .replace(/_/g, " ")
    .replace(/\d+/g, "")
    .replace(/\.(png|jpg|jpeg)/g, "")
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

const SangatMudah = [
  { id: "q1",  questionImages: ["/static/img/kacang_panjang_siluet_m.png"], answers: ["Kacang Panjang"], options: ["Kacang Panjang", "Terong"] },
  { id: "q2",  questionImages: ["/static/img/brokoli_siluet_m.png"], answers: ["Brokoli"], options: ["Brokoli", "Mentimun"] },
  { id: "q3", questionImages: ["/static/img/jamur_kancing_siluet_m.png"], answers: ["Jamur Kancing"], options: ["Jamur Kancing", "Wortel"] },
  { id: "q4", questionImages: ["/static/img/seledri_siluet_m.png"], answers: ["Seledri"], options: ["Seledri", "Tomat"] },
  { id: "q5",  questionImages: ["/static/img/terong_siluet_m.png"], answers: ["Terong"], options: ["Terong", "Selada"] },
  { id: "q6", questionImages: ["/static/img/paprika_siluet_m.png"], answers: ["Paprika"], options: ["Paprika", "Kangkung"] },

];

const Mudah = [
  { id: "q7", questionImages: ["/static/img/bayam_siluet_m.png"], answers: ["Bayam"], options: ["Bayam", "Kangkung", "Tomat"] },
  { id: "q8", questionImages: ["/static/img/kubis_siluet_m.png"], answers: ["Kubis"], options: ["Kubis", "Wortel", "Selada"] },
  { id: "q9", questionImages: ["/static/img/sawi_putih_siluet_m.png"], answers: ["Sawi Putih"], options: ["Sawi Putih", "Sawi Hijau", "Terong"] },
  { id: "q10", questionImages: ["/static/img/kangkung_siluet_m.png"], answers: ["Kangkung"], options: ["Kangkung", "Bayam", "Bit Merah"] },
  { id: "q11", questionImages: ["/static/img/bawang_daun_siluet_m.png"], answers: ["Bawang Daun"], options: ["Bawang Daun", "Seledri", "Paprika"] },
  { id: "q12", questionImages: ["/static/img/cabai_rawit_siluet_m.png"], answers: ["Cabai Rawit"], options: ["Cabai Rawit", "Paprika", "Kentang"] },
];

const Menengah = [
  { id: "q13",  questionImages: ["/static/img_full/Mentimun_s.png"],
    answer: "/static/img_full/Mentimun_2.png",
    options: [
      "/static/img_full/Oyong_full.png",
      "/static/img_full/Mentimun_2.png",
      "/static/img_full/Labu_full.png",
      "/static/img_full/Terong2.png" ]
  },

  { id: "q14",  questionImages: ["/static/img_full/Oyong_s.png"],
    answer: "/static/img_full/Oyong_full.png",
    options: [
      "/static/img_full/Mentimun2.png",
      "/static/img_full/Oyong_full.png",
      "/static/img_full/Labu_full.png",
      "/static/img_full/Terong2.png" ]
  },
  { id: "q15",  questionImages: ["/static/img_full/Buncis_s.png"],
    answer: "/static/img_full/Buncis_full.png",
    options: [
      "/static/img_full/Buncis_full.png",
      "/static/img_full/Kacang_full.png",
      "/static/img_full/Asparagus_full.png",
      "/static/img_full/Rebung_2.png" ]
  },
  { id: "q16",  questionImages: ["/static/img_full/Asparagus_s.png"],
    answer: "/static/img_full/Asparagus_full.png",
    options: [
      "/static/img_full/Buncis_full.png",
      "/static/img_full/Kacang_full.png",
      "/static/img_full/Asparagus_full.png",
      "/static/img_full/Rebung_2.png" ]
  },
  { id: "q17",  questionImages: ["/static/img_full/Rebung_s.png"],
    answer: "/static/img_full/Rebung_full.png",
    options: [
      "/static/img_full/lobak_4.png",
      "/static/img_full/Jantung_pisang_full.png",
      "/static/img_full/Labu_Siam_6.png",
      "/static/img_full/Rebung_full.png" ]
  },
   { id: "q18",  questionImages: ["/static/img_full/Wortel_s.png"],
    answer: "/static/img_full/Wortel_full.png",
    options: [
      "/static/img_full/Oyong2.png",
      "/static/img_full/Mentimun_Full.png",
      "/static/img_full/Lobak_full.png",
      "/static/img_full/Wortel_full.png" ]
  },
]

const MenengahKeSulit = [
  { id: "q19",  questionImages: ["/static/img_full/Kentang_s.png"],
    answer: "/static/img_full/Kentang2.png",
    options: [
      "/static/img_full/Kentang2.png",
      "/static/img_full/Bit_Full.png",
      "/static/img_full/Tomat_full.png",
      "/static/img_full/Bawang_Merah_7.png" ]
  },
  { id: "q20",  questionImages: ["/static/img_full/Lobak_s.png"],
    answer: "/static/img_full/Lobak_full.png",
    options: [
      "/static/img_full/Oyong2.png",
      "/static/img_full/Wortel_full.png",
      "/static/img_full/Lobak_full.png",
      "/static/img_full/Mentimun_full.png" ]
  },
  { id: "q21",  questionImages: ["/static/img_full/Bawang_Merah_s.png"],
    answer: "/static/img_full/Bawang_merah_2.png",
    options: [
      "/static/img_full/Bawang_merah_2.png",
      "/static/img_full/Kentang3.png",
      "/static/img_full/Bawang_bombay_full.png",
      "/static/img_full/Putih_full.png" ]
  },
  { id: "q22",  questionImages: ["/static/img_full/Sawi_s.png"],
    answer: "/static/img_full/Sawi_Hijau_full.png",
    options: [
      "/static/img_full/Sawi_Hijau_full.png",
      "/static/img_full/Bayam_1.png",
      "/static/img_full/Kangkung_full.png",
      "/static/img_full/Pakis_full.png" ]
  },
  { id: "q23",  questionImages: ["/static/img_full/Selada_s.png"],
    answer: "/static/img_full/Selada_full.png",
    options: [
      "/static/img_full/Sawi_Putih_7.png",
      "/static/img_full/Pakcoy.png",
      "/static/img_full/Sawi_hijau_2.png",
      "/static/img_full/Selada_full.png" ]
  },
  { id: "q24",  questionImages: ["/static/img_full/Tomat_s.png"],
    answer: "/static/img_full/Tomat2_full.png",
    options: [
      "/static/img_full/Tomat2_full.png",
      "/static/img_full/Paprika_full.png",
      "/static/img_full/Bawang_bombay_full.png",
      "/static/img_full/Bawang_merah_2.png" ]
  },
]

const sulit = [

  { id: "q25",  questionImages: ["/static/img_full/Daun_Pakis_6.png"],
    answer: "/static/img_full/Daun_Pakis_full2.png",
    options: [
      "/static/img_full/Seledri_3.png",
      "/static/img_full/Daun_Bawang_1.png",
      "/static/img_full/Kangkung_full.png",
      "/static/img_full/Daun_Pakis_full2.png" ]
  },
  { id: "q26",  questionImages: ["/static/img_full/Bit_s.png"],
    answer: "/static/img_full/Bit_merah_3.png",
    options: [
      "/static/img_full/Kentang4.png",
      "/static/img_full/Bawang_bombay_3.png",
      "/static/img_full/Tomat3.png",
      "/static/img_full/Bit_merah_3.png" ]
  },
  { id: "q27",  questionImages: ["/static/img_full/Putih_s.png"],
    answer: "/static/img_full/Bawang_Putih_2.png",
    options: [
      "/static/img_full/Kentang5.png",
      "/static/img_full/Bawang_Putih_2.png",
      "/static/img_full/Bawang_merah_3.png",
      "/static/img_full/Bawang_bombay_3.png" ]
  },
  { id: "q28",  questionImages: ["/static/img_full/Bawang_bombay_s.png"],
    answer: "/static/img_full/Bawang_bombay_3.png",
    options: [
      "/static/img_full/Bawang_Putih_2.png",
      "/static/img_full/Bawang_bombay_3.png",
      "/static/img_full/Bawang_merah_3.png",
      "/static/img_full/Bit_merah_3.png" ]
  },
  { id: "q29",  questionImages: ["/static/img_full/Jantung_pisang_s.png"],
    answer: "/static/img_full/Jantung_pisang.png",
    options: [
      "/static/img_full/Rebung2.png",
      "/static/img_full/Labu_siam_2.png",
      "/static/img_full/Jantung_pisang.png",
      "/static/img_full/Mentimun_7.png" ]
  },
  { id: "q30",  questionImages: ["/static/img_full/Labu_s.png"],
    answer: "/static/img_full/Labu_siam_3.png",
    options: [
      "/static/img_full/Labu_siam_3.png",
      "/static/img_full/Paprika2.png",
      "/static/img_full/Bawang_bombay_4.png",
      "/static/img_full/Tomat5.png" ]
  },
  
  


]








// ==================
// ==========================
// LEVEL FLOW RANDOM SYSTEM
// ==========================

// fungsi shuffle
function shuffle(arr){
  let a = [...arr];
  for(let i = a.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ==========================
// LEVEL FLOW RANDOM SYSTEM (FINAL)
// ==========================
// 🔥 FORCE RANDOM SETIAP MASUK GAME
localStorage.removeItem("menengahQuestions");
localStorage.removeItem("menengahCurrent");
localStorage.removeItem("menengahScore");

let allQuestions = JSON.parse(localStorage.getItem("menengahQuestions"));

if (!allQuestions) {
  // 🔥 FORCE RANDOM SETIAP MASUK GAME
const sm  = shuffle(SangatMudah);
const m   = shuffle(Mudah);
const mid = shuffle(Menengah);
const ms  = shuffle(MenengahKeSulit);
const h   = shuffle(sulit);

allQuestions = [
  sm[0],   // soal 1 → sangat mudah
  m[0],    // soal 2 → mudah
  mid[0],  // soal 3 → menengah
  ms[0],   // soal 4 → menengah ke sulit
  h[0]     // soal 5 → sulit
];

localStorage.setItem("menengahQuestions", JSON.stringify(allQuestions));
localStorage.setItem("menengahCurrent", "0");
localStorage.setItem("menengahScore", "0");

}

const totalQuestions = allQuestions.length;
localStorage.setItem("menengahTotal", totalQuestions);


// ==================
// TIMER
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
  if (timerInterval) { clearInterval(timerInterval); timerInterval=null; }
}
function renderTimer() {
  const el = document.getElementById("timer");
  if(el) el.textContent = `${translations[language].time} 00:${String(timeLeft).padStart(2,"0")}`;
}
function onTimeUp() {
  score = Math.max(0, score-20);
  localStorage.setItem("menengahScore", score);
  if(sfxWrong) { sfxWrong.currentTime=0; sfxWrong.play(); }
  
  const msg = (language==="id") ? "Waktu Habis!" : "Time's Up!";
  showWrongOverlay("⏱️",msg);
  setTimeout(()=>{ hideWrongOverlay(); nextQuestion(); },1500);
}

// ==================
// AUDIO
// ==================
function playInstructionAudio() {
  if (language === "id") {
    // Audio Bahasa Indonesia
    sayurAudio.src = "/static/sounds/id/ui/cocokkan_sayuran.mp4";
    sayurAudio.play().catch(() => {});
  } else {
    // Audio Bahasa Inggris dari folder static/sounds/En/
    // Nama file: Mencocokkan.mp3
    sayurAudio.src = "/static/sounds/En/Mencocokkan.mp3";
    sayurAudio.play().catch((err) => {
      console.error("Gagal memutar audio instruksi Inggris:", err);
    });
  }
}

function playSayurAudio(name){
  const cleanName = normalizeName(name);

  if(language==="id"){
    let filename = cleanName.toLowerCase().replace(/ /g,"_");
    sayurAudio.src = `/static/audio/${filename}_id.mp3`;
    sayurAudio.play().catch(()=>{});
  } 
  else if("speechSynthesis" in window){
    const english = engMap[cleanName] || cleanName;
    const utter = new SpeechSynthesisUtterance(english);
    utter.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  }
}


// ==================
// OVERLAY
// ==================
function showWrongOverlay(icon="✖",text="Salah!"){
  hideWrongOverlay();
  let overlay=document.createElement("div");
  overlay.className="wrong-overlay";
  overlay.innerHTML=`<div class="wrong-content"><h1>${icon}</h1><p>${text}</p></div>`;
  document.body.appendChild(overlay);
}
function hideWrongOverlay(){
  const overlay=document.querySelector(".wrong-overlay");
  if(overlay) overlay.remove();
}
// ==================
// BACK BUTTON
// ==================
const btnBack = document.getElementById("btn-back");
if (btnBack) {
  btnBack.addEventListener("click", (e) => {
  e.preventDefault();

  // Reset semua data
  localStorage.removeItem("menengahQuestions"); // 🧩 tambahkan ini
  localStorage.removeItem("menengahCurrent");
  localStorage.removeItem("menengahScore");
  localStorage.removeItem("menengahStarted");
  localStorage.removeItem("lastLevel");

  window.location.href = "/pilih_level";
});

}


// tampilkan/hidden back button sesuai soal
function updateBackButton() {
  if (!btnBack) return;
  btnBack.style.display = (currentQuestion === 0) ? "block" : "none";
}
// GAME FLOW (loadQuestion)
// ==================
function loadQuestion() {
  if (currentQuestion >= totalQuestions) { finishGame(); return; }

  timeExpired = false;
  timeLeft = 20;
  renderTimer();

  if (progressText) 
    progressText.textContent = `${language==="id"?"Soal":"Question"} ${currentQuestion+1}/${totalQuestions}`;

  // 🔹 tampilkan back button hanya di soal pertama
  updateBackButton();

siluetContainer.innerHTML = "";
pilihanContainer.innerHTML = "";

// ✅ soal HARUS duluan
const soal = allQuestions[currentQuestion];
const isImageMode = !!soal.answer;

// ✅ reset semua layout class
pilihanContainer.classList.remove(
  "row",
  "grid-2x2",
  "grid-2-top-1-center"
);

const optionCount = soal.options.length;

if (optionCount === 2) {
  pilihanContainer.classList.add("row");
} else if (optionCount === 3) {
  pilihanContainer.classList.add("grid-2-top-1-center");
} else if (optionCount === 4) {
  pilihanContainer.classList.add("grid-2x2");
}


  // Play instruksi
  playInstructionAudio();

  // Siluet
  soal.questionImages.forEach((imgSrc, idx) => {
    let dropZone = document.createElement("div");
    dropZone.classList.add("siluet");
    

    dropZone.dataset.answer = isImageMode ? soal.answer : soal.answers[idx];


    let siluetImg = document.createElement("img");
    siluetImg.src = imgSrc;
    siluetImg.alt = "siluet";
    siluetImg.classList.add("siluet-img");
    dropZone.appendChild(siluetImg);

    dropZone.addEventListener("dragover", e => e.preventDefault());
    dropZone.addEventListener("drop", e => {
  e.preventDefault();
  if (timeExpired) return;
  const dragged = e.dataTransfer.getData("text");

  if (dragged === dropZone.dataset.answer) {
  score += 20;
  localStorage.setItem("menengahScore", score);

  if (sfxCorrect) {
    sfxCorrect.currentTime = 0;
    sfxCorrect.play();
  }

  // 🔹 SIMPAN UNTUK NOTIF
  // 🔹 SIMPAN UNTUK NOTIF
// 🔹 SIMPAN UNTUK NOTIF
localStorage.setItem("lastAnswer", dragged);
localStorage.setItem("lastIsImage", isImageMode ? "1" : "0");

// ================================
// 🔥 FIX NOTIF SEMUA MODE (FINAL)
// ================================

// ✅ TEXT MODE (Sangat Mudah & Mudah)
let finalName = dragged;

if (dragged.includes("/")) {
  finalName = normalizeName(dragged.split("/").pop());
}

localStorage.setItem("lastAnswerName", finalName);



  // bersihkan siluet
dropZone.innerHTML = "";

// buat gambar baru khusus hasil drop
const droppedImg = document.createElement("img");

if (isImageMode) {
  droppedImg.src = dragged;
} else {
  droppedImg.src = `/static/img/${dragged.toLowerCase().replace(/ /g,"_")}_m.png`;
}

// 🔥 CLASS KHUSUS (INI YANG BIKIN BESAR)
droppedImg.classList.add("sayur-dropped");

// ❗ PENTING: matikan drag ulang
droppedImg.draggable = false;

// masukkan ke siluet
dropZone.appendChild(droppedImg);

// tandai benar
dropZone.classList.add("correct");


  const usedOption = pilihanContainer.querySelector(`img[data-name="${dragged}"]`);
  if (usedOption) usedOption.remove();

   const targetCount = isImageMode ? 1 : soal.answers.length;

if (siluetContainer.querySelectorAll(".correct").length === targetCount) {

  stopTimer();
  clearInterval(timerInterval); // tambah ini
  timeExpired = false; // pastikan tidak trigger onTimeUp
  localStorage.setItem("lastLang", language);
  currentQuestion++;
  localStorage.setItem("menengahCurrent", currentQuestion);

  setTimeout(() => { 
    window.location.href = "/menengah_notif"; 
  }, 1200);
}


  } else {
    // ❌ Jawaban salah
    if (sfxWrong) { sfxWrong.currentTime = 0; sfxWrong.play(); }
    
    const msg = (language === "id") ? "Salah!" : "Wrong!";
    showWrongOverlay("✖", msg);

    stopTimer();
    setTimeout(() => { hideWrongOverlay(); nextQuestion(); }, 800);
  }
});


    siluetContainer.appendChild(dropZone);
  });

  // Pilihan jawaban
  // Pilihan jawaban (acak posisi jawaban benar)
let optionsShuffled = [...soal.options];

// Fungsi shuffle
for (let i = optionsShuffled.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  [optionsShuffled[i], optionsShuffled[j]] = [optionsShuffled[j], optionsShuffled[i]];
}

// Tampilkan pilihan
optionsShuffled.forEach(opt => {
  let img = document.createElement("img");

  if (isImageMode) {
    img.src = opt;        // ⬅️ path gambar
    img.dataset.name = opt;
  } else {
    img.src = `/static/img/${opt.toLowerCase().replace(/ /g, "_")}_m.png`;
    img.dataset.name = opt;
  }

  img.classList.add("sayur");
  img.draggable = true;

  img.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text", img.dataset.name);
  });

  pilihanContainer.appendChild(img);
});


  


  startTimer();
}

function nextQuestion(){
  currentQuestion++;
  localStorage.setItem("menengahCurrent",currentQuestion);
  loadQuestion();
}

function finishGame() {
  localStorage.setItem("finalScore", score);
  localStorage.setItem("correctCount", Math.floor(score / 20));
  localStorage.setItem("totalQuestions", totalQuestions);
  localStorage.removeItem("menengahStarted");


  // ❌ jangan hapus menengahScore dulu, biarkan untuk debugging / retry
  // localStorage.removeItem("menengahQuestions");
  // localStorage.removeItem("menengahCurrent");
  // localStorage.removeItem("menengahScore");

  // Tambahkan sedikit delay untuk memastikan localStorage tersimpan
  setTimeout(() => {
    window.location.href = "/skor";
  }, 300);
}


// ==================
// START GAME
// ==================
window.onload=()=>{
  loadQuestion();
};

// ==================
window.addEventListener('pageshow', (event) => {
  if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
    // Reset progress saat kembali ke halaman ini dari back button browser
    localStorage.removeItem("menengahQuestions");
    localStorage.removeItem("menengahCurrent");
    localStorage.removeItem("menengahScore");
    localStorage.removeItem("lastLevel");

    currentQuestion = 0;
    score = 0;
  }
});


// ==================
// AUDIO BUTTON
// ==================
const btnSpeak=document.getElementById("btn-speak");
if(btnSpeak){
  btnSpeak.addEventListener("click",()=>{ playInstructionAudio(); });
}
