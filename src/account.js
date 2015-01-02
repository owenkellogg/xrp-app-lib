import * as Promise from 'bluebird';
import Errors from './errors';

try {
    import * as superagent from 'superagent-browserify';
} catch(_) {
    import * as superagent from 'superagent';
}
const http = Promise.promisifyAll(superagent);

try {
    const rippleLib = window.ripple;
} catch(_) {
    import * as rippleLib from 'ripple-lib';
}

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
    return http.get('https://api.ripple.com/v1/accounts/'+_this.publicKey+'/balances')
               .endAsync()
               .then(function(response) {
                   if (response.body.success) {
                       var balance
                       for (let _balance of response.body.balances)
                           if (_balance.currency === 'XRP') {
                               balance = _balance
                               break
                           }
                       _this._balance = parseFloat(balance.value); 
                       return parseFloat(balance.value);
                   } else {
                       return _this._balance = 0;
                   }
               });
  }
}

export default Account;

