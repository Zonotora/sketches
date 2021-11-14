let points = [];
let numberOfPoints = 80;
let maxSpeed = 2;
let minDistance = 100;
let mouseDistance = 150;
let force = 100;
let deacceleration = 100;
let drag = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  dom();
  init();
}

function draw() {
  background(0);
  update();

  for (let i = 0; i < points.length; i++) {
    const point = points[i];

    point.acceleration.x =
      Math.abs(point.speed.x) > maxSpeed ? -point.speed.x / deacceleration : 0;
    point.acceleration.y =
      Math.abs(point.speed.y) > maxSpeed ? -point.speed.y / deacceleration : 0;

    point.speed.add(point.acceleration);
    point.position.add(point.speed);

    noStroke();
    const v = map(point.position.x, 0, windowWidth, 0, 100);
    fill(v, 100, 100);

    if (point.position.x < 0) point.position.x = windowWidth;
    else if (point.position.x > windowWidth) point.position.x = 0;
    if (point.position.y < 0) point.position.y = windowHeight;
    else if (point.position.y > windowHeight) point.position.y = 0;

    for (let j = 0; j < points.length; j++) {
      const other = points[j];
      if (other.position === point.position) continue;

      const d = point.position.dist(other.position);

      if (d < minDistance) {
        const val = map(
          point.position.x / 2 + other.position.x / 2,
          0,
          windowWidth,
          0,
          100
        );
        stroke(val, 100, 100);
        line(
          point.position.x,
          point.position.y,
          other.position.x,
          other.position.y
        );
      }
    }

    circle(point.position.x, point.position.y, 5);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function mousePressed() {
  drag = true;
}

function mouseReleased() {
  drag = false;
}

function init() {
  points = [];
  for (let i = 0; i < numberOfPoints; i++) {
    points.push({
      position: createVector(random(0, windowWidth), random(0, windowHeight)),
      speed: createVector(
        random(-maxSpeed, maxSpeed),
        random(-maxSpeed, maxSpeed)
      ),
      acceleration: createVector(0, 0),
    });
  }
}

function dom() {
  DOM.PARENT = document.getElementById("header");

  DOM.textfield(
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

  DOM.textfield(
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

  DOM.textfield(
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

  DOM.textfield(
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

  DOM.textfield(
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

  DOM.textfield(
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
    const other = createVector(mouseX, mouseY);
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
