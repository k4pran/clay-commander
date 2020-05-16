from fuzzywuzzy import process

from exceptions.table_not_found_exception import TableNotFoundException
from .client import *


match_threshold = 0.6


def fetch_table(name: str):
    name, score = process.extractOne(name, fetch_table_names())
    if score > match_threshold:
        return tables_formatted.find_one({'name': name})['data']
    else:
        raise TableNotFoundException


def fetch_table_names():
    return [i['name'] for i in tables_formatted.find()]