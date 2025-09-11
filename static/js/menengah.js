// menengah.js (versi kubis dengan siluet)

let score = 0;

// Dataset
const sayuran = [
  { name: "kubis", img: "/static/img/cabbage.png", siluet: "/static/img/kubis_siluet.png" },
  { name: "paprika", img: "/static/img/paprika.png" },
  { name: "brokoli", img: "/static/img/broccoli.png" },
  { name: "tomat", img: "/static/img/tomat.png" },
  { name: "bawang", img: "/static/img/bawang.png" }
];

// Elemen
const siluetContainer = document.getElementById("siluet-container");
const pilihanContainer = document.getElementById("pilihan-container");
const progressText = document.getElementById("progress");

// Muat soal Kubis saja
function loadQuestionKubis() {
  progressText.textContent = "Soal 1/1";

  // Reset area
  siluetContainer.innerHTML = "";
  pilihanContainer.innerHTML = "";

  // Tambah siluet kubis
  let dropZone = document.createElement("div");
  dropZone.classList.add("siluet");
  dropZone.dataset.answer = "kubis";

  // Tambahkan gambar siluet ke dalam drop zone
  let siluetImg = document.createElement("img");
  siluetImg.src = sayuran[0].siluet;
  siluetImg.alt = "siluet kubis";
  siluetImg.classList.add("siluet-img");
  dropZone.appendChild(siluetImg);

  // Event drag & drop
  dropZone.addEventListener("dragover", e => {
    e.preventDefault();
    dropZone.style.transform = "scale(1.05)";
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.style.transform = "scale(1)";
  });

  dropZone.addEventListener("drop", e => {
    e.preventDefault();
    dropZone.style.transform = "scale(1)";
    const dragged = e.dataTransfer.getData("text");

    if (dragged === dropZone.dataset.answer) {
      dropZone.classList.add("correct");
      dropZone.classList.add("dropped");
      dropZone.innerHTML = `<img src="${sayuran.find(v => v.name === dragged).img}" 
                              alt="${dragged}" 
                              class="sayur-dropped">`;
      score += 20;
      setTimeout(() => alert("✅ Benar! Skor: " + score), 500);

    } else {
      dropZone.classList.add("shake");
      setTimeout(() => dropZone.classList.remove("shake"), 400);
    }
  });

  siluetContainer.appendChild(dropZone);

  // Pilihan random (harus ada kubis)
  let pilihan = [sayuran[0]]; // kubis
  let lainnya = sayuran.slice(1).sort(() => 0.5 - Math.random()).slice(0, 3);
  pilihan = pilihan.concat(lainnya).sort(() => 0.5 - Math.random());

  pilihan.forEach(veg => {
    let img = document.createElement("img");
    img.src = veg.img;
    img.alt = veg.name;
    img.classList.add("sayur");
    img.draggable = true;
    img.dataset.name = veg.name;

    img.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", img.dataset.name);
    });

    pilihanContainer.appendChild(img);
  });
}

// Jalankan
window.onload = () => {
  loadQuestionKubis();
};
