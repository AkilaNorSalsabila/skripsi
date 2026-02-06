// puzzle.js (Final Version - Fixed Audio & Logic)

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

// --- SPEECH / AUDIO ---
function playInstructionStart() {
    const lang = localStorage.getItem("gameLang") || "id";
    const soundVegetable = document.getElementById("sound-vegetable");
    
    soundVegetable.pause();
    soundVegetable.currentTime = 0;
    soundVegetable.onended = null; // Clear previous events

    if (lang === "en") {
        soundVegetable.src = "/static/sounds/Puzzle.mp3";
    } else {
        soundVegetable.src = "/static/sounds/id/ui/puzzle.m4a";
    }
    soundVegetable.play().catch(e => console.log("Audio play blocked", e));
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
    const soundVegetable = document.getElementById("sound-vegetable");
    const soundCongrats = document.getElementById("sound-congrats");
    const soundWrong = document.getElementById("sound-wrong");

    if (soundVegetable) { soundVegetable.pause(); soundVegetable.currentTime = 0; }
    if (soundCongrats) { soundCongrats.pause(); soundCongrats.currentTime = 0; }

    if (soundWrong) {
        soundWrong.currentTime = 0;
        soundWrong.play();
    }

    const lang = localStorage.getItem("gameLang") || "id";
    const msg = (lang === "en") ? "Time's Up!" : "Waktu Habis!";
    showTimeUpOverlay("⏱️", msg);

    setTimeout(() => {
        hideTimeUpOverlay();
        nextQuestion();
    }, 1500);
}

function showTimeUpOverlay(icon, text) {
    hideTimeUpOverlay();
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
    stopTimer();

    const soal = selectedSoal[no - 1];
    if (!soal) return;

    const backBtn = document.querySelector(".back-button");
    if (backBtn) {
        backBtn.style.display = (no === 1) ? "block" : "none";
    }

    const fullImage = document.getElementById("full-image");
    const siluetBg = document.querySelector("#siluet img");
    const slotsContainer = document.getElementById("slots");
    const piecesContainer = document.getElementById("pieces-container");
    const board = document.getElementById("board");
    const container = document.getElementById("game-container");

    container.style.justifyContent = "center";
    container.style.alignItems = "flex-start";
    container.style.gap = "20px";
    piecesContainer.style.display = "grid";

    board.style.width = soal.width + "px";
    board.style.height = soal.height + "px";
    fullImage.style.width = soal.width + "px";
    fullImage.style.height = soal.height + "px";
    siluetBg.style.width = soal.width + "px";
    siluetBg.style.height = soal.height + "px";

    slotsContainer.innerHTML = "";
    piecesContainer.innerHTML = "";
    document.getElementById("message").classList.add("hidden");

    Array.from(board.querySelectorAll("img")).forEach(img => {
        if (img.id !== "full-image" && !img.classList.contains("siluet-bg")) {
            img.remove();
        }
    });

    fullImage.src = soal.full;
    siluetBg.src = soal.siluet;

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
    shufflePieces();
    initDragDrop();
    updateProgress();

    const lang = localStorage.getItem("gameLang") || "id";
    const title = document.getElementById("game-title");
    title.innerHTML = (lang === "en") ? "Arrange this<br>vegetable puzzle" : "Susun puzzle<br>sayuran ini";

    fullImage.classList.remove("hidden");
    document.getElementById("siluet").classList.add("hidden");
    
    playInstructionStart();

    const initialSeconds = getTimeForSoal(soal);
    timeLeft = initialSeconds;
    renderTimer();

    setTimeout(() => {
        fullImage.classList.add("hidden");
        document.getElementById("siluet").classList.remove("hidden");
        startTimer(initialSeconds);
    }, 4000);
}

// --- RENDER PIECES ---
function renderPieces(pieces) {
    const container = document.getElementById("pieces-container");
    container.innerHTML = "";

    if (pieces.length === 12) {
        container.style.gridTemplateColumns = "repeat(4, auto)";
    } else if (pieces.length === 4) {
        container.style.gridTemplateColumns = "repeat(2, auto)";
    } else {
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
            if (timeExpired || slot.dataset.filled === "true") return;

            const pieceId = e.dataTransfer.getData("text");
            const correctId = slot.dataset.piece;

            if (pieceId === correctId) {
                const img = document.querySelector(`#pieces-container img[data-id='${pieceId}']`);
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
                if (placedCount === slots.length) puzzleSolved();
            } else {
                if (soundWrong) { soundWrong.currentTime = 0; soundWrong.play(); }
            }
        });
    });
}

