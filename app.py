from flask import Flask, jsonify, request, Response

import fetch_service
import request_handler
import request_parser
from exceptions.import_exceptions import *

app = Flask(__name__)


@app.route('/request')
def handle_request():
    incoming_request = request.args.get("request")
    request_types = request_parser.parse_request(incoming_request)
    try:
        return request_handler.handle_request(incoming_request, request_types)
    except UnknownResourceException as e:
        return Response(str(e), status=404, mimetype='application/json')


@app.route('/display/table')
def fetch_table():
    return fetch_service.internal_fetch_table(request.args.get("request"))


@app.route('/display/images')
def fetch_images():
    images = fetch_service.internal_fetch_images(request.args.get("request"))
    return jsonify([{"original": image['image'],
                     "thumbnail": image['image'],
                     "originalTitle": image['title'],
                     "thumbnailTitle": image['title'],
                     "thumbnailLabel": image['title']} for image in images])


@app.route('/list/tables')
def list_tables():
    return jsonify(fetch_service.internal_fetch_table_list())


@app.route('/list/images')
def list_images():
    return jsonify(fetch_service.internal_fetch_image_list())


@app.route('/state/update')
def update_state():
    try:
        return request_handler.update_state(request.args.get('state'))
    except UnknownResourceException as e:
        return Response(str(e), status=404, mimetype='application/json')


@app.route('/state/gallery')
def get_gallery():
    try:
        return request_handler.fetch_gallery()
    except UnknownResourceException as e:
        return Response(str(e), status=404, mimetype='application/json')


if __name__ == "__main__":
    app.run()
