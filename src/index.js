import * as Promise from 'bluebird';
import Wallet from './wallet';
import Account from './account';
import Errors from './errors';

class XRPLib {

  get _Wallet() {
    return Wallet;
  }

  get _Account() {
    return Account;
  }

  get Errors() {
    return Errors;
  }

  createWallet() {
    return Wallet.generate();
  }

  importWalletFromSecret(privateKey) {
    return new Wallet({ privateKey: privateKey });
  }

  importAccountFromAddress(publicKey) {
    return new Account({ publicKey: publicKey });
  }

  updateBalance(account) {
    return account.updateBalance()
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
