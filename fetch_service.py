import utils

import db
from exceptions.import_exceptions import *

table_types = {"CSV"}
image_types = {"PNG", "JPG", "JPEG", "SVG"}


def import_from(location: str):
    request_type = utils.interpret_request_type(location)
    if request_type == "URL":
        return import_from_url(location)
    else:
        raise UnknownResourceException("Fetch request '{}' is not a recognised format".format(location))


def import_from_url(url: str):
    content_type = utils.interpret_url_content_type(url)
    if content_type in table_types:
        return import_table(url, content_type)

    elif content_type in image_types:
        return import_image(url)


def import_table(location, content_type, name=None):
    if content_type == "CSV":
        return db.import_csv(location, name)


def import_image(location, name=None):
    return db.import_image(location, name)


def fetch_table(name: str):
    return db.fetch_table(name)


def fetch_images(name: str):
    return db.fetch_images(name)


def fetch_table_list():
    return db.querier.fetch_table_names()


def fetch_image_list():
    return db.querier.fetch_image_names()
