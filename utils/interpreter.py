import validators
import os
from io import BytesIO
import requests
import pandas as pd


def interpret_request_type(request: str):
    if is_url(request):
        return "URL"
    elif is_file(request):
        return request


def interpret_url_content_type(url: str):
    response = requests.get(url)
    content_type = response.headers['content-type']

    if content_type == "image/jpeg":
        return "JPEG"

    elif content_type == "image/png":
        return "PNG"

    elif content_type == "application/pdf":
        return "PDF"

    elif content_type == "image/svg+xml":
        return "SVG"

    elif "text" in content_type:
        return interpret_content_type_by_bytes(response.content)


def interpret_content_type_by_bytes(content: bytes):
    if is_content_csv(content):
        return "CSV"


def is_content_csv(content: bytes):
    try:
        return isinstance(pd.read_csv(BytesIO(content)), pd.DataFrame) or \
               isinstance(pd.read_csv(BytesIO(content)), pd.Series)
    except:
        return False


def is_file(request: str) -> bool:
    return os.path.exists(request) and os.path.isfile(request)


def is_url(request: str) -> bool:
    return validators.url(request)
