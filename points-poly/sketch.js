import DOMCreator from "../dom";

export default function sketch(p) {
  let points = [];
  const w = p.windowWidth,
    h = 600;
  let numberOfPoints = 80;
  let maxSpeed = 2;
  let minDistance = 100;
  let mouseDistance = 150;
  let force = 100;
  let deacceleration = 100;
  let drag = false;

  p.setup = function () {
    p.createCanvas(w, h);
    p.colorMode(p.HSB, 100);
    initDom();
    init();
  };
  p.draw = function () {
    p.background(0);
    update();

    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      point.acceleration.x =
        Math.abs(point.speed.x) > maxSpeed
          ? -point.speed.x / deacceleration
          : 0;
      point.acceleration.y =
        Math.abs(point.speed.y) > maxSpeed
          ? -point.speed.y / deacceleration
          : 0;

      point.speed.add(point.acceleration);
      point.position.add(point.speed);

      p.noStroke();
      const v = p.map(point.position.x, 0, w, 0, 100);
      p.fill(v, 100, 100);

      if (point.position.x < 0) point.position.x = w;
      else if (point.position.x > w) point.position.x = 0;
      if (point.position.y < 0) point.position.y = h;
      else if (point.position.y > h) point.position.y = 0;

      for (let j = 0; j < points.length; j++) {
        const other = points[j];
        if (other.position === point.position) continue;

        const d = point.position.dist(other.position);

        if (d < minDistance) {
          const val = p.map(
            point.position.x / 2 + other.position.x / 2,
            0,
            w,
            0,
            100
          );
          p.stroke(val, 100, 100);
          p.line(
            point.position.x,
            point.position.y,
            other.position.x,
            other.position.y
          );
        }
      }

      p.circle(point.position.x, point.position.y, 5);
    }
  };

  p.mousePressed = function () {
    drag = true;
  };

  p.mouseReleased = function () {
    drag = false;
  };

  function init() {
    points = [];
    for (let i = 0; i < numberOfPoints; i++) {
      points.push({
        position: p.createVector(p.random(0, w), p.random(0, h)),
        speed: p.createVector(
          p.random(-maxSpeed, maxSpeed),
          p.random(-maxSpeed, maxSpeed)
        ),
        acceleration: p.createVector(0, 0),
      });
    }
  }

  function initDom() {
    const domCreator = new DOMCreator(p);

    domCreator.textfield(
      (textfield) => {
        try {
          numberOfPoints = parseInt(textfield.value());
          init();
        } catch (e) {
          numberOfPoints = 80;
        }
      },
      numberOfPoints,
      "Points"
    );

    domCreator.textfield(
      (textfield) => {
        try {
          maxSpeed = parseInt(textfield.value());
        } catch (e) {
          maxSpeed = 2;
        }
      },
      maxSpeed,
      "Max Speed"
    );

    domCreator.textfield(
      (textfield) => {
        try {
          minDistance = parseInt(textfield.value());
        } catch (e) {
          minDistance = 100;
        }
      },
      minDistance,
      "Min Distance Points"
    );

    domCreator.textfield(
      (textfield) => {
        try {
          mouseDistance = parseInt(textfield.value());
        } catch (e) {
          mouseDistance = 150;
        }
      },
      mouseDistance,
      "Min Distance Mouse"
    );

    domCreator.textfield(
      (textfield) => {
        try {
          force = parseInt(textfield.value());
        } catch (e) {
          force = 100;
        }
      },
      force,
      "Force"
    );

    domCreator.textfield(
      (textfield) => {
        try {
          deacceleration = parseInt(textfield.value());
        } catch (e) {
          deacceleration = 100;
        }
      },
      deacceleration,
      "Deacceleration"
    );
  }

  function update() {
    if (drag) {
      const other = p.createVector(p.mouseX, p.mouseY);
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const d = point.position.dist(other);

        if (d < mouseDistance) {
          const directedForce = point.position
            .copy()
            .sub(other)
            .normalize()
            .mult(force / d);

          point.speed.add(directedForce);
        }
      }
    }
  }
}
