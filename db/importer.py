import converter
import pickle

from .client import *


def import_csv(df, name) -> dict:
    formatted_tbl = converter.from_data_frame(name, df)

    tables_csv.insert_one({
        "name": name,
        "data": pickle.dumps(df)
    })

    to_import = {
        "name": name,
        "data": formatted_tbl
    }

    tables_formatted.insert_one(to_import)
    return [i for i in tables_formatted.find({"name": name}, {"_id": 0})][0]


def import_image(location: str, name):
    image_doc = {
        "name": name,
        "location": location,
        "data": {"image": location, "title": name}
    }

    table_images.insert_one(image_doc)
    return [i for i in table_images.find({"name": name}, {"_id": 0})][0]


def import_text(content: str, name):
    text_doc = {
        "name": name,
        "content": content,
        "data": {"text": content, "title": name}
    }

    table_text.insert_one(text_doc)
    return [i for i in table_text.find({"name": name}, {"_id": 0})][0]