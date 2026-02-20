const lang = localStorage.getItem("gameLang") || "id";

const notifText = document.getElementById("notif-text");
const vegNameContainer = document.getElementById("veg-name");
const notifVeg = document.getElementById("notif-veg");
const btnSpeak = document.getElementById("btn-speak");
const player = document.getElementById("id-player");
const canvasStars = document.getElementById("stars");
const ctxStars = canvasStars.getContext("2d");

// Mapping Bahasa Inggris
const engMap = {
    "Brokoli": "Broccoli", "Kubis": "Cabbage", "Mentimun": "Cucumber",
    "Wortel": "Carrot", "Tomat": "Tomato", "Paprika": "Bell Pepper",
    "Bayam": "Spinach", "Kangkung": "Water Spinach", "Sawi Hijau": "Mustard Greens",
    "Sawi Putih": "Chinese Cabbage", "Selada": "Lettuce", "Lobak": "Radish",
    "Kentang": "Potato", "Bit Merah": "Beetroot", "Jamur Kancing": "Button Mushroom",
    "Bawang Merah": "Shallot", "Bawang Putih": "Garlic", "Bawang Bombay": "Onion",
    "Bawang Daun": "Leek", "Cabai Rawit": "Bird's Eye Chili", "Jantung Pisang": "Banana Blossom",
    "Rebung": "Bamboo Shoot", "Daun Pakis": "Fiddlehead Fern", "Asparagus": "Asparagus",
    "Oyong": "Luffa", "Labu Siam": "Chayote", "Seledri": "Celery",
    "Buncis": "Green Beans", "Kacang Panjang": "Yardlong Beans", "Terong": "Eggplant"
};

// 1. DATA TIMING (Dipisahkan berdasarkan bahasa agar tidak saling timpa)
const spellingTimings = {
    "id": {
        "brokoli": [0, 0.7, 1.4],
        "oyong": [0, 0.8],
        "jantung pisang": [0, 0.6, 1.1, 1.6],
        "bawang bombay": [0, 0.6, 1.2, 1.8],
        "kubis": [0, 0.8], 
        "mentimun": [0, 0.7, 1.4],
        "wortel": [0, 0.8], 
        "tomat": [0, 0.8], 
        "paprika": [0, 0.7, 1.4],
        "bayam": [0, 0.8], 
        "kangkung": [0, 0.9], 
        "selada": [0, 0.7, 1.4],
        "lobak": [0, 0.8], 
        "kentang": [0, 0.8], 
        "rebung": [0, 1],
        "asparagus": [1.0, 1.8, 2.6, 3.4], // Lebih Lambat untuk Voice Indonesia
        "seledri": [0.4, 0.9, 1.8],
        "buncis": [0, 0.8], 
        "terong": [0, 0.8], 
        "sawi hijau": [0, 0.6, 1.2, 1.8], 
        "sawi putih": [0, 0.6, 1.2, 1.8],
        "bit merah": [0, 0.7, 1.2], 
        "jamur kancing": [0, 0.6, 1.1, 1.6],
        "bawang merah": [0, 0.6, 1.1, 1.6], 
        "bawang putih": [0, 0.6, 1.2, 1.8],
        "bawang daun": [0, 0.8, 1.2, 1.7], 
        "cabai rawit": [0, 0.6, 1.4, 1.9],
        "daun pakis": [0, 0.6, 1.1, 1.6], 
        "labu siam": [0, 0.6, 1.1, 1.6],
        "kacang panjang": [0, 0.6, 1.1, 1.6], 
        "default": [0, 0.8, 1.6]
      },
    "en": {
       "broccoli": [0, 0.7, 1.4], 
        "cabbage": [0, 0.8], 
        "cucumber": [0, 1.0, 2.6],
        "carrot": [0, 1.2], 
        "tomato": [0, 0.8, 1.4], 
        "bell pepper": [0, 1.1, 2.2],
        "spinach": [0, 0.8], 
        "water spinach": [0, 1.1, 2.2, 3.3], 
        "mustard greens": [0, 0.9, 1.6],
        "chinese cabbage": [0, 1.0, 2.0, 2.4], 
        "lettuce": [0, 1.9], 
        "radish": [0, 1.2],
        "potato": [0, 0.6, 1.2], 
        "beetroot": [0, 2], 
        "button mushroom": [0, 1.2, 2.4, 3.6],
        "shallot": [0, 0.8], 
        "garlic": [0, 1.4], 
        "onion": [0, 1.7],
        "leek": [0], 
        "bird's eye chili": [0, 2.8, 4], 
        "banana blossom": [0, 1.1, 2.2, 3.3, 4.4],
        "bamboo shoot": [0, 0.9, 1.6], 
        "fiddlehead fern": [0, 1.3, 2.6, 3.9], 
        "asparagus": [0, 0.8, 1.8, 2.8], // English Lebih Cepat
        "luffa": [0, 1], 
        "chayote": [0, 1.4, 2.3], 
        "celery": [0, 1],
        "green beans": [0, 0.8], 
        "yardlong beans": [0, 1.5, 2.3], 
        "eggplant": [0, 1],
        "default": [0, 0.8, 1.6]
      }
};

