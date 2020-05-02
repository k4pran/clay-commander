import validators
import os


def interpret_request_type(request: str):
    if is_url(request):
        return "URL"
    elif is_file(request):
        return request


def is_file(request: str) -> bool:
    return os.path.exists(request) and os.path.isfile(request)


def is_url(request: str) -> bool:
    return validators.url(request)
