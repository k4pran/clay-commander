import utils
import converter.data_table as date_table_converter
import os


def fetch(request: str):
    request_type = utils.interpret_request_type(request)
    if request_type == "URL":
        title = os.path.basename(request).split(".")[0]
        return fetch_table(request, title)


def fetch_table(location: str, title=None):
    df = utils.importer.import_csv_as_df(location)
    if not title:
        title = location
    return date_table_converter.from_data_frame(title, df)