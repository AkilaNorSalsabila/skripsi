// Mengambil elemen dengan proteksi (null check nantinya)
const selectedLangEl = document.getElementById("selected-lang");
const langOptionsEl  = document.getElementById("lang-options");
const titleEl        = document.getElementById("title");

const textEasy   = document.getElementById("text-easy");
const textMedium = document.getElementById("text-medium");
const textHard   = document.getElementById("text-hard");

/**
 * 🔹 TOGGLE MENU BAHASA
 * Menggunakan preventDefault agar tidak terjadi ghost-click di mobile
 */
function toggleLangMenu(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (langOptionsEl) {
    langOptionsEl.classList.toggle("hidden");
  }
}

/**
 * 🔹 SET BAHASA (UI ONLY)
 * Memastikan elemen ada sebelum diisi untuk menghindari error JS
 */
function applyLanguageUI(lang) {
  if (!selectedLangEl || !titleEl) return;

  if (lang === "en") {
    selectedLangEl.innerHTML = `
      <img src="/static/img/flag uk.png" alt="UK Flag">
      <span>English</span>
    `;
    titleEl.textContent = "Let's Play!";
    if (textEasy) textEasy.textContent = "Guess the Name";
    if (textMedium) textMedium.textContent = "Match the Shape";
    if (textHard) textHard.textContent = "Puzzle";
  } else {
    selectedLangEl.innerHTML = `
      <img src="/static/img/flag indo.png" alt="Indo Flag">
      <span>Indonesia</span>
    `;
    titleEl.textContent = "Ayo Bermain!";
    if (textEasy) textEasy.textContent = "Tebak Nama";
    if (textMedium) textMedium.textContent = "Mencocokkan";
    if (textHard) textHard.textContent = "Puzzle";
  }
}

/**
 * 🔹 SAAT USER GANTI BAHASA
 */
function setLanguage(lang, e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  localStorage.setItem("gameLang", lang);
  applyLanguageUI(lang);
  
  if (langOptionsEl) {
    langOptionsEl.classList.add("hidden");
  }

  // 🔊 Jalankan instruksi suara jika fungsi tersedia
  if (typeof window.playInstruction === "function") {
    window.playInstruction();
  }
}

/**
 * 🔹 CLOSE DROPDOWN
 * Menutup menu jika klik di luar area menu bahasa
 */
function handleDocumentClick(e) {
  if (langOptionsEl && !langOptionsEl.contains(e.target) && !selectedLangEl.contains(e.target)) {
    langOptionsEl.classList.add("hidden");
  }
}

/**
 * 🔹 INIT (DOM CONTENT LOADED)
 * Lebih cepat dan stabil daripada window.onload
 */
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("gameLang") || "id";

  // Restore UI berdasarkan pilihan bahasa terakhir
  applyLanguageUI(savedLang);

  // Pasang listener hanya jika elemen ditemukan
  if (selectedLangEl) {
    // Gunakan click agar kompatibel dengan mouse dan touch
    selectedLangEl.addEventListener("click", toggleLangMenu);
  }

  if (langOptionsEl) {
    langOptionsEl.addEventListener("click", (e) => e.stopPropagation());
  }

  document.addEventListener("click", handleDocumentClick);
});