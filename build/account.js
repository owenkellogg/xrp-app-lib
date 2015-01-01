"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Promise = require('bluebird');

var _ = require('lodash');

var Errors = require('./errors')["default"];


try {
  var superagent = require('superagent-browserify');
} catch (_) {
  var superagent = require('superagent');
}
var http = Promise.promisifyAll(superagent);

try {
  var rippleLib = window.ripple;
} catch (_) {
  var rippleLib = require('ripple-lib');
}

var Account = (function () {
  var Account = function Account(options) {
    if (options && rippleLib.UInt160.is_valid(options.publicKey)) {
      this._publicKey = options.publicKey;
    } else {
      throw new Errors.InvalidPublicKey();
    }
  };

  Account.prototype.updateBalance = function () {
    var _this = this;
    return http.get("https://api.ripple.com/v1/accounts/" + _this.publicKey + "/balances").endAsync().then(function (response) {
      if (response.body.success) {
        var balance = _.filter(response.body.balances, function (balance) {
          return balance.currency === "XRP";
        })[0];
        _this._balance = parseFloat(balance.value);
        return parseFloat(balance.value);
      } else {
        return _this._balance = 0;
      }
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

exports["default"] = Account;