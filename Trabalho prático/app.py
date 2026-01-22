from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/clique", methods=["POST"])
def clique():
    data = request.json
    botao = data.get("botao")
    hora = data.get("hora")

    print(f"Clique recebido: {botao} às {hora}")

    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True)
