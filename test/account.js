var XRPLib = require(__dirname+'/../');
var wallets = require(__dirname+'/wallets.json').wallets;
var assert = require('assert');

describe('Accounts', function() {

  it('should import an account by address', function() {
    var account = XRPLib.importAccountFromAddress(wallets[0].address);

    assert(account instanceof XRPLib._Account);
    assert(!(account instanceof XRPLib._Wallet));
    assert.strictEqual(account.publicKey, wallets[0].address);
    assert.strictEqual(account.balance, undefined);
  });

  it('should throw an error on invalid address', function() {
    assert.throws(
      function() {
        XRPLib.importAccountFromAddress('23l4kj2xxxx')
      },
      XRPLib.Errors.InvalidPublicKey
    );
  });

  it('should check the balance', function(done) {
    var account = XRPLib.importAccountFromAddress(wallets[0].address);

    XRPLib.updateBalance(account).then(function(balance) {
      console.log('XRPLib.updateBalance:result', balance)
      assert(account.balance > 0);
      assert.strictEqual(account.balance, balance);
      done();
    });
  });
});

