var paddle, ball;
var wallTop, wallBottom, wallLeft, wallRight;
var bricks;
var losingSound;
var bounceSound;
var brickSound;
var points;

function preload() {
  losingSound = loadSound("Assets/losing.wav");
  bounceSound = loadSound("Assets/bounce.wav");
  brickSound = loadSound("Assets/brickTouch.wav");
}

function setup() {
  createCanvas(450, 400);

  points = 0;

  //paddle sprite
  paddle = createSprite(200, 380, 100, 5);
  paddle.shapeColor = "black";
  paddle.immovable = true;

  bricks = new Group();

  //ball sprite
  ball = createSprite(150, 250, 15, 15);
  ball.shapeColor = "orange";

  //Top edge
  wallTop = createSprite(225, 0, 450, 5);
  wallTop.shapeColor = "gray";
  wallTop.immovable = true;

  //Bottom edge
  wallBottom = createSprite(225, 400, 450, 5);
  wallBottom.shapeColor = "gray";
  wallBottom.immovable = true;

  //Left edge
  wallLeft = createSprite(0, 200, 5, 400);
  wallLeft.shapeColor = "gray";
  wallLeft.immovable = true;

  //Right edge
  wallRight = createSprite(450, 200, 5, 400);
  wallRight.shapeColor = "gray";
  wallRight.immovable = true;

  //draw bricks
  function createBrickRow(y) {
    for (var x = 55; x < 400; x = x + 55) {
      var brick = createSprite(x, y, 50, 20);
      brick.shapeColor = "brown";
      brick.immovable = true;
      bricks.add(brick);
    }
  }

  //Row 1 : y : 75
  createBrickRow(75);
  //Row 2 : y : 100
  createBrickRow(100);
  //Row 3 : y : 125
  createBrickRow(125);
}

function draw() {
  background("honeydew");

  text("Score : ", 360, 30);
  text(points, 400, 30);

  paddle.position.x = mouseX;

  if (mouseIsPressed) {
    ball.velocity.x = 1; // Left or Right
    ball.velocity.y = 1; // Top to Bottom
    ball.setSpeed(4);
  }

  ball.bounce(wallLeft);
  ball.bounce(wallRight);
  ball.bounce(wallTop);

  ball.bounce(bricks, brickHit);
  ball.bounce(paddle, playSound);
  ball.bounce(wallBottom, endgame);

  drawSprites();
}

function brickHit(ball, brick) {
  brick.remove();
  points = points + 1;
  brickSound.play();
}

function endgame() {
  ball.remove();
  paddle.remove();
  losingSound.play();
}

function playSound() {
  bounceSound.play();
}
