// Mengambil elemen dengan proteksi
const selectedLangEl = document.getElementById("selected-lang");
const langOptionsEl  = document.getElementById("lang-options");
const titleEl        = document.getElementById("title");

const textEasy   = document.getElementById("text-easy");
const textMedium = document.getElementById("text-medium");
const textHard   = document.getElementById("text-hard");

/**
 * 🔹 TOGGLE MENU BAHASA
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
  <img src="/static/img/flag indo.png" alt="Indo Flag" class="flag-id">
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

  if (typeof window.playInstruction === "function") {
    window.playInstruction();
  }
}

/**
 * 🔹 CLOSE DROPDOWN
 */
function handleDocumentClick(e) {
  if (langOptionsEl && !langOptionsEl.contains(e.target) && !selectedLangEl.contains(e.target)) {
    langOptionsEl.classList.add("hidden");
  }
}

/**
 * 🔹 RESET & NAVIGASI
 * Fungsi untuk memastikan skor bersih sebelum pindah halaman
 */
function startNewGame(targetUrl) {
    console.log("Memulai permainan baru, meriset skor...");
    localStorage.setItem("puzzleScore", "0"); // Reset skor ke 0
    localStorage.setItem("finalScore", "0");  // Pastikan final score juga bersih
    window.location.href = targetUrl;
}

/**
 * 🔹 INIT (DOM CONTENT LOADED)
 */
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("gameLang") || "id";

  applyLanguageUI(savedLang);

  // 1. Listener Menu Bahasa
  if (selectedLangEl) {
    selectedLangEl.addEventListener("click", toggleLangMenu);
  }

  if (langOptionsEl) {
    langOptionsEl.addEventListener("click", (e) => e.stopPropagation());
  }

  document.addEventListener("click", handleDocumentClick);

  // 2. Listener Tombol Level (Reset Skor)
  // Kita cari semua elemen yang merupakan tombol menu/level
  const menuButtons = document.querySelectorAll(".menu-item, .card, a"); 
  
  menuButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      
      // Jika link mengarah ke salah satu permainan, reset skor dulu
      if (href && (href.includes("puzzle") || href.includes("tebak") || href.includes("cocok"))) {
        e.preventDefault(); // Stop pindah halaman instan
        startNewGame(href); // Jalankan reset skor baru pindah
      }
    });
  });
});