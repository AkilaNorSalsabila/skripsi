// level.js
const selectedLangEl = document.getElementById("selected-lang");
const langOptionsEl  = document.getElementById("lang-options");
const titleEl        = document.getElementById("title");

const textEasy   = document.getElementById("text-easy");
const textMedium = document.getElementById("text-medium");
const textHard   = document.getElementById("text-hard");

// toggle menu bahasa
function toggleLangMenu(e) {
  e && e.stopPropagation();
  langOptionsEl.classList.toggle("hidden");
}

// 🔹 SET BAHASA (UI ONLY)
function applyLanguageUI(lang) {
  if (lang === "en") {
    selectedLangEl.innerHTML = `
      <img src="/static/img/flag uk.png">
      <span>English</span>
    `;
    titleEl.textContent = "Let's Play!";
    textEasy.textContent   = "Guess the Name";
    textMedium.textContent = "Match the Shape";
    textHard.textContent   = "Puzzle";
  } else {
    selectedLangEl.innerHTML = `
      <img src="/static/img/flag indo.png">
      <span>Indonesia</span>
    `;
    titleEl.textContent = "Ayo Bermain!";
    textEasy.textContent   = "Tebak Nama";
    textMedium.textContent = "Mencocokkan";
    textHard.textContent   = "Puzzle";
  }
}

// 🔹 SAAT USER GANTI BAHASA
function setLanguage(lang, e) {
  if (e) e.stopPropagation();

  localStorage.setItem("gameLang", lang);
  applyLanguageUI(lang);
  langOptionsEl.classList.add("hidden");

  // 🔊 baru play audio saat user interaksi
  if (typeof window.playInstruction === "function") {
    window.playInstruction();
  }
}

// close dropdown
function handleDocumentClick() {
  langOptionsEl.classList.add("hidden");
}

// INIT
window.addEventListener("load", () => {
  const savedLang = localStorage.getItem("gameLang") || "id";

  // ⚠️ PENTING: hanya restore UI, TANPA suara
  applyLanguageUI(savedLang);

  selectedLangEl.addEventListener("click", toggleLangMenu);
  langOptionsEl.addEventListener("click", e => e.stopPropagation());
  document.addEventListener("click", handleDocumentClick);
});
