//Global
var trex,walk,ground,floor,ground2,obs1,obs2,obs3,obs4,obs5,obs6,gameover,restart,over,again,stand;
var score = 0
var gamestate = "start"
function preload(){
  walk = loadAnimation("trex1.png","trex3.png","trex4.png")
  floor = loadImage("ground2.png")
  cloud1 = loadImage("cloud.png")
  obs1 = loadImage("obstacle1.png")
  obs2 = loadImage("obstacle2.png")
  obs3 = loadImage("obstacle3.png")
  obs4 = loadImage("obstacle4.png")
  obs5 = loadImage("obstacle5.png")
  obs6 = loadImage("obstacle6.png")
  gameover = loadImage("gameOver.png")
  restart = loadImage("restart.png")
  stand = loadAnimation("trex_collided.png")
}

function setup(){
  createCanvas(600,200);
  trex = createSprite(50,180,50,50);
  trex.addAnimation("VOLK",walk)
  trex.addAnimation("dead",stand)
  trex.scale = 0.5;
  trex.debug= false
  //shape - rectangle/circle,Xoffset,Yoffset,width/radius,height
  trex.setCollider("circle",0,0,45)
  ground =createSprite(300,180,600,20)
  ground.addImage(floor)
  ground2 = createSprite(300,190,600,20)
  ground2.visible=false
  obsg = createGroup();
  cloudsg = createGroup();
  over = createSprite(300,90,100,100)
  again = createSprite(300,150,100,100)
  over.addImage(gameover)
  again.addImage(restart)
  again.scale = 0.5
}
function draw(){
  background ("white")
  //Concatenation
  text("Score: "+score,530,30)
  //frames per second
  console.log(getFrameRate())
  trex.collide(ground2)
  drawSprites();
  if (gamestate === "start"){
    score = score + Math.round(getFrameRate()/60);
    trex.velocityY = trex.velocityY + 0.8
    if (keyDown("space") && trex.y>=156){
      trex.velocityY = -10
    }
    ground.velocityX = -5
    if (ground.x < -1530.5){
    ground.x = 2280
    }
    if (frameCount%60===0){
      clouds();
    }
    if (frameCount%70===0){
      obstacles();
    }
    if (trex.isTouching(obsg)){
      gamestate = "end"
    }
    over.visible= false
    again.visible = false
  }
  if (gamestate === "end"){
    ground.velocityX = 0
    obsg.setVelocityXEach(0);
    cloudsg.setVelocityXEach(0);
    over.visible = true
    again.visible = true
    obsg.setLifetimeEach(-1)
    cloudsg.setLifetimeEach(-1)
    trex.velocityY = 0
    trex.changeAnimation("dead",stand)
  }
}

function clouds(){
  //local
  var cloud = createSprite(650,random(30,100),10,10);
  cloud.velocityX = -5;
  cloud.addImage(cloud1)
  cloud.scale = 0.75;
  trex.depth = cloud.depth + 1;
  cloud.lifetime = 150;
  cloudsg.add(cloud)
}
function obstacles(){
  //local
 var obs = createSprite(650,165,10,10)
 obs.velocityX = -5
 switch (Math.round(random(1,6))){
   case 1 : obs.addImage(obs1)
   break;
   case 2 : obs.addImage(obs2)
   break;
   case 3 : obs.addImage(obs3)
   break;
   case 4 : obs.addImage(obs4)
   obs.y = 160
   break;
   case 5 : obs.addImage(obs5)
   obs.y = 160
   break;
   case 6 : obs.addImage(obs6)
   obs.y = 160;
   break; 
 }
 obs.scale = 0.5;
 obs.lifetime = 140;
 obsg.add(obs)
}
