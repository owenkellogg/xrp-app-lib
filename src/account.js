'use strict';
var Promise = require('bluebird');
var http = Promise.promisifyAll(require('superagent'));
var deprecatedRippleLib = require('ripple-lib-0.9.4');
var _ = require('lodash');
var Errors = require(__dirname+'/errors');
var RippleAPI = require("ripple-lib").RippleAPI

function parseXRPBalance(balances) {
  
  var balance = undefined;

  balances.forEach(b => {
    if (b.currency === "XRP") {
      balance = parseFloat(b.value)
    }
  })

  return balance
}

class Account {

  constructor(options) {
    if (options && deprecatedRippleLib.UInt160.is_valid(options.publicKey)) {
      this._publicKey = options.publicKey;
    } else {
      throw new Errors.InvalidPublicKey
    }
  }

  get publicKey() {
    return this._publicKey;
  }

  get balance() {
    return this._balance;
  }

  updateBalance() {
    var _this = this;

    return new Promise((resolve, reject) => {
      const ripple = new RippleAPI({server: 'wss://s1.ripple.com:443'});

      ripple.connect().then(() => {

        ripple.getBalances(_this.publicKey).then(balances => {
          _this._balance = parseXRPBalance(balances);
          ripple.disconnect();
          resolve(_this._balance)
        })
        .catch(error => {
          _this._balance = 0;
          ripple.disconnect();
          reject(error)
        })
      })
    })
  }
}

module.exports = Account;