// 2. DATA PEMEGATAN (Teks yang muncul di layar)
const manualSplit = {
    "brokoli": ["Bro", "ko", "li"], "oyong": ["O", "yong"], "jantung pisang": ["Jan", "tung", " Pi", "sang"],
    "kubis": ["Ku", "bis"], "mentimun": ["Men", "ti", "mun"], "wortel": ["Wor", "tel"],
    "tomat": ["To", "mat"], "paprika": ["Pa", "pri", "ka"], "bayam": ["Ba", "yam"],
    "kangkung": ["Kang", "kung"], "selada": ["Se", "la", "da"], "lobak": ["Lo", "bak"],
    "kentang": ["Ken", "tang"], "rebung": ["Re", "bung"], "asparagus": ["As", "pa", "ra", "gus"],
    "seledri": ["Se", "le", "dri"], "buncis": ["Bun", "cis"], "terong": ["Te", "rong"],
    "sawi hijau": ["Sa", "wi", " Hi", "jau"], "sawi putih": ["Sa", "wi", " Pu", "tih"],
    "bit merah": ["Bit", " Me", "rah"], "jamur kancing": ["Ja", "mur", " Kan", "cing"],
    "bawang merah": ["Ba", "wang", " Me", "rah"], "bawang putih": ["Ba", "wang", " Pu", "tih"],
    "bawang bombay": ["Ba", "wang", " Bom", "bay"], "bawang daun": ["Ba", "wang", " Da", "un"],
    "cabai rawit": ["Ca", "bai", " Ra", "wit"], "daun pakis": ["Da", "un", " Pa", "kis"],
    "labu siam": ["La", "bu", " Si", "am"], "kacang panjang": ["Ka", "cang", " Pan", "jang"],
    "broccoli": ["Broc", "co", "li"], "cabbage": ["Cab", "bage"], "cucumber": ["Cu", "cum", "ber"],
    "carrot": ["Car", "rot"], "tomato": ["To", "ma", "to"], "bell pepper": ["Bell", " Pep", "per"],
    "spinach": ["Spi", "nach"], "water spinach": ["Wa", "ter", " Spi", "nach"], "mustard greens": ["Mus", "tard", " Greens"],
    "chinese cabbage": ["Chi", "nese", " Cab", "bage"], "lettuce": ["Let", "tuce"], "radish": ["Ra", "dish"],
    "potato": ["Po", "ta", "to"], "beetroot": ["Beet", "root"], "button mushroom": ["But", "ton", " Mush", "room"],
    "shallot": ["Shal", "lot"], "garlic": ["Gar", "lic"], "onion": ["On", "ion"],
    "leek": ["Leek"], "bird's eye chili": ["Bird's", " Eye", " Chili"], "banana blossom": ["Ba", "na", "na", " Blos", "som"],
    "bamboo shoot": ["Bam", "boo", " Shoot"], "fiddlehead fern": ["Fid", "dle", "head", " Fern"], "asparagus": ["As", "pa", "ra", "gus"],
    "luffa": ["Luf", "fa"], "chayote": ["Cha", "yo", "te"], "celery": ["Cel", "ery"],
    "green beans": ["Green", " Beans"], "yardlong beans": ["Yard", "long", " Beans"], "eggplant": ["Egg", "plant"]
};

let activeTimeouts = [];

function normalizeName(raw) {
    if (!raw) return "";
    let name = raw.replace(/[0-9]+/g, "").replace(/_/g, " ").trim();
    if (lang === "en") {
        for (let key in engMap) {
            if (key.toLowerCase() === name.toLowerCase()) return engMap[key];
        }
    }
    return name;
}

function renderSyllables(name) {
    const lowName = name.toLowerCase();
    vegNameContainer.innerHTML = "";
    let syls = manualSplit[lowName] || [name];
    
    syls.forEach(s => {
        const span = document.createElement("span");
        span.className = "syllable";
        span.textContent = s;
        vegNameContainer.appendChild(span);
    });
}

