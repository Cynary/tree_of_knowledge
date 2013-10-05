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
	// send addNode message
    }

    function deleteNode(nodeID) {
	// send delete message
    }
    
    function addEdge(parentID, childID) {
	// send addEdge message
    }

    function deleteEdge(parentID, childID) {
	// send deleteEdge message
    }

    function editContent(nodeID, newContent) {
	// send editContent message
    }
}

knowledgeTree = new graph(PORT, HOST);
