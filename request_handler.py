import json
import logging

import fetch_service
import persistence_service
import deductive_service
import request_parser
import state
from response import prepare_response

LOG = logging.getLogger(__name__)


def handle_request(request, request_types: iter, name=None):
    LOG.info("Received request {}: [{}]", request, request_types)
    if 'FETCH' in request_types and 'PERSIST' in request_types:
        return fetch_for_keeps(request, name)
    elif 'FETCH' in request_types:
        return fetch(request)
    elif 'PERSIST' in request_types:
        return persist(request, content_type="", name="")  # todo
    elif 'LIST' in request_types:
        return handle_listings(request)
    elif 'NEXT' in request_types:
        return handle_context()
    elif 'BACK' in request_types:
        return handle_context()
    elif 'NAVIGATE' in request_types:
        return handle_navigation(request)
    elif not request_types:
        error_message = "request not currently supported"
        LOG.error(error_message)
        return prepare_response(json.dumps({'reason': error_message}), 400, 'application/json')
    else:
        error_message = "request combination {} is not understood".format(request_types)
        LOG.error(error_message)
        return prepare_response(json.dumps({'reason': error_message}), 400, 'application/json')


def fetch(request):
    request_parts = request_parser.parse_args(request)
    results = []
    for request_part in request_parts[1:]:
        if deductive_service.is_url(request_part):
            content, content_type, content_key = fetch_service.fetch_from_url(request_part)
            results.append({
                'content': content,
                'content-type': content_type,
                'content-key': content_key
            })
        elif deductive_service.is_file(request_part):
            results.append(fetch_service.fetch_from_file(request_part))
        else:
            LOG.error("request {} is not understood".format(request))
            return prepare_response("request {} is not understood".format(request), 400, "text/plain")
    return prepare_response(json.dumps(results[0]), 200, results[0]['content-type'])  # todo handle multiple


def persist(request, content_type, name):
    return persistence_service.persist(request, content_type, name)


def fetch_for_keeps(request, name=None):
    result = fetch(request)
    return persist(result, content_type="", name="") # todo


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
    return prepare_response(state_update_result, 200, 'application/json')


def fetch_gallery():
    gallery = state.get_current_gallery()
    return prepare_response(
        {'content':
            {
                'state': gallery
            },
            'content-key': 18273847}  # todo
        , 200, 'image/*')


def handle_context():
    pass


def handle_navigation(request):
    request = request.split(' ')[-1]
    if deductive_service.is_url(request):
        content_key = state.add_to_cache(request)
        return prepare_response(
            {
                'content': {
                    'location': request,
                    'type': 'external',
                },
                'content-key': content_key
            }
            , 200, 'text/uri-list')
    else:
        content_key = state.add_to_cache(request)
        return prepare_response(
            {
                'content': {
                    'location': request,
                    'type': 'internal',
                },
                'content-key': content_key

            }
            , 200, 'text/uri-list')


def handle_add_image():
    pass


def handle_remove_image():
    pass
