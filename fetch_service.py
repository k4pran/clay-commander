import db
import sherlock


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
    if sherlock.is_url(location):
        fetch_from_url(location)
    elif sherlock.is_file(location):
        fetch_from_file(location)


def fetch_from_url(location: str):
    content_type, response = sherlock.interpret_url_content_type(location)
    if content_type in url_as_content_types:
        return location
    elif content_type == 'JSON':
        return response.content.decode("utf-8")
    elif content_type == 'SVG':
        return response.content.decode("utf-8")
    elif content_type == 'application/octet-stream':
        pass # todo


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