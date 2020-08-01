import os
import ssl

import requests
import validators
import pandas as pd

from exceptions.import_exceptions import UnknownResourceException

ssl._create_default_https_context = ssl._create_unverified_context

MAGIC_BYTES = {
    'gzip': b'\x1f\x8b'
}


def interpret_content_type(content):
    if isinstance(content, str) and is_url(content):
        return interpret_url_content_type
    elif isinstance(content, bytes) or isinstance(content, bytearray):
        return interpret_content_type_by_bytes(content)
    else:
        raise UnknownResourceException("Fetch request '{}' is not a recognised format".format(content))


def interpret_url_content_type(url: str) -> (str, requests.Response):
    if not url.startswith("http://"):
        url = "http://" + url
    response = requests.get(url)
    content_type = response.headers['content-type']

    if "image/jpeg" in content_type:
        content_type = "JPEG"

    elif "image/jpg" in content_type:
        content_type = "JPG"

    elif "image/png" in content_type:
        content_type = "PNG"

    elif "application/pdf" in content_type:
        content_type = "PDF"

    elif "image/svg+xml" in content_type or 'svg' in content_type:
        content_type = "SVG"

    elif "application/json" in content_type:
        content_type = "JSON"

    elif "text" in content_type or content_type == "application/octet-stream":
        content_type = interpret_content_type_by_bytes(response.content)
    return content_type, response


def interpret_content_type_by_bytes(content: bytes):
    if is_gzip(content):
        return "GZIP"

    is_csv = is_content_csv(content)
    if is_csv:
        return "CSV"


def is_gzip(content: bytes):
    return content[0:2] == MAGIC_BYTES['gzip']


def is_content_csv(content: bytes):
    try:
        df = pd.read_csv(content, encoding="latin1", engine='python', index_col=False)
        return isinstance(df, pd.DataFrame) or isinstance(df, pd.Series)
    except Exception as e:
        return False


def is_file(location: str) -> bool:
    return os.path.exists(location) and os.path.isfile(location)


def is_url(location: str) -> bool:
    if not isinstance(location, str):
        return False
    return validators.url(location) or validators.url("http://" + location)
