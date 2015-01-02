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

var XError = (function (Error) {
  var XError = function XError(message) {
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  };

  _extends(XError, Error);

  return XError;
})(Error);

var InvalidPrivateKey = (function (Error) {
  var InvalidPrivateKey = function InvalidPrivateKey(message) {
    this.type = "InvalidPrivateKey";
    Error.call(this, message);
  };

  _extends(InvalidPrivateKey, Error);

  return InvalidPrivateKey;
})(Error);

var InvalidPublicKey = (function (Error) {
  var InvalidPublicKey = function InvalidPublicKey(message) {
    this.type = "InvalidPublicKey";
    Error.call(this, message);
  };

  _extends(InvalidPublicKey, Error);

  return InvalidPublicKey;
})(Error);

exports["default"] = {
  InvalidPrivateKey: InvalidPrivateKey,
  InvalidPublicKey: InvalidPublicKey
};