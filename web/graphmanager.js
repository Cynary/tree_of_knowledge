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
var Focused = -1;

var Nodes = {}
var Edges = {}

var NodesVisible = {}
var EdgesVisible = {}
var EdgeCount = 0

var FocusOrder = [];
var FocusCounter = 0;
    

function InitializeGraph(nodes, edges){
    for (i in nodes){
	AddNode(i.name, i.content, i.ID);}
    for (i in edges){
	AddEdge(i.parentID, i.childID);}
}

function Clear(nodeID){   
    for(i in NodesVisible){
	UnShowNode(i);}
}
 
function EditContent(nodeID, newContent){
    Nodes[nodeID].content = newContent;
    if( nodeID in NodesVisible){
	NodeVisible[nodeID].data.content = newContent;
    }
}

function DrawEverything(){   //SHOW everything if not focused
    for(i in Nodes){
	ShowNode(i);}
    for(i in Edges){
	ShowEdge(i);}
}

function AddFocus(nodeID){
    FocusOrder.push(nodeID);
    console.log(FocusOrder);
    if(!(nodeID in NodesVisible))
       ShowNode(nodeID);
    //console.log(Nodes[nodeID].edgesFrom);
    for(i in Nodes[nodeID].edgesFrom){
	if( !(Nodes[nodeID].edgesFrom[i][1] in NodesVisible))
	    ShowNode(Nodes[nodeID].edgesFrom[i][1]);
	ShowEdge(i);
    }
    for(i in Nodes[nodeID].edgesTo){
	if( !(Nodes[nodeID].edgesTo[i][1] in NodesVisible))
	    ShowNode(Nodes[nodeID].edgesTo[i][1]);
	ShowEdge(i);
	
    }
}

function RemoveFocus(nodeID){
    
   // console.log(NodesVisible);
    //console.log(Nodes[nodeID].edgesFrom);
    //console.log(FocusOrder);
    for(i in Nodes[nodeID].edgesFrom){
	var inside = false;
	for(var o = 0; o<FocusOrder.length; o++) if(FocusOrder[o] == Nodes[nodeID].edgesFrom[i][1]) inside = true;
	console.log(inside);
	console.log(Nodes[nodeID].edgesFrom[i][1]);
	if(inside){
	    RemoveFocus(Nodes[nodeID].edgesFrom[i][1]);
	}
    }

//console.log(NodesVisible);
   
   
    for( i in Nodes[nodeID].edgesFrom){
	UnShowNode(Nodes[nodeID].edgesFrom[i][1]);}

//console.log(NodesVisible);


    for(i in Nodes[nodeID].edgesTo){
	var inside = false;
	for(var o = 0; o<FocusOrder.length; o++) if(FocusOrder[o] == Nodes[nodeID].edgesTo[i][1]) inside = true;
	console.log(inside);
	if( !(inside)){
	    UnShowNode((Nodes[nodeID].edgesTo[i])[1]);
	}
    }
   // console.log(NodesVisible);
    delete FocusOrder[FocusOrder.indexOf(nodeID)];
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
    return NodesVisible[nodeID] = sys.addNode(Nodes[nodeID].name, {'color':'black', 'shape':'box', 'label': Nodes[nodeID].name, 'content':Nodes[nodeID].cont, 'ID':nodeID});
}

function ShowEdge(edgeID)
{
    return EdgesVisible[edgeID] = sys.addEdge(NodesVisible[Edges[edgeID].parentID],NodesVisible[Edges[edgeID].childID], {'color':'black', 'directed':true});
}

function UnShowEdge(edgeID)
{
    if( edgeID in EdgesVisible){
	sys.pruneEdge(EdgesVisible[edgeID]);
	delete EdgesVisible[edgeID];
    }
}

function UnShowNode(nodeID){
    if(nodeID in NodesVisible){
	sys.pruneNode(NodesVisible[nodeID]);
	delete NodesVisible[nodeID];
    }
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

AddEdge(0,1);
AddEdge(0,2);
AddEdge(0,4);
AddEdge(0,5);

AddEdge(1,8);
AddEdge(1,3);

AddEdge(5,6);
AddEdge(5,7);
AddEdge(8,9);

//UnShowEdge(2);
//ShowEdge(2);
//console.log(Edges);
//UnShowEdge(1);
//console.log(Nodes[0].edgesFrom);
Clear();
//Focus(-1);
AddFocus(0);

var lastTimestamp = 0;
$("#viewport").click(function(e){
    var pos = $(this).offset(); 
    var p = {x:e.pageX-pos.left, y:e.pageY-pos.top}
    selected = nearest = dragged = sys.nearest(p);
    console.log(e);
   

    if (selected.node !== null && nearest.distance < 20){
	if(e.timeStamp - lastTimestamp > 1 ){
	    lastTimestamp = e.timeStamp;
	    // dragged.node.tempMass = 10000
            dragged.node.fixed = true;
	    Focused = dragged.node.data.ID;
	    Display(2);
	    var inside = false;
	    for(var i=0; i<FocusOrder.length; i++)
		if( FocusOrder[i] == dragged.node.data.ID) inside = true;
	    //console.log(inside);

	    if( inside &&  !(dragged.node.data.ID == 0)){
		RemoveFocus(dragged.node.data.ID);
	    }
	    else if( !(dragged.node.data.ID == 0)) {
		//console.log(dragged.node.data.ID);
		AddFocus(dragged.node.data.ID);
	    }
	}
    }
    
    else{ Focused = -1;}
    

    return false;
});
