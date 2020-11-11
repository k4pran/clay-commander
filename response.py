import json

from flask import Response
from exceptions.response_format_exception import ResponseFormatException


def prepare_content(location="", content=None, key=-1, origin="external"):
    return {
        'location': location,
        'content': content,
        'origin': origin,
        'key': key
    }


def prepare_response(content, status, content_type):
    if not content or not status or not content_type:
        print("ERROR: RESPONSE REQIORED CONTENT< STATUS AND CONTENT TYPE")  # todo
        return Response("Failed to parse response", status=500, mimetype="text/plain")

    if isinstance(content, dict):
        content = json.dumps(content)
    if not isinstance(content, str):
        raise ResponseFormatException()
    response = Response(content, status=status, mimetype=content_type)
    return response
