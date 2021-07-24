"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogin = void 0;

var _firebaseconfig = require("../api/firebaseconfig");

var error = null;

var useLogin = function useLogin() {
  var login = function login(email, password) {
    var res;
    return regeneratorRuntime.async(function login$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            error = null;
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(_firebaseconfig.projectAuth.signInWithEmailAndPassword(email, password));

          case 4:
            res = _context.sent;
            error = null;
            return _context.abrupt("return", res);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            error = _context.t0.message;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 9]]);
  };

  var getError = function getError() {
    return error;
  };

  return {
    login: login,
    getError: getError
  };
};

exports.useLogin = useLogin;