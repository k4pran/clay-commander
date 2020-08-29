import os
import ssl

import requests
import validators
import pandas as pd

import converter_service
from exceptions.import_exceptions import UnknownResourceException

ssl._create_default_https_context = ssl._create_unverified_context

MAGIC_BYTES = {
    'gzip': b'\x1f\x8b'
}

mappable_content_types = {
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "image/svg+xml",
    "application/json",
    "text/csv",
    "text/html"
}


def interpret_content_type(content):
    if isinstance(content, str) and is_url(content):
        return interpret_url_content_type
    elif isinstance(content, bytes) or isinstance(content, bytearray):
        return interpret_content_type_by_bytes(content)
    else:
        raise UnknownResourceException("Fetch request '{}' is not a recognised format".format(content))


def interpret_url_content_type(url: str) -> (str, requests.Response):
    if not url.startswith("http://") and not url.startswith("https://"):
        url = "http://" + url
    response = requests.get(url)
    content_type = response.headers['content-type']
    content_type, _ = converter_service.split_charset_from_content_type(content_type)

    if "svg" in content_type:
        content_type = "image/svg+xml"

    elif content_type == "application/octet-stream":
        content_type = interpret_content_type_by_bytes(response.content)
    elif content_type not in mappable_content_types:
        pass # todo error
    return content_type, response


def interpret_content_type_by_bytes(content: bytes):
    if is_gzip(content):
        return "GZIP" # todo

    if is_content_csv(content):
        return "CSV" # todo


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
