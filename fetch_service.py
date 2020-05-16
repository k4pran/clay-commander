import utils
import db
from exceptions.import_exceptions import *


def import_from(location: str):
    request_type = utils.interpret_request_type(location)
    if request_type == "URL":
        db.import_csv(location)
    else:
        raise UnknownResourceException("Fetch request '{}' is not a recognised format".format(location))


def fetch_table(name: str):
    return db.fetch_table(name)


def fetch_table_list():
    return db.querier.fetch_table_names()
