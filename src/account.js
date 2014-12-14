var Promise = require('bluebird');
var http = Promise.promisifyAll(require('superagent-browserify'));
var _ = require('lodash');
var Errors = require('./errors');
var rippleLib = window.ripple;

class Account {

  constructor(options) {
    if (options && rippleLib.UInt160.is_valid(options.publicKey)) {
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
    return new Promise(function(resolve, reject) {
      http.get('https://api.ripple.com/v1/accounts/'+_this.publicKey+'/balances').endAsync()
        .then(function(response) {
          if (response.body.success) {
            var balance = _.filter(response.body.balances, function(balance) {
              return balance.currency === 'XRP'
            })[0];
            _this._balance = parseFloat(balance.value); 
            resolve(parseFloat(balance.value));
          } else {
            _this._balance = 0;
            resolve(0);
          }
        })
        .catch(reject);
    });
  }
}

module.exports = Account;

