import logging

from kafka import KafkaProducer
from kafka.errors import KafkaError

producer = KafkaProducer(bootstrap_servers=['localhost:9092'])

logging.basicConfig()
logger = logging.getLogger("producer")
logger.setLevel(logging.INFO)

# Asynchronous by default
future = producer.send('health-in', b'raw_bytes')

try:
    record_metadata = future.get(timeout=10)
except KafkaError:
    # Decide what to do if produce request failed...
    print("ERROR")
    pass

# Successful result returns assigned partition and offset
print(record_metadata.topic)
print(record_metadata.partition)
print(record_metadata.offset)

# produce keyed messages to enable hashed partitioning

# block until all async messages are sent
producer.flush()

# configure multiple retries
producer = KafkaProducer(retries=5)


def send(subject, message):
    logger.info("Sending message to health hub. Subject: %s", subject)
    producer.send('health-in', key=subject, value=message)
