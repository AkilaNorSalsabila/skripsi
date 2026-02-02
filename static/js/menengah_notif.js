// static/js/menengah_notif.js
const lang = localStorage.getItem("gameLang") || "id";

// 🔹 Ambil elemen
const notifText = document.getElementById("notif-text");
const vegName = document.getElementById("veg-name");
const notifVeg = document.getElementById("notif-veg");
const btnSpeak = document.getElementById("btn-speak");
const player = document.getElementById("id-player");
const canvasStars = document.getElementById("stars");
const ctxStars = canvasStars.getContext("2d");

const baseNameMap = {
  "kentang": "Kentang",
  "Bit": "Bit Merah",
  "Bambay" : "Bawang Bombay",
  "Daun" : "Bawang Daun",
  "Jantung" : "Jantung Pisang",
  "Kangkun" : "Kangkung",
  "Kacang" : "Kacang Panjang",
  "Labu" : "Labu Siam",
  "Merah" : "Bawang Merah",
  "Pakis" : "Daun Pakis",
  "Sawi" : "Sawi Hijau",
  "SawiPutih": "Sawi Putih",
  "Putih" : "Bawang Putih",
  "Labu3" : "Labu Siam",
  "Sawi2" : "Sawi Hijau",
  "Sawi" : "Sawi Hijau",
  "Jantung2" : "Jantung Pisang",
  "Merah2" : "Bawang Merah",
  "Sawi_s" : "Sawi Hijau",
  "Pakis2" : "Daun Pakis",
  "Labu3" : "Labu Siam",



  "wortel": "Wortel",
  "tomat": "Tomat",
  "bawangputih": "Bawang Putih",
  "bawangmerah": "Bawang Merah"
  // 👉 tambahkan sesuai kebutuhan
};


// 🔹 Mapping bahasa Inggris
// 🔹 Mapping bahasa Inggris
// 🔹 Mapping bahasa Inggris
const engMap = {
  "Brokoli": "Broccoli",
  "Jantung Pisang": "Banana Blossom",
  "Oyong": "Luffa",
  "Terong": "Eggplant",
  "Mentimun": "Cucumber",
  "Tomat": "Tomato",
  "Labu Siam": "Chayote",
  "Buncis": "Green Bean",
  "Kacang Panjang": "Yardlong Beans",
  "Bayam": "Spinach",
  "Kubis": "Cabbage",
  "Sawi Putih": "Chinese Cabbage",
  "Sawi Hijau": "Mustard Greens",
  "Kangkung": "Water Spinach",
  "Selada": "Lettuce",
  "Lobak": "Radish",
  "Wortel": "Carrot",
  "Kentang": "Potato",
  "Bit Merah": "Beetroot",
  "Jamur Kancing": "Button Mushroom",
  "Bawang Merah": "Shallot",
  "Bawang Putih": "Garlic",
  "Bawang Bombay": "Onion",
  "Paprika": "Bell Pepper",
  "Cabai Rawit": "Bird's Eye Chili",
  "Seledri": "Celery",
  "Bawang Daun": "Leek",
  "Asparagus": "Asparagus",
  "Rebung": "Bamboo Shoot",
  "Daun Pakis": "Fiddlehead Fern",
};
function normalizeName(raw) {
  if (!raw) return "";

  return raw
    .replace(/[0-9]+/g, "")
    .replace(/_/g, " ")
    .trim();
}




