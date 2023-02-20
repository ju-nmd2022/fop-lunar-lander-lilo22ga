/*

BASIC VISUALS

*/

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

function scenery() {
  //sky - put into loop later for gradient?
  background(20, 15, 30);

  //water
  fill(30, 29, 48);
  noStroke();
  rect(0, 350, width, 100);

  //moon
  fill(150, 100, 0);
  beginShape();
  vertex(450, 50);
  bezierVertex(450, 50, 550, 100, 450, 150);
  bezierVertex(450, 150, 500, 100, 450, 50);
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

function leafIntact() {
  noStroke();
  fill(76, 69, 52);
  beginShape();
  vertex(350, 360);
  bezierVertex(350, 360, 290, 310, 200, 360);
  bezierVertex(200, 360, 290, 410, 350, 360);
  endShape();

  stroke(76, 69, 52);
  strokeWeight(3);
  line(300, 360, 380, 360);
}

/*

MOVEMENT

*/

let y = 140;
let speed = 1;
let acceleration = 0.2;
let gameActive = false;

function keyPressed() {
  if (keyCode === 13) {
    gameActive = true;
  }
}

function draw() {
  scenery();
  leafIntact();
  blob(80, y);

  if (gameActive) {
    y = y + speed;
    speed = speed + acceleration;
  }

  if (y < 40) {
    speed = 1;
  }

  if (y > 350) {
    gameActive = false;
  }

  if (gameActive && keyIsDown(32)) {
    speed = speed - 0.5;
  }
}
