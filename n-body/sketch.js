let planets = [];
let velX = 0,
  velY = 0;
let G = 1;
let isRunning = false;
let dt = 0.001;
let h = 0;

function setup() {
  h = windowHeight - 60;
  createCanvas(windowWidth, h);
  dom();
  figure8();
}
function draw() {
  background(0, 0, 0, 10);
  translate(windowWidth / 2, h / 2);
  scale(300);

  for (let k = 0; k < 10; k++) {
    // update velocity and position
    if (isRunning) {
      for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        planet.updateVelocity(planets, G, dt);
      }
      for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        planet.updatePosition(dt);
      }
    }
  }

  // draw planets
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    planet.show(false);
  }

  //calculatePath();
}

function mousePressed() {
  if (!isRunning) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      const pos = createVector(
        (mouseX - width / 2) / 300,
        (mouseY - height / 2) / 300
      );
      const vel = createVector(velX, velY);
      const radius = 0.1;
      const mass = 1;
      planets.push(new Planet(pos, vel, radius, mass));
      console.log(planets);
    }
  }
}

function calculatePath() {
  const paths = new Array(planets.length);
  const tempPlanets = [];
  const iterations = 100;

  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    tempPlanets.push(
      new Planet(
        planet.pos.copy(),
        planet.vel.copy(),
        planet.radius,
        planet.mass
      )
    );
  }
  // calculate the path through a set of iterations
  for (let j = 0; j < iterations; j++) {
    for (let i = 0; i < tempPlanets.length; i++) {
      const planet = tempPlanets[i];
      planet.updateVelocity(planets, G, dt);
    }

    for (let i = 0; i < tempPlanets.length; i++) {
      const planet = tempPlanets[i];
      if (paths[i] === undefined) paths[i] = [];

      planet.updatePosition(dt);
      paths[i].push({ x: planet.pos.x, y: planet.pos.y });
    }
  }

  // draw the path
  noFill();
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    stroke(planet.color);
    beginShape();
    for (let j = 0; j < paths[i].length; j++) {
      const path = paths[i];
      curveVertex(path[j].x, path[j].y);
    }
    endShape();
  }
}

function figure8() {
  background(0);
  planets = [];

  const p1 = createVector(0.97000436, -0.24308753);
  const p2 = createVector(-0.97000436, 0.24308753);
  const p3 = createVector(0, 0);
  const v1 = createVector(0.93240737 / 2, 0.86473146 / 2);
  const v2 = createVector(0.93240737 / 2, 0.86473146 / 2);
  const v3 = createVector(-0.93240737, -0.86473146);

  planets.push(new Planet(p1, v1, 0.1, 1));
  planets.push(new Planet(p2, v2, 0.1, 1));
  planets.push(new Planet(p3, v3, 0.1, 1));
}

function dom() {
  DOM.PARENT = document.getElementById("header");

  DOM.button((button) => {
    isRunning = button.elt.textContent === "Start";
    button.elt.textContent =
      button.elt.textContent === "Start" ? "Stop" : "Start";
  }, "Start");

  DOM.button((button) => {
    planets = [];
  }, "Clear");

  DOM.textfield(
    (textfield) => {
      try {
        velX = parseFloat(textfield.value());
      } catch (e) {
        velX = 0;
      }
    },
    velX,
    "Velocity x"
  );

  DOM.textfield(
    (textfield) => {
      try {
        velY = parseFloat(textfield.value());
      } catch (e) {
        velY = 0;
      }
    },
    velY,
    "Velocity y"
  );

  DOM.textfield(
    (textfield) => {
      try {
        dt = parseFloat(textfield.value());
      } catch (e) {
        dt = 0.8;
      }
    },
    dt,
    "Delta time"
  );
}
