
localStorage.setItem("lastLevel", "sulit");
const bgMusic = new Audio("/static/sounds/hewan/effect/1.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.05;

function getLang() {
  return localStorage.getItem("gameLang") || "id";
}

function normalizeFileName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '_') 
    .replace(/-/g, '_'); 
}

const titleText = document.getElementById("title-text");
const pilihanContainer = document.getElementById("pilihan-container");


const texts = {
  id: "Bermain Puzzle",
  en: "Play Puzzle"
};
titleText.innerHTML = texts[getLang()];

const questionBank = {
  sangatMudah: [
    // { id: "bintang_laut", name: "Bintang Laut", nameEn: "Starfish", habitat: "air", habitatIn: "Dasar laut", habitatEn: "Ocean", img: "/static/img/hewan/data/bintang_laut.png", pieces: 12 },
    { id: "ayam", name: "Ayam", nameEn: "Chicken", habitat: "darat", habitatIn: "Lingkungan rumah dan pekarangan", habitatEn: "Around the house", img: "/static/img/hewan/data_hewan/ayam.png", pieces: 2 },
    { id: "anjing", name: "Anjing", nameEn: "Dog", habitat: "darat", habitatIn: "Lingkungan rumah dan pekarangan", habitatEn: "Around the house", img: "/static/img/hewan/data_hewan/anjing.png", pieces: 2 },
    { id: "kucing", name: "Kucing", nameEn: "Cat", habitat: "darat", habitatIn: "Lingkungan rumah dan pekarangan", habitatEn: "Around the house", img: "/static/img/hewan/data_hewan/kucing.png", pieces: 2 },
    { id: "pinguin", name: "Pinguin", nameEn: "Penguin", habitat: "darat_air", habitatIn: "Pantai es bersalju", habitatEn: "Icy shores", img: "/static/img/hewan/data_hewan/pinguin.png", pieces: 2 },
    { id: "katak", name: "Katak", nameEn: "Frog", habitat: "darat_air", habitatIn: "Rawa dan tepi sungai", habitatEn: "Swamps", img: "/static/img/hewan/data_hewan/katak.png", pieces: 2 },
    { id: "monyet", name: "Monyet", nameEn: "Monkey", habitat: "darat", habitatIn: "Hutan dan pepohonan", habitatEn: "Forest", img: "/static/img/hewan/data_hewan/monyet.png", pieces: 2 },
    { id: "cendrawasih", name: "Cendrawasih", nameEn: "Bird of Paradise", habitat: "darat", habitatIn: "Hutan hujan Papua", habitatEn: "Forest", img: "/static/img/hewan/data_hewan/cendrawasih.png", pieces: 2 }
  ],
  mudah: [
    { id: "elang", name: "Elang", nameEn: "Eagle", habitat: "darat", habitatIn: "Hutan dan pegunungan", habitatEn: "Forest", img: "/static/img/hewan/data_hewan/elang.png", pieces: 4 },
    { id: "komodo", name: "Komodo", nameEn: "Komodo Dragon", habitat: "darat", habitatIn: "Pulau Komodo, Rinca dan Savana", habitatEn: "Savanna and islands", img: "/static/img/hewan/data_hewan/p.komodo.png", pieces: 4 },
    { id: "koi", name: "Koi", nameEn: "Koi", habitat: "air", habitatIn: "Kolam dan danau", habitatEn: "Lakes", img: "/static/img/hewan/data_hewan/p.koi.png", pieces: 4 },
    { id: "hiu", name: "Hiu", nameEn: "Shark", habitat: "air", habitatIn: "Laut", habitatEn: "Ocean", img: "/static/img/hewan/data_hewan/p.hiu.png", pieces: 4 },
    { id: "lumba_lumba", name: "Lumba-Lumba", nameEn: "Dolphin", habitat: "air", habitatIn: "Laut", habitatEn: "Ocean", img: "/static/img/hewan/data_hewan/p.lumba_lumba.png", pieces: 4 },
    { id: "owl", name: "Burung Hantu", nameEn: "Owl", habitat: "darat", habitatIn: "Hutan", habitatEn: "Forest", img: "/static/img/hewan/data_hewan/owl.png", pieces: 4 },
    { id: "platipus", name: "Platipus", nameEn: "Platypus", habitat: "darat_air", habitatIn: "Sungai atau rawa", habitatEn: "Swamps", img: "/static/img/hewan/data_hewan/p.platipus.png", pieces: 4 }
  ],
  sedang: [
    { id: "jerapah", name: "Jerapah", nameEn: "Giraffe", habitat: "darat", habitatIn: "Savana", habitatEn: "Savanna", img: "/static/img/hewan/data_hewan/jerapah.png", pieces: 6 },
    { id: "kupu", name: "Kupu-Kupu", nameEn: "Butterfly", habitat: "darat", habitatIn: "Taman dan kebun bunga", habitatEn: "Flower Garden", img: "/static/img/hewan/data_hewan/kupu.png", pieces: 6 },
    { id: "lebah", name: "Lebah", nameEn: "Bee", habitat: "darat", habitatIn: "Taman dan kebun bunga", habitatEn: "Flower Garden", img: "/static/img/hewan/data_hewan/lebah.png", pieces: 6 },
    { id: "pari", name: "Pari", nameEn: "Stingray", habitat: "air", habitatIn: "Laut", habitatEn: "Ocean", img: "/static/img/hewan/data_hewan/p.pari.png", pieces: 6 },
    { id: "kuda_laut", name: "Kuda Laut", nameEn: "Seahorse", habitat: "air", habitatIn: "Dasar laut", habitatEn: "Ocean", img: "/static/img/hewan/data_hewan/kuda_laut.png", pieces: 6 },
    { id: "anjing_laut", name: "Anjing Laut", nameEn: "Seals", habitat: "air", habitatIn: "Perairan dingin/pantai", habitatEn: "Ocean", img: "/static/img/hewan/data_hewan/anjing_laut.png", pieces: 6 },
    { id: "capung", name: "Capung", nameEn: "Dragonfly", habitat: "darat_air", habitatIn: "Danau atau rawa", habitatEn: "Lakes or swamps", img: "/static/img/hewan/data_hewan/capung.png", pieces: 6 }
  ],
  sulit: [
    { id: "kura", name: "Kura-Kura", nameEn: "Turtle", habitat: "darat_air", habitatIn: "Sungai atau danau", habitatEn: "Lakes", img: "/static/img/hewan/data_hewan/kura.png", pieces: 9 },
    { id: "bunglon", name: "Bunglon", nameEn: "Chameleon", habitat: "darat", habitatIn: "Hutan", habitatEn: "Forest", img: "/static/img/hewan/data_hewan/bunglon.png", pieces: 9 },
    { id: "gajah", name: "Gajah", nameEn: "Elephant", habitat: "darat", habitatIn: "Lingkungan hutan dan savana", habitatEn: "Forest and savanna", img: "/static/img/hewan/data_hewan/gajah.png", pieces: 9 },
    { id: "badak", name: "Badak", nameEn: "Rhinoceros", habitat: "darat", habitatIn: "Savana", habitatEn: "Savanna", img: "/static/img/hewan/data_hewan/badak.png", pieces: 9 },
    { id: "trenggiling", name: "Trenggiling", nameEn: "Pangolin", habitat: "darat", habitatIn: "Hutan", habitatEn: "Forest", img: "/static/img/hewan/data_hewan/trenggiling.png", pieces: 9 },
    { id: "paus", name: "Paus", nameEn: "Whale", habitat: "air", habitatIn: "Laut", habitatEn: "Ocean", img: "/static/img/hewan/data_hewan/paus.png", pieces: 9 },
    { id: "gurita", name: "Gurita", nameEn: "Octopus", habitat: "air", habitatIn: "Laut", habitatEn: "Ocean", img: "/static/img/hewan/data_hewan/gurita.png", pieces: 9 }

  ],
  sangatSulit: [
    { id: "harimau", name: "Harimau", nameEn: "Tiger", habitat: "darat", habitatIn: "Hutan", habitatEn: "Forest", img: "/static/img/hewan/data_hewan/harimau.png", pieces: 12 },
    { id: "bintang_laut", name: "Bintang Laut", nameEn: "Starfish", habitat: "air", habitatIn: "Dasar laut", habitatEn: "Ocean", img: "/static/img/hewan/data_hewan/bintang_laut.png", pieces: 12 },
    { id: "unta", name: "Unta", nameEn: "Camel", habitat: "darat", habitatIn: "Gurun pasir", habitatEn: "Desert", img: "/static/img/hewan/data_hewan/unta.png", pieces: 12 },
    { id: "ubur_ubur", name: "Ubur-Ubur", nameEn: "Jellyfish", habitat: "air", habitatIn: "Laut", habitatEn: "Ocean", img: "/static/img/hewan/data_hewan/ubur_ubur.png", pieces: 12 },
    { id: "zebra", name: "Zebra", nameEn: "Zebras", habitat: "darat", habitatIn: "Savana", habitatEn: "Savanna", img: "/static/img/hewan/data_hewan/zebra.png", pieces: 12 },
    { id: "merak", name: "Merak", nameEn: "Peacock", habitat: "darat", habitatIn: "Savana", habitatEn: "Savanna", img: "/static/img/hewan/data_hewan/merak.png", pieces: 12 },
      { id: "landak", name: "Landak", nameEn: "Hedgehog", habitat: "darat", habitatIn: "Hutan", habitatEn: "Forest", img: "/static/img/hewan/data_hewan/landak.png", pieces: 12 }
  ]
};

