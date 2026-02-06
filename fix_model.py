import tensorflow as tf
import json

print("🔄 Loading model dari .keras...")
model = tf.keras.models.load_model('models/final_model_Efficiennetb0_C70finalfix2.keras')

print("💾 Saving weights...")
model.save_weights('models/model.weights.h5')  # ✅ Ganti nama

print("📝 Saving model config...")
with open('models/model_config.json', 'w') as f:
    json.dump(model.get_config(), f)

print("✅ SUKSES!")
print("📤 File yang perlu di-upload ke VPS:")
print("   - models/model.weights.h5")
print("   - models/model_config.json")