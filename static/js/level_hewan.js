const selectedLangEl = document.getElementById("selected-lang");
const langOptionsEl = document.getElementById("lang-options");
const titleEl = document.getElementById("title");
const btnEasy = document.getElementById("btn-easy");
const btnMedium = document.getElementById("btn-medium");
const btnHard = document.getElementById("btn-hard");
const labelMudah = document.getElementById("label-mudah");
const labelMenengah = document.getElementById("label-menengah");
const labelSulit = document.getElementById("label-sulit");

let audioPlayer = null;

function initAudioPlayer() {
  if (!audioPlayer) {
    audioPlayer = new Audio();
  }
  return audioPlayer;
}

function playWelcomeAudio(lang) {
  const player = initAudioPlayer();
  player.pause();
  player.currentTime = 0;
  
  if (lang === "en") {
    player.src = "/static/sounds/hewan/effect/lets_play.m4a";
  } else {
    player.src = "/static/sounds/hewan/effect/ayo_bermain.m4a";
  }
  
  player.play().catch((err) => {
    console.error('Welcome audio failed:', err);
  });
  
  player.onended = () => {
    if (lang === "en") {
      player.src = "/static/sounds/hewan/effect/choose_level.m4a";
    } else {
      player.src = "/static/sounds/hewan/effect/pilih_level.m4a";
    }
    player.play().catch((err) => {
      console.error('Second audio failed:', err);
    });
    
    animateLevelButtons();
    
    player.onended = null;
  };
}

function animateLevelButtons() {
  const buttons = [btnEasy, btnMedium, btnHard].filter(btn => btn !== null);
  buttons.forEach((btn, index) => {
    setTimeout(() => {
      btn.classList.add('btn-popup');
      setTimeout(() => {
        btn.classList.remove('btn-popup');
      }, 600);
    }, index * 2000);
  });
}

function toggleLangMenu(e) {
  e && e.stopPropagation();
  langOptionsEl.classList.toggle("hidden");
}

function setLanguage(lang, e) {
  if (e) e.stopPropagation();

  if (lang === "en") {
    selectedLangEl.innerHTML = `<img src="/static/img/flag uk.png" alt="EN"><span>English</span>`;
    titleEl.textContent = "Let's Play";
    if (labelMudah) labelMudah.textContent = "Guess Name";
    if (labelMenengah) labelMenengah.textContent = "Guess Shape";
    if (labelSulit) labelSulit.textContent = "Puzzle";
  } else {
    selectedLangEl.innerHTML = `<img src="/static/img/flag indo.png" alt="ID"><span>Indonesia</span>`;
    titleEl.textContent = "Ayo Bermain!";
    if (labelMudah) labelMudah.textContent = "Tebak Nama";
    if (labelMenengah) labelMenengah.textContent = "Tebak Bentuk";
    if (labelSulit) labelSulit.textContent = "Puzzle";
  }

  localStorage.setItem("gameLang", lang);
  langOptionsEl.classList.add("hidden");
  if (e) {
    playWelcomeAudio(lang);
  }
}

function handleDocumentClick() {
  langOptionsEl.classList.add("hidden");
}
window.addEventListener("load", () => {
  if (!selectedLangEl || !langOptionsEl || !titleEl) return;

  const savedLang = localStorage.getItem("gameLang") || "id";
  setLanguage(savedLang);
  playWelcomeAudio(savedLang);
  selectedLangEl.addEventListener("click", toggleLangMenu);
  langOptionsEl.addEventListener("click", (ev) => ev.stopPropagation());
  document.addEventListener("click", handleDocumentClick);
});
