let syllableData = {};
let timeUp = false;
let hasPlayedOnce = false;

const player = document.getElementById("id-player");
const notifText = document.getElementById("notif-text");
const anmName = document.getElementById("anm-name");
const anmImage = document.getElementById("notif-anm");
const lang = localStorage.getItem("gameLang") || "id";
const anmData = JSON.parse(localStorage.getItem("notifAnm"));

async function loadSyllableData() {
  try {
    const response = await fetch('/static/js/syllable_data.json');
    if (!response.ok) throw new Error(`Failed to fetch syllable_data.json: ${response.status}`);
    syllableData = await response.json();
  } catch (error) {
    console.error('Failed to load syllable data:', error);
    syllableData = { animals: {} };
  }
}

async function initializePage() {
  await loadSyllableData();
  
  if (anmData) {
    if (lang === "en") {
      notifText.textContent = "Correct!";
    } else {
      notifText.textContent = "Benar!";
    }
    anmImage.src = anmData.img;
    anmImage.alt = anmData[lang];
    
    // Tampilkan teks utuh dari JSON
    const label = lang === "en" ? anmData.en : anmData.id;
    anmName.textContent = label;
  }
}

function normalizeFileName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/-/g, '_');
}

function playNotifAudio() {
  if (timeUp) return;
  player.pause();
  player.currentTime = 0;
  player.onended = null;
  
  const label = lang === "en" ? anmData.en : anmData.id; 
  const fileName = normalizeFileName(label);
  const folderLang = lang === "en" ? "en" : "in";

  // 1. play efek audio benar
  if (lang === "en") {
    player.src = `/static/sounds/hewan/effect/correct.m4a`;
    try { player.volume = 0.5; } catch(e) {}
  } else {
    player.src = `/static/sounds/hewan/effect/benar.m4a`;
    try { player.volume = 0.5; } catch(e) {}
  }
  
  player.play().catch((err) => {
    console.error('Effect audio failed:', err);
  });
  
  // 2. play audio pemenggalan kata
  player.onended = () => {
    if (timeUp) return;
    playTestAudio(label, fileName, folderLang);
  };
}

function playTestAudio(label, fileName, folderLang) {
  if (timeUp) return;
  const sylls = getSyllablesFromData(fileName, folderLang);

  // Siapkan syllable spans untuk animasi
  prepareSyllableSpans(sylls);

  const testAudioPath = `/static/sounds/hewan/tebak_nama/notif/${folderLang}/${fileName}.m4a`;
  player.src = testAudioPath;
  
  animateSyllablesProgressively(sylls, player);
  
  player.play().catch((err) => {
    console.error('Test audio failed:', err);
    playAnimalsAudio(folderLang, fileName);
  });
  
  // play full nama hewan
  player.onended = () => {
    if (timeUp) return;
    playAnimalsAudio(folderLang, fileName);
  };
}

function playAnimalsAudio(folderLang, fileName) {
  if (timeUp) return;
  
  const label = lang === "en" ? anmData.en : anmData.id; 
  anmName.innerHTML = ''; 
  anmName.textContent = label;
  anmName.classList.remove('playing');
  anmName.classList.add('full-popup');
  anmName.style.pointerEvents = '';
  
  player.src = `/static/sounds/hewan/animals/${folderLang}/${fileName}.m4a`;
  player.play().catch((err) => {
    console.error('Animals audio failed:', err);
  });
  
  setTimeout(() => {
    anmName.classList.remove('full-popup');
  }, 600);
  
  // When animals audio finishes, continue to next question/score.
  // Also provide a fallback in case 'ended' doesn't fire.
  if (window._notifFallback) {
    clearTimeout(window._notifFallback);
  }

  player.onended = () => {
    if (timeUp) return;
    doAutoContinue();
  };

  // 12s fallback to avoid being stuck if 'ended' isn't fired
  window._notifFallback = setTimeout(() => {
    doAutoContinue();
  }, 12000);
}

function doAutoContinue() {
  if (timeUp) return;
  timeUp = true;

  // stop audio and cleanup
  try {
    if (!player.paused) {
      player.pause();
      player.currentTime = 0;
    }
  } catch (e) {}

  if (window._syllableCleanup) {
    window._syllableCleanup();
  }
  if (window._notifFallback) {
    clearTimeout(window._notifFallback);
    window._notifFallback = null;
  }

  let totalQuestions = 5;
  const currentIndex = parseInt(localStorage.getItem("currentIndex") || "0");

  if (currentIndex < totalQuestions) {
    window.location.href = "/hewan_mudah";
  } else {
    localStorage.removeItem("sessionQuestions");
    localStorage.removeItem("currentIndex");
    window.location.href = "/skor_hewan";
  }
}

function getSyllablesFromData(fileName, folderLang) {
  // const animalKey = fileName;
  const animalKey = normalizeFileName(anmData.id);
  const langKey = folderLang === "en" ? "syllables_en" : "syllables_id";
  
  if (syllableData.animals && syllableData.animals[animalKey]) {
    return syllableData.animals[animalKey][langKey] || splitSyllablesFallback(anmData[folderLang === "en" ? "en" : "id"]);
  }
  
  return splitSyllablesFallback(anmData[folderLang === "en" ? "en" : "id"]);
}

function splitSyllablesFallback(word) {
  if (!word) return [];
  const words = word.trim().split(/\s+/);
  let allSyllables = [];
  
  words.forEach(w => {
    const syllables = splitSingleWord(w);
    allSyllables = allSyllables.concat(syllables);
  });
  
  return allSyllables;
}

