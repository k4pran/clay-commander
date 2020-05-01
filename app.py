from threading import Thread

from flask import Flask, jsonify, request
import mission_control
import communication as comms
from routes import command_component
import utils.importer as importer
import converter.data_table as date_table_converter

app = Flask(__name__)
app.register_blueprint(command_component)

b = Thread(name='background', target=comms.listen)
b.start()


@app.route('/command')
def command():
    mission_control.execute_command(request.args.get("message"))
    return jsonify("message sent")


@app.route('/display/table')
def get_file():
    filename = request.args.get("name")
    df = importer.import_csv_as_df("./storage/csvs/" + filename)
    return date_table_converter.from_data_frame(filename, df)


if __name__ == "__main__":
    app.run()
