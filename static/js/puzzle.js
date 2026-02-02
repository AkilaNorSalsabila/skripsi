// puzzle.js (final version dengan instruksi awal)

// Core variables
let currentQuestion = 1;
let placedCount = 0;
let draggedPiece = null;
let selectedSoal = []; 
const scorePerSolved = 20; 
let totalScore = parseInt(localStorage.getItem("puzzleScore") || "0", 10);
let timerInterval = null;
let timeLeft = 0;
let timeExpired = false;
localStorage.setItem("lastLevel", "sulit");

// MAP waktu per jumlah pieces (detik)
const timeByPieces = {
  2: 20,
  4: 40,
  6: 60,
  9: 90,
  12: 120
};

// --- SOAL UTILS ---
function groupSoalByPieces(bank) {
  const groups = {};
  bank.forEach(soal => {
    const count = soal.pieces.length;
    if (!groups[count]) groups[count] = [];
    groups[count].push(soal);
  });
  return groups;
}

function pickRandomSoal(bank) {
  const groups = groupSoalByPieces(bank);
  const selected = [];
  for (let count in groups) {
    const arr = groups[count];
    const randomIndex = Math.floor(Math.random() * arr.length);
    selected.push(arr[randomIndex]);
  }
  return selected;
}

// Inisialisasi soal
window.addEventListener("load", () => {
  selectedSoal = pickRandomSoal(bankSoal);
  totalScore = parseInt(localStorage.getItem("puzzleScore") || "0", 10);
  loadQuestion(currentQuestion);
});

const totalQuestions = () => selectedSoal.length;

function updateProgress() {
  document.getElementById("progress").textContent =
    `Soal ${currentQuestion}/${totalQuestions()}`;
}

