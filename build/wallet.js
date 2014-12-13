"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Promise = require("bluebird");
var rippleLib = require("ripple-lib");
var http = Promise.promisifyAll(require("superagent"));
var _ = require("lodash");

var Wallet = (function () {
  var Wallet = function Wallet(options) {
    if (!options) {
      var options = {};
    };
    var wallet;
    if (!options.secretKey) {
      wallet = rippleLib.Wallet.generate();
      this._publicKey = wallet.address;
      this._secretKey = wallet.secret;
      this._balance = 0;
    } else {
      var secret = options.secretKey;
      wallet = new rippleLib.Wallet(secret);
      this._publicKey = wallet.getAddress().value;
      this._secretKey = wallet.secret;
    }
  };

  Wallet.prototype.sendPayment = function (options) {
    var _this = this;
    var remote = new rippleLib.Remote({
      servers: [{ host: "s1.ripple.com", port: 443, secure: true }]
    });
    return new Promise(function (resolve, reject) {
      remote.connect(function (err, res) {
        if (err) {
          return reject(err);
        }
        remote.setSecret(_this.publicKey, _this.secretKey);

        remote.createTransaction("Payment", {
          account: _this.publicKey,
          destination: options.to.publicKey,
          amount: options.amount * 1000000
        }).submit(function (error, response) {
          remote.disconnect();
          if (error) {
            return reject(error);
          };
          resolve(response);
        });
      });
    });
  };

  Wallet.prototype.updateBalance = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
      http.get("https://api.ripple.com/v1/accounts/" + _this.publicKey + "/balances").endAsync().then(function (response) {
        if (response.body.success) {
          var balance = _.filter(response.body.balances, function (balance) {
            return balance.currency === "XRP";
          })[0];
          _this._balance = parseFloat(balance.value);
          resolve(parseFloat(balance.value));
        } else {
          _this._balance = 0;
          resolve(0);
        }
      })["catch"](reject);
    });
  };

  _classProps(Wallet, null, {
    publicKey: {
      get: function () {
        return this._publicKey;
      }
    },
    secretKey: {
      get: function () {
        return this._secretKey;
      }
    },
    balance: {
      get: function () {
        return this._balance;
      }
    }
  });

  return Wallet;
})();

module.exports = Wallet;