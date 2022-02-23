var bk_img;
var player,playerImage,playerImageWalk;
var zombie,zombieGroup,zombieImage;
var bullet,bulletImg;
var playerMoving = false;
var score = 0;
function preload(){
bk_img = loadImage("./assets/background.jpg");
playerImageWalk = loadAnimation("./assets/gunman1.png","./assets/gunman2.png","./assets/gunman3.png","./assets/gunman4.png","./assets/gunman5.png","./assets/gunman6.png");
playerImage = loadImage("assets/gunman2.png");
zombieImage = loadAnimation("assets/zombie1.png","assets/zombie2.png","assets/zombie3.png","assets/zombie4.png","assets/zombie5.png","assets/zombie6.png","assets/zombie7.png","assets/zombie8.png");
bulletImg = loadImage("assets/bullet.jpg");
}

function setup(){
createCanvas(windowWidth,windowHeight);

zombieGroup = new Group();
player = createSprite(width/2 - 800,height/2 + 200)
player.addImage('walk',playerImage);
player.addAnimation('player',playerImageWalk);
}

function draw(){
background(bk_img)

if(playerMoving == false){
    player.changeImage('walk');
}else{
    player.changeAnimation('player');
}
if(keyDown(RIGHT_ARROW)){
    player.position.x += 5;
    playerMoving = true;
    player.mirrorX(1);
}
if(keyWentUp(RIGHT_ARROW)){
    playerMoving = false;
}
if(keyDown(LEFT_ARROW)){
    player.position.x -= 5;
    playerMoving = true;
    player.mirrorX(-1);
}
if(keyWentUp(LEFT_ARROW)){
    playerMoving = false;
}

if(bullet.isTouching(zombieGroup)){
    bullet.remove();
    zombie.remove();
    score += 1;
}

if(frameCount % 340 == 0){
    var zombie = createSprite(random(900,width),height/2 + 200);
    zombie.addAnimation('zombie',zombieImage);
    zombie.scale = 0.5;
    zombieGroup.add(zombie);
    zombie.mirrorX(-1);
    zombie.velocity.x = -5;
}

drawSprites();
}

function keyPressed(){
if(keyCode == 32 && frameCount % 5 == 0){
    var bullet = createSprite(player.position.x + 100,player.position.y - 40);
    bullet.addImage(bulletImg);
    bullet.scale = 0.03;
    bullet.velocity.x = 4;
    bullet.lifetime = 200;
}
}