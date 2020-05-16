import ssl
import pandas as pd


ssl._create_default_https_context = ssl._create_unverified_context


def import_csv_as_df(location, fillna='-') -> pd.DataFrame:
    df = pd.read_csv(location, encoding="latin1", engine='python', index_col=False)
    return df.fillna(fillna)
