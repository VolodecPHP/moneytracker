"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuex = require("vuex");

var _default = (0, _vuex.createStore)({
  state: {
    lightTheme: true
  },
  mutations: {
    setThemeVisual: function setThemeVisual(state) {
      !state.lightTheme ? document.querySelector('html').classList.add('theme-dark') : document.querySelector('html').classList.remove('theme-dark');
      localStorage.setItem('lightTheme', state.lightTheme);
    },
    changeTheme: function changeTheme(state) {
      state.lightTheme = !state.lightTheme;
    },
    getThemeFromLS: function getThemeFromLS(state) {
      var lightTheme = JSON.parse(localStorage.getItem('lightTheme'));
      state.lightTheme = lightTheme;
    }
  },
  actions: {}
});

exports["default"] = _default;