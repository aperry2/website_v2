let cnv;
let cam;
let pgCam;
let planets = [];
let rot = 0;
let sunColor;
let rotSpeed = 0;
let wordsFont;

function preload() {
  wordsFont = loadFont('PT_Serif/PTSerif-Regular.ttf');
}

function setup() {
  cnv = createCanvas(800, 640, WEBGL);
  centerCanvas();

  cam = createCamera();
  cam.move(0, -400, -100);
  cam.tilt(0.8);
  // background(230);

  cnv.style('z-index', '-1');
  for (let i = 0; i < 6; i++) {
    let p = new Planet(60 * i, 0, random(10, 25), radians(random(360)));
    planets.push(p);
  }
  planets[0].r = 30;
  planets[0].words = "";
  planets[1].r = 10;
  planets[1].words = "Photography";
  planets[2].words = "Installation";
  planets[3].words = "New Media";
  planets[4].words = "Teaching";
  planets[5].words = "About";

  noStroke();
  sunColor = color(255, 255, 255);
  // normalMaterial();
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x,y);
}

function draw() {
  drawActiveCanvas();
  rotSpeed = map(mouseX, 0, width, 0.0001, 0.003);
}

function drawActiveCanvas() {
  background(230);
  // cam.move(0, -400, -100);
  // cam.tilt(0.8);

  // cam = camera(0, -500, ((height/2) / tan(PI/6)) - 100, 0, 0, 0, 0, 1, 0);

  pointLight(sunColor, 0, 0, 0);

  for(let i = 0; i < planets.length; i++) {
    push();
    rotateY(rot + planets[i].off);
    translate(planets[i].x, planets[i].y);
    if (i > 0) {
      fill(255);
    } else {
      emissiveMaterial(sunColor);
    }
    planets[i].show();
    // planets[i].off = planets[i].off + (noise(frameCount) / 50);
    translate(30, 30);
    textFont(wordsFont);
    textSize(24);
    text(planets[i].words, 0, 0);
    pop();
    rot = rot + rotSpeed; // + planet.off;
  }

}


function windowResized() {
  centerCanvas();
}

class Planet {
  constructor(x, y, r, off) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.off = off;
    this.words ="oh no";
  }

  show(mode) {
    // rotateY(frameRate * 0.05);
    sphere(this.r, 12, 12);
  }
}
