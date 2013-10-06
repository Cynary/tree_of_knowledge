var Nodes = {}
var Edges = {}

var NodesVisible = {}
var EdgesVisible = {}
var EdgeCount = 0;

function AddNode(name, content, ID){
    Nodes[ID] = {'name': name, 'content': content, 'ID': ID , 'edgesTo': {}, 'edgesFrom': {}}
}

function AddEdge(parentID, childID){
    Edges[EdgeCount] = {'parentID': parentID, 'childID': childID, 'ID': EdgeCount}
    Nodes[parentID].edgesTo[EdgeCount] = [EdgeCount, childID];
    Nodes[childID].edgesFrom[EdgeCount] = [EdgeCount, parentID];
    EdgeCount +=1;
}

function RemoveNode(nodeID){
    for( i in Nodes[nodeID].EdgesTo){
	RemoveEdge(Nodes[nodeID].EdgesTo[i][1], nodeID);
    }
    for( i in Nodes[nodeID].EdgesFrom){
	RemoveEdge(nodeID, Nodes[nodeID].EdgesFrom[i][1]);
    }
    delete Nodes[nodeID];
}

function RemoveEdge(parentID, childID){
    for(i in Edges){
	if( Edges[i].parentID == parentID && Edges[i].childID == childID){
	    delete Edges[i]}
    }
}



function ShowNode(nodeID)
{
    return NodesVisible[nodeID] = sys.addNode(Nodes[nodeID].name, {'color':'black', 'shape':'box', 'label': Nodes[nodeID].name, 'content':Nodes[nodeID].cont});
}

function ShowEdge(edgeID)
{
    return EdgesVisible[edgeID] = sys.addEdge(Nodes[Edges[edgeID].parentID], Nodes[Edges[edgeID].childID], {'color':'black', 'directed':true});
}

function UnShowEdge(edgeID)
{
    sys.pruneEdge(EdgesVisible[edgeID]);
}

function UnShowNode(nodeID){
    sys.pruneNode(NodesVisible[nodeID]);
}


var sys = arbor.ParticleSystem(100, 100,1,1,60); //arguments are repulsion, stiffness, friction, gravity, fps, dt, precision
sys.parameters({gravity:false});
sys.renderer = Renderer("#viewport");
	
AddNode( 'Tree of Knowledge', 'BIscoito', 0);
AddNode( 'Math', 'Ananas', 1);
AddNode('Philosophy', 'hotel',2);
AddEdge(0,1);
AddEdge(0,2);
AddEdge(1,2);
AddNode('Calculus', 'jarros', 3);
AddEdge(1,3);
ShowNode(0);
ShowNode(1);
ShowNode(2);
ShowNode(3);
ShowEdge(0);
console.log(Edges);
//ShowEdge(1);
