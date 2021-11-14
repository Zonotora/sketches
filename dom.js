class DOM {
  static PARENT = document.getElementsByClassName("p5-DOM")[0];

  static reset() {
    DOM.PARENT = document.getElementsByClassName("p5-DOM")[0];
  }

  static slider(f, min, max, val) {
    const div = createDiv().addClass("slider-container");
    const slider = createSlider(min, max, val);
    slider.elt.oninput = () => f(slider);
    slider.addClass("slider");
    slider.parent(div);
    div.parent(DOM.PARENT);
    return slider;
  }
  static button(f, title) {
    const div = createDiv().addClass("button-container");
    const button = createButton(title);
    button.mousePressed(() => f(button));
    button.parent(div);
    button.addClass("button");
    div.parent(DOM.PARENT);
    return button;
  }
  static dropdown(options, f = (e) => {}) {
    const div = createDiv().addClass("dropdown-container");
    const dropdown = createSelect();
    for (let i = 0; i < options.length; i++) {
      dropdown.option(options[i]);
    }
    dropdown.changed(() => f(dropdown));
    dropdown.parent(div);
    dropdown.addClass("dropdown");
    div.parent(DOM.PARENT);
    return dropdown;
  }
  static textfield(f, defaultValue, title) {
    const div = createDiv().addClass("textfield-container");
    const legend = createElement("legend", title);
    const fieldset = createElement("fieldset");
    const textfield = createInput();
    fieldset.elt.onclick = () => textfield.elt.focus();
    fieldset.addClass("textfield");
    textfield.value(defaultValue);
    textfield.input(() => f(textfield));
    fieldset.parent(div);
    legend.parent(fieldset);
    textfield.parent(fieldset);
    div.parent(DOM.PARENT);
    return textfield;
  }
}
