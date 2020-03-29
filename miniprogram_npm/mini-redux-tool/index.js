module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1585462381572, function(require, module, exports) {
var __TEMP__ = require('./utils/index');var reduxContext = __REQUIRE_DEFAULT__(__TEMP__);

exports.createStore = reduxContext.createStore;
exports.subscribe = reduxContext.subscribe;
exports.unsubscribe = reduxContext.unsubscribe;
exports.dispath = reduxContext.dispath;
exports.getState = reduxContext.getState;
exports.redux = reduxContext.redux;
exports.clearState = reduxContext.clearState;

}, function(modId) {var map = {"./utils/index":1585462381573}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1585462381573, function(require, module, exports) {
exports.createStore = createStore;
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.dispath = dispath;
exports.getState = getState;
exports.clearState = clearState;

exports.redux = Behavior({
  lifetimes: {
    attached() {
      subscribe(this.__wxExparserNodeId__, this.updateData, this);
      this.updateData.call(this, true);
    },
    detached() {
      unsubscribe(this.__wxExparserNodeId__);
    }
  },

  definitionFilter(defFields) {
    var selector = defFields.selector;
    if (!selector) {
      throw new Error("no selector function");
    }

    if (!defFields.methods) {
      defFields.methods = {};
    }
    defFields.methods._selector = selector;

    if (defFields.componentDidUpdate) {
      defFields.methods._componentDidUpdate = defFields.componentDidUpdate;
    }
  },

  methods: {
    updateData(isPageCome) {
      const pageData = this._selector(state);
      this.setData(pageData);

      if (!isPageCome) {
        if (this._componentDidUpdate) {
          if (preState) {
            this._componentDidUpdate(this._selector(preState));
          } else {
            this._componentDidUpdate({});
          }
        }
      }
    }
  }
});

let preState, state;
let listeners = [];
let reducers, sagas;
let action = {};

function createStore(reducer, saga) {
  reducers = reducer;
  sagas = saga || undefined;
  state = updateStore(reducers, preState);
}

function getState() {
  return JSON.parse(JSON.stringify(state));
}

function subscribe(id, listener, that) {
  let bol = true;
  for (let i in listeners) {
    if (listeners[i].id === id) {
      bol = false;
      break;
    }
  }
  bol && listeners.push({ id, listener, that });
}

function unsubscribe(id) {
  let idx = -1;
  for (let i in listeners) {
    if (listeners[i].id === id) {
      idx = +i;
      break;
    }
  }

  idx !== -1 && listeners.splice(idx, 1);
}

function dispath(_action) {
  action = _action;
  preState = state;
  state = updateStore(reducers, preState);
  console.log(
    "prev state:",
    preState,
    "" + "\n",
    _action,
    "" + "\n",
    "next state:",
    state
  );
  notify();
  handleSagas();
}

function notify() {
  listeners.forEach(child => child.listener.call(child.that));
}

function handleSagas() {
  if (sagas) {
    if (sagas[action.type]) {
      sagas[action.type].forEach(cb => cb(state, action));
    }
  }
}

function updateStore(reducer, state) {
  const res = {};
  for (let i in reducer) {
    if (typeof reducer[i] === "function") {
      if (state && state[i]) {
        res[i] = reducer[i](action, state[i]);
      } else {
        res[i] = reducer[i](action);
      }
    } else {
      if (state && state[i]) {
        res[i] = updateStore(reducer[i], state[i]);
      } else {
        res[i] = updateStore(reducer[i]);
      }
    }
  }
  return res;
}

function clearState() {
  preState = state;
  action = {};
  state = updateStore(reducers);
  notify();
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1585462381572);
})()
//# sourceMappingURL=index.js.map