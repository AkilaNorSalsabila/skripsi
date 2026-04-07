from flask import request, jsonify
import numpy as np
from PIL import Image
from model_loader import model, label_encoder, habitat_map, hewan_detail
from tensorflow.keras.applications.efficientnet import preprocess_input

def preprocess_image(image):
    image = image.resize((224, 224))
    img = np.array(image).astype(np.float32)
    img = preprocess_input(img)
    img = np.expand_dims(img, axis=0)
    return img

def predict_hewan_api():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"})

    file = request.files["image"]
    image = Image.open(file.stream).convert("RGB")

    img_array = preprocess_image(image)

    pred = model.predict(img_array, verbose=0)
    index = np.argmax(pred)
    confidence = round(float(np.max(pred) * 100), 2)
    if confidence < 70:
        return jsonify({
            "hewan": "Tidak dikenali",
            "name_in": "Tidak dikenali",
            "name_en": None,
            "habitat": "-",
            "habitat_spesifik": "-",
            "audio_id": None,
            "audio_in": None,
            "audio_en": None,
            "narasi_id": "Model tidak yakin dengan hasil prediksi. Coba lagi dengan gambar yang lebih jelas.",
            "confidence": confidence
        })

    nama_hewan = label_encoder.inverse_transform([index])[0]

    detail = hewan_detail.get(nama_hewan)

    if not detail:
        return jsonify({
            "hewan": nama_hewan,
            "name_in": nama_hewan,
            "name_en": None,
            "habitat": "Tidak diketahui",
            "habitat_spesifik": "Tidak diketahui",
            "audio_id": None,
            "audio_in": None,
            "audio_en": None,
            "narasi_id": "Tidak tersedia",
            "confidence": confidence
        })

    return jsonify({
        "hewan": detail["hewan"],
        "name_in": detail["hewan"],
        "name_en": detail.get("nama_en"),
        "habitat": detail["habitat"],
        "habitat_spesifik": detail["habitat_spesifik"],
        "audio_id": detail["audio_id"],
        "audio_in": detail["audio_id"],
        "audio_en": detail["audio_en"],
        "narasi_id": detail["narasi_id"],
        "confidence": confidence
    })
