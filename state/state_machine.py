current_page = None
last_fetched = None


def update_state(new_state: dict):
    global current_page, last_fetched

    old_state = capture_state()
    if 'currentPage' in new_state:
        current_page = new_state['currentPage']

    if 'currentContentKey' in new_state:
        last_fetched = new_state['currentContentKey']
    new_state = capture_state()

    state_update_response = capture_state_transition(old_state, new_state)
    if old_state == new_state:
        state_update_response['result'] = 'UNCHANGED'
    else:
        state_update_response['result'] = 'UPDATED'

    return state_update_response


def capture_state_transition(old_state, new_state):
    return {
        'old_state': old_state,
        'new_state': new_state
    }


def capture_state():
    return {
        'currentPage': current_page,
        'lastFetched': last_fetched
    }
