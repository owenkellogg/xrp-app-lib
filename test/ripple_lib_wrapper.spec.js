var wallets = require(__dirname+'/wallets.json').wallets;

describe('Library Tests', function() {

  var wallet, wallet1, wallet2;

  it('Private Wallet type', function() {
    wallet = new XRPLib._Wallet({
        secretKey: ""
    });
    assert.strictEqual(typeof wallet.publicKey, "string", "A wallet's public key should be a string");
    assert.strictEqual(typeof wallet.secretKey, "string", "A wallet's secret key should be a string");
    assert.strictEqual(typeof wallet.balance, "number", "A wallet's balance should be a float");
  });

  it('should create a wallet', function() {
    wallet = XRPLib.createWallet();
    assert(wallet instanceof XRPLib._Wallet);
    assert(wallet.publicKey !== wallet.secretKey);
    assert.strictEqual(wallet.balance, 0, "A new wallet should have a zero balance");
  });

  it('should import wallet by secret key', function() {
    var secret = wallets[0].secret;
    var walletFromSecret = XRPLib.importWalletFromSecret(secret);
    assert(walletFromSecret instanceof XRPLib._Wallet);
    assert.strictEqual(walletFromSecret.publicKey, wallets[0].address);
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
    var secret = wallets[0].secret;
    var wallet1 = XRPLib.importWalletFromSecret(secret);
    XRPLib.updateBalance(wallet1).then(function(balance) {
      assert(wallet1.balance > 0);
      done();
    });
  });
});

