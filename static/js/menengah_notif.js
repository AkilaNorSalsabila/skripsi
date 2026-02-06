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
    // 1. Ambil data dari localStorage
    const lastAnswer = localStorage.getItem("lastAnswer");
    const lastName = localStorage.getItem("lastAnswerName");
    const isImage = localStorage.getItem("lastIsImage") === "1";
    const cleanName = normalizeName(lastName || lastAnswer);
    
    let displayName = cleanName;
    if (lang === "en") {
        displayName = engMap[cleanName] || cleanName;
    }

    // ==========================================
    // 🔊 LOGIKA AUDIO (DISINKRONKAN)
    // ==========================================

    // FUNGSI A: Hanya Nama Sayur (Untuk Tombol & Antrean)
    function playOnlyVegAudio() {
        if (lang === "en") {
            if ("speechSynthesis" in window) speechSynthesis.cancel();
            // Gunakan Audio Object agar tidak mengganggu src player utama jika perlu
            const audioVeg = new Audio(`/static/sounds/En/${cleanName}.mp3`);
            audioVeg.play().catch(err => {
                const utter = new SpeechSynthesisUtterance(displayName);
                utter.lang = "en-US";
                speechSynthesis.speak(utter);
            });
        } else {
            // Bahasa Indonesia: Nama file sesuai list (Brokoli, Bawang Bombay, dll)
            // Menggunakan player utama agar konsisten
            player.src = `/static/sounds/id/options/${cleanName}.mp3`;
            player.play().catch(() => {
                // Jika mp3 tidak ada, coba m4a
                player.src = `/static/sounds/id/options/${cleanName}.m4a`;
                player.play().catch(e => console.error("File audio sayur tidak ditemukan"));
            });
        }
    }

    // FUNGSI B: Intro (Hebat/Great + Nama Sayur)
    function playIntroAudio() {
        if (lang === "en") {
            if ("speechSynthesis" in window) speechSynthesis.cancel();
            const audioGreat = new Audio("/static/sounds/Great.mp3");
            audioGreat.play().catch(err => playOnlyVegAudio());
            audioGreat.onended = () => {
                playOnlyVegAudio();
            };
        } else {
            // Indonesia: Putar "Hebat.mp4" (atau .mp3 jika sebenarnya audio)
            // Catatan: Jika file Hebat adalah video (.mp4) tapi hanya ingin audionya, 
            // browser biasanya tetap bisa memutarnya di elemen audio.
            player.src = "/static/sounds/Hebat.mp4"; 
            player.play().catch(err => {
                console.log("Mencoba fallback Hebat ke .mp3 atau .m4a");
                player.src = "/static/sounds/Hebat.mp3";
                player.play().catch(e => playOnlyVegAudio());
            });

            // Setelah suara "Hebat" selesai, baru putar nama sayur
            player.onended = () => {
                playOnlyVegAudio();
                player.onended = null; // Reset agar tidak looping
            };
        }
    }

    // Jalankan intro saat halaman buka
    playIntroAudio();

    // ==========================================

    notifText.textContent = lang === "id" ? "Hebat!" : "Great!";
    vegName.textContent = displayName;

    if (isImage && lastAnswer) {
        notifVeg.src = lastAnswer;
    } else if (cleanName) {
        notifVeg.src = `/static/img/${cleanName.toLowerCase().replace(/ /g, "_")}_m.png`;
    }

    notifVeg.onload = () => {
        notifVeg.style.opacity = 1;
        notifVeg.style.transform = "scale(1.1)";
    };

    notifVeg.style.opacity = 0;
    setTimeout(() => {
        notifVeg.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        notifVeg.style.opacity = 1;
        notifVeg.style.transform = "scale(1.1)";
        setTimeout(() => {
            notifVeg.style.transform = "scale(1)";
        }, 800);
    }, 200);

    // Tombol Speak hanya memutar nama sayur
    btnSpeak.addEventListener("click", () => {
        playOnlyVegAudio();
    });
};

// ==== STAR EFFECT (Tetap Sama) ====
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
    ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
    ctx.fill();
}

const stars = [];
for (let i = 0; i < 80; i++) {
    stars.push({
        x: Math.random() * canvasStars.width,
        y: Math.random() * -canvasStars.height,
        spikes: 4 + Math.floor(Math.random() * 3),
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
        s.y += s.speedY;
        if (s.y > canvasStars.height + 20) {
            s.y = -20;
            s.x = Math.random() * canvasStars.width;
        }
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

const current = parseInt(localStorage.getItem("menengahCurrent") || "0", 10);
const total = parseInt(localStorage.getItem("menengahTotal") || "5", 10);
const score = parseInt(localStorage.getItem("menengahScore") || "0", 10);

if (current >= total) {
    localStorage.setItem("finalScore", score);
    localStorage.setItem("correctCount", Math.floor(score / 20));
    localStorage.setItem("totalQuestions", total);
}

setTimeout(() => {
    if (current >= total) {
        window.location.href = "/skor";
    } else {
        window.location.href = "/level_menengah";
    }
}, 7000);