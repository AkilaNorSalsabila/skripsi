document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const captureBtn = document.getElementById("capture");
    const uploadBtn = document.getElementById("upload");
    const fileInput = document.getElementById("fileInput");

    // Elemen translate box
    const textID = document.getElementById("textID");
    const textEN = document.getElementById("textEN");
    const btnAudioID = document.getElementById("btnAudioID");
    const btnAudioEN = document.getElementById("btnAudioEN");
    const reloadBtn = document.getElementById("reload");

    // Notifikasi Suara
    const successSound = new Audio("/static/sounds/success.mp3");
    const errorSound = new Audio("/static/sounds/error.mp3");

    // --- Awal: sembunyikan tombol audio & reload ---
    btnAudioID.style.display = "none";
    btnAudioEN.style.display = "none";
    if (reloadBtn) reloadBtn.style.display = "none";

    // --- Aktifkan kamera otomatis ---
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { video.srcObject = stream; })
        .catch(err => { console.error("Tidak bisa akses kamera: ", err); });

    // ===================== AUDIO CONTROL =====================
    let currentAudio = null;
    let currentButton = null;
    let isPaused = false;
    let currentList = [];
    let currentIndex = 0;
    let autoVegSound = null; // audio otomatis Indonesia

    function playAudioSequence(audioList, buttonEl) {
        const playIcon = buttonEl.querySelector(".play-icon img");
        const waveIcon = buttonEl.querySelector(".wave-icon");

        // kalau lagi play audio yang sama, toggle pause/play
        if (currentAudio && currentButton === buttonEl) {
            if (isPaused) {
                currentAudio.play();
                if (playIcon) playIcon.src = "/static/img/pause.png";
                if (waveIcon) waveIcon.style.display = "flex";
                isPaused = false;
            } else {
                currentAudio.pause();
                if (playIcon) playIcon.src = "/static/img/play.png";
                if (waveIcon) waveIcon.style.display = "none";
                isPaused = true;
            }
            return;
        }

        // 🛑 STOP audio lama sebelum mulai yang baru
        stopAllAudio();

        currentList = audioList;
        currentIndex = 0;
        currentButton = buttonEl;
        isPaused = false;

        playNext();
    }

    function playNext() {
        if (currentIndex < currentList.length) {
            currentAudio = new Audio(currentList[currentIndex]);
            
            // Penanganan khusus jika formatnya MP4
            if (currentList[currentIndex].endsWith(".mp4")) {
                currentAudio.type = "audio/mp4";
            }

            currentAudio.play().catch(err => console.error("Playback error:", err));

            const playIcon = currentButton.querySelector(".play-icon img");
            const waveIcon = currentButton.querySelector(".wave-icon");

            if (playIcon) playIcon.src = "/static/img/pause.png";
            if (waveIcon) waveIcon.style.display = "flex";

            currentAudio.onended = () => {
                currentIndex++;
                playNext();
            };
        } else {
            if (currentButton) {
                const playIcon = currentButton.querySelector(".play-icon img");
                const waveIcon = currentButton.querySelector(".wave-icon");
                if (playIcon) playIcon.src = "/static/img/play.png";
                if (waveIcon) waveIcon.style.display = "none";
            }
            resetAudioState();
        }
    }

    function resetAudioState() {
        currentAudio = null;
        currentButton = null;
        isPaused = false;
        currentList = [];
        currentIndex = 0;
    }

    // 🔴 STOP SEMUA AUDIO (otomatis & manual)
    function stopAllAudio() {
        if (autoVegSound) {
            autoVegSound.pause();
            autoVegSound.currentTime = 0;
            autoVegSound.onended = null; 
            autoVegSound = null;
        }

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio.onended = null; 
        }

        if (currentButton) {
            const pi = currentButton.querySelector(".play-icon img");
            const wi = currentButton.querySelector(".wave-icon");
            if (pi) pi.src = "/static/img/play.png";
            if (wi) wi.style.display = "none";
        }

        successSound.pause();
        successSound.currentTime = 0;
        successSound.onended = null;
        errorSound.pause();
        errorSound.currentTime = 0;

        resetAudioState();
    }

    // =========================================================

    async function classifyImage(blob) {
        const formData = new FormData();
        formData.append("image", blob);

        try {
            let response = await fetch("/klasifikasi", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                console.warn("Percobaan pertama gagal, coba ulang...");
                response = await fetch("/klasifikasi", {
                    method: "POST",
                    body: formData
                });
            }

            const result = await response.json();

            if (!response.ok) {
                stopAllAudio();
                errorSound.play();
                alert(result.error || "Terjadi kesalahan saat klasifikasi");
                if (reloadBtn) reloadBtn.style.display = "inline-block";
                return;
            }

            if (result.status === "rejected") {
                stopAllAudio();
                errorSound.play();
                const persen = (result.confidence * 100).toFixed(2);
                alert(`Gambar belum dikenali dengan baik.\nConfidence: ${persen}% .\n\n`);
                textID.textContent = "-";
                textEN.textContent = "-";
                btnAudioID.style.display = "none";
                btnAudioEN.style.display = "none";
                if (reloadBtn) reloadBtn.style.display = "inline-block";
                return;
            }

            // ✅ Update teks hasil
            textID.textContent = result.nama_id || "-";
            textEN.textContent = result.nama_en || "-";
            btnAudioID.style.display = "inline-block";
            btnAudioEN.style.display = "inline-block";
            if (reloadBtn) reloadBtn.style.display = "inline-block";

            // 🔊 LOGIKA SUARA OTOMATIS (DIPERBAIKI UNTUK RESPON INSTAN)
            if (result.nama_id) {
                stopAllAudio(); 

                // 🚀 Tahap 1: Siapkan (Preload) audio sayuran secepat mungkin
                if (result.audio_nama_id) {
                    autoVegSound = new Audio(result.audio_nama_id);
                    if (result.audio_nama_id.endsWith(".mp4")) autoVegSound.type = "audio/mp4";
                    autoVegSound.load(); 
                }

                // 🚀 Tahap 2: Putar successSound ("cling")
                successSound.play();

                // 🚀 Tahap 3: Gunakan pemicu ganda untuk kecepatan maksimal
                let vegetablePlayed = false;
                const playVegetable = () => {
                    if (!vegetablePlayed && autoVegSound) {
                        vegetablePlayed = true;
                        autoVegSound.play().catch(e => console.warn("Auto play blocked:", e));
                    }
                };

                // Pemicu A: Langsung putar setelah 500ms (sebelum cling benar-benar habis)
                setTimeout(playVegetable, 500); 

                // Pemicu B: Cadangan jika suara cling sangat pendek
                successSound.onended = playVegetable;
            }

            // --- Tombol Play Indonesia ---
            btnAudioID.onclick = () => {
                let audioList = [];
                const formattedName = result.nama_id.charAt(0).toUpperCase() + result.nama_id.slice(1);
                audioList.push(`/static/sounds/id/sayuran/${formattedName}.mp4`);
                playAudioSequence(audioList, btnAudioID);
            };

            // --- Tombol Play English ---
            btnAudioEN.onclick = () => {
                let audioList = [];
                if (result.nama_id && result.nama_id !== "-") {
                    const formattedName = result.nama_id.charAt(0).toUpperCase() + result.nama_id.slice(1);
                    const audioManfaatPath = `/static/sounds/Manfaat/${formattedName}.mp3`;
                    audioList.push(audioManfaatPath);
                }
                if (audioList.length > 0) {
                    playAudioSequence(audioList, btnAudioEN);
                }
            };

        } catch (err) {
            console.error("Gagal klasifikasi:", err);
            stopAllAudio();
            errorSound.play();
            alert("Gagal menghubungi server Flask.");
            if (reloadBtn) reloadBtn.style.display = "inline-block";
        }
    }

    // --- Ambil foto dari kamera ---
    captureBtn.addEventListener("click", () => {
        stopAllAudio();
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        context.setTransform(1, 0, 0, 1, 0, 0);

        video.style.display = "none";
        canvas.style.display = "block";
        canvas.toBlob(blob => { classifyImage(blob); }, "image/jpeg");
    });

    // --- Upload dari file ---
    uploadBtn.addEventListener("click", () => { 
        stopAllAudio();
        fileInput.click(); 
    });

    fileInput.addEventListener("change", (event) => {
        stopAllAudio();
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const context = canvas.getContext("2d");
                canvas.width = 600;
                canvas.height = 380;
                const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width - img.width * scale) / 2;
                const y = (canvas.height - img.height * scale) / 2;
                context.fillStyle = "black";
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
                video.style.display = "none";
                canvas.style.display = "block";
                canvas.toBlob(blob => { classifyImage(blob); }, "image/jpeg");
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    // --- Tombol Reload ---
    if (reloadBtn) {
        reloadBtn.addEventListener("click", () => {
            stopAllAudio();
            textID.textContent = "";
            textEN.textContent = "";
            btnAudioID.style.display = "none";
            btnAudioEN.style.display = "none";
            canvas.style.display = "none";
            video.style.display = "block";
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            reloadBtn.style.display = "none";
        });
    }
});