// --- SPEECH ---
function speakEnglish(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

// Instruksi awal puzzle
function playInstructionStart() {
  const lang = localStorage.getItem("gameLang") || "id";
  window.speechSynthesis.cancel();

  const soundVegetable = document.getElementById("sound-vegetable");
  soundVegetable.pause();
  soundVegetable.currentTime = 0;

  if (lang === "en") {
    speakEnglish("Arrange this vegetable puzzle");
  } else {
    // Audio instruksi puzzle di folder ui
    soundVegetable.src = "/static/sounds/id/ui/puzzle.m4a";
    soundVegetable.play();
  }
}


// --- TIMER ---
function getTimeForSoal(soal) {
  const count = soal.pieces.length;
  return timeByPieces[count] || 60;
}

function startTimer(seconds) {
  stopTimer();
  timeLeft = seconds;
  timeExpired = false;
  renderTimer();
  timerInterval = setInterval(() => {
    timeLeft--;
    renderTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timeExpired = true;
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

function renderTimer() {
  const el = document.getElementById("timer");
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  el.textContent = `Waktu ${mm}:${ss}`;
}

function onTimeUp() {
  // Hentikan suara
  window.speechSynthesis && window.speechSynthesis.cancel();
  const soundVegetable = document.getElementById("sound-vegetable");
  const soundCongrats = document.getElementById("sound-congrats");
  if (soundVegetable) { soundVegetable.pause(); soundVegetable.currentTime = 0; }
  if (soundCongrats) { soundCongrats.pause(); soundCongrats.currentTime = 0; }

  // Mainkan suara salah
  const soundWrong = document.getElementById("sound-wrong");
  if (soundWrong) {
    soundWrong.currentTime = 0;
    soundWrong.play();
  }

  // Ambil bahasa
  const lang = localStorage.getItem("gameLang") || "id";
  const msg = (lang === "en") ? "Time's Up!" : "Waktu Habis!";

  // Tampilkan overlay merah dengan ikon jam
  showTimeUpOverlay("⏱️", msg);

  // Setelah 1.5 detik lanjut ke soal berikut
  setTimeout(() => {
    hideTimeUpOverlay();
    nextQuestion();
  }, 1500);
}
function showTimeUpOverlay(icon, text) {
  hideTimeUpOverlay(); // hapus overlay lama jika ada
  const overlay = document.createElement("div");
  overlay.id = "timeup-overlay";
  overlay.innerHTML = `
    <div class="timeup-content">
      <div class="timeup-icon">${icon}</div>
      <div class="timeup-text">${text}</div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function hideTimeUpOverlay() {
  const el = document.getElementById("timeup-overlay");
  if (el) el.remove();
}


// --- LOAD QUESTION ---
function loadQuestion(no) {
  placedCount = 0;
  draggedPiece = null;
  timeExpired = false;

  const soal = selectedSoal[no - 1];
  if (!soal) return;

  // Back button
  const backBtn = document.querySelector(".back-button");
  const player = document.getElementById("id-player");

  if (backBtn) {
  if (no === 1) {
    backBtn.style.display = "block"; // tampil hanya di soal pertama
  } else {
    backBtn.style.display = "none";  // sembunyikan soal 2–5
  }
}



  // DOM refs
  const fullImage = document.getElementById("full-image");
  const siluetBg = document.querySelector("#siluet img");
  const slotsContainer = document.getElementById("slots");
  const piecesContainer = document.getElementById("pieces-container");
  const board = document.getElementById("board");
  const container = document.getElementById("game-container");

  // Reset layout
  container.style.justifyContent = "center";
  container.style.alignItems = "flex-start";
  container.style.gap = "20px";
  piecesContainer.style.display = "grid";

  // Board size
  board.style.width = soal.width + "px";
  board.style.height = soal.height + "px";
  fullImage.style.width = soal.width + "px";
  fullImage.style.height = soal.height + "px";
  siluetBg.style.width = soal.width + "px";
  siluetBg.style.height = soal.height + "px";

  // Reset isi
  slotsContainer.innerHTML = "";
  piecesContainer.innerHTML = "";
  document.getElementById("message").classList.add("hidden");

  Array.from(board.querySelectorAll("img")).forEach(img => {
    if (img.id !== "full-image" && !img.classList.contains("siluet-bg")) {
      img.remove();
    }
  });

  // Set gambar
  fullImage.src = soal.full;
  siluetBg.src = soal.siluet;

  // Buat slot
  soal.pieces.forEach(p => {
    const slot = document.createElement("div");
    slot.classList.add("slot");
    slot.dataset.piece = p.id;
    slot.style.left = p.slot.left + "px";
    slot.style.top = p.slot.top + "px";
    slot.style.width = p.slot.width + "px";
    slot.style.height = p.slot.height + "px";
    slotsContainer.appendChild(slot);
  });

  renderPieces(soal.pieces);

  // Tampilkan full image sebentar
  fullImage.classList.remove("hidden");
  document.getElementById("siluet").classList.add("hidden");
  setTimeout(() => {
    fullImage.classList.add("hidden");
    document.getElementById("siluet").classList.remove("hidden");
  }, 1200);

  shufflePieces();
  initDragDrop();
  updateProgress();

  // Update judul sesuai bahasa
  const lang = localStorage.getItem("gameLang") || "id";
  const title = document.getElementById("game-title");
  if (lang === "en") {
    title.innerHTML = "Arrange this<br>vegetable puzzle";
  } else {
    title.innerHTML = "Susun puzzle<br>sayuran ini";
  }

  // Instruksi awal
  playInstructionStart();

  // Mulai timer
  const seconds = getTimeForSoal(soal);
  startTimer(seconds);
}

// --- RENDER PIECES ---
function renderPieces(pieces) {
  const container = document.getElementById("pieces-container");
  container.innerHTML = "";

  if (pieces.length === 12) {
    container.style.gridTemplateColumns = "repeat(4, auto)";
  } else if (pieces.length === 4) {
    container.style.gridTemplateColumns = "repeat(2, auto)";
  } else if (pieces.length > 4) {
    container.style.gridTemplateColumns = "repeat(3, auto)";
  }

  pieces.forEach(p => {
    const img = document.createElement("img");
    img.src = p.src;
    img.dataset.id = p.id;
    img.draggable = true;
    container.appendChild(img);
  });
}

function shufflePieces() {
  const container = document.getElementById("pieces-container");
  const arr = Array.from(container.children);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  arr.forEach(p => container.appendChild(p));
}

// --- DRAG & DROP ---
function initDragDrop() {
  const pieces = document.querySelectorAll("#pieces-container img");
  const slots = document.querySelectorAll(".slot");

  const soundCorrect = document.getElementById("sound-correct");
  const soundWrong = document.getElementById("sound-wrong");

  draggedPiece = null;

  pieces.forEach(piece => {
    piece.addEventListener("dragstart", e => {
      if (timeExpired) { e.preventDefault(); return; }
      draggedPiece = e.target;
      e.dataTransfer.setData("text", draggedPiece.dataset.id);
    });
  });

  slots.forEach(slot => {
    slot.addEventListener("dragover", e => e.preventDefault());

    slot.addEventListener("drop", e => {
      e.preventDefault();
      if (timeExpired) return;
      if (slot.dataset.filled === "true") return;

      const pieceId = e.dataTransfer.getData("text");
      const correctId = slot.dataset.piece;

      if (pieceId === correctId) {
        const img = document.querySelector(
          `#pieces-container img[data-id='${pieceId}']`
        );
        if (!img) return;

        img.style.position = "absolute";
        img.style.left = slot.style.left;
        img.style.top = slot.style.top;
        img.style.width = slot.style.width;
        img.style.height = slot.style.height;
        img.draggable = false;

        document.getElementById("board").appendChild(img);
        slot.dataset.filled = "true";

        soundCorrect.currentTime = 0;
        soundCorrect.play();

        placedCount++;
        draggedPiece = null;

        // --- PUZZLE SELESAI ---
        if (placedCount === slots.length) {
          puzzleSolved();
        }
      } else {
        // optional: mainkan suara salah
        if (soundWrong) { soundWrong.currentTime = 0; soundWrong.play(); }
      }
    });
  });
} // <-- ini kurung penutup yang hilang

