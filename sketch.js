var player, barn, animal;
var playerImg, barnImg, cowImg, pigImg, chickImg;
var aniGroup, reset;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload(){
    playerImg = loadImage("player.png");
    bg = loadImage("bg.webp");
    barnImg = loadImage("Barn.png");
    cowImg = loadImage("cow.png");
    pigImg = loadImage("pig.jpg");
    chickImg = loadImage("chick.png");
}

function setup(){
   createCanvas(600,600);
    
    player = createSprite(150,300,10,10);
    player.addImage(playerImg);
    player.setCollider("rectangle",0,0,40,55);
    barn = createSprite(550,150,10,10);
    barn.addImage(barnImg);

    aniGroup = new Group();

    //reset = createButton("Restart");
    //reset.position(300,550);
}

function draw(){
    background(bg);        
    
    if(gameState === PLAY){
        if(keyDown("w")){
            player.y = player.y-4;
        }
    
        if(keyDown("a")){
            player.x = player.x-4;
        }
    
        if(keyDown("d")){
            player.x = player.x+4;
        }
    
        if(keyDown("s")){
            player.y = player.y+4;
        }
    
        spawnAnimals();
        reset.hide();
        score = score+Math.round(getFrameRate()/50);

        if(aniGroup.collide(player)){
            gameState = END;
        }
    }else if(gameState === END){
        aniGroup.setVelocityYEach(0);
        aniGroup.setLifetimeEach(-1);
        //reset.show();
        
    }
    text("Score: "+score,300,100);
    drawSprites();
}


    function spawnAnimals(){
        if(frameCount%35===0){
            animal = createSprite(325,600,50,50);
            animal.velocityY = -6;
            animal.x = Math.round(random(320,370));
            animal.lifetime = 65;
            animal.scale = 0.18;
            animal.setCollider("rectangle",0,0,200,250);
            var rn = Math.round(random(1,3));
            switch(rn){
                case 1: animal.addImage(cowImg);
                    break;
                case 2: animal.addImage(pigImg);
                    break;
                case 3: animal.addImage(chickImg);
                    break;
                default: break;
            }
            aniGroup.add(animal);
        }
    }


