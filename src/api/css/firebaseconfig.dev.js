"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectFirestore = void 0;

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/firestore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var firebaseConfig = {
  apiKey: "AIzaSyC65vOfi-W0PI6g7Ajz-AVrXJIIDskswxE",
  authDomain: "moneytracker-86aed.firebaseapp.com",
  projectId: "moneytracker-86aed",
  storageBucket: "moneytracker-86aed.appspot.com",
  messagingSenderId: "778313824970",
  appId: "1:778313824970:web:32509b24c21a2d848c1233"
}; // init firebase

_app["default"].initializeApp(firebaseConfig);

var projectFirestore = _app["default"].firestore();

exports.projectFirestore = projectFirestore;