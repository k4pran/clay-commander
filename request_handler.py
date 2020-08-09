import logging
import json

from flask import Response

import fetch_service
import persistence_service
import deductive_service
import request_parser
import state

LOG = logging.getLogger(__name__)


def handle_request(request, request_types: iter, name=None):
    LOG.info("Received request {}: [{}]", request, request_types)
    if 'FETCH' in request_types and 'PERSIST' in request_types:
        return fetch_for_keeps(request, name)
    elif 'FETCH' in request_types:
        return fetch(request)
    elif 'PERSIST' in request_types:
        return persist(request, name) # todo
    elif 'LIST' in request_types:
        return handle_listings(request)
    elif 'NEXT' in request_types:
        return handle_context()
    elif 'BACK' in request_types:
        return handle_context()
    else:
        LOG.error("request combination {} is not understood".format(request_types))


def fetch(request):
    request_parts = request_parser.parse_args(request)
    results = []
    for request_part in request_parts[1:]:
        if deductive_service.is_url(request_part):
            content, content_type = fetch_service.fetch_from_url(request_part)
            results.append({'content': json.dumps(content), 'content-type': content_type})
        elif deductive_service.is_file(request_part):
            results.append(fetch_service.fetch_from_file(request_part))
        else:
            LOG.error("request {} is not understood".format(request))
            return prepare_response("request {} is not understood".format(request), 400, "text/plain")
    return prepare_response(results[0]['content'], 200, results[0]['content-type']) # todo handle multiple


def persist(request, content_type, name):
    return persistence_service.persist(request, content_type, name)


def fetch_for_keeps(request, name=None):
    result = fetch(request)
    return persist(result, name)


def handle_listings(request):
    list_type = request_parser.parse_list_topic(request)
    list_content = None
    if list_type == 'TABLES':
        list_content = fetch_service.internal_fetch_table_list()
    elif list_type == 'IMAGES':
        list_content = fetch_service.internal_fetch_image_list()
    if list_content:
        return prepare_response(list_content, 200, 'text/plain')
    else:
        return prepare_response('Nothing to list', 204, 'text/plain')


def update_state(new_state: str):
    state_update_result = state.update_state(json.loads(new_state))
    return prepare_response(json.dumps(state_update_result), 200, 'application/json')


def handle_context():
    pass


def prepare_response(content, status, content_type):
    response = Response(content, status=status, mimetype=content_type)
    return response
