//settings
var snakeX=2;
var snakeY=2;
var height=40;
var width=30;
var interval=100;
var increment=1;

//game variables
var tailX=[snakeX];
var tailY=[snakeY];
var fX;
var fY;
var running=false;
var gameOver;
var direction=1;//right 1, left -1, down -2, up +2
var int;

//entry point of the game
function run(){
	init();
	int=setInterval(gameloop,interval);
}

function init(){
	createMap();
	createSnake();
	createFruit();
}

//generates the map for the snakeX
function createMap(){
	document.write("<table>");
	for(var y=0;y<height;y++){
		document.write("<tr>");
		for(var x=0;x<width;x++){
			if(x==0 || x==width-1 || y==0 || y== height-1)
				document.write("<td class='wall' id='"+x+ "-" +y+"'></td>");
			else
				document.write("<td class='blank' id='"+x+ "-" +y+"'></td>");
		}
		document.write("</tr>");	
	}
	document.write("</table>");
}
//generates a snake
function createSnake(){
	setType(snakeX,snakeY,"snake");
}

function get(x,y){
	return document.getElementById(x+"-"+y);
}

function setType(x,y,value){
	get(x,y).setAttribute("class", value);
}

//generates the fruits that pop randomly
function createFruit(){
	var found=false;
	while(!found && (length<(width-2)*(height-2)+1)){
		var fruitX=rand(1, width-1);
		var fruitY=rand(1,height-1);
		if(getType(fruitX,fruitY)=="blank")
			found=true;
	}
	setType(fruitX,fruitY,"fruit");
	fX=fruitX;
	fY=fruitY;
}

function rand(min,max){
	return Math.floor(Math.random()*(max-min)+min);
}

function getType(x,y){
	return get(x,y).getAttribute("class");
	
}


run();