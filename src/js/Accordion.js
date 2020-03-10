import find from "lodash/find";
import forEach from "lodash/forEach";

class AccordionModel {
  constructor() {
    this._activeIndex = null;
  }
  get activeIndex() {
    return this._activeIndex;
  }
  set activeIndex(activeItem) {
    this._activeIndex = activeItem;
  }
}

export default class AccodionView {
  constructor(wrapper, initialActiveItemIdx = 0) {
    this.wrapper = document.querySelector(wrapper);
    this.items = this.wrapper.querySelectorAll(".js-accordion-item");
    this.model = new AccordionModel();
    this.model.activeIndex = initialActiveItemIdx;

    this.updateItem();

    forEach(this.items, (item, i) => {
      item.querySelector(".c-accordion-title").addEventListener("click", e => {
        let { target } = e;
        while (!target.classList.contains("c-accordion-title")) {
          target = target.parentNode;
        }
        item.classList.toggle("c-accordion-item--active");
        if (item.classList.contains("c-accordion-item--active")) {
          this.model.activeIndex = i;
          this.updateItem();
        }
      });
    });
  }
  updateItem() {
    forEach(this.items, (item, i) => {
      this.model.activeIndex === i ? item.classList.add("c-accordion-item--active") : item.classList.remove("c-accordion-item--active");
    });
  }
}
