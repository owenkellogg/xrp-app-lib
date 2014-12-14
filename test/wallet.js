var wallets = require(__dirname+'/wallets.json').wallets;
var XRPLib = require(__dirname+'/../');
var assert = require('assert');

describe('Wallets', function() {

  var wallet, wallet1, wallet2;
  
  it('Wallet inherts from Account', function() {
    wallet = new XRPLib._Wallet();
    assert(wallet instanceof XRPLib._Account);
    assert(wallet instanceof XRPLib._Wallet);
  });

  it('Private Wallet type', function() {
    wallet = new XRPLib._Wallet();
  });

  it('should create a wallet', function() {
    wallet = XRPLib.createWallet();
    assert(wallet instanceof XRPLib._Wallet);
    assert(wallet.publicKey !== wallet.secretKey);
    
    assert.strictEqual(wallet.balance, undefined, "A new wallet should have a no balance");
  });

  it('should throw error when importing an empty secret', function() {
    assert.throws(
      function() {
        XRPLib.importWalletFromSecret('')
      },
      XRPLib.Errors.InvalidPrivateKey
    );
  });

  it.skip('should send a payment', function(done) {
    var secret = wallets[0].secret;
    var wallet1 = XRPLib.importWalletFromSecret(secret);

    var wallet2 = new XRPLib.createWallet();

    XRPLib.sendPayment({
        from: wallet1,
        to: wallet2,
        amount: 30
    }).then(function(payment) {
      assert(payment);
      assert(wallet1.balance < 130, "Wallet 1 should have made a payment");
      assert.strictEqual(wallet2.balance, 30, "Wallet 2 should be funded");
      done();
    });
  });

  it('should check the balance', function(done) {
    var wallet = XRPLib.importWalletFromSecret(wallets[0].secret);

    XRPLib.updateBalance(wallet).then(function(balance) {
      assert(wallet.balance > 0);
      assert.strictEqual(wallet.balance, balance);
      done();
    });
  });
});

