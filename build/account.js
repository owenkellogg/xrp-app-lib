"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

"use strict";
var Promise = require("bluebird");
var http = Promise.promisifyAll(require("superagent"));
var deprecatedRippleLib = require("ripple-lib-0.9.4");
var _ = require("lodash");
var Errors = require(__dirname + "/errors");
var RippleAPI = require("ripple-lib").RippleAPI;

function parseXRPBalance(balances) {
  var balance = undefined;

  balances.forEach(function (b) {
    if (b.currency === "XRP") {
      balance = parseFloat(b.value);
    }
  });

  return balance;
}

var Account = (function () {
  var Account = function Account(options) {
    if (options && deprecatedRippleLib.UInt160.is_valid(options.publicKey)) {
      this._publicKey = options.publicKey;
    } else {
      throw new Errors.InvalidPublicKey();
    }
  };

  Account.prototype.updateBalance = function () {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var ripple = new RippleAPI({ server: "wss://s1.ripple.com:443" });

      ripple.connect().then(function () {
        ripple.getBalances(_this.publicKey).then(function (balances) {
          _this._balance = parseXRPBalance(balances);
          ripple.disconnect();
          resolve(_this._balance);
        })["catch"](function (error) {
          _this._balance = 0;
          ripple.disconnect();
          reject(error);
        });
      });
    });
  };

  _classProps(Account, null, {
    publicKey: {
      get: function () {
        return this._publicKey;
      }
    },
    balance: {
      get: function () {
        return this._balance;
      }
    }
  });

  return Account;
})();

module.exports = Account;