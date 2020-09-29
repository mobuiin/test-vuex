import Vue from "vue";
import store from "@/store";
import FastClick from "fastclick";

FastClick.prototype.focus = function focus(el) {
  try {
    el.focus();
  } catch (e) {
    // ignore this
  }
};

FastClick.prototype.onTouchEnd = event => {
  if (event.target.getAttribute("fast-click") === "false") {
    return false;
  }
  return true;
};
FastClick.attach(document.body);

export function entry(App) {
  return new Vue({
    el: "#app",
    // router,
    store,
    render: h => h(App)
  });
}
