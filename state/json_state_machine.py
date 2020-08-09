import pandas as pd

JSON_MAX = 1000
MAX_ROWS = 100

rationed_data = dict()


def ration_data(data):
    if len(data) <= JSON_MAX:
        return data

    hash_key = hash(data)

    if hash_key not in rationed_data:
        rationed_data[hash_key] = (pd.read_json(data), 0)

    data_frame, cursor_pos = rationed_data[hash(data)]

    increment_cursor(hash_key)
    return data_frame[cursor_pos: cursor_pos + MAX_ROWS].to_json()


def increment_cursor(hash_key):
    df, current_cursor = rationed_data[hash_key]
    rationed_data[hash_key] = (df, current_cursor + MAX_ROWS)