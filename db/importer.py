import os
import pandas as pd
import converter
import pickle

from .client import *


def import_csv(location, name=None, fillna='-') -> dict:
    df = pd.read_csv(location, encoding="latin1", engine='python', index_col=False)
    df = df.fillna(fillna)
    if not name:
        name = extract_title_from_path(location)
    formatted_tbl = converter.from_data_frame(name, df)

    tables_csv.insert_one({
        "location": location,
        "data": pickle.dumps(df)
    })

    to_import = {
        "name": name,
        "data": formatted_tbl
    }

    tables_formatted.insert_one(to_import)
    return [i for i in tables_formatted.find({"name": name}, {"_id": 0})][0]


def import_image(location: str, name=None):
    if not name:
        name = extract_title_from_path(location)

    image_doc = {
        "name": name,
        "location": location,
        "data": {"image": location, "title": name}
    }

    table_images.insert_one(image_doc)
    return [i for i in table_images.find({"name": name}, {"_id": 0})][0]


def extract_title_from_path(path: str):
    return os.path.basename(path).split(".")[0]