'use strict';
var Promise = require('bluebird');
var rippleLibDeprecated = require('ripple-lib-0.9.4');
var http = Promise.promisifyAll(require('superagent'));
var _ = require('lodash');
var Account = require(__dirname+'/account');
var Errors = require(__dirname+'/errors');

class Wallet extends Account {

  constructor(options) {
    var wallet;

    if (!options) {
      wallet = rippleLibDeprecated.Wallet.generate();
    } else {
      if (rippleLibDeprecated.Seed.is_valid(options.privateKey)) {
        var secret = options.privateKey;
        wallet = new rippleLibDeprecated.Wallet(secret);
        wallet.address = wallet.getAddress().value;
      } else {
        throw new Errors.InvalidPrivateKey
      }
    }
    super({publicKey: wallet.address});
    this._publicKey = wallet.address;
    this._privateKey = wallet.secret;
  }

  static generate() {
    var wallet = rippleLibDeprecated.Wallet.generate();
    return new Wallet({ privateKey: wallet.secret });
  }

  get privateKey() {
    return this._privateKey;
  }

  sendPayment(options) {
    var _this = this;
    var remote = new rippleLibDeprecated.Remote({
      servers: [
        { host: 's1.ripple.com', port: 443, secure: true }
      ]
    });
    return new Promise(function(resolve, reject) {
      remote.connect(function(err, res) {
        if (err) { return reject(err) }
        remote.setSecret(_this.publicKey, _this.privateKey) 

        remote.createTransaction('Payment', {
          account: _this.publicKey,
          destination: options.to.publicKey,
          amount: options.amount * 1000000
        })
        .submit(function(error, response) {
          remote.disconnect();
          if (error) { return reject(error) };
          resolve(response);
        });
      });
    });
  }
}

module.exports = Wallet;

