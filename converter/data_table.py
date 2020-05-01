import pandas as pd
import numpy as np


def from_data_frame(title, df: pd.DataFrame):
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


if __name__ == "__main__":
    df = pd.read_csv("../storage/csvs/health_effects.csv", na_values='-')