class Planet {
  constructor(position, velocity, radius, mass) {
    this.pos = position;
    this.vel = velocity;
    this.radius = radius;
    this.mass = mass;
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
    this.trail = [];
  }

  updateVelocity(planets, G, dt) {
    const acceleration = createVector(0, 0);
    for (let i = 0; i < planets.length; i++) {
      const other = planets[i];
      if (this.pos === other.pos) continue;

      const dif = other.pos.copy().sub(this.pos);
      const dir = dif.copy().normalize();
      const dstSq = dif.copy().magSq();

      const a = (G * other.mass) / dstSq;
      acceleration.add(dir.mult(a));
    }
    this.vel.add(acceleration.mult(dt));
  }

  updatePosition(dt) {
    this.pos.add(this.vel.copy().mult(dt));
  }

  show(showTrail) {
    noStroke();
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.radius);

    if (showTrail) {
      this.trail.push({ x: this.pos.x, y: this.pos.y });
      strokeWeight(0.05);
      stroke(this.color);
      noFill();
      beginShape();
      for (let i = 0; i < this.trail.length; i++) {
        curveVertex(this.trail[i].x, this.trail[i].y);
      }
      endShape();
    }
  }
}

Planet.show = function () {};
