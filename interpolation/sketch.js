let h = 600;
let points = [];
let drawPoints = [];
let userPoints = [];
let numberOfPoints = 5;
let t = 0;
let isRunning = false;
const curves = {
  BEZIER: "Bezier",
  CATMULLROM_UNIFORM: "Uniform Catmull-Rom",
  CATMULLROM_CHORDAL: "Chordal Catmull-Rom",
  CATMULLROM_CENTRIPETAL: "Centripetal Catmull-Rom",
};
let curveFunction = (time) => Curves.bezier(p, time, points, drawPoints);
let btnStart;
let btnReset;
let selCurve;
let inpNumberOfPoints;

function setup() {
  createCanvas(windowWidth, windowHeight - 60);
  dom();
  init();
  background(0);
}

function dom() {
  DOM.PARENT = document.getElementById("header");

  btnStart = DOM.button(start, "Start");
  btnReset = DOM.button(restart, "Reset");
  selCurve = DOM.dropdown([
    curves.BEZIER,
    curves.CATMULLROM_UNIFORM,
    curves.CATMULLROM_CENTRIPETAL,
    curves.CATMULLROM_CHORDAL,
  ]);
  inpNumberOfPoints = DOM.textfield(input, 5, "Input");
}

function draw() {
  if (isRunning) {
    if (t <= 1.0) {
      Curves.show(() => curveFunction(t));
    } else if (t <= 1.2) {
      Curves.show(() => curveFunction(1.0));
    } else if (t > 1.2) {
      init();
    }

    t += 0.005;
  } else {
    for (let i = 0; i < userPoints.length; i++) {
      const point = userPoints[i];
      fill(255);
      stroke(255);
      circle(point.x, point.y, 5);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function mousePressed() {
  if (!isRunning) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      userPoints.push({ x: mouseX, y: mouseY });
    }
  }
}

function start() {
  if (!isRunning) {
    changeCurveFunction();
    init();
  }
  isRunning = btnStart.elt.textContent === "Start";
  btnStart.elt.textContent =
    btnStart.elt.textContent === "Start" ? "Stop" : "Start";
}

function restart() {
  if (!isRunning) {
    userPoints = [];
    background(0);
  }
}

function input() {
  try {
    numberOfPoints = parseInt(this.value());
  } catch (e) {
    numberOfPoints = 5;
  }
}

function changeCurveFunction() {
  switch (selCurve.value()) {
    case curves.BEZIER:
      curveFunction = (time) => Curves.bezier(time, points, drawPoints);
      break;
    case curves.CATMULLROM_UNIFORM:
      curveFunction = (time) =>
        Curves.catmullRom(time, points, drawPoints, 0.0);
      break;
    case curves.CATMULLROM_CHORDAL:
      curveFunction = (time) =>
        Curves.catmullRom(time, points, drawPoints, 1.0);
      break;
    case curves.CATMULLROM_CENTRIPETAL:
      curveFunction = (time) =>
        Curves.catmullRom(time, points, drawPoints, 0.5);
      break;

    default:
      break;
  }
}

function init() {
  t = 0;
  points = [];
  drawPoints = [];
  if (userPoints.length !== 0) {
    for (let i = 0; i < userPoints.length; i++) {
      points.push({ x: userPoints[i].x, y: userPoints[i].y });
    }
  } else {
    for (let i = 0; i < numberOfPoints; i++) {
      points.push({ x: random(0, windowWidth), y: random(0, h) });
    }
  }
  if (selCurve.value() !== curves.BEZIER) {
    points.push({ x: points[0].x, y: points[0].y });
    points.push({ x: points[1].x, y: points[1].y });
    points.push({ x: points[2].x, y: points[2].y });
  }
}
