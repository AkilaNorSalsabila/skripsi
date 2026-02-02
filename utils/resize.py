import os
import cv2

# Path input (dataset mentah sebelum resize)
input_path = r"D:\Dataset"

# Path output (masuk ke folder project)
output_path = r"D:\vegetable_app\vegetable_classifier\dataset"

# target size
size = (224, 224)

# bikin folder output kalau belum ada
if not os.path.exists(output_path):
    os.makedirs(output_path)

# looping setiap folder (nama sayuran)
for folder in os.listdir(input_path):
    folder_path = os.path.join(input_path, folder)
    if os.path.isdir(folder_path):
        save_path = os.path.join(output_path, folder)
        os.makedirs(save_path, exist_ok=True)

        for file in os.listdir(folder_path):
            if file.lower().endswith(('.jpg', '.png', '.jpeg')):
                img_path = os.path.join(folder_path, file)

                # Paksa baca sebagai 3 channel (BGR)
                img = cv2.imread(img_path, cv2.IMREAD_COLOR)

                if img is not None:
                    # Convert BGR → RGB
                    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

                    # Resize
                    img_resized = cv2.resize(img, size)

                    # Simpan
                    save_file = os.path.join(save_path, file)
                    cv2.imwrite(save_file, cv2.cvtColor(img_resized, cv2.COLOR_RGB2BGR))  
                    # convert balik ke BGR biar OpenCV bisa simpan normal

                    print(f"✅ Disimpan: {save_file}")
                else:
                    print(f"⚠️ Gagal membaca: {img_path}")
