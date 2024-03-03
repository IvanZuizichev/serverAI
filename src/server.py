import io
import os
import shutil
import string
from os import path as p

from flask import Flask, render_template, send_file, request as rq, jsonify, make_response, abort
from flask_socketio import SocketIO

from .manager import Manager
from .utils import blur, log

app = Flask(__name__)
socketio = SocketIO(app)
HOST = "192.168.114.7"
PORT = 1100
manager = Manager(app, socketio)
with open(p.join(app.root_path, 'banwords.txt'), 'r', encoding='utf-8') as f:
    ban_words = list(map(lambda x: x.strip(), f.readlines()))
log.patch()
blur.blur(app)


@app.route('/')
def index():
    # return render_template('index.html')
    return gallery()


@app.route('/check')
def check():
    r = manager.check()
    return jsonify(r)


@app.route('/ready/<_>')
def ready(_):
    d = next(iter(os.listdir(p.join(app.root_path, "temp"))), '')
    dn = next(iter(os.listdir(p.join(app.root_path, "temp", d))), '')
    if p.isfile(p.join(app.root_path, "temp", d, dn)):
        with open(p.join(app.root_path, "temp", d, dn), 'rb') as fl:
            file = io.BytesIO(fl.read())
        os.makedirs(p.join(app.root_path, "old", d), exist_ok=True)
        shutil.copy(p.join(app.root_path, "temp", d, dn), p.join(app.root_path, "old", d, dn))
        shutil.rmtree(p.join(app.root_path, "temp", d))
        return send_file(file, mimetype='image/jpeg')
    return "NO FILE"


@app.route("/info")
def info():
    return render_template("info.html")


@app.route("/request")
def request():
    return render_template("request.html")


@app.route("/result", methods=["POST"])
def result():
    text, scale = rq.form.get("text").replace("\n", '').replace("\r", '').replace("\t", '').strip(), float(
        rq.form.get("scale"))
    rep()
    r = manager.create_task(text, scale)
    if r is False:
        return render_template("overload.html")
    return render_template("result.html", text=text)


@app.route("/qwe")
def q():
    return render_template("overload.html")


@app.route("/bw_check", methods=["POST"])
def bw_check():
    text = rq.form.get("text")
    if text == '':
        return "EMPTY"
    text = text.lower()
    text = [text := text.replace(e, "") for e in string.punctuation][-1]
    print(text)
    if any(map(lambda x: x in text.split(), ban_words)) or text == 'Запрос содержит запрещённые слова':
        return "BANWORD"
    return "OK"


@app.route("/gallery")
def gallery():
    return render_template("gallery.html")


@app.after_request
def origin(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response


@app.route("/tmp_img/<_>")
def temp_image(_):
    image = manager.get_image()
    if image is None:
        return make_response(404, "error")
    image.save(p.join(app.root_path, "temp", "tmp"), format='JPEG')
    with open(p.join(app.root_path, "temp", "tmp"), "rb") as fl:
        file = io.BytesIO(fl.read())
    os.remove(p.join(app.root_path, "temp", "tmp"))
    return send_file(file, mimetype='image/jpeg')


@app.route("/t")
def t():
    return render_template("result.html", text="123")


@app.route("/get_progress")
def get_progress():
    return jsonify({"progress": manager.get_progress()})


@app.route("/rep")
def repair():
    if 'qwer444' not in rq.args:
        abort(404)
    rep()
    return 'OK'


def rep():
    for elem in os.listdir(p.join(app.root_path, "temp")):
        if p.isfile(p.join(app.root_path, "temp", elem)):
            os.remove(p.join(app.root_path, "temp", elem))
        else:
            shutil.rmtree(p.join(app.root_path, "temp", elem))
    manager.tasks.clear()


@app.route("/creators")
def creators():
    return render_template("creators.html")


@app.route("/examples")
def examples():
    return render_template("examples.html")


def run():
    socketio.run(app, host=HOST, port=PORT, log_output=False)
