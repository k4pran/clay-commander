from threading import Thread

from flask import Flask, abort, jsonify, request, Response
import mission_control
import communication as comms
from routes import command_component
import fetch_service
from exceptions.import_exceptions import *

app = Flask(__name__)
app.register_blueprint(command_component)

b = Thread(name='background', target=comms.listen)
b.start()


@app.route('/command')
def command():
    mission_control.execute_command(request.args.get("message"))
    return jsonify("message sent")


@app.route('/fetch')
def import_data():
    try:
        return fetch_service.import_from(request.args.get("request"))
    except UnknownResourceException as e:
        return Response(str(e), status=404, mimetype='application/json')


@app.route('/display/table')
def fetch_table():
    return fetch_service.fetch_table(request.args.get("request"))


@app.route('/list/tables')
def list_tables():
    return jsonify(fetch_service.fetch_table_list())


if __name__ == "__main__":
    app.run()
