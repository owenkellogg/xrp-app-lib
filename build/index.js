"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Wallet = require(__dirname + "/wallet");
var rippleLib = require("ripple-lib");
var Promise = require("bluebird");

var XRPLib = (function () {
  var XRPLib = function XRPLib() {};

  XRPLib.prototype.createWallet = function () {
    return Wallet.generate();
  };

  XRPLib.prototype.importWalletFromSecret = function (key) {
    return new Wallet({ secretKey: key.toString() });
  };

  XRPLib.prototype.updateBalance = function (wallet) {
    return wallet.updateBalance();
  };

  XRPLib.prototype.sendPayment = function (options) {
    return options.from.sendPayment(options).then(function () {
      return Promise.all([options.from.updateBalance(), options.to.updateBalance()]);
    });
  };

  _classProps(XRPLib, null, {
    _Wallet: {
      get: function () {
        return Wallet;
      }
    }
  });

  return XRPLib;
})();

module.exports = new XRPLib();