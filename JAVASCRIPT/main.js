window.onload = init;

var walls = new Array();
var compass = document.createElement('div');

function init(){
	gamefield();
	initGame();
	initControls();
}

function initGame(){
	initSession();
	viewMap(); 
}

function initControls(){
	$("turnleft").onclick	= function(){ changeView(0); };
	$("turnright").onclick	= function(){ changeView(1); };
	$("movefwd").onclick	= function(){ move(0); };
	$("moveright").onclick	= function(){ move(1); };
	$("moveback").onclick	= function(){ move(2); };
	$("moveleft").onclick	= function(){ move(3); };
}

function gamefield(){
	var i, j;
	
	$('view').innerHTML = "";
	
	for(i=0; i<7; i++){
		walls[i] = new Array();

		for(j=0; j<5; j++){
			var div = document.createElement('div');
			
			if(wallsetImage[i][j] != 0){
				div.style.backgroundImage = "url('img/" + wallsetImage[i][j] + "')";
				div.style.backgroundRepeat = "no-repeat";
				div.style.top = wallsetTop[i][j] + "px";
				div.style.left = wallsetLeft[i][j] + "px";
				div.style.width = wallsetWidth[i][j] + "px";
				div.style.height = wallsetHeight[i][j] + "px";
				div.style.zIndex = 70 - 10 * i;
				div.style.position = "absolute";

				if(j < 2)
					div.style.backgroundPosition = "100% 0"
				 
				$('view').appendChild(div);
				walls[i][j] = div;
			}
		}
	}
	compass.style.backgroundImage = "url('img/compass-e.png')";
	compass.style.bottom = "0px";
	compass.style.left = "70px";
	compass.style.width = "200px";
	compass.style.height = "94px";
	compass.style.zIndex = 70;
	compass.style.position = "absolute";
	$('view').appendChild(compass);
}

function viewMap(){
	var i, j;
	var xhr = getXHR();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4){
			if(xhr.status == 200) {
				if(xhr.responseText == 'ERROR'){
					alert("Erreur \"ERROR\"");
				} else {
					extractFromXml(xhr.responseXML);
				}
			} else {
				console.log("Error while contacting the server, type : " + xhr.status);
			}
		}
	}
	
	xhr.open("GET", "PHP/sendView.php", true);
	xhr.send(null);
}

function extractFromXml(xml){
	var direction,vue, rawMap, numDir;

	direction = xml.getElementsByTagName("direction");
	if (direction[0]) {
		if (direction[0].firstChild) {
			numDir=direction[0].firstChild.nodeValue;
		}
	}

	vue	= xml.getElementsByTagName("vue");
	if (vue[0]) {
		if (vue[0].firstChild) {
			rawMap=vue[0].firstChild.nodeValue;
		}
	}
	for(i=0;i<vue.length;i++){
		rawMap +=vue[i];
	}

	loadMap(rawMap);
	loadCompass(numDir);
}

function loadMap(rawMap){
	var parsedMap = new Array();
	parsedMap = rawMap.split(';');

	for(i=0; i<7; i++){
		parsedMap[i] = parsedMap[i].split(',');
			
		for(j=0; j<5; j++){
			if(parsedMap[i][j] == 1 && walls[i][j] != null){
				show(walls[i][j]);
			} else if(walls[i][j] != null){
				hide(walls[i][j]);
			}
		}
	}
}

function loadCompass(numDir){
	switch(numDir){
		case '0': 	compass.style.backgroundImage = "url('img/compass-e.png')"; break;
		case '1': 	compass.style.backgroundImage = "url('img/compass-s.png')"; break;
		case '2': 	compass.style.backgroundImage = "url('img/compass-w.png')"; break;
		case '3': 	compass.style.backgroundImage = "url('img/compass-n.png')"; break;
		default: 	break;
	}

}


function initSession(){
	var xhr=getXHR();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4){
			if(xhr.status == 200) {
				if(xhr.responseText == 'ERROR'){
					alert("Erreur \"ERROR\"");
				}
			} else {
				console.log("Error while contacting the server, type : " + xhr.status);
			}
		}
	}
	xhr.open("GET","PHP/initSession.php",true);
	xhr.send(null);
}

function changeView(turn){ 
	var xhr = getXHR(); 
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4){
			if(xhr.status == 200) {
				if(xhr.responseText == 'ERROR'){
					console.log('Server responded with "ERROR" while trying to change direction.');
				} else {
					viewMap();
				}
			} else {
				console.log('Error while contacting the server in function changeView, type : ' + xhr.status);
			}
		}
	}

	xhr.open('GET', 'PHP/changeView.php?turn='+turn, true);
	xhr.send(null);

}

function move(move){ 
	var xhr = getXHR(); 
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4){
			if(xhr.status == 200) {
				if(xhr.responseText == 'ERROR'){
					console.log('Server responded with "ERROR" while trying to move.');
				} else {
					viewMap();
				}
			} else {
				console.log('Error while contacting the server in function move, type : ' + xhr.status);
			}
		}
	}

	xhr.open('GET', 'PHP/move.php?move='+move, true);
	xhr.send(null);

}

