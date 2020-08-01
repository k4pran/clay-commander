from pymongo import MongoClient

client = MongoClient()

tables_db = client['tables']
tables_csv = tables_db.get_collection("tables_csv")
tables_formatted = tables_db.get_collection("tables_formatted")

images_db = client['images']
table_images = tables_db.get_collection("all_images")

text_db = client['text']
table_text = tables_db.get_collection("all_text")