"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Promise = require("bluebird");
var Wallet = require("./wallet");
var Account = require("./account");
var Errors = require("./errors");

var XRPLib = (function () {
  var XRPLib = function XRPLib() {};

  XRPLib.prototype.createWallet = function () {
    return Wallet.generate();
  };

  XRPLib.prototype.importWalletFromSecret = function (privateKey) {
    return new Wallet({ privateKey: privateKey });
  };

  XRPLib.prototype.importAccountFromAddress = function (publicKey) {
    return new Account({ publicKey: publicKey });
  };

  XRPLib.prototype.updateBalance = function (account) {
    return account.updateBalance();
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
    },
    _Account: {
      get: function () {
        return Account;
      }
    },
    Errors: {
      get: function () {
        return Errors;
      }
    }
  });

  return XRPLib;
})();

module.exports = new XRPLib();