var DocWidth = document.body.clientWidth;
	function setDivWidth(DocWidth){
		var Tree = document.getElementById('viewport');
		Tree.style.width=DocWidth/3 + "px";
		Tree.style.borderColor= "blue";
		Tree.style.borderStyle= "solid"
		Tree.style.height = "500px"
		var Content = document.getElementById('content');
		Content.style.width=DocWidth*0.6 + "px"; 
		Content.style.borderStyle="solid";
		Content.style.borderColor="red";
		Content.style.height = "500px"; 
		var Content = document.getElementById('content');
		Content.style.width=DocWidth*2/3 + "px"; 
		Content.style.borderStyle="solid";
		Content.style.borderColor="red";
		Content.style.height = document.body.clientHeight; 
		
	}
	setDivWidth(DocWidth);

var Nodes = {}
var Edges = {}

function AddNode(name, cont, ID)
{
return Nodes[ID] = sys.addNode(name, {'color':'black', 'shape':'box', 'label': name, 'content':cont});
}

function AddEdge(parentID, childID, ID)
{
return Edges[ID] = sys.addEdge(Nodes[parentID], Nodes[childID], {'color':'black', 'directed':true});
}

function deleteEdge(parentID, childID)
{
A = sys.getEdges(Nodes[parentID], Nodes[childID]);
sys.pruneEdge(A[0]);
}


function deleteNode(nodeID){
sys.pruneNode(Nodes[nodeID]);
}

	var sys = arbor.ParticleSystem(100, 100,1,1,60); //arguments are repulsion, stiffness, friction, gravity, fps, dt, precision
	sys.parameters({gravity:false});
	sys.renderer = Renderer("#viewport");
	
	AddNode( 'Tree of Knowledge', 'BIscoito', 0);
	AddNode( 'Math', 'Ananas', 1);
AddNode('Philosophy', 'hotel',2);
	AddEdge(0,1,0);
AddEdge(0,2,1);
AddEdge(1,2,2);
deleteEdge(1,2);
AddNode('Calculus', 'jarros', 3);
AddEdge(1,3);
Nodes[1].data.visible = false