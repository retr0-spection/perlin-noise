var inc = 0.1;
var scl = 10;
var cols, rows;
var fr;
var zOff = 0;
var particles = [];
var flowField; 
function setup() {
  // put setup code here

  createCanvas(600, 600);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('')


  flowField = new Array(rows*cols)

  for (var i = 0; i < 1000; i++){
    particles[i] = new Particle();
  }
  background(0);

}

function draw() {
  var yOff = 0;
  for (var y = 0; y < rows; y++) {
    var xOff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols
      var r = noise(xOff, yOff, zOff) * TWO_PI * 2;
      // create vector 
      var v = p5.Vector.fromAngle(r);
      v.setMag(0.4);
      flowField[index] = v; 
      xOff += inc;
      // strokeWeight(1)
      // stroke(0, 50); 
      // push();
      // translate(x*scl, y*scl);
      // rotate(v.heading());
      // line(0,0, scl, 0); 

      // pop();
    }
    yOff += inc;
    zOff+= 0.0002;
  }

  for (var i =0; i < particles.length; i++) {
      particles[i].follow(flowField);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
  }

  fr.html(floor(frameRate()));
}
