from io import BytesIO
import pandas as pd


def csv_from_bytes(content: bytes):
    return to_csv(BytesIO(content))


def to_csv(content, fillna='-'):
    df = pd.read_csv(content, encoding="latin1", engine='python', index_col=False)
    df = df.fillna(fillna)
    return df