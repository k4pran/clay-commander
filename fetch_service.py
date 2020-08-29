import json

import db
import deductive_service
import converter_service
import state

url_as_content_types = {
    'PNG',
    'JPG',
    'JPEG',
    'PDF'
}


def internal_fetch_any(location: str):
    result = db.fetch_any(location)
    if result:
        return result
    else:
        return external_fetch_any(location)


def external_fetch_any(location: str):
    if deductive_service.is_url(location):
        fetch_from_url(location)
    elif deductive_service.is_file(location):
        fetch_from_file(location)


def fetch_from_url(location: str, name=""):
    content_type, response = deductive_service.interpret_url_content_type(location)
    content = None
    if content_type in url_as_content_types:
        content = location
    elif content_type == 'application/json':
        return fetch_json(response.content)
    elif content_type == 'text/csv':
        return fetch_csv_from_bytes(response.content)
    elif content_type == 'image/svg+xml':
        content = response.content.decode("utf-8")
    elif content_type == 'text/html':
        content = response.content

    content_key = state.add_to_cache(content)
    return content, content_type, content_key


def fetch_json(json_content):
    if isinstance(json_content, bytes):
        json_content = json_content.decode("utf-8")
    json_content = state.ration_data(json_content)
    content_key = state.add_to_cache(json_content)
    return json.loads(json_content), 'application/json', content_key


def fetch_csv_from_bytes(csv_bytes: bytes, name=None):
    df = converter_service.csv_from_bytes(csv_bytes)

    content_key = state.add_to_cache(df)
    if not name:
        name = ""

    content = converter_service.pandas_to_mat_table(name, df)
    return content, 'text/csv', content_key


def fetch_from_file(location: str):
    pass


def internal_fetch_table(name: str):
    return db.fetch_table(name)


def internal_fetch_images(name: str):
    return db.fetch_images(name)


def internal_fetch_table_list():
    return db.querier.fetch_table_names()


def internal_fetch_image_list():
    return db.querier.fetch_image_names()