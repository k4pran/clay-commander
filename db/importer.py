import os
import pandas as pd
import converter
import pickle
from .client import *


def import_csv(location, title=None, fillna='-') -> dict:
    df = pd.read_csv(location, encoding="latin1", engine='python', index_col=False)
    df = df.fillna(fillna)
    if not title:
        title = extract_title_from_path(location)
    formatted_tbl = converter.from_data_frame(title, df)

    tables_csv.insert_one({
        "location": location,
        "data": pickle.dumps(df)
    })

    to_import = {
        "name": title,
        "data": formatted_tbl
    }

    tables_formatted.insert_one(to_import)
    return to_import


def extract_title_from_path(path: str):
    return os.path.basename(path).split(".")[0]