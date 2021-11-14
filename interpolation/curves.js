class Curves {
  static show(f) {
    background(0);
    fill(255);
    stroke(255);
    f();
  }

  static bezier(time, points, drawPoints) {
    if (points.length === 1) {
      const point = {
        x: points[0].x,
        y: points[0].y,
      };
      const c = lerpColor(color(230, 32, 32), color(230, 214, 32), time);
      push();
      noStroke();
      fill(c);
      circle(point.x, point.y, 10);

      drawPoints.push({
        x: point.x,
        y: point.y,
        c: c,
      });

      for (let i = 0; i < drawPoints.length; i++) {
        const point = drawPoints[i];
        stroke(point.c);
        fill(point.c);
        circle(point.x, point.y, 4);
      }
      pop();
    } else {
      points.forEach((point) => {
        circle(point.x, point.y, 5);
      });
      const ps = [];
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        line(p1.x, p1.y, p2.x, p2.y);
        ps.push({
          x: p1.x + time * (p2.x - p1.x),
          y: Curves.getLinF(p1, p2)(time),
        });
      }

      this.bezier(time, ps, drawPoints);
    }
  }

  static catmullRom(time, points, drawPoints, alpha) {
    Curves.catmullRom_1(time, points, drawPoints, alpha, 0);
  }

  static catmullRom_1(time, points, drawPoints, alpha, index) {
    if (points.length - index < 4) return;
    const parts = points.length - 3;

    if (time > (1 / parts) * (index + 1)) {
      this.catmullRom_1(time, points, drawPoints, alpha, index + 1);
      return;
    }

    const p0 = points[index];
    const p1 = points[index + 1];
    const p2 = points[index + 2];
    const p3 = points[index + 3];

    const getT = (t, p1, p2) => {
      return (
        Math.pow(
          Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2),
          alpha * 0.5
        ) + t
      );
    };
    const add = (p1, p2) => {
      return { x: p1.x + p2.x, y: p1.y + p2.y };
    };
    const mul = (c, p1) => {
      return { x: c * p1.x, y: c * p1.y };
    };

    const t0 = 0.0;
    const t1 = getT(t0, p0, p1);
    const t2 = getT(t1, p1, p2);
    const t3 = getT(t2, p2, p3);

    let t = (t2 - t1) * (time - index * (1 / parts)) * parts + t1;

    const a1 = add(
      mul((t1 - t) / (t1 - t0), p0),
      mul((t - t0) / (t1 - t0), p1)
    );
    const a2 = add(
      mul((t2 - t) / (t2 - t1), p1),
      mul((t - t1) / (t2 - t1), p2)
    );
    const a3 = add(
      mul((t3 - t) / (t3 - t2), p2),
      mul((t - t2) / (t3 - t2), p3)
    );
    const b1 = add(
      mul((t2 - t) / (t2 - t0), a1),
      mul((t - t0) / (t2 - t0), a2)
    );
    const b2 = add(
      mul((t3 - t) / (t3 - t1), a2),
      mul((t - t1) / (t3 - t1), a3)
    );
    const c = add(mul((t2 - t) / (t2 - t1), b1), mul((t - t1) / (t2 - t1), b2));

    let blendColor = lerpColor(
      color(230 - index * 10, 32, 32),
      color(230, 214 - index * 10, 32),
      time
    );

    drawPoints.push({ x: c.x, y: c.y, c: blendColor });

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      circle(point.x, point.y, 5);
    }

    for (let i = 0; i < drawPoints.length; i++) {
      const point = drawPoints[i];
      stroke(point.c);
      fill(point.c);
      circle(point.x, point.y, 6);
    }
  }

  static getLinF(p1, p2) {
    const k = (p2.y - p1.y) / (p2.x - p1.x);
    const m = p2.y - k * p2.x;
    return (x) => k * (p1.x + x * (p2.x - p1.x)) + m;
  }
}
