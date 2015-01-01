import {uris_to_pass, uris_to_fail} from './uri.json';
import * as url from 'url';
import * as assert from 'assert';
import * as XRPLib from '../';

describe('URIs', function() {
    it('should verify correctly formatted uris', function() {
        assert.doesNotThrow(function() {
            for (let uri of uris_to_pass) {
                XRPLib.decodeURI(uri);
            }
        });
    });

    it('should throw for incorrectly formatted uris', function() {
        for (let uri of uris_to_fail) {
            assert.throws(function() {
                XRPLib.decodeURI(uri);
            });
        }
    });

    it('should decode parameters correctly', function() {
        const justAccount = uris_to_pass[0];
        var data;
        data = XRPLib.decodeURI(justAccount);

        assert.deepEqual(data, {
            protocol: "ripple.com:",
            action: "query",
            account: "rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe",
        });

        const rippleProtocol = uris_to_pass[1];
        data = XRPLib.decodeURI(rippleProtocol);

        assert.deepEqual(data, {
            protocol: "ripple:",
            action: "query",
            account: "rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe",
        });

        const justSend = uris_to_pass[2];
        data = XRPLib.decodeURI(justSend);

        assert.deepEqual(data, {
            protocol: "ripple.com:",
            action: "send",
            account: "rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe"
        });

        const sendWithData = uris_to_pass[3];
        data = XRPLib.decodeURI(sendWithData);

        assert.deepEqual(data, {
            protocol: "ripple.com:",
            action: "send",
            account: "rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe",
            amount: 10,
            currency: "XRP"
        });
    });
});
