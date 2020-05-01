import pickle
from kafka import KafkaConsumer

consumer = KafkaConsumer('health-out', bootstrap_servers=['localhost:9092'])

print("Listening to health hub...")


def listen():
    for message in consumer:
        pass
        # State.store_response(last_response=pickle.loads(message.value))
        # print("%s:%d:%d: key=%s value=%s" % (message.topic, message.partition,
        #                                      message.offset, message.key,
        #                                      message.value))
