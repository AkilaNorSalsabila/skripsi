from flask import Flask, request, jsonify, url_for, render_template, send_from_directory
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.efficientnet import preprocess_input
from PIL import Image
import os, uuid, json
import io


app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# === Load model ===
model = tf.keras.models.load_model('models/best_model_Effiiennetb0_C70finalfix2.keras')

# Warm-up (biar prediksi pertama tidak lambat)
dummy = np.zeros((1, 224, 224, 3), dtype=np.float32)
_ = model.predict(dummy)


# === Load label map ===
with open('models/label_map_Efficiennetb0_C70finalfix2.json', 'r') as f:
    label_map = json.load(f)
    labels = [label_map[str(i)] for i in range(len(label_map))]


# === Load manfaat sayur ===
with open(os.path.join('static', 'data', 'manfaat_sayuran.json'), 'r', encoding='utf-8') as f:
    manfaat = json.load(f)


# === Siapkan folder audio ===
os.makedirs('static/audio', exist_ok=True)

# === Fungsi klasifikasi gambar ===
def classify_image(img_pil, threshold=0.75):
    img = img_pil.resize((224, 224)).convert('RGB')
    img_array = img_to_array(img)
    img_array = preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)

    pred = model.predict(img_array)[0]

    # TOP-3 index
    top3_idx = np.argsort(pred)[-3:][::-1]

    top3 = [
        {
            "label": labels[i],
            "confidence": float(pred[i])
        }
        for i in top3_idx
    ]

    # TOP-1
    label = top3[0]["label"]
    confidence = top3[0]["confidence"]

    accepted = confidence >= threshold

    return label, confidence, accepted, top3





# === Halaman utama (lama) ===
@app.route('/')
def index():
    return render_template('home.html')


# === Endpoint klasifikasi gambar ===
# === Endpoint klasifikasi gambar ===
@app.route('/klasifikasi', methods=['POST'])
def klasifikasi():
    file = None

    if 'image' in request.files:
        file = request.files['image']
        img = Image.open(file.stream)
    else:
        if not request.data:
            return jsonify({'error': 'No image uploaded'}), 400
        img = Image.open(io.BytesIO(request.data))

    label, confidence, accepted, top3 = classify_image(img)


    # 🔥 WAJIB: ubah numpy.float32 → float Python
    confidence = float(confidence)

    print("\n[PREDIKSI TOP-3]")
    for i, p in enumerate(top3, 1):
        print(f"{i}. {p['label']} : {p['confidence']:.4f}")

    print(f"\n[TOP-1] {label} ({confidence:.4f})")



    if not accepted:
        print(f"[DITOLAK] Dikira '{label}', tapi confidence < 0.75")

        return jsonify({
            'predicted_class': label,
            'confidence': confidence,  # ✅ sudah float
            'status': 'rejected',
            'message': 'Confidence terlalu rendah'
        }), 200



    print(f"[DITERIMA] Label: {label}")



    if label is None:
        return jsonify({'error': f"Confidence {confidence:.2f} terlalu rendah untuk klasifikasi."}), 400

    if label not in manfaat:
        return jsonify({'error': f"Data tidak ditemukan untuk {label}"}), 500

    # 🔹 Ambil data dari JSON
    data = manfaat[label]

    nama_id = data['nama_id']
    nama_en = data['nama_en']
    id_text = data['id']
    en_text = data['en']

    # 🔹 Audio Indonesia (rekaman kamu)
    audio_nama_id = f"/static/sounds/id/sayuran/{nama_id}.m4a"

    # 🔹 Audio Inggris (file statis dari JSON)
    audio_nama_en = data.get("audio_en")

    # 🔹 Audio manfaat (kalau belum ada, kosongkan dulu)
    audio_manfaat_id = None
    audio_manfaat_en = None

    return jsonify({
        'class': label,
        'nama_id': nama_id,
        'nama_en': nama_en,
        'manfaat_id': id_text,
        'manfaat_en': en_text,
        'audio_nama_id': audio_nama_id,   # suara kamu
        'audio_nama_en': audio_nama_en    # mp3 statis Inggris
    })


# === Endpoint akses audio ===
@app.route('/static/audio/<path:filename>')
def serve_audio(filename):
    return send_from_directory('static/audio', filename)

# === Routing tambahan dari app.py baru (game) ===
@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/sayuran")
def sayuran():
    return render_template("sayuran.html")

@app.route("/permainan")
def permainan():
    return render_template("permainan.html")

@app.route("/pilih_level")
def pilih_level():
    return render_template("pilih_level.html")

@app.route("/level_mudah")
def level_mudah():
    return render_template("level_mudah.html")

@app.route("/mudah_notif")
def mudah_notif():
    return render_template("mudah_notif.html")

@app.route("/level_menengah")
def level_menengah():
    return render_template("level_menengah.html")

@app.route("/menengah_notif")
def menengah_notif():
    return render_template("menengah_notif.html")

@app.route("/skor")
def skor():
    return render_template("skor.html")

@app.route("/puzzle_sulit1")
def puzzle_sulit1():
    return render_template("puzzle_sulit1.html")

if __name__ == '__main__':
    app.run(debug=True)
