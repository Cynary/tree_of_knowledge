/*var DocWidth = document.body.clientWidth;

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
setDivWidth(DocWidth);*/


var Nodes = {}
var Edges = {}

var NodesVisible = {}
var EdgesVisible = {}
var EdgeCount = 0;

function InitializeGraph(nodes, edges){
    for (i in nodes){
	AddNode(i.name, i.content, i.ID);}
    for (i in edges){
	AddEdge(i.parentID, i.childID);}
}

function Focus(nodeID){
    
    for(i in NodesVisible){
	UnShowNode(i);}

    //SHOW everything if not focused
    if(nodeID == -1){
	for(i in Nodes){
	    ShowNode(i);}
	for(i in Edges){
	    ShowEdge(i);}
    }
   
    ShowNode(nodeID);
    //console.log(Nodes[nodeID].edgesFrom);
    for(i in Nodes[nodeID].edgesFrom){
	ShowNode(Nodes[nodeID].edgesFrom[i][1]);
	ShowEdge(i)
    }
    for(i in Nodes[nodeID].edgesTo){
	ShowNode(Nodes[nodeID].edgesTo[i][1]);
	ShowEdge(i);
    }
   
}

function AddNode(name, content, ID){
    Nodes[ID] = {'name': name, 'content': content, 'ID': ID , 'edgesTo': {}, 'edgesFrom': {}}
}

function AddEdge(parentID, childID){
    Edges[EdgeCount] = {'parentID': parentID, 'childID': childID, 'ID': EdgeCount}
    Nodes[parentID].edgesFrom[EdgeCount] = [EdgeCount, childID];
    Nodes[childID].edgesTo[EdgeCount] = [EdgeCount, parentID];
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
    return EdgesVisible[edgeID] = sys.addEdge(NodesVisible[Edges[edgeID].parentID],NodesVisible[Edges[edgeID].childID], {'color':'black', 'directed':true});
}

function UnShowEdge(edgeID)
{
    sys.pruneEdge(EdgesVisible[edgeID]);
    delete EdgesVisible[edgeID];
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
AddNode('Calculus', 'jarros', 3);
AddNode('Economics', 'hotel',4);
AddNode('Literature', 'jarros', 5);
AddNode('Camões', 'hotel',6);
AddNode('Camus', 'jarros', 7);
AddNode('Linear Algebra', 'hotel',8);
AddNode('Matrix', 'jarros', 9);

for(var i=0; i<10; i++){
    ShowNode(i);}

AddEdge(0,1);
AddEdge(0,2);
AddEdge(0,4);
AddEdge(0,5);

AddEdge(1,8);
AddEdge(1,3);

AddEdge(5,6);
AddEdge(5,7);
AddEdge(8,9);

for(var i = 0; i<9; i++) ShowEdge(i);
//UnShowEdge(2);
//ShowEdge(2);
//console.log(Edges);
//UnShowEdge(1);
//console.log(Nodes[0].edgesFrom);
Focus(1);
//Focus(-1);
