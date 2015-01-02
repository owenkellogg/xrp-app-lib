class XError extends Error {
    constructor(message) {
        this.message = message
        Error.captureStackTrace(this, this.constructor)
    }
}

class InvalidPrivateKey extends Error {
    constructor(message) {
        this.type = 'InvalidPrivateKey'
        super(message)
    }
}

class InvalidPublicKey extends Error {
    constructor(message) {
        this.type = 'InvalidPublicKey'
        super(message)
    }
}

export default {
  InvalidPrivateKey: InvalidPrivateKey,
  InvalidPublicKey: InvalidPublicKey
};