// Fungsi untuk random soal
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

let sessionQuestions =
  JSON.parse(localStorage.getItem("sessionQuestions_sulit")) || [];

if (sessionQuestions.length === 0) {
  sessionQuestions = generateSessionQuestions();
  localStorage.setItem(
    "sessionQuestions_sulit",
    JSON.stringify(sessionQuestions)
  );
  localStorage.setItem("currentLevel_sulit", "0");
  localStorage.setItem("score_sulit", "0");
}

const animals = [];
let unusedAnimals = [];
const totalQuestions = 5;
let score = parseInt(localStorage.getItem("score_sulit") || "0", 10);
let currentAnimal = null;

// level dan waktu
const levels = [2, 4, 6, 9, 12];
const timeByPieces = {
  2: 20,
  4: 40,
  6: 60,
  9: 90,
  12: 120
};

const pieceGrid = {
  2: [2, 1],
  4: [2, 2],
  6: [3, 2],
  9: [3, 3],
  12: [4, 3]
};

let currentLevel = parseInt(
  localStorage.getItem("currentLevel_sulit") || "0",
  10
);
let placedPieces = 0;
let pieceIdCounter = 0;
let timerInterval = null;
let timeRemaining = 0;
const timerElement = document.getElementById("timer");
let puzzleLocked = false; // when true, puzzle cannot be filled (e.g. time's up)