// --- PUZZLE SOLVED ---
function puzzleSolved() {
    stopTimer(); 
    totalScore += scorePerSolved;
    localStorage.setItem("puzzleScore", totalScore);

    document.getElementById("pieces-container").style.display = "none";
    const message = document.getElementById('message');
    const soal = selectedSoal[currentQuestion - 1];
    const lang = localStorage.getItem("gameLang") || "id";

    message.textContent = (lang === "en") ? "🎉 Puzzle Completed! 🎉" : "🎉 Puzzle Selesai! 🎉";
    message.classList.remove('hidden');

    renderConfetti();

    // --- LOGIKA SUARA (DISESUAIKAN DENGAN NAMA FILE KAMU) ---
  const soundCongrats = document.getElementById("sound-congrats");
  const soundVegetable = document.getElementById("sound-vegetable");

  soundVegetable.pause();
  soundVegetable.onended = null;

  // 1. Putar Suara Tepuk Tangan
  soundCongrats.currentTime = 0;
  soundCongrats.play();

  soundCongrats.onended = () => {
    if (lang === "en") {
      // 2. Putar "Success Puzzle.mp3"
      soundVegetable.src = "/static/sounds/" + encodeURIComponent("Success Puzzle") + ".mp3";
      
      soundVegetable.play().then(() => {
        // 3. Setelah itu, panggil nama file (Gunakan name_id karena filemu namanya Jantung Pisang.mp3)
        soundVegetable.onended = () => {
          const fileName = soal.name_id; // Pakai name_id sesuai nama file di folder En
          soundVegetable.src = "/static/sounds/En/" + encodeURIComponent(fileName) + ".mp3";
          
          console.log("Memutar audio EN (Nama file ID):", soundVegetable.src);
          
          soundVegetable.play().catch(e => console.error("File audio EN tidak ditemukan:", e));
          soundVegetable.onended = null;
        };
      });

    } else {
      // Bahasa Indonesia (Tetap seperti biasa)
      const formattedName = soal.name_id; 
      soundVegetable.src = `/static/sounds/id/notif_puzzle/${formattedName}.m4a`;
      soundVegetable.onended = null;
      soundVegetable.play().catch(e => console.error("File audio ID tidak ditemukan:", e));
    }
  };

    setTimeout(() => {
        message.classList.add('hidden');
        const canvas = document.getElementById("confetti");
        if (canvas) canvas.remove(); 
        nextQuestion();
    }, 8000);
}

// --- CONFETTI HELPER ---
// --- CONFETTI HELPER (FIXED RESPONSIVE) ---
function renderConfetti() {
    let canvas = document.getElementById("confetti");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "confetti";
        document.body.appendChild(canvas);
    }
    const ctx = canvas.getContext("2d");

    // Fungsi untuk menyesuaikan ukuran canvas tanpa membuat gepeng
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Jalankan saat awal dan saat layar berubah
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const pieces = [];
    const colors = ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"];
    
    for (let i = 0; i < 120; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: 8, h: 14,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: 2 + Math.random() * 3,
            rotate: Math.random() * 360,
            dr: Math.random() * 10
        });
    }

    function draw() {
        const currentCanvas = document.getElementById("confetti");
        if (!currentCanvas) {
            // Hapus event listener jika canvas sudah hilang (saat ganti soal)
            window.removeEventListener('resize', resizeCanvas);
            return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotate * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
            
            p.y += p.speed;
            p.rotate += p.dr;
            
            // Jika jatuh ke bawah, muncul lagi dari atas layar yang baru
            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// --- NEXT QUESTION & FINISH ---
function nextQuestion() {
    document.getElementById("sound-vegetable").pause();
    document.getElementById("sound-congrats").pause();

    if (currentQuestion < selectedSoal.length) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    } else {
        localStorage.setItem("finalScore", totalScore);
        localStorage.setItem("puzzleScore", totalScore);
        setTimeout(() => { window.location.href = "/skor"; }, 400);
    }
}

document.getElementById("sound-btn").addEventListener("click", playInstructionStart);