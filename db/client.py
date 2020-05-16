from pymongo import MongoClient
from fuzzywuzzy import process


client = MongoClient()

tables_db = client['tables']
tables_csv = tables_db.get_collection("tables_csv")
tables_formatted = tables_db.get_collection("tables_formatted")