import pyttsx3

engine = pyttsx3.init()
engine.setProperty('rate', 150)   # kecepatan bicara
engine.setProperty('volume', 1.0) # volume 0-1

voices = engine.getProperty('voices')
# pilih voice yang terdengar muda/ceria
engine.setProperty('voice', voices[1].id)

# teks
text = "Silahkan pilih belajar atau bermain. Belajar mengenal sayuran, belajar mengenal hewan, dan permainan."
engine.save_to_file(text, r"D:\vegetable_app\static\sounds\instruction.mp3")
engine.runAndWait()
