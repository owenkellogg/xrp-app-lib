var Wallet = require(__dirname+'/wallet');
var rippleLib = require('ripple-lib');
var Promise = require('bluebird');

class XRPLib {

  get _Wallet() {
    return Wallet;
  }

  createWallet() {
    return new Wallet;
  }

  importWalletFromSecret(key) {
    return new Wallet({ secretKey: key.toString() });
  }

  updateBalance(wallet) {
    return wallet.updateBalance()
  }

  sendPayment(options) {
    return options.from.sendPayment(options)
      .then(function() {
        return Promise.all([
          options.from.updateBalance(),
          options.to.updateBalance()
        ]);
      });
  }
}

module.exports = new XRPLib();

