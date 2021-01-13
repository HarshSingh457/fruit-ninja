//creating variable
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground,groundImage;
var sword,swordImage;
var  appleGroup, apple,appleImage;
var watermelonGroup, watermelon,wmImage;
var mangoGroup, mango,mangoImage;
var strawGroup, straw,strawImage;
var slashapple,slashappleImage;
var slashmelon,slashmelonImage;
var slashmango,slashmangoImage;
var slashstraw,slashstrawImage;
var cutsound;
var bombSound;
var gameover,gameoversound;
var invisibleGround;
var bomb1Group, bomb1,bomb1Image;
var bomb2Group, bomb2,bomb2Image;
var score=0;
var life=3;


//load images for sprite
function  preload() {
  groundImage=loadImage("background2.PNG");
 swordImage=loadImage("sword5-removebg-preview.png");
  appleImage=loadImage("apple (2).png");
  wmImage=loadImage("watermelon.png");
  mangoImage=loadImage("mango.png");
  strawImage=loadImage("strawberry.png");
  slashappleImage=loadImage("greensplash.png");
  slashmelonImage=loadImage("slashwater.png");
  slashmangoImage=loadImage("mangoslash.png");
  slashstrawImage=loadImage("strawberrysplash.png");
bomb1Image=loadImage("bomb1.png");
  bomb2Image=loadImage("bomb2.png");
  gameover=loadImage("gameover-1.png");
  cutsound=loadSound("cut sound.mp3");
gameoverSound=loadSound("gameover.mp3");
  bombSound=loadSound("bombsound2.wav");

  
}



function setup(){
  createCanvas(600,500);
  
  //create background for game
  ground=createSprite(230,200,15,15);
  ground.addImage(groundImage);
  ground.scale=3.3;
  
  //create knife for cut fruits 
  sword=createSprite(200,200,15,15);
  sword.addImage(swordImage);
  sword.scale=0.3
  sword.rotation=40;
  
  //create invisible block to bounceoff all fruits
  invisibleGround=createSprite(300,50,600,10);
  invisibleGround.visible=false;
  //invisibleGround.debug=true;
  
  
  //create groups of fruits and bomb
  appleGroup=new Group();
  melonGroup=new Group();
  mangoGroup=new Group();
  strawGroup=new Group();
  bomb1Group=new Group();
  bomb2Group=new Group();

}

function draw(){
//give background colour
  background("blue");


  
  
  //give velocity to knife
  sword.y=World.mouseY;
   sword.x=World.mouseX;
  //create game State
    if(gameState===PLAY){
  //giving condition when frame count is divided by 60 and remainder is 0    
      
 var select_fruits = Math.round(random(1,4));
  console.log(select_fruits)
  if (frameCount % 60 ==0) {
    if (select_fruits == 1) {
      greenapple();
    } else if (select_fruits == 2) {
      watermelon();
    } else if (select_fruits == 3) {
      mango();
    } else if(select_fruits ==4){
    strawberry();
    }
  }
  //to make all fruits group bounce off invisible ground
  melonGroup.bounceOff(invisibleGround);
   mangoGroup.bounceOff(invisibleGround);
   appleGroup.bounceOff(invisibleGround);
   strawGroup.bounceOff(invisibleGround);
  
      //assign condtion when knife is touch the melon group
  if(sword.isTouching(melonGroup)){
    melonGroup.destroyEach();
   var slash=createSprite();
    slash.addImage(slashmelonImage);
    slash.scale=1.5;
    slash.x=World.mouseX;
    slash.y=World.mouseY;
    slash.velocityY=7;
    score=score+2;
    cutsound.play();
  }
      //assign condtion when knife is touch the apple group

      
   if(sword.isTouching(appleGroup)){
    appleGroup.destroyEach();
   var slash1=createSprite();
    slash1.addImage(slashappleImage);
     slash1.scale=1.4;
    slash1.x=World.mouseX;
    slash1.y=World.mouseY;
    slash1.velocityY=7;
    score=score+3;
         cutsound.play();

  }
      //assign condtion when knife is touch the mango group
if(sword.isTouching(mangoGroup)){
    mangoGroup.destroyEach();
   var slash2=createSprite();
    slash2.addImage(slashmangoImage);
     slash2.scale=1.6;
    slash2.x=World.mouseX;
    slash2.y=World.mouseY;
    slash2.velocityY=7;
    cutsound.play();
     score=score+4;
  }
        //assign condtion when knife is touch the strawberry  group
 if(sword.isTouching(strawGroup)){
    strawGroup.destroyEach();
   var slash3=createSprite();
    slash3.addImage(slashstrawImage);
     slash3.scale=1.6;
    slash3.x=World.mouseX;
    slash3.y=World.mouseY;
    slash3.velocityY=7;
    score=score+5;
         cutsound.play();

  }
        //assign condtion when knife is touch the bomb1 group

      if(sword.isTouching(bomb1Group)){
        bomb1Group.destroyEach();
        bombSound.play();
        life=life-1;
      }
            //assign condtion when knife is touch the bomb2 group

       if(sword.isTouching(bomb2Group)){
        bomb2Group.destroyEach();
         bombSound.play();
        life=life-1;
      }
      bomb1();
    bomb2();  
    
      //when life =0then gamestate=end
      if(life===0){
      
        gameState=END;
      }
      //assign condition in END state
     if(gameState===END){
      var gameOver=createSprite(300,200,15,15);
       gameOver.addImage(gameover);
       gameOver.scale=2;
       gameoverSound.play();
       appleGroup.destroyEach();
       melonGroup.destroyEach();
       strawGroup.destroyEach();
       mangoGroup.destroyEach();
       bomb1Group.destroyEach();
       bomb2Group.destroyEach();
       
     }
      
    }
    drawSprites();
  //to create score and life system
  fill("red");
  textSize(30);
  textFont("Jokerman")
  text("Score: "+ score, 400,50);
 fill("lightblue");
  text("Life :"+life,10,50);
  
}
  //create green apple
