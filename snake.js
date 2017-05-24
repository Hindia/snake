//settings
var snakeX=2;
var snakeY=2;
var height=30;
var width=30;
var interval=100;
var increment=2;

//game variables
var length =0;
var score =0;
var tailX=[snakeX];
var tailY=[snakeY];
var fX;
var fY;
var running=false;
var gameOver=false;
var direction=1;//right 1, left -1, down -2, up 2
var int;

//entry point of the game
function run(){
	init();
	int=setInterval(gameLoop,interval);
}

function init(){
	createMap();
	createSnake();
	createFruit();
}

//generates the map for the snakeX
function createMap(){
	document.write("<table>");
	for(var y = 0;y < height;y++){
		document.write("<tr>");
		for(var x = 0;x < width;x++){
			if(x == 0 || x == width-1 || y == 0 || y == height-1)
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
	return document.getElementById(x+ "-" +y);
}

function setType(x,y,value){
	if(get(x,y) != null ) 
		get(x,y).setAttribute("class",value);
}

//generates the fruits that pop randomly
function createFruit(){
	var found = false;
	while(!found && (length < (width-2) * (height-2) + 1)){
		var fruitX = rand(1, width-1);
		var fruitY = rand(1,height-1);
		if(getType(fruitX,fruitY) == "blank") found=true;
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

//setting the key listeners
window.addEventListener("keypress", function key(){
	//if arrow up is key direction is up and so on
	var key= KeyboardEvent.code; 
	if(direction != -2 && key==38) direction=2;
	else if(direction != 2 && key== 40) direction=-2;
	else if(direction!= 1 && key == 37)	direction=-1;
	else if(direction!=-1 && key == 39)	direction=1;
	if(!running) running=true;
	else if(key==32) running=false;	
});

function gameLoop(){
	if(running && !gameOver)
		update();
	else if (gameOver)
		clearInterval(int);
}

function update(){
	setType(fX, fY, "fruit");
	updateTail();
	setType(tailX[length], tailY[length], "blank");
	if(direction==2) snakeY--;
	else if (direction==-2) snakeY++;
	else if (direction==1) snakeX++;
	else if (direction==-1) snakeX--;
	setType(snakeX,snakeY,"snake");
	if (snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1)
		gameOver=true;
	else if(snakeX == fX && snakeY==fY){
		createFruit();
		length+=increment;
		score+=2;
	}
	document.getElementById("score").innerHTML = "Score: "+ score;
}

function updateTail(){
	for(var i=length; i>0 ;i--){
		tailX[i]=tailX[i-1];
		tailY[i]=tailY[i-1];
	}
	tailX[0]=snakeX;
	tailY[0]=snakeY;
}

run();