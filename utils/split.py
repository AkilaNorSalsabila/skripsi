import os
import cv2
import random

# Path input & output
input_path = r"D:\vegetable_app\vegetable_classifier\dataset"
output_base = r"D:\vegetable_app\vegetable_classifier\dataset_split"

# Train, Val, Test ratio
# Train, Val, Test ratio
#split_ratio = (0.8, 0.1, 0.1)
split_ratio = (0.7, 0.15, 0.15)
size = (224, 224)

# Seed supaya hasil selalu sama
#random.seed(42)

# Buat folder output utama
os.makedirs(output_base, exist_ok=True)

# Loop tiap kelas (folder sayuran)
for cls in os.listdir(input_path):
    class_path = os.path.join(input_path, cls)
    if not os.path.isdir(class_path):
        continue

    # Ambil semua file gambar
    images = [f for f in os.listdir(class_path) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    random.shuffle(images)

    n_total = len(images)
    if n_total == 0:
        print(f"⚠️ Skip kelas {cls}, tidak ada gambar.")
        continue

    n_train = int(n_total * split_ratio[0])
    n_val = int(n_total * split_ratio[1])

    split_sets = {
        'train': images[:n_train],
        'val': images[n_train:n_train + n_val],
        'test': images[n_train + n_val:]
    }

    # Simpan ke masing-masing folder
    for split in ['train', 'val', 'test']:
        split_dir = os.path.join(output_base, split, cls)
        os.makedirs(split_dir, exist_ok=True)

        for fname in split_sets[split]:
            src = os.path.join(class_path, fname)

            img = cv2.imread(src)
            if img is not None:
                img_resized = cv2.resize(img, size)
                dst = os.path.join(split_dir, fname)
                cv2.imwrite(dst, img_resized)

    print(f"✅ {cls} dibagi: Total={n_total}, Train={len(split_sets['train'])}, "
          f"Val={len(split_sets['val'])}, Test={len(split_sets['test'])}")
