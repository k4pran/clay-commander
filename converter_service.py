from io import BytesIO
import pandas as pd
import numpy as np


def csv_from_bytes(content: bytes):
    return to_csv(BytesIO(content))


def to_csv(content, fillna='-'):
    df = pd.read_csv(content, encoding="latin1", engine='python', index_col=False)
    df = df.fillna(fillna)
    return df


def pandas_to_mat_table(title, df: pd.DataFrame):
    type_mappings = create_col_type_to_prim_mapping(df)
    column_titles = [i for i in df.columns]
    columns = []
    for column_title in column_titles:
        columns.append({
            'title': str(column_title).capitalize(),
            'field': str(column_title),
            'type': determine_data_type(df[column_title].dtype)
        })

    data = [to_jsonifiable(df.loc[i, :].to_dict(), type_mappings) for i in range(len(df.index))]
    return {
        'columns': columns,
        'data': data,
        'title': title
    }


def create_col_type_to_prim_mapping(df: pd.DataFrame):
    mapping = {}
    for column in df.columns:
        if df[column].dtype == 'int64':
            mapping[column] = int
    return mapping


def to_jsonifiable(row: dict, column_map: dict):
    for column_name, value in row.items():
        if column_name in column_map.keys():
            row[column_name] = column_map[column_name](value)
    return row


def determine_data_type(date_type: np.dtype):
    if date_type in ["float64", "float32", "float", "int"]:
        return "numeric"
    else:
        return "string"


def split_charset_from_content_type(content_type: str):
    if ';' in content_type:
        return tuple(content_type.split(';'))
    else:
        # default to utf-8
        return content_type, "utf-8"


