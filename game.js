// BASIC VISUALS

function draw() {
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

  //leafIntact - put into function instead
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

  //startpoint cloud - put in function for movement?
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

  //blob - put in function
  fill(138, 115, 142);
  noStroke();
  beginShape();
  vertex(80, 140);
  bezierVertex(80, 140, 80, 100, 100, 100);
  bezierVertex(100, 100, 120, 100, 120, 140);
  endShape();

  rect(80, 140, 6, 6);
  rect(114, 140, 6, 6);

  rect(75, 120, 7, 6);
  rect(116, 120, 7, 6);

  fill(0, 0, 0);
  circle(90, 115, 3);
  circle(103, 115, 3);
  circle(96, 121, 2);
}
