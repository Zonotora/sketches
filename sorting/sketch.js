const algorithms = {
  SELECTION: "Selection Sort",
  QUICKSORT: "Quicksort",
  COCKTAIL: "Cocktail Sort",
  BUBBLE: "Bubble Sort",
  INSERTION: "Insertion Sort",
  SHELL: "Shell Sort",
  MERGE: "Merge Sort",
};
let sortObjects = [];
let selectionDom;
let h = 0;

function setup() {
  h = windowHeight - 60;
  createCanvas(windowWidth, h);
  background(0);
  dom();
}

function sortEvent() {
  for (let i = 0; i < sortObjects.length; i++) {
    const sortObj = sortObjects[i];
    sortObj.f(sortObj.a, sortObj.s);
  }
}

function shuffleEvent() {
  Graph.shuffle(sortObjects);
}

function addEvent() {
  if (sortObjects.length >= 9) {
    return;
  }
  let f = Sorting.selection;
  switch (selectionDom.value()) {
    case algorithms.SELECTION:
      f = Sorting.selection;
      break;
    case algorithms.QUICKSORT:
      f = Sorting.quicksort;
      break;
    case algorithms.COCKTAIL:
      f = Sorting.cocktail;
      break;
    case algorithms.BUBBLE:
      f = Sorting.bubble;
      break;
    case algorithms.INSERTION:
      f = Sorting.insertion;
      break;
    case algorithms.SHELL:
      f = Sorting.shell;
      break;
    case algorithms.MERGE:
      f = Sorting.merge;
      break;
    default:
      f = Sorting.selection;
      break;
  }
  Graph.add(sortObjects, f, selectionDom.value(), 50);
  Graph.shuffle(sortObjects);
}

function removeEvent() {
  const w = sortObjects.length > 3 ? width / 3 : width / sortObjects.length;
  const h = height / Math.ceil(sortObjects.length / 3);
  const x = Math.ceil(mouseX / w) - 1;
  const y = Math.ceil(mouseY / h) - 1;
  const index = x + y * 3;

  if (index >= sortObjects.length) {
    return;
  }

  Graph.remove(sortObjects, index);
  Graph.shuffle(sortObjects);
}

function dom() {
  DOM.PARENT = document.getElementById("header");

  DOM.button(sortEvent, "Sort");
  DOM.button(shuffleEvent, "Shuffle");
  selectionDom = DOM.dropdown([
    algorithms.SELECTION,
    algorithms.QUICKSORT,
    algorithms.COCKTAIL,
    algorithms.BUBBLE,
    algorithms.INSERTION,
    algorithms.SHELL,
    algorithms.MERGE,
  ]);
  DOM.button(addEvent, "Add");
}

function draw() {
  background(0);
  Graph.draw(sortObjects);

  const w = sortObjects.length > 3 ? width / 3 : width / sortObjects.length;
  const h = height / Math.ceil(sortObjects.length / 3);
  const x = w * (Math.ceil(mouseX / w) - 1);
  const y = h * (Math.ceil(mouseY / h) - 1);

  push();
  noStroke();
  fill(255, 255, 255, 100);
  rect(x, y, w, h);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, h);
  background(0);
}

function mousePressed() {
  if (sortObjects.length == 0) return;

  const w = sortObjects.length > 3 ? width / 3 : width / sortObjects.length;
  const h = height / Math.ceil(sortObjects.length / 3);

  for (let i = 0; i < sortObjects.length; i++) {
    const x = w * (i % 3);
    const y = h * Math.floor(i / 3);
    console.log(x, y, w, h, mouseX, mouseY);
    if (x <= mouseX && mouseX <= x + w && y <= mouseY && mouseY <= y + h) {
      Graph.remove(sortObjects, i);
      Graph.shuffle(sortObjects);
      break;
    }
  }
}