// --- PUZZLE SOLVED ---
function puzzleSolved() {
  stopTimer(); 
  totalScore += scorePerSolved;
  localStorage.setItem("puzzleScore", totalScore);

  // sembunyikan pieces
  document.getElementById("pieces-container").style.display = "none";
  const container = document.getElementById("game-container");
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.gap = "0";

  const message = document.getElementById('message');
  const soal = selectedSoal[currentQuestion - 1];
  const lang = localStorage.getItem("gameLang") || "id";

  // --- notif teks selesai puzzle ---
  if (lang === "en") {
    message.textContent = "🎉 Puzzle Completed! 🎉";
  } else {
    message.textContent = "🎉 Puzzle Selesai! 🎉";
  }
  message.classList.remove('hidden');

  // --- CONFETTI ---
  let canvas = document.getElementById("confetti");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "confetti";
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiPieces = [];
  const colors = ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"];
  for (let i = 0; i < 120; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 8,
      h: 14,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 2 + Math.random() * 3,
      rotate: Math.random() * 360,
      dr: Math.random() * 10
    });
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotate * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();

      p.y += p.speed;
      p.rotate += p.dr;
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(drawConfetti);
  }
  drawConfetti();

  // --- SUARA ---
  const soundCongrats = document.getElementById("sound-congrats");
  const soundVegetable = document.getElementById("sound-vegetable");

  soundCongrats.currentTime = 0;
  soundCongrats.play();

  soundCongrats.onended = () => {
    if (lang === "en") {
      // Bahasa Inggris
      const utter = new SpeechSynthesisUtterance("Success! This is " + soal.name_en);
      utter.lang = "en-US";
      speechSynthesis.speak(utter);
    } else {
      // Bahasa Indonesia
      // Bahasa Indonesia → langsung pakai audio custom
      const formattedName = soal.name_id; 
      soundVegetable.src = `/static/sounds/id/notif_puzzle/${formattedName}.m4a`;
      soundVegetable.play();
}
};

  

  // --- AUTO NEXT ---
  setTimeout(() => {
    message.classList.add('hidden');
    if (canvas) canvas.remove(); 
    nextQuestion();
  }, 8000);
}



// --- NEXT QUESTION & FINISH ---
function nextQuestion() {
  window.speechSynthesis && window.speechSynthesis.cancel();
  document.getElementById("sound-vegetable").pause();
  document.getElementById("sound-vegetable").currentTime = 0;
  document.getElementById("sound-congrats").pause();
  document.getElementById("sound-congrats").currentTime = 0;

  if (currentQuestion < selectedSoal.length) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  } else {
    // ✅ pakai total poin langsung
    localStorage.setItem("finalScore", totalScore);
    localStorage.setItem("puzzleScore", totalScore);

    setTimeout(() => { window.location.href = "/skor"; }, 400);
  }
}

// --- SPEAKER BUTTON --- 
document.getElementById("sound-btn").addEventListener("click", () => {
  playInstructionStart(); 
});

