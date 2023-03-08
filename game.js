function setup() {
  createCanvas(900, 500);
  frameRate(30);
}

/*

VISUALS

*/

function startScreen() {
  background(0, 0, 0);
  textSize(40);
  fill(60, 42, 73);
  text("BLOB LANDER", 290, 160);
  fill(255, 255, 255);
  textSize(10);
  text("HELP THE BLOB LAND SAFELY ON THE LEAF", 320, 200);
  text("MOVE WITH                            AND SPACEBAR", 320, 230);
  rect(400, 223, 12, 5);
  rect(420, 223, 12, 5);
  triangle(400, 233, 390, 225, 400, 218);
  triangle(432, 233, 442, 225, 432, 218);
  fill(60, 42, 73);
  rect(350, 280, 140, 40);
  fill(255, 255, 255);
  textSize(12);
  text("START", 400, 305);
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

  //cloud
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

function leaf(leafX, leafY) {
  noStroke();
  fill(76, 69, 52, opacity);
  beginShape();
  vertex(leafX, leafY);
  bezierVertex(leafX, leafY, leafX - 50, leafY - 50, leafX - 150, leafY);
  bezierVertex(leafX - 150, leafY, leafX - 60, leafY + 50, leafX, leafY);
  endShape();

  stroke(76, 69, 52, opacity);
  strokeWeight(3);
  line(leafX, leafY, leafX + 30, leafY);
}

function looseScreen() {
  background(0, 0, 0);
  noStroke();
  textSize(40);
  fill(60, 42, 73);
  text("GAME", 305, 190);
  fill(255, 0, 0);
  text("OVER", 435, 190);
  fill(60, 42, 73);
  rect(350, 280, 140, 40);
  fill(255, 255, 255);
  textSize(12);
  text("RESTART", 394, 305);
  fill(255, 255, 255);
  textSize(10);
  text("THE BLOB TRUSTED YOU...", 355, 230);
}

function winScreen() {
  background(0, 0, 0);
  noStroke();
  textSize(40);
  fill(60, 42, 73);
  text("GAME", 360, 140);
  fill(0, 255, 0);
  text("COMPLETED!", 295, 190);
  fill(60, 42, 73);
  rect(350, 280, 140, 40);
  fill(255, 255, 255);
  textSize(12);
  text("RESTART", 394, 305);
  fill(255, 255, 255);
  textSize(10);
  text("THE BLOB IS FOREVER GRATEFUL", 340, 230);
}

/*

GAME

*/

let y = 140;
let x = 80;
let leafY = 360;
let leafX = 500;
let ySpeed = 1;
let xSpeed = 3;
let acceleration = 0.2;
let gameActive = false;
let time = 0;
let opacity = 255;
let opacitySpeed = 0.5;
let leafSpeed = 1;
let opacityAcceleration = 0.2;

let state = "start";

function draw() {
  //states
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    scenery();
    leaf(leafX, leafY);
    blob(x, y);
  } else if (state === "loose") {
    looseScreen();
  } else if (state === "win") {
    winScreen();
  }

  const isOutsideLeaf = x < 350 || x > 500;
  const isOnLeaf = x > 350 && x < 500;
  const button = mouseX > 350 && mouseX < 490 && mouseY > 280 && mouseY < 320;

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

    opacity = opacity - opacitySpeed;
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

    if (
      (state === "game" && isOutsideLeaf) ||
      (state === "game" && isOnLeaf && opacity < 180)
    ) {
      water();
      leaf(leafX, leafY);
    }
  }

  //opacity of leaf accelerating as it moves
  if (opacity < 180) {
    leafY = leafY + leafSpeed;
    opacitySpeed = opacitySpeed + opacityAcceleration;
  }

  //up movement
  if (gameActive && keyIsDown(32)) {
    ySpeed = ySpeed - 0.5;
  }

  //state change with certain values and time
  if (isOnLeaf && y >= 355 && ySpeed < 3 && time === 1) {
    state = "win";
  }

  if (isOutsideLeaf && y >= 355 && time === 1) {
    state = "loose";
  }

  if (
    (isOnLeaf && y >= 355 && ySpeed > 3 && time === 1) ||
    (isOnLeaf && y >= 355 && opacity < 180 && time === 1)
  ) {
    state = "loose";
  }
}

//buttons for start and restart, reset values
function mouseClicked() {
  if (
    state === "start" &&
    mouseX > 350 &&
    mouseX < 490 &&
    mouseY > 280 &&
    mouseY < 320
  ) {
    state = "game";
  } else if (
    (state === "win" &&
      mouseX > 350 &&
      mouseX < 490 &&
      mouseY > 280 &&
      mouseY < 320) ||
    (state === "loose" &&
      mouseX > 350 &&
      mouseX < 490 &&
      mouseY > 280 &&
      mouseY < 320)
  ) {
    state = "game";
    x = 80;
    y = 140;
    leafY = 360;
    ySpeed = 1;
    opacity = 255;
    leafSpeed = 1;
    opacitySpeed = 0.5;
    opacityAcceleration = 0.2;
    gameActive = false;
  }
}
