class SortObject {
  constructor(a, s, f, name) {
    this.a = a;
    this.s = s;
    this.f = f;
    this.name = name;
  }
}

export default class Graph {
  static draw(p, sortObjects) {
    let offset = 5;
    for (let k = 0; k < sortObjects.length; k++) {
      let a = sortObjects[k].a;
      let s = sortObjects[k].s;
      let w =
        sortObjects.length >= 4
          ? (p.width / 3 - offset * (a.length + 1)) / a.length
          : (p.width / sortObjects.length - offset * (a.length + 1)) / a.length;

      let h = Graph.get_height(p, sortObjects.length);
      const arr_x =
        sortObjects.length >= 4
          ? (p.width * (k % 3)) / 3
          : (p.width * k) / sortObjects.length;

      if (sortObjects.length >= 7) {
        if (k < 3) {
          h *= 2;
        } else if (k >= 6) {
          h = 0;
        }
      } else if (sortObjects.length >= 4) {
        if (k >= 3) {
          h = 0;
        }
      } else {
        h = 0;
      }
      for (let i = 0; i < a.length; i++) {
        p.push();
        p.noStroke();
        if (s[i] === 2) {
          p.fill(124, 222, 82);
        } else if (s[i] === 1) {
          p.fill(222, 82, 82);
        } else if (s[i] === 0) {
          p.fill(82, 147, 222);
        } else {
          p.fill(255);
        }
        p.rect(
          offset + i * (w + offset) + arr_x,
          p.height - offset - a[i] - h,
          w,
          a[i]
        );
        p.pop();
      }
    }

    if (sortObjects.length > 0) {
      p.push();
      p.textSize(sortObjects.length > 2 ? 17 : 20);
      p.textFont("Teko");
      p.strokeWeight(2);
      p.fill(255, 255, 255);
      let l = sortObjects.length;
      if (l >= 7) {
        l = 9;
      } else if (l >= 4) {
        l = 6;
      }
      for (let k = 0; k < l; k++) {
        const w =
          sortObjects.length >= 4 ? p.width / 3 : p.width / sortObjects.length;
        const arr_x =
          sortObjects.length >= 4
            ? (p.width * (k % 3)) / 3
            : (p.width * k) / sortObjects.length;
        const h = p.height / Math.ceil(sortObjects.length / 3);
        const num_h = Math.ceil((k + 1) / 3) - 1;
        const obj = sortObjects[k];
        const txt_w = p.textWidth(obj !== undefined ? obj.name : "Undefined");
        const txt_off = 10;

        p.stroke(255, 255, 255);
        p.line(
          arr_x,
          num_h * h + 1,
          arr_x + w / 2 - txt_w / 2 - txt_off,
          num_h * h + 1
        );
        p.line(
          arr_x + w / 2 + txt_w / 2 + txt_off,
          num_h * h + 1,
          arr_x + w,
          num_h * h + 1
        );
        p.line(arr_x + 1, num_h * h, arr_x + 1, num_h * h + h);

        p.noStroke();
        const txt_off_y = sortObjects.length > 2 ? 10 : 14;
        p.text(
          obj !== undefined ? obj.name : "Undefined",
          arr_x + w / 2,
          num_h * h + txt_off_y
        );
      }
      p.stroke(255, 255, 255);
      p.line(p.width - 1, 0, p.width - 1, p.height);
      p.line(0, p.height - 1, p.width, p.height - 1);
      p.pop();
    }
  }

  static add(p, sortObjects, f, name, len) {
    let offset = 5;
    let h = (Graph.get_height(p, sortObjects.length + 1) - offset) / len;
    let a = [];
    let s = [];
    for (let j = 0; j < len; j++) {
      a.push(h * j);
      s.push(-1);
    }
    const sortObj = new SortObject(a, s, f, name);
    sortObjects.push(sortObj);

    if (sortObjects.length === 4 || sortObjects.length === 7) {
      for (let i = 0; i < sortObjects.length - 1; i++) {
        let a_new = [];
        for (let j = 0; j < sortObjects[i].a.length; j++) {
          a_new.push(h * j);
        }
        sortObjects[i].a = a_new;
      }
    }
  }

  static remove(p, sortObjects, index) {
    sortObjects.splice(index, 1);

    if (sortObjects.length === 0) {
      return;
    }
    const offset = 5;
    const h =
      (Graph.get_height(p, sortObjects.length) - offset) /
      sortObjects[0].a.length;
    for (let i = 0; i < sortObjects.length; i++) {
      let a_new = [];
      for (let j = 0; j < sortObjects[i].a.length; j++) {
        a_new.push(h * j);
      }
      sortObjects[i].a = a_new;
    }
  }

  static shuffle(p, sortObjects) {
    for (let k = 0; k < sortObjects.length; k++) {
      let a = sortObjects[k].a;
      let s = sortObjects[k].s;
      for (let i = 0; i < a.length; i++) {
        const r = Math.round(p.random(1) * (a.length - 1));
        const tmp = a[i];
        a[i] = a[r];
        a[r] = tmp;
        s[i] = -1;
      }
    }
  }

  static get_height(p, len) {
    if (len >= 7) {
      return p.height / 3;
    } else if (len >= 4) {
      return p.height / 2;
    } else {
      return p.height;
    }
  }
}
