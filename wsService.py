#!/usr/bin/python

import serviceSkeleton
import json
import threading
import sys

PORT = 5000
HOST = "localhost"

# if integer argument passed, use that as port
if len(sys.argv) > 1:
    try:
        PORT=int(sys.argv[1])
    except:
        pass

def serviceFunc(conn, addr):
    while True:
        try:
            message = json.loads(conn.recv(1048576))
        except:
            conn.close()
            return

        # Do stuff with the message
        {
            'addNode': addNode,
            'deleteNode': deleteNode,
            'addEdge': addEdge,
            'deleteEdge': deleteEdge,
            'editContent': editContent
        }[message['command']](*message['args'])
