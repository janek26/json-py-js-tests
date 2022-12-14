# import mock.json file from filesystem and print sha256 hash of the file
import json
import hashlib

with open("mock.json", "r") as f:
    data = f.read()
    jsonData = json.dumps(json.loads(data))

    # write to file
    with open("transformed-py.json", "w") as f:
        f.write(jsonData)

    # hex output of sha256 hash
    print(hashlib.sha256(jsonData.encode()).hexdigest())
