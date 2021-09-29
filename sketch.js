var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score=0;

var trex;
var ground, ground1, ground2, ground3, ground4;
var line;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var gameOverImg,restartImg

function preload(){
 trexImg = loadAnimation("Unicorn.png")
 backgroundImg = loadImage("Background.jpg")
 jumpSound = loadSound("jump.mp3");
 overSound = loadSound("die.mp3");

 obstacle1 = loadImage("Train.png")

 trex_collided = loadAnimation("dead.png")

 restartImg = loadImage("restart.png")
 gameOverImg = loadImage("gameOver.png")

}

function setup() {
  createCanvas(1000, 400);
  
  trex = createSprite(100,320);
  trex.addAnimation("jkl",trexImg);
  trex.addAnimation("collided", trex_collided);
  trex.scale=0.15;

  line = createSprite(500,380,1000,2);
  line.visible=false;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;
  

  trex.setCollider("rectangle",0,0,550,550);
  trex.debug = false;

  score = 0;

  obstaclesGroup = new Group();
}

function draw() {
  background(backgroundImg);
  

  textSize(20);
  fill("black")
  text("🆂🅲🅾🆁🅴: "+ score,850,30);

  textSize(20);
  fill("black")
  text("🦄 🆄🅽🅸🅲🅾🆁🅽 🅶🅰🅼🅴 🦄",400,30);
  
  

  if(gameState === PLAY){

    score = score + Math.round(getFrameRate()/60);

    gameOver.visible = false
    restart.visible = false

//jump when the space key is pressed
if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-150) {
  jumpSound.play( )
  trex.velocityY = -15;
  touches = [];

}
//add gravity
trex.velocityY = trex.velocityY + 1;

spawnObstacles();

if(trex.isTouching(obstaclesGroup)){
  gameState = END;
  overSound.play();

}


  }
  else if (gameState === END) {
  
    gameOver.visible = true;
      restart.visible = true;
     
      //change the trex animation

      trex.changeAnimation("collided",trex_collided);

      trex.scale= 0.5;
      trex.x=200;
      trex.y=300;


      trex.velocityY = 0

      obstaclesGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);

     if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }



    //stop trex from falling down
  trex.collide(line);

  
  drawSprites();
}




 function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  trex.scale=0.15;
  trex.x=100;
  trex.y=320;
  
trex.changeAnimation("jkl",trex);


  obstaclesGroup.destroyEach();

  score = 0;
}


function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(900,360,10,40);
    obstacle.velocityX = -(6 + score/100);
    
    obstacle.setCollider("circle",0,0,300);
    obstacle.debug = false;

     //generate random obstacles
     var rand = Math.round(random(1,5));
    
     obstacle.addImage(obstacle1);
     
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.12;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
 }
 