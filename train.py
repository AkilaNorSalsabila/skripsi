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
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.metrics import confusion_matrix, classification_report
from tensorflow.keras.callbacks import ReduceLROnPlateau
import pandas as pd
import shutil


#from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input

# from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
# from tensorflow.keras.applications.efficientnet import EfficientNetB0, preprocess_input
# from tensorflow.keras.applications.efficientnet import EfficientNetB3, preprocess_input

# from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
# from tensorflow.keras.applications.densenet import DenseNet121, preprocess_input
# from tensorflow.keras.applications.xception import Xception, preprocess_input
# from tensorflow.keras.applications.inception_v3 import InceptionV3, preprocess_input

from tensorflow.keras.utils import get_file
from tensorflow.keras.applications.efficientnet import EfficientNetB0, preprocess_input as efficientnet_preprocess



# ====== Dataset Paths ======
dataset_path = r"D:\vegetable_app\vegetable_classifier\dataset_split"
train_dir = os.path.join(dataset_path, "train")
val_dir = os.path.join(dataset_path, "val")
test_dir = os.path.join(dataset_path, "test")

img_size = (224, 224)  
batch_size = 32

# ====== Augmentasi Data ======
#train_aug = ImageDataGenerator(
#    preprocessing_function=preprocess_input,
#    rotation_range=15,
#    width_shift_range=0.1,
#    height_shift_range=0.1,
#    shear_range=0.1,
#   zoom_range=0.2,
#    brightness_range=[0.7, 1.3],
#    channel_shift_range=20,
#    horizontal_flip=True,
#    fill_mode="nearest"
#)
#val_aug = ImageDataGenerator(preprocessing_function=preprocess_input)
#test_aug = ImageDataGenerator(preprocessing_function=preprocess_input)

# ====== Load Dataset ======
#train_data = train_aug.flow_from_directory(
#    train_dir,
#    target_size=img_size,
#    batch_size=batch_size,
#    class_mode='categorical',
#    color_mode='rgb'
#)

#val_data = val_aug.flow_from_directory(
#    val_dir,
#    target_size=img_size,
#    batch_size=batch_size,
#    class_mode='categorical',
#    color_mode='rgb'
#)

#test_data = test_aug.flow_from_directory(
#    test_dir,
#    target_size=img_size,
#    batch_size=32,
#   class_mode='categorical',
#    shuffle=False,
#    color_mode='rgb'
#)

#num_classes = len(train_data.class_indices)
#class_labels = list(train_data.class_indices.keys())

# ====== EfficientNetB0 (dinonaktifkan) ======
# efficientnet = EfficientNetB0(
#     include_top=False,
#     weights="imagenet",
#     input_shape=(224,224,3)
# )
# for layer in efficientnet.layers[:-10]:
#     layer.trainable = False
# model = models.Sequential([
#     efficientnet,
#     layers.GlobalAveragePooling2D(),
#     layers.Dense(128, activation='relu'),
#     layers.Dropout(0.5),
#     layers.Dense(num_classes, activation='softmax')
# ])
# model.compile(
#     optimizer=Adam(learning_rate=0.00001),
#     loss='categorical_crossentropy',
#     metrics=['accuracy']
# )
# checkpoint = ModelCheckpoint("models/best_model_efficientnetb0.keras", monitor='val_accuracy', save_best_only=True)


# ====== ResNet50 (dinonaktifkan) ======
# ====== ResNet50 (AKTIF) ======
# ====== ResNet50 (AKTIF) ======
#resnet = ResNet50(
#    input_shape=(224, 224, 3),
#    include_top=False,
#    weights='imagenet'
#)

#for layer in resnet.layers[:-10]:
#    layer.trainable = False

#model = models.Sequential([
#    resnet,
#    layers.GlobalAveragePooling2D(),
#    layers.Dense(128, activation='relu'),
#    layers.Dropout(0.5),
#    layers.Dense(num_classes, activation='softmax')
#])

#model.compile(
#    optimizer=Adam(learning_rate=1e-5),
#    loss='categorical_crossentropy',
#    metrics=['accuracy']
#)


#checkpoint = ModelCheckpoint("models/best_model_resnet2.keras", monitor='val_accuracy', save_best_only=True)


# ====== MobileNetV2 (aktif) ======
#mobilenet = MobileNetV2(
#    input_shape=(224, 224, 3),
#    include_top=False,
#    weights='imagenet'
#)

#for layer in mobilenet.layers[:-10]:
#    layer.trainable = False

