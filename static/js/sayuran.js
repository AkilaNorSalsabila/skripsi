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
    const errorSound   = new Audio("/static/sounds/error.mp3");

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
                playIcon.src = "/static/img/pause.png";
                waveIcon.style.display = "flex";
                isPaused = false;
            } else {
                currentAudio.pause();
                playIcon.src = "/static/img/play.png";
                waveIcon.style.display = "none";
                isPaused = true;
            }
            return;
        }

        // stop audio lama
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            if (currentButton) {
                currentButton.querySelector(".play-icon img").src = "/static/img/play.png";
                currentButton.querySelector(".wave-icon").style.display = "none";
            }
        }

        currentList = audioList;
        currentIndex = 0;
        currentButton = buttonEl;
        isPaused = false;

        playNext();
    }

    function playNext() {
        if (currentIndex < currentList.length) {
            currentAudio = new Audio(currentList[currentIndex]);
            currentAudio.play();

            const playIcon = currentButton.querySelector(".play-icon img");
            const waveIcon = currentButton.querySelector(".wave-icon");

            playIcon.src = "/static/img/pause.png";
            waveIcon.style.display = "flex";

            currentAudio.onended = () => {
                currentIndex++;
                playNext();
            };

        } else {
            if (currentButton) {
                currentButton.querySelector(".play-icon img").src = "/static/img/play.png";
                currentButton.querySelector(".wave-icon").style.display = "none";
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
            autoVegSound = null;
        }
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            if (currentButton) {
                currentButton.querySelector(".play-icon img").src = "/static/img/play.png";
                currentButton.querySelector(".wave-icon").style.display = "none";
            }
            resetAudioState();
        }
    }

    // =========================================================

    // --- Fungsi untuk klasifikasi gambar ---
    // --- Fungsi untuk klasifikasi gambar ---
async function classifyImage(blob) {
    const formData = new FormData();
    formData.append("image", blob);

    try {
        let response = await fetch("/klasifikasi", {
            method: "POST",
            body: formData
        });

        // kalau request pertama gagal → coba ulang sekali lagi
        if (!response.ok) {
            console.warn("Percobaan pertama gagal, coba ulang...");
            response = await fetch("/klasifikasi", {
                method: "POST",
                body: formData
            });
        }

        const result = await response.json();
        

        if (!response.ok) {
            errorSound.play();
            alert(result.error || "Terjadi kesalahan saat klasifikasi");
            if (reloadBtn) reloadBtn.style.display = "inline-block";
            return;
        }
        if (result.status === "rejected") {
            errorSound.play();

            const persen = (result.confidence * 100).toFixed(2);

            alert(
                `Gambar belum dikenali dengan baik.\n` +
                `Confidence: ${persen}% .\n\n` 
            );

            textID.textContent = "-";
            textEN.textContent = "-";
            btnAudioID.style.display = "none";
            btnAudioEN.style.display = "none";

            if (reloadBtn) reloadBtn.style.display = "inline-block";
            return;
        }


        // ✅ Update teks hasil nama sayur
        textID.textContent = result.nama_id || "-";
        textEN.textContent = result.nama_en || "-";

        // ✅ Tampilkan tombol Play (meskipun kosong tetap biar UI konsisten)
        btnAudioID.style.display = "inline-block";
        btnAudioEN.style.display = "inline-block";

        // ✅ Tampilkan tombol Reload (SELALU)
        if (reloadBtn) reloadBtn.style.display = "inline-block";

        // 🔊 Jika ada hasil nama_id → anggap sukses
        if (result.nama_id) {
            successSound.play();

            successSound.onended = () => {
                if (result.audio_nama_id) {
                    autoVegSound = new Audio(result.audio_nama_id);
                    autoVegSound.play();
                }
            };
        } else {
            errorSound.play();
        }

        // --- Tombol Play Indonesia ---
        btnAudioID.onclick = () => {
            stopAllAudio();
            let audioList = [];
            if (result.audio_nama_id) audioList.push(result.audio_nama_id);
            if (audioList.length > 0) playAudioSequence(audioList, btnAudioID);
        };

        // --- Tombol Play English ---
        btnAudioEN.onclick = () => {
            stopAllAudio();
            let audioList = [];
            if (result.audio_nama_en) audioList.push(result.audio_nama_en);
            if (result.audio_manfaat_en) audioList.push(result.audio_manfaat_en);
            if (audioList.length > 0) playAudioSequence(audioList, btnAudioEN);
        };

    } catch (err) {
        console.error("Gagal klasifikasi:", err);
        errorSound.play();
        alert("Gagal menghubungi server Flask.");

        if (reloadBtn) reloadBtn.style.display = "inline-block";
    }
}



    // --- Ambil foto dari kamera ---
    captureBtn.addEventListener("click", () => {
        stopAllAudio(); // 🔴 stop audio dulu
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Balik biar hasil foto normal
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
        stopAllAudio(); // 🔴 stop audio dulu
        fileInput.click(); 
    });

    fileInput.addEventListener("change", (event) => {
        stopAllAudio(); // 🔴 stop audio dulu
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
            stopAllAudio(); // 🔴 stop audio dulu
            textID.textContent = "";
            textEN.textContent = "";
            btnAudioID.style.display = "none";
            btnAudioEN.style.display = "none";

            canvas.style.display = "none";
            video.style.display = "block";

            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => { video.srcObject = stream; })
                .catch(err => { console.error("Tidak bisa akses kamera: ", err); });

            reloadBtn.style.display = "none";
        });
    }
});
