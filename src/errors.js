'use strict';

class InvalidPrivateKey extends Error { }
class InvalidPublicKey extends Error { }

module.exports = {
  InvalidPrivateKey: InvalidPrivateKey,
  InvalidPublicKey: InvalidPublicKey
}

