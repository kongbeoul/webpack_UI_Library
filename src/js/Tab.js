import head from "lodash/head";
import forEach from "lodash/forEach";

class TabModel {
  constructor() {
    this._activeTabId = null;
  }
  get activeTabId() {
    return this._activeTabId;
  }
  set activeTabId(idx) {
    this._activeTabId = idx;
  }
}

export default class TabView {
  constructor(wrapper) {
    this.wrapper = document.querySelector(wrapper);
    this.list = this.wrapper.querySelector(".js-tabs-tablist");
    this.items = this.wrapper.querySelectorAll(".js-tabs-item");
    this.model = new TabModel();
    this.model.activeTabId = head(this.items).dataset.tabId;

    this.updateTabs();
    this.updateTabItem();

    this.list.addEventListener("click", e => {
      let { target } = e;
      if (target.classList.contains("c-tabs-tablist")) return;
      while (!target.classList.contains("c-tabs-tab")) {
        target = target.parentNode;
      }
      const { tabId } = target.dataset;
      this.model.activeTabId = tabId;
      this.updateTabs();
      this.updateTabItem();
    });
  }
  updateTabs() {
    const { activeTabId } = this.model;
    forEach(this.list.children, tab => {
      tab.dataset.tabId == activeTabId ? tab.classList.add("c-tabs-tab--active") : tab.classList.remove("c-tabs-tab--active");
    });
  }
  updateTabItem() {
    const { activeTabId } = this.model;
    forEach(this.items, item => {
      item.dataset.tabId == activeTabId ? (item.style.display = "block") : (item.style.display = "none");
    });
  }
}