// start game
startLevel();
function startLevel() {
  if (currentLevel === 0) {
    bgMusic.play().catch(err => console.log("BG music error:", err));
  }
  placedPieces = 0;
  puzzleLocked = false; // unlock interactions for new level

  currentAnimal = sessionQuestions[currentLevel];
  const animal = currentAnimal;
  const pieceCount = animal.pieces;

  document.getElementById("progress").textContent =
    `Soal ${currentLevel + 1} / ${totalQuestions}`;

  startTimer(pieceCount);
  createPuzzle(animal.img, pieceCount);
  setTimeout(() => {
    playPuzzleAudio();
  }, 500);
}

// fungsi timer
function startTimer(pieceCount) {
  if (timerInterval) clearInterval(timerInterval);
  
  // Restore timer dari localStorage jika ada untuk level yang sama
  const savedTime = localStorage.getItem("timeRemaining_sulit_" + currentLevel);
  if (savedTime !== null && parseInt(savedTime, 10) > 0) {
    timeRemaining = parseInt(savedTime, 10);
  } else {
    timeRemaining = timeByPieces[pieceCount];
  }
  
  updateTimerDisplay();
  timerElement.classList.remove("warning");
  
  timerInterval = setInterval(() => {
    timeRemaining--;
    localStorage.setItem("timeRemaining_sulit_" + currentLevel, timeRemaining);
    updateTimerDisplay();
    
    if (timeRemaining <= 5) {
      timerElement.classList.add("warning");
    }
    if (timeRemaining === 5) {
      try {
        const tickAudio = new Audio('/static/sounds/hewan/effect/tick.mp3');
        try { tickAudio.volume = 0.3; } catch(e) {}
        tickAudio.play().catch(err => console.log('Tick audio play error:', err));
      } catch (err) {
        console.log('Tick audio error:', err);
      }
    }
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      handleTimeUp();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerElement.textContent = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function handleTimeUp() {
  stopTimer();
  puzzleLocked = true; // prevent further fills when time has expired
  try {
    const timesUpAudio = new Audio('/static/sounds/hewan/effect/timesup.mp3');
    try { timesUpAudio.volume = 0.3; } catch(e) {}
    timesUpAudio.play().catch(err => console.log('Timesup audio error:', err));
    if (placedPieces < (currentAnimal && currentAnimal.pieces ? currentAnimal.pieces : 0)) {
      showTimeupOverlay();
    }
    let timesUpProcessed = false;
    const fallbackId = setTimeout(() => {
      if (timesUpProcessed) return;
      timesUpProcessed = true;
      hideTimeupOverlay();
      nextLevel();
    }, 2500);

    timesUpAudio.onended = () => {
      if (timesUpProcessed) return;
      timesUpProcessed = true;
      clearTimeout(fallbackId);
      hideTimeupOverlay();
      setTimeout(() => nextLevel(), 150);
    };
  } catch (err) {
    console.log('Error playing timesup audio or handling timesup:', err);
    nextLevel();
  }
}

// menampilkan overlay merah saat waktu habis
function showTimeupOverlay() {
  if (document.getElementById('timeup-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'timeup-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    background: 'rgba(255,0,0,0.20)',
    zIndex: '9999',
    pointerEvents: 'auto', // block interactions behind overlay
    transition: 'opacity 200ms ease'
  });
  document.body.appendChild(overlay);
}

function hideTimeupOverlay() {
  const el = document.getElementById('timeup-overlay');
  if (!el) return;
  try { el.remove(); } catch (e) { el.style.display = 'none'; }
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// canvas puzzle
function createPuzzle(imageSrc, pieceCount) {
  const [cols, rows] = pieceGrid[pieceCount];

  const siluet = document.getElementById("siluet-container");
  const piecesContainer = document.getElementById("pilihan-container");
  const screenWidth = window.innerWidth;

// ukuran puzzle responsif
let PUZZLE_SIZE = 480;
if (screenWidth <= 768) {
  PUZZLE_SIZE = 260;}
if (screenWidth > 768 && screenWidth <= 1023) {
  PUZZLE_SIZE = 300;}

  siluet.innerHTML = "";
  piecesContainer.innerHTML = "";

  const img = new Image();
  img.src = imageSrc;

  img.onload = () => {

    // slot siluet
    siluet.style.display = "grid";
    siluet.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    siluet.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    siluet.style.width = PUZZLE_SIZE + "px";
    siluet.style.height = PUZZLE_SIZE + "px";

    siluet.style.backgroundColor = '#ecf5fd';
    siluet.style.position = 'relative';

    const mask = document.createElement('div');
    mask.className = 'siluet-mask';
    mask.style.position = 'absolute';
    mask.style.inset = '0';
    mask.style.pointerEvents = 'none';
    mask.style.zIndex = '4';
    siluet.appendChild(mask);


    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const slot = document.createElement("div");
        slot.className = "slot";
        slot.dataset.x = x;
        slot.dataset.y = y;
        const slotWidth = PUZZLE_SIZE / cols;
        const slotHeight = PUZZLE_SIZE / rows;
        slot.style.position = 'relative';
        slot.style.zIndex = '5';
        slot.addEventListener("dragover", e => e.preventDefault());
        slot.addEventListener("drop", (e) => {
          const hasPlacedImg = !!slot.querySelector(':scope > img');
          console.log('drop event on slot', x, y, 'hasPlacedImg', hasPlacedImg);
          return handleDrop.call(slot, e);
        });

        siluet.appendChild(slot);

        // create a mask tile that covers this slot area
        const tile = document.createElement('div');
        tile.className = 'siluet-mask-tile';
        tile.dataset.x = x;
        tile.dataset.y = y;
        tile.style.position = 'absolute';
        tile.style.left = (x * slotWidth) + 'px';
        tile.style.top = (y * slotHeight) + 'px';
        tile.style.width = slotWidth + 'px';
        tile.style.height = slotHeight + 'px';
        tile.style.backgroundColor = '#000';
        // use the original image as a mask so each tile follows the silhouette shape
        tile.style.webkitMaskImage = `url(${img.src})`;
        tile.style.webkitMaskSize = `${PUZZLE_SIZE}px ${PUZZLE_SIZE}px`;
        tile.style.webkitMaskPosition = `${-x * slotWidth}px ${-y * slotHeight}px`;
        tile.style.webkitMaskRepeat = 'no-repeat';
        tile.style.maskImage = `url(${img.src})`;
        tile.style.maskSize = `${PUZZLE_SIZE}px ${PUZZLE_SIZE}px`;
        tile.style.maskPosition = `${-x * slotWidth}px ${-y * slotHeight}px`;
        tile.style.maskRepeat = 'no-repeat';
        tile.style.pointerEvents = 'none';
        tile.style.zIndex = '4';
        mask.appendChild(tile);
      }
    }

    
    // cut kepingan gambar
    
    const pieceWidth = PUZZLE_SIZE / cols;
    const pieceHeight = PUZZLE_SIZE / rows;


    const pieces = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const canvas = document.createElement("canvas");
        canvas.width = pieceWidth;
        canvas.height = pieceHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(
        img,
        x * (img.width / cols),
        y * (img.height / rows),
        img.width / cols,
        img.height / rows,
        0,
        0,
        pieceWidth,
        pieceHeight
        );


        pieces.push({
            id: pieceIdCounter++,
          img: canvas.toDataURL(),
          x,
          y
        });
      }
    }

    if (pieces.length > 2) {
      let attempts = 0;
      let isValid = false;
      
      while (!isValid && attempts < 100) {
        shuffle(pieces);
        isValid = validatePuzzleLayout(pieces, cols, rows);
        attempts++;
      }
      
      if (!isValid) {
        for (let i = 0; i < 5; i++) {
          shuffle(pieces);
        }
      }
    } else if (pieces.length === 2) {
      shuffle(pieces);
      if (Math.random() < 0.5) {
        pieces.reverse();
      }
      if (pieces[0].x === 0 && pieces[0].y === 0 && pieces[1].x === 1 && pieces[1].y === 0) {
        pieces.reverse();
      }
    }
    
    // store info for handleDrop to use precise background positioning
    siluet.dataset.originalSrc = imageSrc;
    siluet.dataset.puzzleSize  = PUZZLE_SIZE;
    siluet.dataset.pieceCols   = cols;
    siluet.dataset.pieceRows   = rows;

    renderPieces(pieces, pieceWidth, pieceHeight, cols);

  };
}