function splitSingleWord(word) {
  if (!word) return [];
  
  const cleanWord = word.toLowerCase();
  const vowels = 'aiueo';
  const syllables = [];
  let currentSyllable = '';
  
  for (let i = 0; i < cleanWord.length; i++) {
    const char = cleanWord[i];
    const nextChar = cleanWord[i + 1];
    const nextNextChar = cleanWord[i + 2];
    
    currentSyllable += char;
    
    if (vowels.includes(char)) {
      if (nextChar && !vowels.includes(nextChar)) {
        if ((nextChar === 'n' && nextNextChar === 'g') || 
            (nextChar === 'n' && nextNextChar === 'y')) {
          const afterSpecial = cleanWord[i + 3];
          if (afterSpecial && vowels.includes(afterSpecial)) {
            syllables.push(currentSyllable);
            currentSyllable = '';
          } else {
            currentSyllable += nextChar + nextNextChar;
            i += 2;
            syllables.push(currentSyllable);
            currentSyllable = '';
          }
        } else if (nextNextChar && vowels.includes(nextNextChar)) {
          syllables.push(currentSyllable);
          currentSyllable = '';
        }
        else if (nextNextChar && !vowels.includes(nextNextChar)) {
          currentSyllable += nextChar;
          i++;
          syllables.push(currentSyllable);
          currentSyllable = '';
        }
      }
      else if (!nextChar) {
        syllables.push(currentSyllable);
        currentSyllable = '';
      }
    }
  }
  
  if (currentSyllable) {
    syllables.push(currentSyllable);
  }
  
  return syllables.length > 0 ? syllables : [word];
}

function prepareSyllableSpans(syllables) {
  if (!syllables || syllables.length === 0) return;
  
  anmName.innerHTML = '';
  
  // Ambil teks asli untuk menentukan dimana ada spasi
  const label = lang === "en" ? anmData.en : anmData.id;
  const words = label.split(' ');
  
  let syllableIndex = 0;
  
  words.forEach((word, wordIdx) => {
    // Cek apakah kata ini mengandung tanda hubung
    const hasDash = word.includes('-');
    const parts = word.split('-');
    
    if (hasDash) {
      // Handle kata dengan tanda hubung (misal: Kura-kura)
      parts.forEach((part, partIdx) => {
        let syllablesInPart = [];
        let reconstructed = '';
        
        // Kumpulkan syllables untuk part ini
        while (syllableIndex < syllables.length) {
          const syl = syllables[syllableIndex];
          syllablesInPart.push(syl);
          reconstructed += syl.toLowerCase();
          syllableIndex++;
          
          if (reconstructed === part.toLowerCase()) {
            break;
          }
        }
        
        // Render syllables untuk part ini
        syllablesInPart.forEach((syl, sylIdx) => {
          const span = document.createElement('span');
          span.className = 'syllable-piece';
          span.textContent = syl;
          span.dataset.index = syllableIndex - syllablesInPart.length + sylIdx;
          anmName.appendChild(span);
        });
        
        // Tambahkan tanda hubung setelah part (kecuali part terakhir)
        if (partIdx < parts.length - 1) {
          const dash = document.createElement('span');
          dash.className = 'syllable-dash';
          dash.textContent = '-';
          anmName.appendChild(dash);
        }
      });
    } else {
      // Handle kata tanpa tanda hubung
      let syllablesInWord = [];
      let reconstructed = '';
      
      while (syllableIndex < syllables.length) {
        const syl = syllables[syllableIndex];
        syllablesInWord.push(syl);
        reconstructed += syl.toLowerCase();
        syllableIndex++;
        
        if (reconstructed === word.toLowerCase()) {
          break;
        }
      }
      
      // Buat span untuk setiap syllable
      syllablesInWord.forEach((syl, sylIdx) => {
        const span = document.createElement('span');
        span.className = 'syllable-piece';
        span.textContent = syl;
        span.dataset.index = syllableIndex - syllablesInWord.length + sylIdx;
        anmName.appendChild(span);
      });
    }
    
    // Tambahkan spasi antar kata
    if (wordIdx < words.length - 1) {
      const space = document.createElement('span');
      space.className = 'syllable-space';
      space.textContent = ' ';
      anmName.appendChild(space);
    }
  });
}

function animateSyllablesProgressively(syllables, audioPlayer) {
  if (!syllables || syllables.length === 0) return;
  
  anmName.classList.add('playing');
  anmName.style.pointerEvents = 'none';
  
  const timeouts = [];
  
  const introDelay = (lang === "en") ? 1500 : 2000; // en: shorter intro, id: include "Ini adalah"
  const syllableGap = 1000;  // gap antara suku kata
  
  syllables.forEach((syl, idx) => {
    const delay = introDelay + (idx * syllableGap);
    
    const timeoutId = setTimeout(() => {
      if (timeUp) return;
      const spans = anmName.querySelectorAll('.syllable-piece');
      const targetSpan = spans[idx];
      
      if (targetSpan) {
        targetSpan.classList.add('syllable-piece-animate');
        setTimeout(() => {
          targetSpan.classList.remove('syllable-piece-animate');
        }, 400);
      }
    }, delay);
    
    timeouts.push(timeoutId);
  });
  
  const cleanup = () => {
    timeouts.forEach(t => clearTimeout(t));
    anmName.classList.remove('playing');
    anmName.style.pointerEvents = '';
  };
  
  audioPlayer.addEventListener('ended', cleanup, { once: true });
  audioPlayer.addEventListener('pause', cleanup, { once: true });
  
  window._syllableCleanup = cleanup;
}

window.addEventListener("load", async () => {
  await initializePage();
  
  if (!hasPlayedOnce) {
    playNotifAudio();
    hasPlayedOnce = true;
  }
});

document.getElementById("btn-speak").addEventListener("click", () => {
  playNotifAudio();
});

// navigation is now handled after animals audio ends (see `doAutoContinue`)