window.onload = () => {
  // 🔹 Ambil jawaban terakhir
  const lastAnswer = localStorage.getItem("lastAnswer");
  const lastName = localStorage.getItem("lastAnswerName");
  const isImage = localStorage.getItem("lastIsImage") === "1";

  const cleanName = normalizeName(lastName || lastAnswer);
  let displayName = cleanName;


  let audioPath = "";

  if (lang === "id" && cleanName) {
    const filename = cleanName.toLowerCase().replace(/ /g, "_");
    audioPath = `/static/sounds/id/options/${displayName}.m4a`;

  }



  if (lang === "en") {
    displayName = engMap[cleanName] || cleanName;
  }



  // 🔹 Isi konten notif
  // 🔹 Isi konten notif
  notifText.textContent = lang === "id" ? "Hebat!" : "Great!";
  vegName.textContent = displayName;

  // 🔹 Gambar
  if (isImage && lastAnswer) {
    notifVeg.src = lastAnswer;
  } else if (cleanName) {
    notifVeg.src = `/static/img/${cleanName.toLowerCase().replace(/ /g, "_")}_m.png`;
  }
  notifVeg.onload = () => {
  notifVeg.style.opacity = 1;
  notifVeg.style.transform = "scale(1.25)";
};





  // 🔹 Animasi
  notifVeg.style.opacity = 0;
  setTimeout(() => {
    notifVeg.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    notifVeg.style.opacity = 1;
    notifVeg.style.transform = "scale(1.1)";
    setTimeout(() => {
      notifVeg.style.transform = "scale(1)";
    }, 800);
  }, 200);

  // 🔹 Audio / TTS
  if (lang === "id" && audioPath) {
    player.src = audioPath;
    player.play();
  } else if (lang === "en" && displayName && "speechSynthesis" in window) {
    const utter = new SpeechSynthesisUtterance(displayName);
    utter.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  }

  // 🔹 Tombol speak
  btnSpeak.addEventListener("click", () => {
    if (lang === "id" && audioPath) {
      player.currentTime = 0;
      player.play();
    } else if (lang === "en" && displayName) {
      const utter = new SpeechSynthesisUtterance(displayName);
      utter.lang = "en-US";
      speechSynthesis.cancel();
      speechSynthesis.speak(utter);
    }
  });
};
  

// ==== STAR EFFECT (bintang runcing kuning emas) ====
canvasStars.width = window.innerWidth;
canvasStars.height = window.innerHeight;

function drawStar(ctx, x, y, spikes, outerRadius, innerRadius, alpha) {
  let rot = Math.PI / 2 * 3;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(x, y - outerRadius);
  for (let i = 0; i < spikes; i++) {
    let xOuter = x + Math.cos(rot) * outerRadius;
    let yOuter = y + Math.sin(rot) * outerRadius;
    ctx.lineTo(xOuter, yOuter);
    rot += step;

    let xInner = x + Math.cos(rot) * innerRadius;
    let yInner = y + Math.sin(rot) * innerRadius;
    ctx.lineTo(xInner, yInner);
    rot += step;
  }
  ctx.closePath();

  ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`; // kuning emas
  ctx.fill();
}

// Data bintang
const stars = [];
for (let i = 0; i < 80; i++) {
  stars.push({
    x: Math.random() * canvasStars.width,
    y: Math.random() * -canvasStars.height,
    spikes: 4 + Math.floor(Math.random() * 3), // variasi 4-6 sudut
    outer: Math.random() * 10 + 10,
    inner: Math.random() * 5 + 4,
    alpha: Math.random(),
    dAlpha: 0.02 * (Math.random() < 0.5 ? 1 : -1),
    speedY: Math.random() * 4 + 3
  });
}

function animateStars() {
  ctxStars.clearRect(0, 0, canvasStars.width, canvasStars.height);
  stars.forEach(s => {
    drawStar(ctxStars, s.x, s.y, s.spikes, s.outer, s.inner, s.alpha);

    // update posisi jatuh
    s.y += s.speedY;
    if (s.y > canvasStars.height + 20) {
      s.y = -20;
      s.x = Math.random() * canvasStars.width;
      s.speedY = Math.random() * 4 + 3;
    }

    // kedip
    s.alpha += s.dAlpha;
    if (s.alpha <= 0 || s.alpha >= 1) s.dAlpha *= -1;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

window.addEventListener("resize", () => {
  canvasStars.width = window.innerWidth;
  canvasStars.height = window.innerHeight;
});
// 🔹 Ambil data progress
const current = parseInt(localStorage.getItem("menengahCurrent") || "0", 10);
const total = parseInt(localStorage.getItem("menengahTotal") || "5", 10);
const score = parseInt(localStorage.getItem("menengahScore") || "0", 10);

// 🔹 Kalau sudah soal terakhir, pastikan nilai akhir tersimpan
if (current >= total) {
  localStorage.setItem("finalScore", score);
  localStorage.setItem("correctCount", Math.floor(score / 20));
  localStorage.setItem("totalQuestions", total);
}

// 🔹 Redirect setelah 6 detik
setTimeout(() => {
  if (current >= total) {
    window.location.href = "/skor";
  } else {
    window.location.href = "/level_menengah";
  }
}, 6000);