// render kepingan
function renderPieces(pieces, pieceWidth, pieceHeight, cols) {
  const container = document.getElementById("pilihan-container");

  const SCALE = 1.0;

  container.innerHTML = "";
  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  container.style.gap = "12px";

  container.style.width =
    `${cols * pieceWidth * SCALE + (cols - 1) * 14}px`;

  pieces.forEach(p => {
    const img = document.createElement("img");
    img.src = p.img;
    img.draggable = true;

    img.style.width = pieceWidth * SCALE + "px";
    img.style.height = pieceHeight * SCALE + "px";
    img.style.objectFit = "cover";
    img.style.cursor = "grab";
    img.style.borderRadius = "12px";
    img.dataset.pieceId = p.id;

    img.addEventListener("dragstart", e => {
      console.log('dragstart piece', p.id);
      try {
        e.dataTransfer.setData("pieceId", p.id);
        e.dataTransfer.setData("x", p.x);
        e.dataTransfer.setData("y", p.y);
        e.dataTransfer.setData("img", p.img);
      } catch (err) {
        console.warn('dataTransfer.setData failed', err);
      }
    });

    // Pointer fallback for touch devices: lightweight clone + rAF
    img.addEventListener('pointerdown', function (ev) {
      if (ev.pointerType === 'mouse') return; // allow mouse native drag
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
        const drop = el && el.closest('.slot');
        if (drop) {
          const dropEv = new Event('drop', { bubbles: true });
          dropEv.dataTransfer = { getData: (k) => {
            if (k === 'pieceId') return String(p.id);
            if (k === 'x') return String(p.x);
            if (k === 'y') return String(p.y);
            if (k === 'img') return p.img;
            return null;
          }};
          drop.dispatchEvent(dropEv);
        }
        clone.remove();
      }

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
      clone.style.transform = `translate3d(${ev.clientX - offsetX}px, ${ev.clientY - offsetY}px, 0)`;
    });


    container.appendChild(img);
  });
}

