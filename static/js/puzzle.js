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
window.addEventListener("load", () => {
    const savedQ    = localStorage.getItem("puzzleCurrentQuestion");
    const savedSoal = localStorage.getItem("puzzleSelectedSoal");

    // ✅ Lanjut dari notif HANYA jika KEDUANYA ada
    if (savedQ && savedSoal) {
        currentQuestion = parseInt(savedQ);
        selectedSoal    = JSON.parse(savedSoal);
        localStorage.removeItem("puzzleCurrentQuestion");
        // Baca skor yang sedang berjalan
        totalScore = parseInt(localStorage.getItem("puzzleScore") || "0", 10);
    } else {
        // ✅ Mulai baru: bersihkan semua state lama, reset skor ke 0
        localStorage.removeItem("puzzleSelectedSoal");
        localStorage.removeItem("puzzleCurrentQuestion");
        localStorage.removeItem("puzzleNotifDest");
        if (typeof bankSoal !== 'undefined') {
            selectedSoal = pickRandomSoal(bankSoal);
            localStorage.setItem("puzzleSelectedSoal", JSON.stringify(selectedSoal));
        }
        currentQuestion = 1;
        totalScore      = 0;
        localStorage.setItem("puzzleScore", "0");
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
        soundVegetable.src = "/static/sounds/id/ui/puzzle.mp4";
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
    const allPieces = document.querySelectorAll("img"); 
    allPieces.forEach(p => p.classList.remove("piece-danger-anim"));
    sfxDanger.pause();
    sfxDanger.currentTime = 0;
}

function renderTimer() {
    const el   = document.getElementById("timer");
    const lang = localStorage.getItem("gameLang") || "id";
    const mm   = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const ss   = String(timeLeft % 60).padStart(2, "0");
    el.textContent = (lang === "en" ? "Time " : "Waktu ") + `${mm}:${ss}`;

    const piecesInContainer = document.querySelectorAll("#pieces-container img");

    if (timeLeft <= 5 && timeLeft > 0) {
        el.classList.add("timer-danger");
        document.body.classList.add("screen-danger-active"); 
        piecesInContainer.forEach(p => p.classList.add("piece-danger-anim"));
        if (sfxDanger.paused) sfxDanger.play().catch(() => {});
    } else {
        el.classList.remove("timer-danger");
        document.body.classList.remove("screen-danger-active"); 
        piecesInContainer.forEach(p => p.classList.remove("piece-danger-anim"));
    }
}

function onTimeUp() {
    if (questionSolved) return;
    questionSolved = true;
    stopTimer();

    const soundWrong = document.getElementById("sound-wrong");
    const board      = document.getElementById("board");
    const lang       = localStorage.getItem("gameLang") || "id";

    if (board) {
        board.classList.add("shake");
        setTimeout(() => board.classList.remove("shake"), 500);
    }
    if (soundWrong) { soundWrong.currentTime = 0; soundWrong.play(); }

    const text = lang === "en" ? "Time's up!" : "Waktu habis!";
    showTimeUpOverlay("⏰", text);

    // ✅ Waktu habis = TIDAK dapat poin
    console.log("TIME UP → skor tetap:", totalScore);

    setTimeout(() => {
        hideTimeUpOverlay();
        nextQuestion();
    }, 2000);
}

function showTimeUpOverlay(icon, text) {
    hideTimeUpOverlay();
    const overlay     = document.createElement("div");
    overlay.id        = "timeup-overlay";
    overlay.className = "wrong-overlay"; 
    overlay.innerHTML = `<div class="wrong-content"><h1>${icon}</h1><p>${text}</p></div>`;
    document.body.appendChild(overlay);
}

function hideTimeUpOverlay() {
    const el = document.getElementById("timeup-overlay");
    if (el) el.remove();
}

// ==================
// HELPER: Pasang piece ke slot
// ==================
function snapPieceToSlot(img, slot) {
    const slotLeft   = Math.round(parseFloat(slot.style.left));
    const slotTop    = Math.round(parseFloat(slot.style.top));
    const slotWidth  = Math.round(parseFloat(slot.style.width));
    const slotHeight = Math.round(parseFloat(slot.style.height));

    img.style.position     = "absolute";
    img.style.left         = slotLeft   + "px";
    img.style.top          = slotTop    + "px";
    img.style.width        = slotWidth  + "px";
    img.style.height       = slotHeight + "px";
    img.style.minWidth     = slotWidth  + "px";
    img.style.minHeight    = slotHeight + "px";
    img.style.maxWidth     = slotWidth  + "px";
    img.style.maxHeight    = slotHeight + "px";
    img.style.objectFit    = "fill";
    img.style.border       = "none";
    img.style.outline      = "none";
    img.style.boxShadow    = "none";
    img.style.borderRadius = "0";
    img.style.margin       = "0";
    img.style.padding      = "0";
    img.draggable          = false;
}

function hideFilledSlot(slot) {
    slot.dataset.filled      = "true";
    slot.style.border        = "none";
    slot.style.background    = "transparent";
    slot.style.outline       = "none";
    slot.style.visibility    = "hidden";
    slot.style.pointerEvents = "none";
}

// --- LOAD QUESTION ---
function loadQuestion(no) {
    questionSolved = false;
    placedCount    = 0;
    draggedPiece   = null;
    timeExpired    = false;
    stopTimer();

    const oldCanvas = document.getElementById("confetti");
    if (oldCanvas) oldCanvas.remove(); 
    hideTimeUpOverlay();

    const soal = selectedSoal[no - 1];
    if (!soal) return;

    const backBtn = document.querySelector(".back-button");
    if (backBtn) backBtn.style.display = (no === 1) ? "block" : "none";

    const fullImage       = document.getElementById("full-image");
    const siluetBg        = document.querySelector("#siluet img");
    const slotsContainer  = document.getElementById("slots");
    const piecesContainer = document.getElementById("pieces-container");
    const board           = document.getElementById("board");

    piecesContainer.style.display = "grid";
    board.style.width      = soal.width  + "px";
    board.style.height     = soal.height + "px";
    fullImage.style.width  = soal.width  + "px";
    fullImage.style.height = soal.height + "px";
    siluetBg.style.width   = soal.width  + "px";
    siluetBg.style.height  = soal.height + "px";

    slotsContainer.innerHTML  = "";
    piecesContainer.innerHTML = "";
    document.getElementById("message").classList.add("hidden");

    Array.from(board.querySelectorAll("img")).forEach(img => {
        if (img.id !== "full-image" && !img.classList.contains("siluet-bg")) img.remove();
    });

    fullImage.src = soal.full;
    siluetBg.src  = soal.siluet;

    soal.pieces.forEach(p => {
        const slot = document.createElement("div");
        slot.classList.add("slot");
        slot.dataset.piece = p.id;
        slot.style.left   = Math.round(p.slot.left)   + "px";
        slot.style.top    = Math.round(p.slot.top)    + "px";
        slot.style.width  = Math.round(p.slot.width)  + "px";
        slot.style.height = Math.round(p.slot.height) + "px";
        slotsContainer.appendChild(slot);
    });

    renderPieces(soal.pieces);
    shufflePieces();
    initDragDrop();
    updateProgress();

    const lang  = localStorage.getItem("gameLang") || "id";
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
        img.src        = p.src;
        img.dataset.id = p.id;
        img.draggable  = true;
        const targetWidth  = Math.round(p.slot.width);
        const targetHeight = Math.round(p.slot.height);
        img.style.width     = targetWidth  + "px";
        img.style.height    = targetHeight + "px";
        img.style.minWidth  = targetWidth  + "px";
        img.style.minHeight = targetHeight + "px";
        img.style.maxWidth  = targetWidth  + "px";
        img.style.maxHeight = targetHeight + "px";
        img.style.objectFit = "contain";
        img.style.display   = "block";
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

function getNearestSlot(x, y, slots, tolerance = 50) {
    let nearest = null;
    let minDist  = Infinity;
    slots.forEach(slot => {
        if (slot.dataset.filled === "true") return;
        const rect = slot.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dist = Math.hypot(cx - x, cy - y);
        if (dist < minDist && dist <= tolerance) { minDist = dist; nearest = slot; }
    });
    return nearest;
}

// ==================
// DRAG & DROP WITH MOBILE SUPPORT
// ==================
function initDragDrop() {
    const pieces       = document.querySelectorAll("#pieces-container img");
    const slots        = document.querySelectorAll(".slot");
    const soundCorrect = document.getElementById("sound-correct");
    const soundWrong   = document.getElementById("sound-wrong");

    pieces.forEach(piece => {
        piece.addEventListener("dragstart", e => {
            if (timeExpired) { e.preventDefault(); return; }
            draggedPiece = e.target;
            const rect = draggedPiece.getBoundingClientRect();
            draggedPiece.style.width  = rect.width  + "px";
            draggedPiece.style.height = rect.height + "px";
            const canvas  = document.createElement('canvas');
            const scale   = 2;
            canvas.width  = rect.width  * scale;
            canvas.height = rect.height * scale;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled       = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.mozImageSmoothingEnabled    = false;
            ctx.msImageSmoothingEnabled     = false;
            ctx.drawImage(draggedPiece, 0, 0, rect.width * scale, rect.height * scale);
            e.dataTransfer.setDragImage(canvas, rect.width / 2, rect.height / 2);
            e.dataTransfer.setData("text", draggedPiece.dataset.id);
        });

        piece.addEventListener("touchstart", (e) => {
            if (timeExpired) return;
            e.preventDefault();
            draggedPiece = piece;
            const touch = e.touches[0];
            const rect  = piece.getBoundingClientRect();
            touchStartX = touch.clientX - rect.left;
            touchStartY = touch.clientY - rect.top;
            touchClone  = piece.cloneNode(true);
            touchClone.classList.add("touch-dragging-puzzle");
            touchClone.style.position      = "fixed";
            touchClone.style.pointerEvents = "none";
            touchClone.style.zIndex        = "9999";
            touchClone.style.opacity       = "0.8";
            touchClone.style.width         = rect.width  + "px";
            touchClone.style.height        = rect.height + "px";
            touchClone.style.minWidth      = rect.width  + "px";
            touchClone.style.minHeight     = rect.height + "px";
            touchClone.style.maxWidth      = rect.width  + "px";
            touchClone.style.maxHeight     = rect.height + "px";
            touchClone.style.objectFit     = "contain";
            touchClone.style.left          = (touch.clientX - touchStartX) + "px";
            touchClone.style.top           = (touch.clientY - touchStartY) + "px";
            document.body.appendChild(touchClone);
            piece.style.opacity = "0.3";
        }, { passive: false });

        piece.addEventListener("touchmove", (e) => {
            if (!draggedPiece || timeExpired) return;
            const touch = e.touches[0];
            if (touchClone) {
                touchClone.style.left = (touch.clientX - touchStartX) + "px";
                touchClone.style.top  = (touch.clientY - touchStartY) + "px";
            }
            if (touchClone) touchClone.style.display = "none";
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            if (touchClone) touchClone.style.display = "";
            const targetSlot = elementBelow?.closest(".slot");
            slots.forEach(slot => slot.classList.remove("slot-hover-target"));
            if (targetSlot && targetSlot.dataset.filled !== "true") targetSlot.classList.add("slot-hover-target");
        }, { passive: false });

        piece.addEventListener("touchend", (e) => {
            if (!draggedPiece || timeExpired) return;
            const touch      = e.changedTouches[0];
            const targetSlot = getNearestSlot(touch.clientX, touch.clientY, slots, 50);
            if (touchClone) { touchClone.remove(); touchClone = null; }
            piece.style.opacity = "1";
            slots.forEach(slot => slot.classList.remove("slot-hover-target"));
            if (targetSlot) {
                const pieceId   = draggedPiece.dataset.id;
                const correctId = targetSlot.dataset.piece;
                if (pieceId === correctId) {
                    snapPieceToSlot(draggedPiece, targetSlot);
                    document.getElementById("board").appendChild(draggedPiece);
                    hideFilledSlot(targetSlot);
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

    slots.forEach(slot => {
        slot.addEventListener("dragover", e => e.preventDefault());
        slot.addEventListener("drop", e => {
            e.preventDefault();
            if (timeExpired || slot.dataset.filled === "true") return;
            const pieceId   = e.dataTransfer.getData("text");
            const correctId = slot.dataset.piece;
            if (pieceId === correctId) {
                const img = document.querySelector(`#pieces-container img[data-id='${pieceId}']`);
                snapPieceToSlot(img, slot);
                document.getElementById("board").appendChild(img);
                hideFilledSlot(slot);
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
    if (questionSolved) return; 
    questionSolved = true;
    stopTimer(); 

    // Sembunyikan slot
    const slots = document.querySelectorAll(".slot");
    slots.forEach(s => {
        s.style.cssText = "display:none!important;border:none!important;visibility:hidden!important;outline:none!important;background:transparent!important;";
    });

    // Expand piece 1px tutup celah sub-pixel
    const placedPieces = document.querySelectorAll("#board img:not(.siluet-bg):not(#full-image)");
    placedPieces.forEach(p => {
        const l = parseFloat(p.style.left)   - 1;
        const t = parseFloat(p.style.top)    - 1;
        const w = parseFloat(p.style.width)  + 2;
        const h = parseFloat(p.style.height) + 2;
        p.style.left         = l + "px";
        p.style.top          = t + "px";
        p.style.width        = w + "px";
        p.style.height       = h + "px";
        p.style.minWidth     = w + "px";
        p.style.minHeight    = h + "px";
        p.style.maxWidth     = w + "px";
        p.style.maxHeight    = h + "px";
        p.style.objectFit    = "fill";
        p.style.border       = "none";
        p.style.outline      = "none";
        p.style.boxShadow    = "none";
        p.style.borderRadius = "0";
        p.style.margin       = "0";
        p.style.padding      = "0";
    });

    // ✅ +20 poin karena berhasil sebelum waktu habis
    totalScore += scorePerSolved;
    localStorage.setItem("puzzleScore", totalScore);
    console.log("SCORE SOLVED:", totalScore);

    const soal = selectedSoal[currentQuestion - 1];

    // ✅ Simpan data sayuran untuk halaman notif
    localStorage.setItem("notifVeg", JSON.stringify({
        id:  soal.name_id,
        en:  soal.name_en,
        img: soal.full
    }));

    // ✅ Simpan state untuk lanjut soal setelah notif
    const nextQ = currentQuestion + 1;
    if (nextQ <= selectedSoal.length) {
        localStorage.setItem("puzzleCurrentQuestion", nextQ);
        localStorage.setItem("puzzleSelectedSoal", JSON.stringify(selectedSoal));
        localStorage.setItem("puzzleNotifDest", "next");
    } else {
        localStorage.setItem("puzzleNotifDest", "skor");
        localStorage.setItem("finalScore", totalScore);
        localStorage.setItem("puzzleScore", totalScore);
        localStorage.removeItem("puzzleCurrentQuestion");
        localStorage.removeItem("puzzleSelectedSoal");
    }

    // ✅ Putar suara congrats, lalu LANGSUNG redirect tanpa nunggu audio selesai
    const soundCongrats  = document.getElementById("sound-congrats");
    const soundVegetable = document.getElementById("sound-vegetable");
    soundVegetable.pause();
    soundCongrats.currentTime = 0;
    soundCongrats.play().catch(() => {});

    // Redirect setelah 2 detik (sambil suara congrats berbunyi)
    setTimeout(() => {
        window.location.href = "/puzzle_notif";
    }, 2000);
}

// --- NEXT QUESTION & FINISH (dipakai saat waktu habis) ---
function nextQuestion() {
    document.getElementById("sound-vegetable").pause();
    document.getElementById("sound-congrats").pause();

    if (currentQuestion < selectedSoal.length) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    } else {
        localStorage.setItem("finalScore", totalScore);
        localStorage.setItem("puzzleScore", totalScore);
        localStorage.removeItem("puzzleSelectedSoal");
        localStorage.removeItem("puzzleCurrentQuestion");
        setTimeout(() => { window.location.href = "/skor"; }, 400);
    }
}

document.getElementById("sound-btn").addEventListener("click", playInstructionStart);
