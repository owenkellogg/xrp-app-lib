const url = require('url');
const queryString = require('query-string');
const Promise = require('bluebird');
const Checkit = require('checkit');

class decodeURI {

    constructor() {
        this.urlCheckit = new Checkit({
            protocol: 'required'
        });
    }

    decode(uri) {
        if (typeof uri !== 'string')
            throw new URIError("uri is not a string");
        
        var params = url.parse(uri);
    }
}

class URIError extends Error {
    constructor(message) {
        this.message = message;
        this.type = "URIError"
        Error.captureStackTrace(this, URIError);
    }
}

export default new decodeURI();

