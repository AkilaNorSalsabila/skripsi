from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
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
@app.route("/skor")
def skor():
    return render_template("skor.html")
@app.route("/puzzle_sulit1")
def puzzle_sulit1():
    return render_template("puzzle_sulit1.html")

if __name__ == "__main__":
    app.run(debug=True)
