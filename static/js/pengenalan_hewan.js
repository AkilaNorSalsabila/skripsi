let syllableData = {};

async function loadSyllableData() {
  try {
    const response = await fetch('/static/js/syllable_data.json');
    if (!response.ok) throw new Error(`Failed to fetch syllable_data.json: ${response.status}`);
    syllableData = await response.json();
    console.log('✅ Syllable data loaded successfully:', Object.keys(syllableData.animals || {}).length, 'animals');
  } catch (error) {
    console.error('❌ Failed to load syllable data:', error);
    syllableData = { animals: {} };
  }
}

document.addEventListener('DOMContentLoaded', async function () {
    await loadSyllableData();

    let video = document.getElementById('cameraVideo');
    let canvas = document.getElementById('canvas');
    const imagePlaceholder = document.getElementById('imagePlaceholder');
    const imageInput = document.getElementById('imageInput');
    const btnUploadFile = document.getElementById('btnUploadFile');
    const btnTakePhoto = document.getElementById('btnTakePhoto');
    const btnResetCamera = document.getElementById('btnResetCamera');
    const capturedPreview = document.getElementById("capturedPreview");

    // store initial audio label texts so we can restore them on reset
    let defaultAudioLabelIn = '';
    let defaultAudioLabelEn = '';
    (function captureDefaultAudioLabels() {
        const inBtn = document.querySelector('.audio-item [data-audio="in"]');
        const enBtn = document.querySelector('.audio-item [data-audio="en"]');
        if (inBtn && inBtn.nextElementSibling) defaultAudioLabelIn = inBtn.nextElementSibling.textContent || '';
        if (enBtn && enBtn.nextElementSibling) defaultAudioLabelEn = enBtn.nextElementSibling.textContent || '';
    })();

    let stream = null;
    let predictInterval = null;
    let isCameraActive = false;
    let isLocked = false;
    let lastPrediction = null;

    // kontrol kamera
    async function startCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            video.srcObject = stream;
            await video.play();

            isCameraActive = true;
            video.style.display = "block";
            capturedPreview.style.display = "none";

        } catch (err) {
            alert("Tidak bisa akses kamera");
            console.error(err);
        }
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
        isCameraActive = false;
    }

    // prediksi realtime
    function startRealtimePredict() {

        stopRealtimePredict();

        predictInterval = setInterval(() => {

            if (!isCameraActive || isLocked) return;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0);

            canvas.toBlob(blob => {
                sendImageToModel(blob);
            }, 'image/jpeg', 0.8);

        }, 1500);
    }

    function stopRealtimePredict() {
        if (predictInterval) {
            clearInterval(predictInterval);
            predictInterval = null;
        }
    }

    // kirim gambar ke model
    async function sendImageToModel(imageBlob) {

        let formData = new FormData();
        formData.append("image", imageBlob);

        try {

            const response = await fetch("/predict_hewan", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            // simpan hasil prediksi
            lastPrediction = data;

            if (data.hewan === "Tidak dikenali") {
                document.querySelector(".description-text").innerText =
                    "Gambar tidak dikenali";

                document.querySelector(".confidence-text").innerText =
                    `Confidence: ${data.confidence}%`;
                return;
            }

            document.querySelector(".description-text").innerText =
                `Ini adalah ${data.narasi_id}`;

            document.querySelector(".confidence-text").innerText =
                `Tingkat keyakinan model: ${data.confidence}%`;

            // Update label audio
            updateAudioLabels();

            // FREEZE kalau confidence tinggi
            if (data.confidence >= 70) {
                isLocked = true;
                stopRealtimePredict();

                if (isCameraActive) {
                    capturedPreview.src = canvas.toDataURL("image/jpeg");
                    video.style.display = "none";
                    capturedPreview.style.display = "block";
                }

                playNarration();
            }

        } catch (err) {
            console.error("Predict error:", err);
        }
    }

    // fungsi upload image file

    btnUploadFile.addEventListener("click", () => imageInput.click());

    imageInput.addEventListener("change", function (e) {

        stopRealtimePredict();
        stopCamera();
        isLocked = true;

        capturedPreview.style.display = "none";
        capturedPreview.src = "";

        const file = e.target.files[0];
        if (!file) return;

        video.style.display = "none";

        // hapus gambar lama supaya tidak double
        const oldImg = imagePlaceholder.querySelector('img.captured-image');
        if (oldImg) oldImg.remove();

        let img = document.createElement('img');
        img.className = 'captured-image';
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:20px;';
        imagePlaceholder.appendChild(img);

        img.src = URL.createObjectURL(file);
        img.style.display = "block";

        sendImageToModel(file);
    });

    // fungsi ambil foto manual
    btnTakePhoto.addEventListener("click", () => {

        stopRealtimePredict();

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);

        stopCamera();
        video.style.display = "none";

        // hapus gambar lama
        const oldImg = imagePlaceholder.querySelector('img.captured-image');
        if (oldImg) oldImg.remove();

        let img = document.createElement('img');
        img.className = 'captured-image';
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:20px;';
        imagePlaceholder.appendChild(img);

        img.src = canvas.toDataURL("image/png");
        img.style.display = "block";

        canvas.toBlob(blob => sendImageToModel(blob), 'image/png');
    });

    // fungsi reset kamera
    btnResetCamera.addEventListener("click", async () => {
        stopAllAudio();
        isLocked = false;

        stopRealtimePredict();
        stopCamera();

        const old = imagePlaceholder.querySelector('img.captured-image');
        if (old) old.remove();

        capturedPreview.src = "";
        capturedPreview.style.display = "none";

        document.querySelector(".description-text").innerText = "";
        document.querySelector(".confidence-text").innerText = "";

        // reset audio labels back to their initial texts (Indonesia / English)
        const labelIn = document.querySelector('.audio-item [data-audio="in"]')?.nextElementSibling;
        const labelEn = document.querySelector('.audio-item [data-audio="en"]')?.nextElementSibling;
        if (labelIn) labelIn.textContent = defaultAudioLabelIn;
        if (labelEn) labelEn.textContent = defaultAudioLabelEn;

        await new Promise(r => setTimeout(r, 300));

        await startCamera();
        startRealtimePredict();
    });


    let currentAudio = null;

    // button sound narasi
    const btnSound = document.querySelector('.btn-sound');
    if (btnSound) {
        btnSound.addEventListener('click', function() {
            if (!lastPrediction) {
                alert("Belum ada hewan terdeteksi. Silakan scan gambar hewan terlebih dahulu.");
                return;
            }
            playNarration();
        });
    }

    // fungsi auto play audio narasi
    function playNarration() {
        if (!lastPrediction) return;

        stopAllAudio();

        currentAudio = new Audio(`/static/sounds/hewan/pengenalan/${lastPrediction.audio_id}.m4a`);
        currentAudio.play().catch(err => {
            console.error("Error playing narration:", err);
            alert("Audio narasi tidak ditemukan.");
        });
    }

    function stopAllAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
    }

    // play sound manual
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(button => {
        button.addEventListener('click', function() {

            if (!lastPrediction) {
                alert("Belum ada hewan terdeteksi. Silakan scan gambar hewan terlebih dahulu.");
                return;
            }

            const lang = this.getAttribute('data-audio');
            const labelElement = this.nextElementSibling;

            let audioPath = "";
            let animalName = "";
            let fullAudioPath = "";

            if (lang === "in") {
                audioPath = `/static/sounds/hewan/pengenalan/in/${lastPrediction.audio_id}.m4a`;
                fullAudioPath = `/static/sounds/hewan/animals/in/${lastPrediction.audio_id}.m4a`;
                animalName = lastPrediction.hewan;
            } 
            else if (lang === "en") {
                audioPath = `/static/sounds/hewan/pengenalan/en/${lastPrediction.audio_en}.m4a`;
                fullAudioPath = `/static/sounds/hewan/animals/en/${lastPrediction.audio_en}.m4a`;
                animalName = capitalize(lastPrediction.nama_en || lastPrediction.audio_en);
            }

            stopAllAudio();

            // Get syllables and prepare spans
            // Key lookup selalu pakai nama Indonesia, tapi display pakai animalName
            const syllables = getSyllablesFromData(audioPath, lastPrediction.hewan, animalName);
            prepareSyllableSpans(labelElement, syllables, animalName);

            currentAudio = new Audio(audioPath);

            // Animate syllables progressively
            animateSyllablesProgressively(labelElement, syllables, currentAudio);

            // After syllable audio ends, play full animal audio
            currentAudio.onended = () => {
                playFullAnimalAudio(labelElement, fullAudioPath, animalName);
            };

            currentAudio.play().catch(err => {
                console.error("Error playing audio:", err);
                alert("Audio tidak ditemukan.");
                labelElement.classList.remove('playing');
                labelElement.style.pointerEvents = '';
            });
        });
    });

    // Play full animal audio after syllable animation
    function playFullAnimalAudio(labelElement, fullAudioPath, animalName) {
        // Kembalikan label ke text penuh
        labelElement.innerHTML = '';
        labelElement.textContent = animalName;
        labelElement.classList.remove('playing');
        labelElement.classList.add('full-popup');
        labelElement.style.pointerEvents = '';
        
        // Play audio full dari folder animals
        currentAudio = new Audio(fullAudioPath);
        currentAudio.play().catch(err => {
            console.error("Error playing full animal audio:", err);
        });
        
        // Hapus animasi full-popup setelah selesai
        setTimeout(() => {
            labelElement.classList.remove('full-popup');
        }, 600);
    }

    // atur audio label
  function capitalize(word) {
    if (!word) return "";
    return word
        .replace(/_/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

    function updateAudioLabels() {
        if (!lastPrediction) return;

        const labelIn = document.querySelector('.audio-item [data-audio="in"]').nextElementSibling;
        const labelEn = document.querySelector('.audio-item [data-audio="en"]').nextElementSibling;

        if (labelIn) labelIn.textContent = lastPrediction.hewan;
        if (labelEn) labelEn.textContent = capitalize(lastPrediction.nama_en || lastPrediction.audio_en);
    }

    // === SYLLABLE FUNCTIONS ===
    function normalizeFileName(name) {
        return name
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/-/g, '_');
    }

    function getSyllablesFromData(fileName, animalNameId, displayName) {
        // animalNameId = nama hewan dalam bahasa Indonesia untuk lookup key
        // displayName = nama yang sedang ditampilkan (bisa Indonesia atau English)
        const animalKey = normalizeFileName(animalNameId);
        const langKey = fileName.includes('/en/') ? "syllables_en" : "syllables_id";
        
        console.log('🔍 Syllable lookup:', {
            animalNameId,
            displayName,
            animalKey,
            langKey,
            found: syllableData.animals && syllableData.animals[animalKey] ? 'YES ✅' : 'NO ❌'
        });
        
        if (syllableData.animals && syllableData.animals[animalKey]) {
            const result = syllableData.animals[animalKey][langKey];
            console.log('📝 Syllables from JSON:', result);
            return result || splitSyllablesFallback(displayName);
        }
        
        console.log('⚠️ Using fallback syllable splitting');
        return splitSyllablesFallback(displayName);
    }

    function splitSyllablesFallback(word) {
        if (!word) return [];
        const words = word.trim().split(/\s+/);
        let allSyllables = [];
        
        words.forEach(w => {
            const syllables = splitSingleWord(w);
            allSyllables = allSyllables.concat(syllables);
        });
        
        return allSyllables;
    }

    function splitSingleWord(word) {
        if (!word) return [];
        
        const cleanWord = word.toLowerCase();
        const vowels = 'aiueo';
        const syllables = [];
        let currentSyllable = '';
        
        for (let i = 0; i < cleanWord.length; i++) {
            const char = cleanWord[i];
            const nextChar = cleanWord[i + 1];
            const nextNextChar = cleanWord[i + 2];
            
            currentSyllable += char;
            
            if (vowels.includes(char)) {
                if (nextChar && !vowels.includes(nextChar)) {
                    if ((nextChar === 'n' && nextNextChar === 'g') || 
                        (nextChar === 'n' && nextNextChar === 'y')) {
                        const afterSpecial = cleanWord[i + 3];
                        if (afterSpecial && vowels.includes(afterSpecial)) {
                            syllables.push(currentSyllable);
                            currentSyllable = '';
                        } else {
                            currentSyllable += nextChar + nextNextChar;
                            i += 2;
                            syllables.push(currentSyllable);
                            currentSyllable = '';
                        }
                    } else if (nextNextChar && vowels.includes(nextNextChar)) {
                        syllables.push(currentSyllable);
                        currentSyllable = '';
                    }
                    else if (nextNextChar && !vowels.includes(nextNextChar)) {
                        currentSyllable += nextChar;
                        i++;
                        syllables.push(currentSyllable);
                        currentSyllable = '';
                    }
                }
                else if (!nextChar) {
                    syllables.push(currentSyllable);
                    currentSyllable = '';
                }
            }
        }
        
        if (currentSyllable) {
            syllables.push(currentSyllable);
        }
        
        return syllables.length > 0 ? syllables : [word];
    }

    function prepareSyllableSpans(labelElement, syllables, originalText) {
        if (!syllables || syllables.length === 0) return;
        
        labelElement.innerHTML = '';
        
        const words = originalText.split(' ');
        let syllableIndex = 0;
        
        words.forEach((word, wordIdx) => {
            const hasDash = word.includes('-');
            const parts = word.split('-');
            
            if (hasDash) {
                parts.forEach((part, partIdx) => {
                    let syllablesInPart = [];
                    let reconstructed = '';
                    
                    while (syllableIndex < syllables.length) {
                        const syl = syllables[syllableIndex];
                        syllablesInPart.push(syl);
                        reconstructed += syl.toLowerCase();
                        syllableIndex++;
                        
                        if (reconstructed === part.toLowerCase()) {
                            break;
                        }
                    }
                    
                    syllablesInPart.forEach((syl, sylIdx) => {
                        const span = document.createElement('span');
                        span.className = 'syllable-piece';
                        span.textContent = syl;
                        span.dataset.index = syllableIndex - syllablesInPart.length + sylIdx;
                        labelElement.appendChild(span);
                    });
                    
                    if (partIdx < parts.length - 1) {
                        const dash = document.createElement('span');
                        dash.className = 'syllable-dash';
                        dash.textContent = '-';
                        labelElement.appendChild(dash);
                    }
                });
            } else {
                let syllablesInWord = [];
                let reconstructed = '';
                
                while (syllableIndex < syllables.length) {
                    const syl = syllables[syllableIndex];
                    syllablesInWord.push(syl);
                    reconstructed += syl.toLowerCase();
                    syllableIndex++;
                    
                    if (reconstructed === word.toLowerCase()) {
                        break;
                    }
                }
                
                syllablesInWord.forEach((syl, sylIdx) => {
                    const span = document.createElement('span');
                    span.className = 'syllable-piece';
                    span.textContent = syl;
                    span.dataset.index = syllableIndex - syllablesInWord.length + sylIdx;
                    labelElement.appendChild(span);
                });
            }
            
            if (wordIdx < words.length - 1) {
                const space = document.createElement('span');
                space.className = 'syllable-space';
                space.textContent = ' ';
                labelElement.appendChild(space);
            }
        });
    }

    function animateSyllablesProgressively(labelElement, syllables, audioPlayer) {
        if (!syllables || syllables.length === 0) return;
        
        labelElement.classList.add('playing');
        labelElement.style.pointerEvents = 'none';
        
        const timeouts = [];
        const syllableGap = 1000;
        
        syllables.forEach((syl, idx) => {
            const delay = idx * syllableGap;
            
            const timeoutId = setTimeout(() => {
                const spans = labelElement.querySelectorAll('.syllable-piece');
                const targetSpan = spans[idx];
                
                if (targetSpan) {
                    targetSpan.classList.add('syllable-piece-animate');
                    setTimeout(() => {
                        targetSpan.classList.remove('syllable-piece-animate');
                    }, 400);
                }
            }, delay);
            
            timeouts.push(timeoutId);
        });
        
        const cleanup = () => {
            timeouts.forEach(t => clearTimeout(t));
            labelElement.classList.remove('playing');
            labelElement.style.pointerEvents = '';
        };
        
        audioPlayer.addEventListener('ended', cleanup, { once: true });
        audioPlayer.addEventListener('pause', cleanup, { once: true });
    }

    startCamera().then(startRealtimePredict);

    window.addEventListener('beforeunload', function() {
        stopCamera();
    });

});
