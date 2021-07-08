"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmation = void 0;

window.onload = function () {
  document.querySelector('#popupDecline').addEventListener('click', function () {
    document.querySelector('#confirmationPopupQuestion').textContent = '';
    document.querySelector('.confirmation-popup-wrapper').classList.remove('opened');
    CONFRIMATION_CONTROLLER.resolve(false);
  });
  document.querySelector('#popupConfirm').addEventListener('click', function () {
    document.querySelector('#confirmationPopupQuestion').textContent = '';
    document.querySelector('.confirmation-popup-wrapper').classList.remove('opened');
    CONFRIMATION_CONTROLLER.resolve(true);
  });
};

var CONFRIMATION_CONTROLLER = null;

var confirmation = function confirmation(message) {
  var resolve, reject, popupPromise;
  return regeneratorRuntime.async(function confirmation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          document.querySelector('.confirmation-popup-wrapper').classList.add('opened');
          document.querySelector('#confirmationPopupQuestion').textContent = message;
          popupPromise = new Promise(function (ok, fail) {
            resolve = ok;
            reject = fail;
          });
          CONFRIMATION_CONTROLLER = {
            resolve: resolve,
            reject: reject
          };
          return _context.abrupt("return", popupPromise);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.confirmation = confirmation;