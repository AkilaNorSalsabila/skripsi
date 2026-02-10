// puzzle.js (Final Version - Fixed Audio & Logic + Mobile Touch Support)
const sfxDanger = new Audio("/static/sounds/Timer.mp3");
sfxDanger.loop = true;

// Core variables
let currentQuestion = 1;
let placedCount = 0;
let draggedPiece = null;
let selectedSoal = []; 
const scorePerSolved = 20; 
let questionSolved = false;
let totalScore = 0;

let timerInterval = null;
let timeLeft = 0;
let timeExpired = false;
localStorage.setItem("lastLevel", "sulit");

// ==================
// TOUCH SUPPORT VARIABLES
// ==================
let touchClone = null;
let touchStartX = 0;
let touchStartY = 0;

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

// Ganti bagian load window dengan ini:
window.addEventListener("load", () => {
    if (typeof bankSoal !== 'undefined') {
        selectedSoal = pickRandomSoal(bankSoal);
    }
    
    let saved = localStorage.getItem("puzzleScore");
    
    if (saved === null || saved === undefined) {
        totalScore = 100; 
        localStorage.setItem("puzzleScore", "100");
    } else {
        // Ambil nilai yang tersimpan (misal sudah 80, tetap 80)
        totalScore = parseInt(saved, 10);
    }
    
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
    soundVegetable.onended = null;

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
    resetDangerEffects();

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
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    resetDangerEffects();
}

function resetDangerEffects() {
    const el = document.getElementById("timer");
    if (el) el.classList.remove("timer-danger");
    
    // TAMBAHKAN INI: Hapus kedipan merah saat reset
    document.body.classList.remove("screen-danger-active");

    const allPieces = document.querySelectorAll("img"); 
    allPieces.forEach(p => p.classList.remove("piece-danger-anim"));

    sfxDanger.pause();
    sfxDanger.currentTime = 0;
}

function renderTimer() {
    const el = document.getElementById("timer");
    const lang = localStorage.getItem("gameLang") || "id";
    const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const ss = String(timeLeft % 60).padStart(2, "0");
    
    el.textContent = (lang === "en" ? "Time " : "Waktu ") + `${mm}:${ss}`;

    const piecesInContainer = document.querySelectorAll("#pieces-container img");

    if (timeLeft <= 5 && timeLeft > 0) {
        el.classList.add("timer-danger");
        
        // TAMBAHKAN INI: Aktifkan kedipan merah di layar
        document.body.classList.add("screen-danger-active"); 
        
        piecesInContainer.forEach(p => {
            p.classList.add("piece-danger-anim");
        });

        if (sfxDanger.paused) sfxDanger.play().catch(() => {});
    } else {
        el.classList.remove("timer-danger");
        
        // TAMBAHKAN INI: Matikan kedipan jika waktu masih aman
        document.body.classList.remove("screen-danger-active"); 

        piecesInContainer.forEach(p => {
            p.classList.remove("piece-danger-anim");
        });
    }
}
function onTimeUp() {
    if (questionSolved) return;
    questionSolved = true; // 🔒 kunci soal

    stopTimer();

    const soundWrong = document.getElementById("sound-wrong");
    const board = document.getElementById("board");
    const lang = localStorage.getItem("gameLang") || "id";

    if (board) {
        board.classList.add("shake");
        setTimeout(() => board.classList.remove("shake"), 500);
    }

    if (soundWrong) {
        soundWrong.currentTime = 0;
        soundWrong.play();
    }

    // 🌐 teks sesuai bahasa
    const text =
        lang === "en"
            ? "Time's up!"
            : "Waktu habis!";

    showTimeUpOverlay("⏰", text);

    console.log("TIME UP → skor tetap:", totalScore);

    setTimeout(() => {
        hideTimeUpOverlay();
        nextQuestion();
    }, 2000);
}


function showTimeUpOverlay(icon, text) {
    hideTimeUpOverlay();
    const overlay = document.createElement("div");
    overlay.id = "timeup-overlay";
    overlay.className = "wrong-overlay"; 
    overlay.innerHTML = `
        <div class="wrong-content">
            <h1>${icon}</h1>
            <p>${text}</p>
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
    questionSolved = false;
    placedCount = 0;
    draggedPiece = null;
    timeExpired = false;
    stopTimer();

    // Hapus confetti jika user klik next dengan cepat
    const oldCanvas = document.getElementById("confetti");
    if (oldCanvas) oldCanvas.remove(); 

    // Reset overlay waktu habis jika masih nempel
    hideTimeUpOverlay();

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

// ==================
// HELPER: MAGNET SLOT
// ==================
function getNearestSlot(x, y, slots, tolerance = 50) {
    let nearest = null;
    let minDist = Infinity;

    slots.forEach(slot => {
        if (slot.dataset.filled === "true") return;

        const rect = slot.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dist = Math.hypot(cx - x, cy - y);

        if (dist < minDist && dist <= tolerance) {
            minDist = dist;
            nearest = slot;
        }
    });

    return nearest;
}

// ==================
// DRAG & DROP WITH MOBILE SUPPORT
// ==================
function initDragDrop() {
    const pieces = document.querySelectorAll("#pieces-container img");
    const slots = document.querySelectorAll(".slot");
    const soundCorrect = document.getElementById("sound-correct");
    const soundWrong = document.getElementById("sound-wrong");

    pieces.forEach(piece => {
        // DESKTOP DRAG START
        piece.addEventListener("dragstart", e => {
            if (timeExpired) { e.preventDefault(); return; }
            draggedPiece = e.target;
            e.dataTransfer.setData("text", draggedPiece.dataset.id);
        });

        // MOBILE TOUCH START
        piece.addEventListener("touchstart", (e) => {
            if (timeExpired) return;
            e.preventDefault();
            
            draggedPiece = piece;
            
            const touch = e.touches[0];
            const rect = piece.getBoundingClientRect();
            touchStartX = touch.clientX - rect.left;
            touchStartY = touch.clientY - rect.top;
            
            touchClone = piece.cloneNode(true);
            touchClone.classList.add("touch-dragging-puzzle");
            touchClone.style.position = "fixed";
            touchClone.style.pointerEvents = "none";
            touchClone.style.zIndex = "9999";
            touchClone.style.opacity = "0.8";
            touchClone.style.width = piece.offsetWidth + "px";
            touchClone.style.height = piece.offsetHeight + "px";
            touchClone.style.left = (touch.clientX - touchStartX) + "px";
            touchClone.style.top = (touch.clientY - touchStartY) + "px";
            
            document.body.appendChild(touchClone);
            piece.style.opacity = "0.3";
        }, { passive: false });

        // MOBILE TOUCH MOVE
        piece.addEventListener("touchmove", (e) => {
            if (!draggedPiece || timeExpired) return;

            const touch = e.touches[0];

            if (touchClone) {
                touchClone.style.left = (touch.clientX - touchStartX) + "px";
                touchClone.style.top = (touch.clientY - touchStartY) + "px";
            }

            if (touchClone) touchClone.style.display = "none";
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            if (touchClone) touchClone.style.display = "";

            const targetSlot = elementBelow?.closest(".slot");

            slots.forEach(slot => slot.classList.remove("slot-hover-target"));

            if (targetSlot && targetSlot.dataset.filled !== "true") {
                targetSlot.classList.add("slot-hover-target");
            }
        }, { passive: false });

        // MOBILE TOUCH END
        piece.addEventListener("touchend", (e) => {
            if (!draggedPiece || timeExpired) return;

            const touch = e.changedTouches[0];

            const targetSlot = getNearestSlot(
                touch.clientX,
                touch.clientY,
                slots,
                50
            );

            if (touchClone) {
                touchClone.remove();
                touchClone = null;
            }

            piece.style.opacity = "1";
            slots.forEach(slot => slot.classList.remove("slot-hover-target"));

            if (targetSlot) {
                const pieceId = draggedPiece.dataset.id;
                const correctId = targetSlot.dataset.piece;

                if (pieceId === correctId) {
                    draggedPiece.style.position = "absolute";
                    draggedPiece.style.left = targetSlot.style.left;
                    draggedPiece.style.top = targetSlot.style.top;
                    draggedPiece.style.width = targetSlot.style.width;
                    draggedPiece.style.height = targetSlot.style.height;
                    draggedPiece.draggable = false;

                    document.getElementById("board").appendChild(draggedPiece);
                    targetSlot.dataset.filled = "true";

                    soundCorrect.currentTime = 0;
                    soundCorrect.play();

                    placedCount++;
                    if (placedCount === slots.length) puzzleSolved();
                } else {
                    soundWrong.currentTime = 0;
                    soundWrong.play();
                }
            }

            draggedPiece = null;
        }, { passive: false });

    });

    // DESKTOP DROP ZONES
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
    if (questionSolved) return; // 🔒 pengaman
    questionSolved = true;
    stopTimer(); 
    
    totalScore += scorePerSolved; // 🔥 INI YANG HILANG
    localStorage.setItem("puzzleScore", totalScore);

    document.getElementById("pieces-container").style.display = "none";
    const message = document.getElementById('message');
    message.classList.remove('hidden');
    
    renderConfetti();
    
    setTimeout(() => {
        message.classList.add('hidden');

        const canvas = document.getElementById("confetti");
        if (canvas) canvas.remove(); 
        
        nextQuestion();
    }, 4000);
    console.log("SCORE SOLVED:", totalScore);

}

// --- CONFETTI HELPER ---
function renderConfetti() {
    let canvas = document.getElementById("confetti");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "confetti";
        document.body.appendChild(canvas);
    }
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

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