#model = models.Sequential([
#    mobilenet,
#    layers.GlobalAveragePooling2D(),
#    layers.Dense(128, activation='relu'),
#    layers.Dropout(0.5),
#    layers.Dense(num_classes, activation='softmax')
#])

#model.compile(
#    optimizer=Adam(learning_rate=0.00001),
#    loss='categorical_crossentropy',
#    metrics=['accuracy']
#)
#checkpoint = ModelCheckpoint("models/best_model_mobilenetv2_part2.keras", monitor='val_accuracy', save_best_only=True)

# ====== EfficientNetB3 (aktif) ======
#efficientnet = EfficientNetB3(
#    include_top=False,
#    weights="imagenet",
#    input_shape=(224, 224, 3)
#)

#for layer in efficientnet.layers[:-10]: 
#    layer.trainable = False

#model = models.Sequential([
#    efficientnet,
#    layers.GlobalAveragePooling2D(),
#    layers.Dense(128, activation='relu'),  # lebih besar karena B3
#    layers.Dropout(0.5),
#    layers.Dense(num_classes, activation='softmax')
#])

#model.compile(
#    optimizer=Adam(learning_rate=0.00001),
#    loss='categorical_crossentropy',
#    metrics=['accuracy']
#)



# ====== Callbacks ======
#checkpoint = ModelCheckpoint("models/best_model_efficientnetb3.keras", monitor='val_accuracy', save_best_only=True)

# =====================================================
# ====== VGG16 (AKTIF untuk perbandingan) ======
# =====================================================
#vgg = VGG16(
#    include_top=False,
#    weights="imagenet",
#    input_shape=(224, 224, 3)
#)

# Freeze sebagian besar layer biar sama seperti model lain
#for layer in vgg.layers[:-10]:
#    layer.trainable = False

#model = models.Sequential([
#    vgg,
#    layers.GlobalAveragePooling2D(),
#    layers.Dense(128, activation='relu'),
#    layers.Dropout(0.5),
#    layers.Dense(num_classes, activation='softmax')
#])

#model.compile(
#    optimizer=Adam(learning_rate=0.00001),
#    loss='categorical_crossentropy',
#    metrics=['accuracy']
#)



# ====== Callbacks ======
#checkpoint = ModelCheckpoint("models/best_model_vgg16.keras", monitor='val_accuracy', save_best_only=True)


# ====== DenseNet121 (AKTIF) ======
#densenet = DenseNet121(
#    include_top=False,
#    weights="imagenet",
#    input_shape=(224, 224, 3)
#)
       
# Freeze sebagian besar layer biar setara dengan model lain
#for layer in densenet.layers[:-10]:
#    layer.trainable = False

#model = models.Sequential([
#    densenet,
#    layers.GlobalAveragePooling2D(),
#    layers.Dense(128, activation='relu'),
#    layers.Dropout(0.5),
#    layers.Dense(num_classes, activation='softmax')
#])

#model.compile(
#    optimizer=Adam(learning_rate=0.00001),
#    loss='categorical_crossentropy',
#    metrics=['accuracy']
#)


# ====== Callbacks ======
#checkpoint = ModelCheckpoint("models/best_model_densenet121.keras", monitor='val_accuracy', save_best_only=True)
# ====== Xception (AKTIF) ======

#xception = Xception(
#    include_top=False,
#    weights="imagenet",
#    input_shape=(224, 224, 3)
#)

# Freeze sebagian besar layer biar setara dengan model lain
#for layer in xception.layers[:-10]:
#    layer.trainable = False

#model = models.Sequential([
#    xception,
#    layers.GlobalAveragePooling2D(),
#    layers.Dense(128, activation='relu'),
#    layers.Dropout(0.5),
#    layers.Dense(num_classes, activation='softmax')
#])

#model.compile(
#    optimizer=Adam(learning_rate=0.00001),
#    loss='categorical_crossentropy',
#    metrics=['accuracy']
#)

# ====== Folder Output ======
#os.makedirs("models", exist_ok=True)
#os.makedirs("vegetable_classifier/evaluation", exist_ok=True)

# ====== Callbacks ======
#checkpoint = ModelCheckpoint("models/best_model_xception.keras", monitor='val_accuracy', save_best_only=True)




# ====== InceptionV3 (AKTIF) ======

#inception = InceptionV3(
#    include_top=False,
#    weights="imagenet",
#    input_shape=(224, 224, 3)
#)

# Freeze sebagian besar layer biar setara dengan model lain
#for layer in inception.layers[:-10]:
#    layer.trainable = False

