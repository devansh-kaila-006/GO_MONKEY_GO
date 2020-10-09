var monkey,mm;
var banana,bb;
var stone ,ss;
var ground,gg;
var back  ,bg;
var bananaGroup,rockGroup;
var count,st,score;
var PLAY,END;
localStorage["HighScore"] = 0;

function preload(){
 mm = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png",     "Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png",     "Monkey_08.png","Monkey_09.png","Monkey_10.png");
 bb = loadImage("banana.png");
 ss = loadImage("stone.png");
 bg = loadImage("jungle.jpg"); 
  
}

function setup() {
  createCanvas(500, 300);
  
  back = createSprite(250,150,10,10);
  back.addAnimation("jungle",bg);
  back.scale=0.52;
  
  monkey = createSprite(50,250,20,20);
  monkey.addAnimation("#Orangotan",mm);
  monkey.setCollider("circle",0,0,225)
  monkey.scale=0.085;
  
  ground = createSprite(250,280,500,20);
  
  bananaGroup = createGroup();
  rockGroup   = createGroup();
  
  count = 0;
  st = 0;
  score = 0;

  PLAY = 1;
  END = 0; 
  gameState = PLAY;
  
  }

function draw() {
  background(220);
  
  ground.visible=false;  
  monkey.collide(ground); 
  //monkey.debug=true;
  
  if(gameState === PLAY){ 
  
st = st - Math.round(World.frameRate/60) + Math.round(World.frameRate/25);
  
    if(ground.x < 0){
  ground.x=ground.width/2;
  
  }
  
  if(keyDown("space") && monkey.y >= 229){
    monkey.velocityY=-14;
    
  }
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    count = count + 1;
    score=score + 2;
  }
      
  if(monkey.isTouching(rockGroup)){
    monkey.pause();
    gameState = END;
    
  }
  
  monkey.velocityY=monkey.velocityY+1; 
   
   switch(score){
        
     case 20: monkey.scale = 0.095;
     break;
     case 30: monkey.scale = 0.105;
     break;
     case 40: monkey.scale = 0.115;
     break;
     case 50: monkey.scale = 0.125;
     break;
     case 60: monkey.scale = 0.135;
     break;
     case 70: monkey.scale = 0.145;
     break;    
     
   } 
    
     switch(score){
     
     case Math.round(random(0,8)): rockGroup.setScaleEach(0.135);
     break;    
     case Math.round(random(9,20)): rockGroup.setScaleEach(0.145);
     break;
     case Math.round(random(19,30)): rockGroup.setScaleEach(0.155);
     break;
     case Math.round(random(29,40)): rockGroup.setScaleEach(0.165);
     break;
     case Math.round(random(39,50)): rockGroup.setScaleEach(0.175);
     break;
     case Math.round(random(49,60)): rockGroup.setScaleEach(0.185);
     break;
     case Math.round(random(59,70)): rockGroup.setScaleEach(0.195);
     break;    
     
   }  
    
    if(score > 69){
      rockGroup.setScaleEach(0.195);
      bananaGroup.setScaleEach(0.07);
    }
    
    
  food();
  rocks();
 
 }
 
 else if(gameState === END){
   
   monkey.velocityY=0;
   
   bananaGroup.setVelocityXEach(0);
   rockGroup.setVelocityXEach(0);
   
   bananaGroup.setLifetimeEach(-1);
   rockGroup.setLifetimeEach(-1);
   
   
   if(keyDown("A")){
     reset();
     count=0;
     st=0;
     score=0;
     monkey.scale=0.085;
   }
   
 }
 
 drawSprites();
  
  if(gameState === END){
    
   fill("red");
   textSize(50);
   textFont("Georgia");
   textStyle(BOLD);
   text("GAME OVER",95,125);
   textSize(20);
   text("Click A to restart",175,165);
   
  }
  

fill("red");  
textSize(20);
textFont("Georgia");
textStyle(BOLD);
text("Bananas Collected : "+count,5,30);  
text("Survival Time : "+st,250,30); 
text("Score : "+score,5,60);
text("Highest Survival : "+localStorage["HighScore"],250,60);
  
}

function reset(){
  
  gameState = PLAY;
  
  bananaGroup.destroyEach();
  rockGroup.destroyEach();
  
  monkey.play();
  
  if(localStorage["HighScore"] < st){
    localStorage["HighScore"] = st;
  }  
}

function food(){
  if(frameCount % 80 === 0){
    
  banana = createSprite(610,random(150,230),20,20);
  banana.addAnimation("Banana",bb);
  
  banana.scale=0.05;
  
  banana.velocityX=-(9+3*count/100);
  banana.lifetime=150;

  bananaGroup.add(banana);
    
   
  }   
}

function rocks(){
  if(frameCount % 150 === 0){
    
  rock = createSprite(530,250,20,20);
  rock.addAnimation("Stone",ss);
    
  rock.setCollider("circle",0,0,205);
  rock.scale=0.135;
    
  //rock.debug=true
  rock.velocityX=-(9+3*count/100);
  rock.lifetime=150;

  rockGroup.add(rock);
    
  
  }  
}
 