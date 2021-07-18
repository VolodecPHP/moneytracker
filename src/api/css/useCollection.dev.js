"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCollection = void 0;

var _firebaseconfig = require("./firebaseconfig");

var useCollection = function useCollection(collection) {
  var addDoc = function addDoc(data, name) {
    return regeneratorRuntime.async(function addDoc$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_firebaseconfig.projectFirestore.collection(collection).doc(name).set(data));

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0.message);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 5]]);
  };

  var addDocWithRandomName = function addDocWithRandomName(data) {
    return regeneratorRuntime.async(function addDocWithRandomName$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_firebaseconfig.projectFirestore.collection(collection).add(data));

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0.message);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 5]]);
  };

  var getDoc = function getDoc(name) {
    var docRef, res;
    return regeneratorRuntime.async(function getDoc$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            docRef = _firebaseconfig.projectFirestore.collection(collection).doc(name);
            _context3.next = 3;
            return regeneratorRuntime.awrap(docRef.get());

          case 3:
            res = _context3.sent;

            if (!res.exists) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.data());

          case 6:
            return _context3.abrupt("return", false);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    });
  };

  var getAllDocuments = function getAllDocuments() {
    var collectionRef, res;
    return regeneratorRuntime.async(function getAllDocuments$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            collectionRef = _firebaseconfig.projectFirestore.collection(collection);
            _context4.next = 3;
            return regeneratorRuntime.awrap(collectionRef.get());

          case 3:
            res = _context4.sent;

            if (res.empty) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.docs);

          case 6:
            return _context4.abrupt("return", false);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    });
  };

  return {
    addDoc: addDoc,
    addDocWithRandomName: addDocWithRandomName,
    getDoc: getDoc,
    getAllDocuments: getAllDocuments
  };
};

exports.useCollection = useCollection;