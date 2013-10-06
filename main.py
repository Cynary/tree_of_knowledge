<!doctype html>
<html lang="us">
<head>
	<meta charset="utf-8">
	<title>jQuery UI Example Page</title>
	<link href="css/ui-lightness/jquery-ui-1.10.3.custom.css" rel="stylesheet">
	<script src="js/jquery-1.9.1.js"></script>
	<script src="js/jquery-ui-1.10.3.custom.js"></script>
	<script>
	
	</script>

	<script language="javascript" type="text/javascript" src="jquery.min.js"></script>
	<script language="javascript" type="text/javascript" src="arbor.js"></script>
	<script language="javascript" type="text/javascript" src="graphics.js"></script>
	<script language="javascript" type="text/javascript" src="renderer.js"></script>
	
	<style>
	body{
		font: 62.5% "Trebuchet MS", sans-serif;
		margin: 50px;
	}
	.demoHeaders {
		margin-top: 2em;
	}
	#dialog-link {
		padding: .4em 1em .4em 20px;
		text-decoration: none;
		position: relative;
	}
	#dialog-link span.ui-icon {
		margin: 0 5px 0 0;
		position: absolute;
		left: .2em;
		top: 50%;
		margin-top: -8px;
	}
	#icons {
		margin: 0;
		padding: 0;
	}
	#icons li {
		margin: 2px;
		position: relative;
		padding: 4px 0;
		cursor: pointer;
		float: left;
		list-style: none;
	}
	#icons span.ui-icon {
		float: left;
		margin: 0 4px;
	}
	.fakewindowcontain .ui-widget-overlay {
		position: absolute;
	}
	</style>
</head>
<body>



<div id="tree">
<canvas id="viewport" width="800" height="600"></canvas>
<script language ="javascript" type="text/javascript">
	var sys = arbor.ParticleSystem(1000, 400,1); //arguments are repulsion, stiffness, friction, gravity, fps, dt, precision
	sys.parameters({gravity:true});
	sys.renderer = Renderer("#viewport");
	var animals = sys.addNode('Animals',{'color':'red','shape':'dot','label':'Animals'});
	var dog = sys.addNode('Dog', {'color':'blue', 'shape':'dot', 'label':'cat'});
	var cat = sys.addNode('Cat', {'color':'blue', 'shape':'dot', 'label':'dog'});
</script>

</div> 


<div id="content">
</div>

<script>
var DocWidth = document.body.clientWidth;
	function setDivWidth(DocWidth){
		var Tree = document.getElementById('viewport');
		Tree.style.width=DocWidth/3 + "px";
		Tree.style.borderColor= "blue";
		Tree.style.borderStyle= "solid"
		var Content = document.getElementById('content');
		Content.style.width=DocWidth*2/3 + "px"; 
		Content.style.borderStyle="solid";
		Content.style.borderColor="red";
		Content.style.height = document.body.clientHeight; 
		
	}
	setDivWidth(DocWidth);


</script>

</body>
</html>
