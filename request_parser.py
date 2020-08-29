import logging
from commands import *

LOG = logging.getLogger(__name__)


def parse_request(request):
    if isinstance(request, str):
        return parse_request_str(request)
    else:
        LOG.error("Unable to handle unsupported request type: {}".format(request))


def parse_request_str(request):
    request_types = []
    if any([alias in request for alias in fetch_aliases]):
        request_types.append('FETCH')
    if any([alias in request for alias in persist_aliases]):
        request_types.append('PERSIST')
    if any([alias in request for alias in list_aliases]):
        request_types.append('LIST')
    if any([alias in request for alias in context_next_aliases]):
        request_types.append('NEXT')
    if any([alias in request for alias in context_back_aliases]):
        request_types.append('BACK')
    if any([alias in request for alias in navigation_aliases]):
        request_types.append('NAVIGATE')
    return request_types


def parse_list_topic(request: str):
    if 'table' in request.lower():
        return 'TABLES'
    elif 'image' in request.lower():
        return 'IMAGES'


def parse_args(request: str):
    return request.split()