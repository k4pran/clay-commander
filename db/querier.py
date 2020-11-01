from fuzzywuzzy import process

from .client import *


match_threshold = 0.6


def fetch_any(name: str):
    result = fetch_table(name)
    if result:
        return result

    result = fetch_images(name)
    if result:
        return result


def fetch_table(name: str):
    name, score = process.extractOne(name, fetch_table_names())
    if score > match_threshold:
        return tables_formatted.find_one({'name': name})['data']
    else:
        return None


def fetch_images(name: str):
    images = fetch_image_names()
    if not images:
        return []
    name, score = process.extractOne(name, fetch_image_names())
    if score > match_threshold:
        return [table_images.find_one({'name': name})['data']]
    else:
        return []


def fetch_table_names():
    return [i['name'] for i in tables_formatted.find()]


def fetch_image_names():
    return [i['name'] for i in table_images.find()]
