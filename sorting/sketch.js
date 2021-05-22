import Graph from "./graph";
import Sorting from "./sorting";
import Profile from "../Profile.json";

export default function sketch(p) {
  const canvas_height = p.displayWidth / 2.5;

  const canvas_width_off = 0;
  const sorting_algorithms = {
    SELECTION: "Selection Sort",
    QUICKSORT: "Quicksort",
    COCKTAIL: "Cocktail Sort",
    BUBBLE: "Bubble Sort",
    INSERTION: "Insertion Sort",
    SHELL: "Shell Sort",
    MERGE: "Merge Sort",
  };
  let sortObjects = [];
  let selection_dom;
  let btnRemove;

  p.setup = function () {
    p.createCanvas(p.displayWidth - canvas_width_off, canvas_height);
    p.frameRate(30);
    init_dom();
  };

  function sort_event() {
    for (let i = 0; i < sortObjects.length; i++) {
      const sortObj = sortObjects[i];
      sortObj.f(sortObj.a, sortObj.s);
    }
  }

  function shuffle_event() {
    Graph.shuffle(p, sortObjects);
  }

  function add_event() {
    if (sortObjects.length >= 9) {
      return;
    }
    let f = Sorting.selection;
    switch (selection_dom.value()) {
      case sorting_algorithms.SELECTION:
        f = Sorting.selection;
        break;
      case sorting_algorithms.QUICKSORT:
        f = Sorting.quicksort;
        break;
      case sorting_algorithms.COCKTAIL:
        f = Sorting.cocktail;
        break;
      case sorting_algorithms.BUBBLE:
        f = Sorting.bubble;
        break;
      case sorting_algorithms.INSERTION:
        f = Sorting.insertion;
        break;
      case sorting_algorithms.SHELL:
        f = Sorting.shell;
        break;
      case sorting_algorithms.MERGE:
        f = Sorting.merge;
        break;
      default:
        f = Sorting.selection;
        break;
    }
    Graph.add(p, sortObjects, f, selection_dom.value(), 50);
    Graph.shuffle(p, sortObjects);
  }

  function remove_event() {
    const w =
      sortObjects.length > 3 ? p.width / 3 : p.width / sortObjects.length;
    const h = p.height / Math.ceil(sortObjects.length / 3);
    const x = Math.ceil(p.mouseX / w) - 1;
    const y = Math.ceil(p.mouseY / h) - 1;
    const index = x + y * 3;

    if (index >= sortObjects.length) {
      return;
    }

    Graph.remove(p, sortObjects, index);
    Graph.shuffle(p, sortObjects);
  }

  function init_dom() {
    const parentNode = document.getElementsByClassName("p5-DOM")[0];

    let divSort = p.createDiv().addClass(Profile.GridItem);
    let btnSort = p.createButton("Sort");
    btnSort.mousePressed(sort_event);
    btnSort.parent(divSort);
    btnSort.addClass(Profile.ButtonLight);
    divSort.parent(parentNode);

    let divShuffle = p.createDiv().addClass(Profile.GridItem);
    let btnShuffle = p.createButton("Shuffle");
    btnShuffle.mousePressed(shuffle_event);
    btnShuffle.parent(divShuffle);
    btnShuffle.addClass(Profile.ButtonLight);
    divShuffle.parent(parentNode);

    p.textAlign(p.CENTER);

    let divSelection_dom = p.createDiv().addClass(Profile.GridItem);
    selection_dom = p.createSelect();
    selection_dom.option(sorting_algorithms.SELECTION);
    selection_dom.option(sorting_algorithms.QUICKSORT);
    selection_dom.option(sorting_algorithms.COCKTAIL);
    selection_dom.option(sorting_algorithms.BUBBLE);
    selection_dom.option(sorting_algorithms.INSERTION);
    selection_dom.option(sorting_algorithms.SHELL);
    selection_dom.option(sorting_algorithms.MERGE);
    selection_dom.parent(divSelection_dom);
    selection_dom.addClass(Profile.ButtonLight);
    divSelection_dom.parent(parentNode);

    let divAdd = p.createDiv().addClass(Profile.GridItem);
    let btnAdd = p.createButton("Add");
    btnAdd.mousePressed(add_event);
    btnAdd.parent(divAdd);
    btnAdd.addClass(Profile.ButtonLight);
    divAdd.parent(parentNode);

    btnRemove = p.createButton("Remove");
    btnRemove.mousePressed(remove_event);
    btnRemove.position(-100, -100);
    btnRemove.addClass(Profile.ButtonDark);
  }

  p.draw = function () {
    p.background(42, 42, 42);
    Graph.draw(p, sortObjects);
    draw_remove_square();
  };

  function draw_remove_square() {
    if (
      p.mouseY < 0 ||
      p.mouseX < 0 ||
      sortObjects.length === 0 ||
      p.mouseY > p.height
    ) {
      btnRemove.position(-100, -100);
      return;
    }
    const w =
      sortObjects.length > 3 ? p.width / 3 : p.width / sortObjects.length;
    const h = p.height / Math.ceil(sortObjects.length / 3);
    const x = w * (Math.ceil(p.mouseX / w) - 1);
    const y = h * (Math.ceil(p.mouseY / h) - 1);

    p.push();
    p.noStroke();
    p.fill(255, 255, 255, 100);
    p.rect(x, y, w, h);
    btnRemove.position(
      x + w / 2 - btnRemove.width / 2 - 45,
      y + h / 2 - btnRemove.height + 130
    );
    p.pop();
  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth - canvas_width_off, canvas_height);
  };
}
