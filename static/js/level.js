// level.js
const selectedLangEl = document.getElementById("selected-lang");
const langOptionsEl = document.getElementById("lang-options");
const titleEl = document.getElementById("title");

// tombol level (ada di halaman)
const btnEasy = document.getElementById("btn-easy");
const btnMedium = document.getElementById("btn-medium");
const btnHard = document.getElementById("btn-hard");

// toggle menu (stop propagation supaya klik tidak bubble ke document)
function toggleLangMenu(e) {
  e && e.stopPropagation();
  langOptionsEl.classList.toggle("hidden");
}

// set language (event optional)
function setLanguage(lang, e) {
  if (e) e.stopPropagation();

  if (lang === "en") {
    selectedLangEl.innerHTML = `<img src="/static/img/flag uk.png" alt="EN"><span>English</span>`;
    titleEl.textContent = "Choose Level";
    if (btnEasy) btnEasy.textContent = "easy";
    if (btnMedium) btnMedium.textContent = "medium";
    if (btnHard) btnHard.textContent = "hard";
  } else {
    selectedLangEl.innerHTML = `<img src="/static/img/flag indo.png" alt="ID"><span>Indonesia</span>`;
    titleEl.textContent = "Pilih Level";
    if (btnEasy) btnEasy.textContent = "mudah";
    if (btnMedium) btnMedium.textContent = "menengah";
    if (btnHard) btnHard.textContent = "sulit";
  }

  localStorage.setItem("gameLang", lang);
  langOptionsEl.classList.add("hidden");
}

// Tutup menu saat klik di luar
function handleDocumentClick() {
  langOptionsEl.classList.add("hidden");
}

// Inisialisasi saat load
window.addEventListener("load", () => {
  // pastikan elemen ada
  if (!selectedLangEl || !langOptionsEl || !titleEl) return;

  const savedLang = localStorage.getItem("gameLang") || "id";
  setLanguage(savedLang);

  // event listeners
  selectedLangEl.addEventListener("click", toggleLangMenu);
  // mencegah klik INSIDE option menutup lewat bubble (kita akan manual close dari setLanguage)
  langOptionsEl.addEventListener("click", (ev) => ev.stopPropagation());
  // klik di luar menutup
  document.addEventListener("click", handleDocumentClick);

  // kalau kamu masih pakai onclick inline di HTML, setLanguage menerima event opsional,
  // jadi onclick="setLanguage('en', event)" juga OK.
});
