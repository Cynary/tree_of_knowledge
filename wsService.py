#!/usr/bin/python

import serviceSkeleton
import json
import threading
import sys
from Tree import *

PORT = 5000
HOST = "localhost"

USERSONLINE = set([])
USERSONLINELOCK = threading.Lock()

# if integer argument passed, use that as port
if len(sys.argv) > 1:
    try:
        PORT=int(sys.argv[1])
    except:
        pass

def serviceFunc(conn, addr):
    global USERSONLINELOCK,USERSONLINE
    with USERSONLINELOCK:
        USERSONLINE.add(conn)
        
    while True:
        try:
            message = json.loads(conn.recv(1048576))
        except:
            conn.close()
            return

        # Do stuff with the message
        changes = {
            'addNode': addNode,
            'deleteNode': deleteNode,
            'addEdge': addEdge,
            'deleteEdge': deleteEdge,
            'editContent': editContent,
            'search': search,
        }[message['command']](*message['args'])

        with USERSONLINELOCK:
            for c in USERSONLINE:
                c.sendall(json.dumps(changes))
