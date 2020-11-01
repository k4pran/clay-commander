from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

import logger_factory

LOG = logger_factory.get_logger(__name__)

client = MongoClient()

TABLES_TABLE = 'tables'
IMAGES_TABLE = 'images'
TEXT_TABLE = 'text'

CSV_TABLE_COLLECTION = "tables_csv"
CSV_TABLE_FORMATTED_COLLECTION = "tables_formatted"
ALL_IMAGES_COLLECTION = "all_images"
ALL_TEXT_COLLECTION = "all_text"

try:
    client.admin.command('ismaster')
    LOG.info("Mongodb connected: %s", client.server_info())
except ConnectionFailure:
    LOG.error("Mongodb server not available")

tables_db = client[TABLES_TABLE]
LOG.info("Initialized table %s", TABLES_TABLE)

tables_csv = tables_db.get_collection(CSV_TABLE_COLLECTION)
LOG.info("Initialized table %s", CSV_TABLE_COLLECTION)
tables_formatted = tables_db.get_collection(CSV_TABLE_FORMATTED_COLLECTION)

images_db = client[IMAGES_TABLE]
LOG.info("Initialized table %s", IMAGES_TABLE)
table_images = tables_db.get_collection(ALL_IMAGES_COLLECTION)

text_db = client[TEXT_TABLE]
LOG.info("Initialized table %s", TEXT_TABLE)
table_text = tables_db.get_collection(ALL_TEXT_COLLECTION)