function handleDrop(e) {
  if (puzzleLocked) return; // prevent placing when time is up
  e.preventDefault();

  const slotX = this.dataset.x;
  const slotY = this.dataset.y;
  const pieceX = e.dataTransfer.getData("x");
  const pieceY = e.dataTransfer.getData("y");
  const imgSrc = e.dataTransfer.getData("img");

  const alreadyFilled = this.classList.contains('filled');
  if (slotX === pieceX && slotY === pieceY && !alreadyFilled) {
    // Use background-image with precise offset so piece exactly covers the siluet mask
    const siluet = document.getElementById('siluet-container');
    const ps   = parseFloat(siluet.dataset.puzzleSize);
    const cols = parseInt(siluet.dataset.pieceCols, 10);
    const rows = parseInt(siluet.dataset.pieceRows, 10);
    const pw   = ps / cols;
    const ph   = ps / rows;
    const px   = parseInt(pieceX, 10);
    const py   = parseInt(pieceY, 10);
    const originalSrc = siluet.dataset.originalSrc;

    this.innerHTML = "";
    this.style.backgroundImage    = `url(${originalSrc})`;
    this.style.backgroundSize     = `${ps}px ${ps}px`;
    this.style.backgroundPosition = `${-px * pw}px ${-py * ph}px`;
    this.style.backgroundRepeat   = 'no-repeat';
    this.classList.add('filled');

    // remove the corresponding mask tile so the filled piece area becomes visible
    const tileEl = document.querySelector(`.siluet-mask-tile[data-x='${px}'][data-y='${py}']`);
    if (tileEl) tileEl.remove();

    placedPieces++;
    const clickSound = new Audio("/static/sounds/sound-click.mp3");
    clickSound.play().catch(err => console.log("Error playing click sound:", err));
    
    const pieceId = e.dataTransfer.getData("pieceId");

    const pieceEl = document.querySelector(
      `#pilihan-container img[data-piece-id="${pieceId}"]`
    );

    // if(pieceEl) { pieceEl.style.remove(); 
    if (pieceEl) {
      pieceEl.style.visibility = 'hidden';
      pieceEl.style.pointerEvents = 'none';
      pieceEl.draggable = false;
    }
    if (placedPieces === currentAnimal.pieces) {
          stopTimer();
          const maskEl = document.querySelector('.siluet-mask');
          if (maskEl) maskEl.remove();
          score += 20;
          localStorage.setItem("score_sulit", score);
          playSound("sfx-correct");
          startConfetti();
          showInfoText(currentAnimal, currentAnimal.habitat, () => {
            setTimeout(() => {
              hideInfoPanel();
              nextLevel();
            }, 500);
          });
      }
  }
  else {
    playSound("sfx-wrong");
    this.classList.add("shake");
    setTimeout(() => this.classList.remove("shake"), 400);
  }
}

