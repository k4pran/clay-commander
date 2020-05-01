import pandas as pd


def import_csv_as_df(path, fillna='-') -> pd.DataFrame:
    df = pd.read_csv(path)
    return df.fillna(fillna)
