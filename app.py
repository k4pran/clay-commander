from threading import Thread

from flask import Flask, jsonify, request
import mission_control
import communication as comms
from routes import command_component
import fetch_service

app = Flask(__name__)
app.register_blueprint(command_component)

b = Thread(name='background', target=comms.listen)
b.start()


@app.route('/command')
def command():
    mission_control.execute_command(request.args.get("message"))
    return jsonify("message sent")

@app.route('/fetch')
def fetch_general():
    return fetch_service.fetch(request.args.get("request"))

@app.route('/fetch/table')
def fetch_table():
    return fetch_service.fetch_table(request.args.get("request"))


if __name__ == "__main__":
    app.run()
