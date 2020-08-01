import os


def extract_title_from_path(path: str):
    return os.path.basename(path).split(".")[0]