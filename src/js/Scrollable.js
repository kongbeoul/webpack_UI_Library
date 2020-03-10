import forEach from "lodash/forEach";
import isFunction from "lodash/isFunction";
import bind from "lodash/bind";

export default class Scrollable {
  static _instance = null;

  static get instance() {
    if (!Scrollable._instance) {
      Scrollable._instance = new Scrollable();
    }
    return Scrollable._instance;
  }

  tick = false;
  handlers = [];

  constructor() {
    if (!Scrollable._instance) {
      Scrollable._instance = this;
      this.init();
    }
    return Scrollable._instance;
  }
  init() {
    window.addEventListener("scroll", bind(this.scroll, this));
  }
  add(handler) {
    if (!isFunction(handler)) return false;
    this.handlers.push(handler);
  }
  scroll() {
    if (!this.tick) {
      requestAnimationFrame(() => {
        this.tick = false;
        let { pageYOffset: viewTop } = window;
        let { innerHeight: viewHeight } = window;
        let viewBottom = viewTop + viewHeight;
        forEach(this.handlers, h => {
          h(viewTop, viewHeight, viewBottom);
        });
      });
      this.tick = true;
    }
  }
}