function playSequence() {
    const lastName = localStorage.getItem("lastAnswerName");
    const lastAnswer = localStorage.getItem("lastAnswer");
    const displayName = normalizeName(lastName || lastAnswer);
    const rawNameId = (lastName || lastAnswer).replace(/[0-9]+/g, "").replace(/_/g, " ").trim();
    
    activeTimeouts.forEach(clearTimeout);
    activeTimeouts = [];

    player.src = (lang === "id") 
        ? "/static/sounds/id/notif_mudah/Notif Menengah.mp4" 
        : "/static/sounds/Great.mp3";
    
    player.play();

    player.onended = () => {
        if (lang === "id") {
            player.src = `/static/sounds/id/notif_mudah/${rawNameId}.mp4`;
        } else {
            player.src = `/static/sounds/En/Notif_Menengah/${displayName}.mp3`;
        }
        
        player.play();

        const spans = document.querySelectorAll(".syllable");
        const lowId = displayName.toLowerCase().trim();
        
        // --- LOGIKA BARU: Ambil Berdasarkan Bahasa ---
        const langGroup = spellingTimings[lang] || spellingTimings["id"];
        const times = langGroup[lowId] || langGroup["default"];

        spans.forEach(s => s.classList.remove("active"));

        times.forEach((t, i) => {
            let tout = setTimeout(() => {
                spans.forEach(s => s.classList.remove("active"));
                if (spans[i]) spans[i].classList.add("active");
            }, t * 1000);
            activeTimeouts.push(tout);
        });

        player.onended = () => {
            let finalTout = setTimeout(() => {
                spans.forEach(s => s.classList.remove("active"));
            }, 500);
            activeTimeouts.push(finalTout);
            player.onended = null;
        };
    };
}

window.onload = () => {
    const lastName = localStorage.getItem("lastAnswerName");
    const lastAnswer = localStorage.getItem("lastAnswer");
    const displayName = normalizeName(lastName || lastAnswer);
    const rawNameId = (lastName || lastAnswer).replace(/[0-9]+/g, "").replace(/_/g, " ").trim();

    notifText.textContent = lang === "id" ? "Hebat!" : "Great!";
    renderSyllables(displayName);

    const isImage = localStorage.getItem("lastIsImage") === "1";
    if (isImage && lastAnswer) {
        notifVeg.src = lastAnswer;
    } else {
        notifVeg.src = `/static/img/${rawNameId.toLowerCase().replace(/ /g, "_")}_m.png`;
    }

    notifVeg.onload = () => {
        setTimeout(() => {
            notifVeg.style.opacity = 1;
            notifVeg.style.transform = "scale(1.2)"; 
        }, 50);
    };

    setTimeout(playSequence, 500);
    btnSpeak.addEventListener("click", playSequence);
};

// --- Star Effect ---
canvasStars.width = window.innerWidth;
canvasStars.height = window.innerHeight;
function drawStar(ctx, x, y, spikes, outerRadius, innerRadius, alpha) {
    let rot = Math.PI / 2 * 3;
    let step = Math.PI / spikes;
    ctx.beginPath(); ctx.moveTo(x, y - outerRadius);
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
        rot += step;
    }
    ctx.closePath(); ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`; ctx.fill();
}
const stars = [];
for (let i = 0; i < 80; i++) stars.push({ x: Math.random() * canvasStars.width, y: Math.random() * -canvasStars.height, spikes: 4 + Math.floor(Math.random() * 3), outer: Math.random() * 10 + 10, inner: Math.random() * 5 + 4, alpha: Math.random(), dAlpha: 0.02 * (Math.random() < 0.5 ? 1 : -1), speedY: Math.random() * 4 + 3 });
function animateStars() {
    ctxStars.clearRect(0, 0, canvasStars.width, canvasStars.height);
    stars.forEach(s => { drawStar(ctxStars, s.x, s.y, s.spikes, s.outer, s.inner, s.alpha); s.y += s.speedY; if (s.y > canvasStars.height + 20) { s.y = -20; s.x = Math.random() * canvasStars.width; } s.alpha += s.dAlpha; if (s.alpha <= 0 || s.alpha >= 1) s.dAlpha *= -1; });
    requestAnimationFrame(animateStars);
}
animateStars();

const current = parseInt(localStorage.getItem("menengahCurrent") || "0", 10);
const total = parseInt(localStorage.getItem("menengahTotal") || "5", 10);
setTimeout(() => {
    window.location.href = current >= total ? "/skor" : "/level_menengah";
}, 8500);