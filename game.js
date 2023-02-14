function draw() {
  background(20, 15, 30);

  fill(20, 20, 40);
  noStroke();
  rect(0, 350, width, 100);

  push();
  fill(150, 100, 0);
  beginShape();
  vertex(450, 50);
  bezierVertex(450, 50, 550, 100, 450, 150);
  bezierVertex(450, 150, 500, 100, 450, 50);
  endShape();
  pop();
}