function validatePuzzleLayout(pieces, cols, rows) {
  // Cek setiap kepingan
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];
    const gridRow = Math.floor(i / cols);
    const gridCol = i % cols;
    
    // Cek tetangga kanan
    if (gridCol < cols - 1) {
      const rightNeighbor = pieces[i + 1];
      // Jika di gambar asli juga bersebelahan horizontal
      if (piece.y === rightNeighbor.y && Math.abs(piece.x - rightNeighbor.x) === 1) {
        return false;
      }
    }
    
    // Cek tetangga bawah
    if (gridRow < rows - 1) {
      const bottomNeighbor = pieces[i + cols];
      // Jika di gambar asli juga bersebelahan vertikal
      if (piece.x === bottomNeighbor.x && Math.abs(piece.y - bottomNeighbor.y) === 1) {
        return false;
      }
    }
    
    // Cek diagonal untuk menghindari bagian gambar yang terlalu dekat
    if (gridCol < cols - 1 && gridRow < rows - 1) {
      const diagNeighbor = pieces[i + cols + 1];
      // Jika di gambar asli juga diagonal berdekatan
      if (Math.abs(piece.x - diagNeighbor.x) === 1 && Math.abs(piece.y - diagNeighbor.y) === 1) {
        return false;
      }
    }
  }
  
  return true;
}

