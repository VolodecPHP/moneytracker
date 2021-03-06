"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = require("vue");

var _firebaseconfig = require("../api/firebaseconfig");

var user = (0, _vue.ref)(_firebaseconfig.projectAuth.currentUser);

_firebaseconfig.projectAuth.onAuthStateChanged(function (_user) {
  user.value = _user;
});

var getUser = function getUser() {
  var userFromLocalStorage = localStorage.getItem("logined-user");

  if (userFromLocalStorage) {
    return JSON.parse(userFromLocalStorage);
  }

  return user.value;
};

var _default = getUser;
exports["default"] = _default;