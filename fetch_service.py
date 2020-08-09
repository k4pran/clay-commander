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
    if content_type in url_as_content_types:
        return location
    elif content_type == 'JSON':
        return state.ration_data(response.content.decode("utf-8")), 'application/json'
    elif content_type == 'CSV':
        df = converter_service.csv_from_bytes(response.content)
        return converter_service.pandas_to_mat_table(name, df), 'text/csv'
    elif content_type == 'SVG':
        return response.content.decode("utf-8"), 'image/svg+xml'
    elif content_type == 'HTML':
        return response.content, 'text/html'


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