# ====== IMPORT ======
import os
import json
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from sklearn.metrics import confusion_matrix, classification_report
import pandas as pd
import shutil

# ====== Dataset Paths ======
dataset_path = r"D:\vegetable_app\vegetable_classifier\dataset_split"
train_dir = os.path.join(dataset_path, "train")
val_dir = os.path.join(dataset_path, "val")
test_dir = os.path.join(dataset_path, "test")

img_size = (224, 224)  
batch_size = 32

# ====== Augmentasi Data (VGG16 Style) ======
train_aug = ImageDataGenerator(
    preprocessing_function=preprocess_input,
    rotation_range=20,
    width_shift_range=0.1,
    height_shift_range=0.1,
    zoom_range=0.2,
    brightness_range=[0.8, 1.2],
    horizontal_flip=True,
    fill_mode='nearest'
)

val_test_aug = ImageDataGenerator(preprocessing_function=preprocess_input)

# ====== Load Dataset ======
train_data = train_aug.flow_from_directory(
    train_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical'
)

val_data = val_test_aug.flow_from_directory(
    val_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical'
)

test_data = val_test_aug.flow_from_directory(
    test_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=False
)

num_classes = len(train_data.class_indices)
class_labels = list(train_data.class_indices.keys())

# ====== VGG16 Model ======
vgg_base = VGG16(
    include_top=False,
    weights="imagenet",
    input_shape=(224, 224, 3)
)

# Fine-tuning: Freeze 10 layer pertama
for layer in vgg_base.layers[:-10]:
    layer.trainable = False

model = models.Sequential([
    vgg_base,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.001)),
    layers.Dropout(0.5),
    layers.Dense(num_classes, activation='softmax')
])

model.compile(
    optimizer=Adam(learning_rate=1e-5),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# ====== Folder & Callbacks ======
os.makedirs("models", exist_ok=True)
os.makedirs("vegetable_classifier/evaluation", exist_ok=True)

# Nama spesifik VGG
checkpoint = ModelCheckpoint("models/best_model_VGG16.keras", monitor='val_accuracy', save_best_only=True)
early_stopping = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=2, min_lr=1e-7, verbose=1)

# ====== Training ======
history = model.fit(
    train_data,
    validation_data=val_data,
    epochs=150, 
    callbacks=[checkpoint, early_stopping, reduce_lr]
)

# ====== Save Model & Label Map ======
model.save("models/final_model_VGG16.keras")
label_map = {str(v): k for k, v in train_data.class_indices.items()}
with open("models/label_map_VGG16.json", 'w') as f:
    json.dump(label_map, f)

# ====== Visualisasi Akurasi & Loss ======
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']

plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.plot(acc, label='Train Acc')
plt.plot(val_acc, label='Val Acc')
plt.title('Akurasi - VGG16')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(loss, label='Train Loss')
plt.plot(val_loss, label='Val Loss')
plt.title('Loss - VGG16')
plt.legend()
plt.savefig("vegetable_classifier/evaluation/grafik_akurasi_loss_VGG16.png")
plt.show()

# ====== Evaluasi Test Data ======
y_true = test_data.classes
pred_probs = model.predict(test_data, verbose=1)
y_pred = np.argmax(pred_probs, axis=1)

# Confusion Matrix
cm = confusion_matrix(y_true, y_pred)
plt.figure(figsize=(18, 14))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=class_labels, yticklabels=class_labels)
plt.title("Confusion Matrix - VGG16")
plt.xlabel("Predicted Label")
plt.ylabel("Actual Label")
plt.savefig("vegetable_classifier/evaluation/confusion_matrix_VGG16.png")

# Classification Report
report = classification_report(y_true, y_pred, target_names=class_labels)
with open("vegetable_classifier/evaluation/classification_report_VGG16.txt", "w") as f:
    f.write(report)

print("\nTraining VGG16 selesai! Cek folder models dan evaluation.")