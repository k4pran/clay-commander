import json

from flask import Response
from exceptions.response_format_exception import ResponseFormatException


def prepare_response(content, status, content_type):
    if isinstance(content, dict):
        content = json.dumps(content)
    if not isinstance(content, str):
        raise ResponseFormatException()
    response = Response(content, status=status, mimetype=content_type)
    return response
