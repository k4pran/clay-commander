import logging

LOGGING_FORMAT = '%(asctime)s - [%(levelname)s] - %(message)s'
logging.basicConfig(format=LOGGING_FORMAT, level=logging.DEBUG)


def get_logger(name):
    return logging.getLogger(name)