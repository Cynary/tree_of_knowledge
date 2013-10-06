var PORT = 5000
var HOST = "..."

function Graph(port, host) {
    try {
	this.ws = new WebSocket("wss://" + host + ":8888/localhost;" + port);
    } catch(err) {
	this.ws = new MozWebSocket("wss://" + host + ":8888/localhost;" + port);
    }
    this.ws.onmessage = function(evt) {
	var parsed = parseMessage(evt.data);
	// Do drawings here
	// Notifications? Maybe warning of attempted loop
    }

    function addNode(nodeName, content) {
	var message = {
	    'command':'addNode',
	    'args':{nodeName, content}
	};
	this.ws.send(JSON.stringify(message));
    }

    function deleteNode(nodeID) {
	var message = {
	    'command':'deleteNode',
	    'args':{nodeID}
	};
	this.ws.send(JSON.stringify(message));
    }
    
    function addEdge(parentID, childID) {
	var message = {
	    'command':'addEdge',
	    'args':{parentID, childID}
	};
	this.ws.send(JSON.stringify(message));
    }

    function deleteEdge(parentID, childID) {
	/var message = {
	    'command':'deleteEdge',
	    'args':{parentID, childID}
	};
	this.ws.send(JSON.stringify(message));
    }

    function editContent(nodeID, newContent) {
	var message = {
	    'command':'editContent',
	    'args':{nodeID, newContent}
	};
	this.ws.send(JSON.stringify(message));    }

    function searchNode(keywords) {
	var message = {
	    'command':'searchNode',
	    'args':{keywords}
	};
	this.ws.send(JSON.stringify(message));
    }
}

knowledgeTree = new graph(PORT, HOST);
