import tensorflow as tf

import pickle
import json
from tensorflow.keras.applications.efficientnet import preprocess_input

model = tf.keras.models.load_model("models/best_model.keras")

with open("models/le_hewan.pkl", "rb") as f:
    label_encoder = pickle.load(f)

with open("models/hewan_to_habitat.json") as f:
    habitat_map = json.load(f)

with open("models/hewan_detail.json", "r", encoding="utf-8") as f:
    hewan_detail = json.load(f)
    