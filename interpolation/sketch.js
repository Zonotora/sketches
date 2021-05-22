import Curves from "./curves";
import Profile from "../Profile.json";

export default function sketch(p) {
  let w = p.windowWidth,
    h = 600;
  let points = [];
  let drawPoints = [],
    userPoints = [];
  let numberOfPoints = 5;
  let t = 0;
  let isRunning = false;
  let btnStart, selCurve, inpNumberOfPoints;
  const curves = {
    BEZIER: "Bezier",
    CATMULLROM_UNIFORM: "Uniform Catmull-Rom",
    CATMULLROM_CHORDAL: "Chordal Catmull-Rom",
    CATMULLROM_CENTRIPETAL: "Centripetal Catmull-Rom",
  };
  let curveFunction = (time) => Curves.bezier(p, time, points, drawPoints);

  p.setup = function () {
    p.createCanvas(w, h);
    initDom();
    init();
    p.background(0);
  };
  p.draw = function () {
    if (isRunning) {
      if (t <= 1.0) {
        Curves.show(p, () => curveFunction(t));
      } else if (t <= 1.2) {
        Curves.show(p, () => curveFunction(1.0));
      } else if (t > 1.2) {
        init();
      }

      t += 0.005;
    } else {
      for (let i = 0; i < userPoints.length; i++) {
        const point = userPoints[i];
        p.fill(255);
        p.stroke(255);
        p.circle(point.x, point.y, 5);
      }
    }
  };

  p.mousePressed = function () {
    if (!isRunning) {
      if (
        p.mouseX > 0 &&
        p.mouseX < p.width &&
        p.mouseY > 0 &&
        p.mouseY < p.height
      ) {
        userPoints.push({ x: p.mouseX, y: p.mouseY });
      }
    }
  };

  function start() {
    if (!isRunning) {
      changeCurveFunction();
      init();
    }
    isRunning = btnStart.elt.textContent === "Start";
    btnStart.elt.textContent =
      btnStart.elt.textContent === "Start" ? "Stop" : "Start";
  }

  function clear() {
    if (!isRunning) {
      userPoints = [];
      p.background(0);
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
        curveFunction = (time) => Curves.bezier(p, time, points, drawPoints);
        break;
      case curves.CATMULLROM_UNIFORM:
        curveFunction = (time) =>
          Curves.catmullRom(p, time, points, drawPoints, 0.0);
        break;
      case curves.CATMULLROM_CHORDAL:
        curveFunction = (time) =>
          Curves.catmullRom(p, time, points, drawPoints, 1.0);
        break;
      case curves.CATMULLROM_CENTRIPETAL:
        curveFunction = (time) =>
          Curves.catmullRom(p, time, points, drawPoints, 0.5);
        break;

      default:
        break;
    }
  }

  function initDom() {
    const parentNode = document.getElementsByClassName("p5-DOM")[0];

    let divStart = p.createDiv().addClass(Profile.GridItem);
    btnStart = p.createButton("Start");
    btnStart.mousePressed(start);
    btnStart.parent(divStart);
    btnStart.addClass(Profile.ButtonLight);
    divStart.parent(parentNode);

    let divClear = p.createDiv().addClass(Profile.GridItem);
    let btnClear = p.createButton("Clear Custom Points");
    btnClear.mousePressed(clear);
    btnClear.parent(divClear);
    btnClear.addClass(Profile.ButtonLight);
    divClear.parent(parentNode);

    let divSelCurve = p.createDiv().addClass(Profile.GridItem);
    selCurve = p.createSelect();
    selCurve.option(curves.BEZIER);
    selCurve.option(curves.CATMULLROM_UNIFORM);
    selCurve.option(curves.CATMULLROM_CHORDAL);
    selCurve.option(curves.CATMULLROM_CENTRIPETAL);
    selCurve.parent(divSelCurve);
    selCurve.addClass(Profile.ButtonLight);
    divSelCurve.parent(parentNode);

    let divInpNumberOfPoints = p.createDiv().addClass(Profile.GridItem);
    inpNumberOfPoints = p.createInput();
    inpNumberOfPoints.value("5");
    inpNumberOfPoints.input(input);
    inpNumberOfPoints.parent(divInpNumberOfPoints);
    inpNumberOfPoints.addClass(Profile.ButtonLight);
    divInpNumberOfPoints.parent(parentNode);
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
        points.push({ x: p.random(0, w), y: p.random(0, h) });
      }
    }
    if (selCurve.value() !== curves.BEZIER) {
      points.push({ x: points[0].x, y: points[0].y });
      points.push({ x: points[1].x, y: points[1].y });
      points.push({ x: points[2].x, y: points[2].y });
    }
  }
}