// next level
function nextLevel() {
  stopTimer();
  
  // Hapus timer untuk level saat ini
  localStorage.removeItem("timeRemaining_sulit_" + currentLevel);
  
  currentLevel++;
  
  localStorage.setItem("currentLevel_sulit", currentLevel);
  localStorage.setItem("score_sulit", score);

  if (currentLevel < totalQuestions) {
    startLevel();
  } else {
    const finalScore = score;
    localStorage.setItem("finalScore", finalScore);
    localStorage.removeItem("sessionQuestions_sulit");
    localStorage.removeItem("currentLevel_sulit");
    localStorage.removeItem("score_sulit");
    // Hapus semua timer yang tersisa
    for (let i = 0; i < totalQuestions; i++) {
      localStorage.removeItem("timeRemaining_sulit_" + i);
    }

    setTimeout(() => {
      window.location.href = "/skor_hewan";
    }, 500);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Panel text jawaban
const exitOverlay    = document.getElementById("exit-confirm");
const cancelExitBtn  = document.getElementById("cancel-exit");
const confirmExitBtn = document.getElementById("confirm-exit");
const backBtn        = document.querySelector(".back-button");
const exitConfirmText = document.getElementById("exit-confirm-text");
if (exitConfirmText) {
  exitConfirmText.textContent = getLang() === "en" ? "Are you sure you want to end the game?" : "Yakin mengakhiri game?";
}
if (backBtn) {
  backBtn.onclick = (e) => {
    e.preventDefault();
    exitOverlay.classList.remove("hidden");
  };
}
cancelExitBtn.onclick = () => {
  exitOverlay.classList.add("hidden");
};
confirmExitBtn.onclick = () => {
  localStorage.removeItem("finalScore");
  localStorage.removeItem("lastLevel");
  localStorage.removeItem("sessionQuestions_sulit");
  localStorage.removeItem("currentLevel_sulit");
  localStorage.removeItem("score_sulit");
  // Hapus semua timer
  for (let i = 0; i < 5; i++) {
    localStorage.removeItem("timeRemaining_sulit_" + i);
  }
  window.location.href = "/game_hewan";
};


const infoPanel   = document.getElementById("info-panel");
const infoAnimal  = document.getElementById("info-animal");
const infoHabitat = document.getElementById("info-habitat");
const idPlayer = document.getElementById("id-player"); 

function showInfoText(animal, habitat, onAudioEnd, playCorrectSound = true){
  const currentLang = getLang();
  const animalName = currentLang === "en" ? (animal.nameEn || animal.name) : (animal.name || animal.nameEn);

  const puzzleWrapper = document.querySelector(".puzzle-wrapper");
  if (puzzleWrapper) puzzleWrapper.classList.add("completed");
  pilihanContainer.classList.add("hidden");

  infoAnimal.textContent = animalName.toUpperCase();

  // Build habitat sentence similar to hewan_menengah
  const habitatLabelText = habitatLabel(habitat, currentLang);
  if (currentLang === "en") {
    const habEn = animal.habitatEn || '';
    const hl = (habitatLabelText || '').toLowerCase();
    let sentence = '';
    if ((hl.includes('land') && hl.includes('water')) || hl.includes('&')) {
      sentence = 'They live on land and in water';
    } else if (hl.includes('land')) {
      sentence = 'They live on land';
    } else if (hl.includes('water')) {
      sentence = 'They live in water';
    } else {
      sentence = `They live in ${habitatLabelText}`;
    }

    if (habEn) sentence += `, usually in the ${habEn}`;
    sentence += '.';
    infoHabitat.textContent = sentence;
  } else {
    const habIn = animal.habitatIn || '';
    const extraId = habIn ? ` Biasanya di ${habIn}` : '';
    infoHabitat.textContent = ` Habitatnya di ${habitatLabelText}.${extraId}`;
  }

  infoPanel.classList.remove("hidden");
  requestAnimationFrame(() => infoPanel.classList.add("show"));

  // Audio playback: play effect then habitat (keep habitat volume at 0.8 as configured)
  if (playCorrectSound) {
    const effectSound = currentLang === "en" ? "/static/sounds/hewan/effect/correct.m4a" : "/static/sounds/hewan/effect/benar.m4a";
    idPlayer.src = effectSound;
    try { idPlayer.volume = 0.9; } catch(e) {}
    idPlayer.play().catch(err => console.log("Error playing effect audio:", err));

    idPlayer.onended = () => {
      const folderLang = currentLang === "en" ? "en" : "in";
      const fileName = normalizeFileName(animalName);
      idPlayer.src = `/static/sounds/hewan/habitat/${folderLang}/${fileName}.m4a`;
      try { idPlayer.volume = 1.0; } catch(e) {}
      idPlayer.play().catch(err => console.log("Error playing habitat info audio:", err));

      idPlayer.onended = () => {
        if (onAudioEnd) onAudioEnd();
      };
    };
  } else {
    const folderLang = currentLang === "en" ? "en" : "in";
    const fileName = normalizeFileName(animalName);
    idPlayer.src = `/static/sounds/hewan/habitat/${folderLang}/${fileName}.m4a`;
    try { idPlayer.volume = 1.0; } catch(e) {}
    idPlayer.play().catch(err => console.log("Error playing habitat info audio:", err));

    idPlayer.onended = () => {
      if (onAudioEnd) onAudioEnd();
    };
  }
}

function habitatLabel(key, lang){
  if (!lang) lang = getLang();
  
  if (key === "darat") return lang === "en" ? "Land" : "Darat";
  if (key === "air") return lang === "en" ? "Water" : "Air";
  if (key === "darat_air") return lang === "en" ? "Land & Water" : "Darat & Air";
  return "";
}

function hideInfoPanel(){
  const puzzleWrapper = document.querySelector(".puzzle-wrapper");
  puzzleWrapper.classList.remove("completed");
  
  infoPanel.classList.add("hidden");
  pilihanContainer.classList.remove("hidden");
}

// Fungsi untuk play audio soal puzzle
function playPuzzleAudio() {
  const currentLang = getLang();
  const audioPath = currentLang === "en" ? "/static/sounds/hewan/puzzle/puzzle_en.m4a" : "/static/sounds/hewan/puzzle/puzzle_in.m4a";
  idPlayer.src = audioPath;
  try { idPlayer.volume = 1.0; } catch (e) {}
  idPlayer.play().catch(err => console.log("Error playing puzzle audio:", err));
  idPlayer.onended = null;
}

const speakBtn = document.getElementById("btn-speak");
if (speakBtn) {
  speakBtn.addEventListener("click", () => {
    playPuzzleAudio();
  });
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

function playSound(id) {
  const audio = document.getElementById(id);
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  try {
    if (id === 'sfx-correct') {
      audio.volume = 0.5;
    }
  } catch (e) {
    console.log('Error setting volume for', id, e);
  }
  audio.play().catch(err => {
    console.log("Sound error:", err);
  });
}

// Keep puzzle size in sync when user resizes the viewport across mobile/tablet breakpoint
let __resizeTimeout = null;
let __lastIsMobile = window.innerWidth <= 768;
let __lastIsPhone = window.innerWidth <= 768;

// store originals so we can move back when leaving phone layout
const backBtnEl = document.querySelector('.back-button');
const timerEl = document.getElementById('timer');
const headerEl = document.querySelector('header.header');
const backOriginal = backBtnEl ? { parent: backBtnEl.parentNode, nextSibling: backBtnEl.nextSibling } : null;
const timerOriginal = timerEl ? { parent: timerEl.parentNode, nextSibling: timerEl.nextSibling } : null;

function moveControlsIntoHeader() {
  if (!headerEl) return;
  if (backBtnEl && backBtnEl.parentNode !== headerEl) headerEl.insertBefore(backBtnEl, headerEl.firstChild);
  if (timerEl && timerEl.parentNode !== headerEl) headerEl.appendChild(timerEl);
  headerEl.classList.add('header--inlined');
}

function restoreControlsFromHeader() {
  if (!headerEl) return;
  if (backOriginal && backBtnEl && backBtnEl.parentNode === headerEl) {
    backOriginal.parent.insertBefore(backBtnEl, backOriginal.nextSibling);
  }
  if (timerOriginal && timerEl && timerEl.parentNode === headerEl) {
    timerOriginal.parent.insertBefore(timerEl, timerOriginal.nextSibling);
  }
  headerEl.classList.remove('header--inlined');
}

window.addEventListener('resize', () => {
  clearTimeout(__resizeTimeout);
  __resizeTimeout = setTimeout(() => {
    const isMobile = window.innerWidth <= 768;
    const isPhone = isMobile; 

    if (isPhone) {
      moveControlsIntoHeader();
    } else {
      restoreControlsFromHeader();
    }

    if (isMobile !== __lastIsMobile) {
      __lastIsMobile = isMobile;
      if (currentAnimal) {
        const pieceCount = currentAnimal.pieces;
        stopTimer();
        createPuzzle(currentAnimal.img, pieceCount);
        startTimer(pieceCount);
      }
    }
  }, 120);
});

document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) moveControlsIntoHeader();
});
