import pickle

import communication as comms
from message import Request

SUBJECT_DELIM = "|"
ID_DELIM = "~"


HEALTH_HUB_TOPIC = "health"

available_topics = set()
available_topics.add(HEALTH_HUB_TOPIC)

current_topic = HEALTH_HUB_TOPIC


def switch_topic(topic):
    global current_topic
    if topic in available_topics:
        current_topic = topic


def execute_command(command):
    subject, command = separate_subject(command)
    command, identifier = separate_identifier(command)
    request = Request(subject, command.strip(), identifier)
    comms.send(bytes(subject, encoding='utf-8'), pickle.dumps(request))


def separate_subject(raw_message):
    if SUBJECT_DELIM in raw_message:
        message_parts = raw_message.split(SUBJECT_DELIM, 1)
        return message_parts[0], message_parts[1]
    else:
        return "", raw_message


def separate_identifier(raw_message):
    if ID_DELIM in raw_message:
        message_parts = raw_message.split(ID_DELIM, 1)
        return message_parts[0], message_parts[1]
    else:
        return raw_message, ""
