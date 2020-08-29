import json
import pandas as pd

cache = dict()


def add_to_cache(data):
    if isinstance(data, dict):
        data = json.dumps(data)
    elif isinstance(data, pd.DataFrame):
        data = json.dumps(data.to_dict())
    hash_key = hash(data)
    cache[hash_key] = data
    return hash_key
