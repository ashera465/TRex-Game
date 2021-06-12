var trex, trexImage, trexCollidedImage, ground, groundImage, invisibleGround, obstacleGroup, cloudGroup, cloudImage, obstacle1Image, obstacle2Image, obstacle3Image, obstacle4Image, obstacle5Image, obstacle6Image, dieSound, jumpSound, checkSound;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var restart, restartImage, gameOver, gameOverImage;

function preload(){
  trexImage = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexCollidedImage = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacleImage1= loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle2.png");
  obstacleImage3= loadImage("obstacle3.png");
  obstacleImage4= loadImage("obstacle4.png");
  obstacleImage5= loadImage("obstacle5.png");
  obstacleImage6= loadImage("obstacle6.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
  checkSound = loadSound("checkPoint.mp3");
  
}



function setup() {
  createCanvas(600, 200);
  cloudGroup = new Group();
  obstacleGroup = new Group();
  trex = createSprite(50, 160, 20, 20);
  trex.addAnimation("running", trexImage);
  trex.addAnimation("collided", trexCollidedImage);
  trex.scale = 0.5;
  ground = createSprite(0, 180, 600, 20);
  ground.addImage("ground", groundImage);
  invisibleGround = createSprite(0, 190, 600, 10);
  invisibleGround.visible = false;
  restart = createSprite(300, 100, 10, 10);
  gameOver = createSprite(300, 50, 10, 10);
  restart.addImage("yellow", restartImage);
  gameOver.addImage("gumova", gameOverImage);
  restart.visible = false;
  gameOver.visible = false;
  restart.scale = 0.5;
  gameOver.scale = 0.5;
}

function draw() {
  
  background(255);
  if(gameState === PLAY){
      ground.velocityX = -2;
      if(ground.x < 0){
        ground.x = ground.width/2;
      }
    
      score = score + Math.round(frameRate()/60);
      
      makeClouds();
      makeObstacles();
      trex_move();
    if(trex.collide(obstacleGroup)){
      dieSound.play();
      gameState = END;
    }
    if(score%100 ==0 ){
      checkSound.play();
    }
      
  }
  text("Score: "+ score, 400, 50);
  
  if(gameState ===END){
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    trex.velocityX = 0;
    trex.changeAnimation("collided", trexCollidedImage);
    restart.visible = true;
    gameOver.visible = true;
    reset();
  }
  trex.collide(invisibleGround);
  drawSprites();
  console.log(trex.depth);
}

function trex_move(){
  if(keyWentDown("space") && trex.y >140){
    jumpSound.play();
    trex.velocityY = -12;
    
  }
  trex.velocityY = trex.velocityY + 0.5;
  
}
function makeClouds(){
  if(frameCount%60 === 0){
    var cloud = createSprite(600, 100, 10, 10);
    
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloudGroup.add(cloud);
    cloudGroup.setVelocityXEach(-3);
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
  }
}
function makeObstacles(){
  if(frameCount%60 ===0){
    
    var r = Math.round(random(1,6));
    var obstacle =createSprite(600, 165, 10, 10);
    obstacle.scale = 0.65;
    switch(r){
      case 1:obstacle.addImage(obstacleImage1);
               break;
      case 2:obstacle.addImage(obstacleImage2);
              break;
      case 3:obstacle.addImage(obstacleImage3);
              break;
      case 4:obstacle.addImage(obstacleImage4);
              break;
      case 5:obstacle.addImage(obstacleImage5);
              break;
      case 6:obstacle.addImage(obstacleImage6);
    }
    obstacleGroup.add(obstacle);
    obstacleGroup.setVelocityXEach(-6);
    
  }
}
function reset (){
  if(mousePressedOver(restart)){
    gameState = PLAY;
    restart.visible = false;
    gameOver.visible = false;
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    trex.changeAnimation("running", trexImage);
  }
}