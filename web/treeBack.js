var PORT = 5001
var HOST = "18.182.6.123"

function Graph(port, host) {
    try {
	this.ws = new WebSocket("ws://" + host + ":8889/localhost;" + port);
    } catch(err) {
	this.ws = new MozWebSocket("ws://" + host + ":8889/localhost;" + port);
    }
    this.ws.onmessage = function(evt) {
	var message = JSON.parse(evt.data);
	switch(message['command']) {
	    case 'found': Docus(message['content'][0].ID); break;
	    case 'addNode': AddNode(message['content'].name, message['content'].content, message['content'].ID); break;
	    case 'deleteNode': RemoveNode(message['content'].node); break;
	    case 'addEdge': AddEdge(message['content'].edge[0], message['content'].edge[1]); break;
	    case 'deleteEdge': RemoveEdge(message['content'].edge[0], message['content'].edge[1]); break;
	    case 'editContent': EditContent(message['content'].ID, message['content'].content); break;
	    case 'tree': InitializeGraph(message.nodes, message.edges); Focus(-1); break;
	};
	// Notifications? Maybe warning of attempted loop
    }

    this.addNode = function(nodeName, content) {
	var message = {
	    'command':'addNode',
	    'args':[nodeName, content]
	};
	this.ws.send(JSON.stringify(message));
    }

    this.deleteNode = function(nodeID) {
	var message = {
	    'command':'deleteNode',
	    'args':[nodeID]
	};
	this.ws.send(JSON.stringify(message));
    }
    
    this.addEdge = function(parentID, childID) {
	var message = {
	    'command':'addEdge',
	    'args':[parentID, childID]
	};
	this.ws.send(JSON.stringify(message));
    }

    this.deleteEdge = function(parentID, childID) {
	var message = {
	    'command':'deleteEdge',
	    'args':[parentID, childID]
	};
	this.ws.send(JSON.stringify(message));
    }

    this.editContent = function(nodeID, newContent) {
	var message = {
	    'command':'editContent',
	    'args':[nodeID, newContent]
	};
	this.ws.send(JSON.stringify(message));
    }

    this.searchNode = function(keywords) {
	var message = {
	    'command':'searchNode',
	    'args':[keywords]
	};
	this.ws.send(JSON.stringify(message));
    }
}

knowledgeTree = new Graph(PORT, HOST);