function greenapple(){
  
  var apple=createSprite(200,500,10,10);
  apple.addImage(appleImage);
apple.x=Math.round(random(50,550));
   apple.velocityY=-6;
  apple.rotationSpeed=3;
   apple.setLifetime=100;
   sword.depth=apple.depth
    sword.depth=sword.depth+1;
  apple.scale=1.5;
   //apple.debug=true;
    apple.setCollider("circle",0,0,10);
  appleGroup.add(apple)
 

  }
//create watermelon
function watermelon(){
  
  var melon=createSprite(250,500,10,10);
  melon.addImage(wmImage);
  melon.scale=0.5;
  melon.x=Math.round(random(50,550));
  melon.velocityY=-5;
  melon.rotationSpeed=3;
   melon.setLifetime=100;
   sword.depth=melon.depth
    sword.depth=sword.depth+1;
//melon.debug=true;
  melon.setCollider("circle",0,0,40);
 melonGroup.add(melon);
  
  }
//create mango 
function mango(){
  
  var mango=createSprite(250,500,10,10);
  mango.addImage(mangoImage);
  mango.scale=0.3;
  mango.x=Math.round(random(50,550));
  mango.velocityY=-5;
  mango.rotationSpeed=3;
   mango.setLifetime=100;
   sword.depth=mango.depth
    sword.depth=sword.depth+1;
 //mango.debug=true;
    mango.setCollider("circle",0,0,40);
  mangoGroup.add(mango);
  
  }

//create strawberry
function strawberry(){
  
  var straw=createSprite(250,500,10,10);
  straw.addImage(strawImage);
  straw.scale=0.2;
  straw.x=Math.round(random(50,550));
  straw.velocityY=-5;
  straw.rotationSpeed=3;
   straw.setLifetime=100;
   sword.depth=straw.depth
    sword.depth=sword.depth+1;
 // straw.debug=true;
    straw.setCollider("circle",0,0,40);
  strawGroup.add(straw);
  
  }
//create bomb1
function bomb1(){
  if(frameCount%200===0){
  var bomb=createSprite(200,10,15,15);
  bomb.addImage(bomb1Image);
  bomb.scale=0.4;
  bomb.x=Math.round(random(50,550));
  bomb.velocityY=4;
  bomb.rotationSpeed=4;
  bomb.setLifetime=100;
   sword.depth=bomb.depth
    sword.depth=sword.depth+1;
    // bomb.debug=true;
    bomb.setCollider("circle",0,0,20);
  bomb1Group.add(bomb);
  }
}
//create bomb2
function bomb2(){
  if(frameCount%300===0){
  var bomb1=createSprite(200,10,15,15);
  bomb1.addImage(bomb2Image);
  bomb1.scale=0.3;
  bomb1.x=Math.round(random(50,550));
  bomb1.velocityY=5;
  bomb1.rotationSpeed=4;
  bomb1.setLifetime=100;
    //bomb1.debug=true;
    bomb1.setCollider("circle",0,0,20);
   sword.depth=bomb1.depth
    sword.depth=sword.depth+1;
    bomb2Group.add(bomb1);
  }
  
}