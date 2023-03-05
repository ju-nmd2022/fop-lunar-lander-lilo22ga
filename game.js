function setup() {
  createCanvas(900, 500);
  frameRate(30);
}

/*

VISUALS

*/

function startScreen() {
  background(0, 0, 0);
  fill(255, 255, 255);
  rect(350, 210, 160, 40);
  fill(0, 0, 0);
  textSize(12);
  text("start game", 400, 235);
}

function blob(x, y) {
  //body
  fill(138, 115, 142);
  noStroke();
  beginShape();
  vertex(x, y);
  bezierVertex(x, y, x, y - 40, x + 18, y - 40);
  bezierVertex(x + 20, y - 40, x + 40, y - 40, x + 40, y);
  endShape();

  //legs
  rect(x, y, 6, 6);
  rect(x + 34, y, 6, 6);

  //arms
  rect(x - 5, y - 20, 7, 6);
  rect(x + 36, y - 20, 7, 6);

  //face
  fill(0, 0, 0);
  circle(x + 10, y - 25, 3);
  circle(x + 23, y - 25, 3);
  circle(x + 16, y - 19, 2);
}

function fart(x, y) {
  fill(255, 255, 255);
  circle(x + 19, y + 8, 6);
  circle(x + 22, y + 10, 6);
  circle(x + 19, y + 12, 6);
  circle(x + 16, y + 10, 6);
}

function scenery() {
  //sky

  let yLine = 0;
  const size = 1;

  while (yLine < height) {
    const p = yLine / height;
    stroke(30 + p * 30, 29 + p * 13, 48 + p * 25);
    rect(0, yLine, 900);

    yLine = yLine + size;
  }

  //water
  fill(30, 29, 48);
  noStroke();
  rect(0, 350, width, 150);

  //moon
  fill(150, 100, 0);
  beginShape();
  vertex(800, 50);
  bezierVertex(800, 50, 900, 100, 800, 150);
  bezierVertex(800, 150, 850, 100, 800, 50);
  endShape();

  //startpoint cloud
  noStroke();
  fill(240, 240, 180);
  beginShape();
  vertex(50, 150);
  bezierVertex(50, 150, 100, 110, 150, 150);
  bezierVertex(150, 150, 100, 190, 50, 150);
  endShape();

  circle(50, 150, 20);
  circle(60, 140, 20);
  circle(75, 135, 25);
  circle(90, 135, 30);
  circle(105, 135, 30);
  circle(120, 140, 30);
  circle(135, 145, 30);
  circle(150, 150, 25);
  circle(140, 160, 20);
  circle(125, 165, 20);
  circle(110, 165, 20);
  circle(95, 165, 20);
  circle(80, 165, 20);
  circle(65, 160, 20);
}

function water() {
  fill(30, 29, 48);
  noStroke();
  rect(0, 350, width, 150);
}

function leafIntact() {
  noStroke();
  fill(76, 69, 52);
  beginShape();
  vertex(500, 360);
  bezierVertex(500, 360, 440, 310, 350, 360);
  bezierVertex(350, 360, 440, 410, 500, 360);
  endShape();

  stroke(76, 69, 52);
  strokeWeight(3);
  line(450, 360, 530, 360);
}

function looseScreen() {
  background(0, 0, 0);
  fill(255, 255, 255);
  rect(350, 210, 160, 40);
  fill(255, 0, 0);
  textSize(25);
  noStroke();
  text("Game over", 350, 150);
  fill(0, 0, 0);
  textSize(12);
  text("restart", 400, 235);
}

function winScreen() {
  background(0, 0, 0);
  fill(255, 255, 255);
  rect(350, 210, 160, 40);
  fill(0, 0, 0);
  fill(0, 255, 0);
  textSize(25);
  text("Yay you won", 350, 150);
  fill(0, 0, 0);
  textSize(12);
  text("restart", 400, 235);
}

/*

GAME

*/

let y = 140;
let x = 80;
let ySpeed = 1;
let xSpeed = 3;
let acceleration = 0.2;
let gameActive = false;
let time = 0;

let state = "start";

function draw() {
  //states - change into more readable order?
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    scenery();
    leafIntact();
    blob(x, y);
  } else if (state === "loose") {
    looseScreen();
  } else if (state === "win") {
    winScreen();
  }

  const isOutsideLeaf = x < 350 || x > 500;
  const isOnLeaf = x > 350 && x < 500;

  //static position for fart
  if (gameActive && keyIsDown(32)) {
    fart(x, y);
  }

  //right and left movement
  if (keyIsDown(39) && y < 355 && x < 860) {
    x = x + xSpeed;
  }

  if (keyIsDown(37) && y < 355 && x > 5) {
    x = x - xSpeed;
  }

  //game starting when blob walks off cloud
  if ((x > 160 || x < 20) && y < 355) {
    gameActive = true;
  }

  //down movement
  if (gameActive) {
    y = y + ySpeed;
    ySpeed = ySpeed + acceleration;
    time = 0;
    frameCount = 0;
  }

  //max points for blob
  if (y < 40) {
    ySpeed = 1;
  }

  //stopping point for blob and start time count
  if (y > 355) {
    gameActive = false;
    time = Math.floor(frameCount / 30);
    text(time, 10, 450);

    if (state === "game" && isOutsideLeaf) {
      water();
      leafIntact();
    }
  }

  //up movement
  if (gameActive && keyIsDown(32)) {
    ySpeed = ySpeed - 0.5;
  }

  //state change with certain values and time
  if (isOnLeaf && y >= 355 && ySpeed < 4 && time === 1) {
    state = "win";
  }

  if (isOutsideLeaf && y >= 355 && time === 1) {
    state = "loose";
  }

  if (isOnLeaf && y >= 355 && ySpeed > 4 && time === 1) {
    state = "loose";
  }
}

//buttons for start and restart, reset values
function mouseClicked() {
  if (
    state === "start" &&
    mouseX > 350 &&
    mouseX < 510 &&
    mouseY > 210 &&
    mouseY < 250
  ) {
    state = "game";
  } else if (
    (state === "win" &&
      mouseX > 350 &&
      mouseX < 510 &&
      mouseY > 210 &&
      mouseY < 250) ||
    (state === "loose" &&
      mouseX > 350 &&
      mouseX < 510 &&
      mouseY > 210 &&
      mouseY < 250)
  ) {
    state = "game";
    x = 80;
    y = 140;
    ySpeed = 1;
    gameActive = false;
  }
}
