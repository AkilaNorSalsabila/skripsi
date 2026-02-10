// puzzle.js (Final Version - Fixed Audio & Logic + Mobile Touch Support)
const sfxDanger = new Audio("/static/sounds/Timer.mp3");
sfxDanger.loop = true;

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

// ==================
// TOUCH SUPPORT VARIABLES (TAMBAHAN BARU!)
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
    document.body.classList.remove("screen-danger-active");
    
    const allPieces = document.querySelectorAll("#pieces-container img, #board img");
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

    const remainingPieces = document.querySelectorAll("#pieces-container img");

    if (timeLeft <= 5 && timeLeft > 0) {
        el.classList.add("timer-danger");
        document.body.classList.add("screen-danger-active");
        remainingPieces.forEach(p => p.classList.add("piece-danger-anim"));
        if (sfxDanger.paused) sfxDanger.play().catch(() => {});
    } else {
        el.classList.remove("timer-danger");
        document.body.classList.remove("screen-danger-active");
        remainingPieces.forEach(p => p.classList.remove("piece-danger-anim"));
    }
}

function onTimeUp() {
    const soundWrong = document.getElementById("sound-wrong");
    
   totalScore = Math.max(0, totalScore - 20);

    localStorage.setItem("puzzleScore", totalScore);

    const board = document.getElementById("board");
    if (board) {
        board.classList.add("shake");
        setTimeout(() => board.classList.remove("shake"), 400);
    }

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
    container.style.alignItems = "center";
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
// ==================
// HELPER: MAGNET SLOT (ANTI NYANDET)
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
        // ==================
        // DESKTOP DRAG START
        // ==================
        piece.addEventListener("dragstart", e => {
            if (timeExpired) { e.preventDefault(); return; }
            draggedPiece = e.target;
            e.dataTransfer.setData("text", draggedPiece.dataset.id);
        });

        // ==================
        // MOBILE TOUCH START
        // ==================
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

        // ==================
        // MOBILE TOUCH MOVE
        // ==================
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

        // ==================
        // MOBILE TOUCH END
        // ==================
        piece.addEventListener("touchend", (e) => {
            if (!draggedPiece || timeExpired) return;

            const touch = e.changedTouches[0];

            // 🔥 MAGNET SLOT
            const targetSlot = getNearestSlot(
                touch.clientX,
                touch.clientY,
                slots,
                50 // toleransi sentuhan jari anak
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

    // ==================
    // DESKTOP DROP ZONES
    // ==================
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

    const soundCongrats = document.getElementById("sound-congrats");
    const soundVegetable = document.getElementById("sound-vegetable");

    soundVegetable.pause();
    soundVegetable.onended = null;

    soundCongrats.currentTime = 0;
    soundCongrats.play();

    soundCongrats.onended = () => {
        if (lang === "en") {
            soundVegetable.src = "/static/sounds/" + encodeURIComponent("Success Puzzle") + ".mp3";
            
            soundVegetable.play().then(() => {
                soundVegetable.onended = () => {
                    const fileName = soal.name_id;
                    soundVegetable.src = "/static/sounds/En/" + encodeURIComponent(fileName) + ".mp3";
                    console.log("Memutar audio EN (Nama file ID):", soundVegetable.src);
                    soundVegetable.play().catch(e => console.error("File audio EN tidak ditemukan:", e));
                    soundVegetable.onended = null;
                };
            });
        } else {
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