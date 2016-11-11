"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

"use strict";

var InvalidPrivateKey = (function (Error) {
  var InvalidPrivateKey = function InvalidPrivateKey() {
    Error.apply(this, arguments);
  };

  _extends(InvalidPrivateKey, Error);

  return InvalidPrivateKey;
})(Error);

var InvalidPublicKey = (function (Error) {
  var InvalidPublicKey = function InvalidPublicKey() {
    Error.apply(this, arguments);
  };

  _extends(InvalidPublicKey, Error);

  return InvalidPublicKey;
})(Error);

module.exports = {
  InvalidPrivateKey: InvalidPrivateKey,
  InvalidPublicKey: InvalidPublicKey
};