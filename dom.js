import Profile from "./Profile.json";

export default class DOMCreator {
  constructor(p) {
    this.root = document.getElementsByClassName("p5-DOM")[0];
    this.p = p;
  }

  button(f, title) {
    const div = this.p.createDiv().addClass(Profile.GridItem);
    const button = this.p.createButton(title);
    button.mousePressed(f);
    button.parent(div);
    button.addClass(Profile.ButtonLight);
    div.parent(this.root);
  }

  dropdown(f, options) {
    const div = this.p.createDiv().addClass(Profile.GridItem);
    const dropdown = this.p.createSelect();
    for (let i = 0; i < options.length; i++) {
      dropdown.option(options[i]);
    }
    dropdown.changed(() => f(dropdown));
    dropdown.parent(div);
    dropdown.addClass(Profile.ButtonLight);
    div.parent(this.root);
  }

  textfield(f, defaultValue, title) {
    const div = this.p.createDiv().addClass(Profile.GridItem);
    const legend = this.p.createElement("legend", title);
    const fieldset = this.p.createElement("fieldset");
    const textfield = this.p.createInput();
    fieldset.elt.onclick = () => textfield.elt.focus();
    fieldset.addClass(Profile.ButtonLight);
    textfield.value(defaultValue);
    textfield.input(() => f(textfield));
    fieldset.parent(div);
    legend.parent(fieldset);
    textfield.parent(fieldset);
    div.parent(this.root);
  }
}
