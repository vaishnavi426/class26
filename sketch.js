const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon;
var score = 0;
var cannonball;
var balls=[];
var boat1;
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var options = {
    isStatic: true
  }

  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);

  //boat1 = new Boat(width-80,height-100,170,170,-80);
}

function draw() {

  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  cannon.display();
  for(var i=0; i<balls.length;i++) {
    showCannonBalls(balls[i],i);
    collisionWithBoat(i);
  }
  showBoats();
}

function keyReleased() {
  if(keyCode==UP_ARROW){
    balls[balls.length-1].shoot();
  }
}

function keyPressed() {
  if(keyCode==UP_ARROW) {
    cannonball = new CannonBall(cannon.x,cannon.y);
    balls.push(cannonball);
  }
}

function showCannonBalls(ball,i){
  if(ball) {
    ball.display();
    if(ball.body.position.x>=width || ball.body.position.y>=height-50) {
      ball.remove(i);
    }
  }
}

function showBoats(){
 if(boats.length>0) {
   if(boats[boats.length-1].body.position.x<width-400 || boats[boats.length-1]==undefined){
     var position = random(-50,-70,-30);
     var boat = new Boat(width-80,height-100,170,170,-80);
     boats.push(boat);
   }
    for(var i=0;i<boats.length;i++){
      if(boats[i]) {
        Matter.Body.setVelocity(boats[i].body,{
          x: -0.8,
          y: 0,
        })
        boats[i].display();
      }
    } 
  }
  else{
   var boat = new Boat(width-80,height-60,170,170,-80);
   boats.push(boat);
  }
}

function collisionWithBoat(index){
  for(var i=0;i<boats.length;i++){
    if(balls[index]!==undefined && boats[i]!==undefined){
      var collision = Matter.SAT.collides(balls[index].body,boats[i].body);
      if(collision.collided){
        boats[i].remove(i);
        balls[index].remove(index);
      }
    }
  }
}