#model = models.Sequential([
#    inception,
#    layers.GlobalAveragePooling2D(),
#    layers.Dense(128, activation='relu'),
#    layers.Dropout(0.5),
#    layers.Dense(num_classes, activation='softmax')
#])

#model.compile(
#    optimizer=Adam(learning_rate=0.00001),
#    loss='categorical_crossentropy',
#    metrics=['accuracy']
#)



# ====== Augmentasi Efisien untuk EfficientNet ======
#train_aug_efficientnet = ImageDataGenerator(
#    preprocessing_function=efficientnet_preprocess,
#    rotation_range=10,
#    width_shift_range=0.08,
#    height_shift_range=0.08,
#    zoom_range=0.15,
#    horizontal_flip=True,
#    brightness_range=[0.85, 1.15],
#    fill_mode='nearest'
#)

train_aug_efficientnet = ImageDataGenerator(
    preprocessing_function=efficientnet_preprocess,
    rotation_range=20,
    width_shift_range=0.1,
    height_shift_range=0.1,
    zoom_range=0.2,
    brightness_range=[0.8, 1.2],
    channel_shift_range=15,
    horizontal_flip=True,
    fill_mode='nearest'
)


#train_aug_efficientnet = ImageDataGenerator(
#    preprocessing_function=efficientnet_preprocess,
#    rotation_range=18,
#    width_shift_range=0.12,
#    height_shift_range=0.12,
#    zoom_range=0.18,
#    brightness_range=[0.85, 1.15],
#    channel_shift_range=10,
#    horizontal_flip=True,
#    fill_mode='nearest'
#)


val_aug_efficientnet = ImageDataGenerator(
    preprocessing_function=efficientnet_preprocess
)

test_aug_efficientnet = ImageDataGenerator(
    preprocessing_function=efficientnet_preprocess
)

# ====== Load Dataset (EfficientNet Version) ======
train_data = train_aug_efficientnet.flow_from_directory(
    train_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    color_mode='rgb'
)

val_data = val_aug_efficientnet.flow_from_directory(
    val_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    color_mode='rgb'
)

test_data = test_aug_efficientnet.flow_from_directory(
    test_dir,
    target_size=img_size,   # ✔ benar
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=False,
    color_mode='rgb'
)

num_classes = len(train_data.class_indices)
class_labels = list(train_data.class_indices.keys())

# ====== EfficientNetB0 Optimal ======
efficientnet = EfficientNetB0(
    include_top=False,
    weights="imagenet",
    input_shape=(224, 224, 3)
)


for layer in efficientnet.layers[:-40]: 
    layer.trainable = False

model = models.Sequential([
    efficientnet,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.001)),
    layers.Dropout(0.5),
    layers.Dense(num_classes, activation='softmax')
])
 
model.compile(
    optimizer = Adam(learning_rate=5e-5),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)
model.build((None, 224, 224, 3))
model.summary()


#loss = tf.keras.losses.CategoricalCrossentropy(label_smoothing=0.03)

#model.compile(
#    optimizer=Adam(learning_rate=1e-5),
#    loss=loss,
#    metrics=['accuracy']
#)


#from tensorflow.keras.optimizers import RMSprop

#model.compile(
#    optimizer=RMSprop(learning_rate=1e-5, momentum=0.9),
#    loss='categorical_crossentropy',
#    metrics=['accuracy']
#)



# ====== Folder Output ======
os.makedirs("models", exist_ok=True)
os.makedirs("vegetable_classifier/evaluation", exist_ok=True)

# ====== Callbacks ======
checkpoint = ModelCheckpoint("models/best_model_Effiiennetb0_C70finalfix3.keras", monitor='val_accuracy', save_best_only=True)
early_stopping = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
reduce_lr = ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.5,      # turunkan LR jadi 50% jika stagnan
    patience=2,      # tunggu 2 epoch tanpa perbaikan
    min_lr=1e-6,     # batas minimum LR
    verbose=1
)

# ====== Training ======
history = model.fit(
    train_data,
    validation_data=val_data,
    epochs=150,
    callbacks=[checkpoint, early_stopping, reduce_lr]
)

# ====== Save Model ======
model.save("models/final_model_Efficiennetb0_C70finalfix3.keras")

label_map = {str(v): k for k, v in train_data.class_indices.items()}
with open("models/label_map_Efficiennetb0_C70finalfix3.json", 'w') as f:
    json.dump(label_map, f)

# ====== Grafik Akurasi & Loss ======
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
loss = history.history['loss']
val_loss = history.history['val_loss']

plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
plt.plot(acc, label='Train Acc')
plt.plot(val_acc, label='Val Acc')
plt.title('Akurasi')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(loss, label='Train Loss')
plt.plot(val_loss, label='Val Loss')
plt.title('Loss')
plt.legend()
plt.savefig("vegetable_classifier/evaluation/grafik_akurasi_loss_Efficiennetb0_C70finalfix3.png")



# ====== Evaluasi ======
y_true = test_data.classes
pred_probs = model.predict(test_data, verbose=1)
y_pred = np.argmax(pred_probs, axis=1)


# ====== Analisis Salah Prediksi ======
filepaths = test_data.filepaths
class_names = list(test_data.class_indices.keys())

misclassified = []

for i in range(len(y_true)):
    if y_true[i] != y_pred[i]:
        confidence = float(np.max(pred_probs[i]))   # ✔ ambil dari hasil prediksi
        misclassified.append([
            filepaths[i],
            class_names[y_true[i]],
            class_names[y_pred[i]],
            confidence
        ])


# ====== Simpan ke CSV ======
import pandas as pd
df = pd.DataFrame(
    misclassified,
    columns=["Image Path", "Actual Label", "Predicted Label", "Confidence"]

)

df.to_csv(
    "vegetable_classifier/evaluation/misclassified_images_Efficiennetb0_C70finalfix3.csv",
    index=False
)

# ====== Simpan contoh gambar yang salah ======
import shutil
sample_dir = "vegetable_classifier/evaluation/misclassified_samples_C70finalfix3"
os.makedirs(sample_dir, exist_ok=True)

for path, actual, pred, conf in misclassified[:30]:
    fname = os.path.basename(path)
    new_name = f"{actual}_pred_{pred}_{fname}"
    shutil.copy(path, os.path.join(sample_dir, new_name))



cm = confusion_matrix(y_true, y_pred)
plt.figure(figsize=(18, 14))
sns.heatmap(
    cm,
    annot=True,
    fmt='d',
    cmap='Blues',
    xticklabels=class_labels,
    yticklabels=class_labels
)

plt.xlabel("Predicted Label", fontsize=14, labelpad=15)
plt.ylabel("Actual Label", fontsize=14, labelpad=15)
plt.title("Confusion Matrix (Test Data)", fontsize=16)

plt.xticks(rotation=90)
plt.yticks(rotation=0)

plt.tight_layout()
plt.savefig(
    "vegetable_classifier/evaluation/confusion_matrix_Efficiennetb0_C70finalfix3.png",
    dpi=300,
    bbox_inches='tight'
)
plt.close()


report = classification_report(y_true, y_pred, target_names=class_labels, zero_division=0)
with open("vegetable_classifier/evaluation/classification_report_Efficiennetb0_C70finalfix3.txt", "w") as f:
    f.write(report)

# ====== Confusion Matrix Full Dataset ======
full_data_aug = ImageDataGenerator(preprocessing_function=efficientnet_preprocess)
#full_data_aug = ImageDataGenerator(preprocessing_function=preprocess_input)

full_data = full_data_aug.flow_from_directory(
    r"D:\vegetable_app\vegetable_classifier\dataset",
    target_size=img_size,
    batch_size=32,
    class_mode='categorical',
    shuffle=False,
    color_mode='rgb'
)

y_true_full = full_data.classes
y_pred_full = np.argmax(model.predict(full_data, verbose=1), axis=1)

cm_full = confusion_matrix(y_true_full, y_pred_full)
plt.figure(figsize=(18, 14))
sns.heatmap(
    cm_full,
    annot=True,
    fmt='d',
    cmap='Oranges',
    xticklabels=class_labels,
    yticklabels=class_labels
)

plt.xlabel("Predicted Label", fontsize=14, labelpad=15)
plt.ylabel("Actual Label", fontsize=14, labelpad=15)
plt.title("Confusion Matrix (Full Dataset)", fontsize=16)

plt.xticks(rotation=90)
plt.yticks(rotation=0)

plt.tight_layout()
plt.savefig(
    "vegetable_classifier/evaluation/confusion_matrix_full_Efficiennetb0_C70finalfix3.png",
    dpi=300,
    bbox_inches='tight'
)
plt.close()


final_val_acc = val_acc[-1] * 100
print(f"\nAkurasi Validasi Terakhir (Efficiennetb0_C70finalfix3): {final_val_acc:.2f}%")
print("Training & evaluasi selesai.")