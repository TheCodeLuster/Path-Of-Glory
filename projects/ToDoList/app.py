from flask import Flask, render_template, url_for

app = Flask(__name__, template_folder='views')

@app.route("/")
def get_started():
    image_url = url_for('static', filename='bck.png')
    return render_template('getStarted.html', image_url=image_url)

@app.route("/signUp", methods=["GET", "POST"])
def signUp():
    return render_template("signUp.html")

@app.route("/signIn")
def signIn():
    return render_template("signIn.html")


if __name__ == "__main__":
    app.run(debug=True)


