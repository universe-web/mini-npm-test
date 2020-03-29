//app.js
import { createStore } from "miniprogram_npm/mini-redux-tool/index.js";
import reducers from "./reducers/index";
import sagas from "./sagas/index";

createStore(reducers, sagas);

App({
  onLaunch: function () {},
  globalData: {}
})