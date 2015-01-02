import {uris_to_pass, uris_to_fail} from './uri.json'
import * as url from 'url'
import * as assert from 'assert'
import * as XRPLib from '../'

function compareKeys(object1, object2, keys) {
    if (!(keys instanceof Array))
        keys = [keys]
    for (let key of keys)
        assert.strictEqual(object1[key], object2[key])
}

describe('URIs', function() {
    it('should verify correctly formatted uris', function() {
        assert.doesNotThrow(function() {
            for (let uri of uris_to_pass)
                XRPLib.decodeURI(uri)
        })
    })

    it('should throw for incorrectly formatted uris', function() {
        for (let uri of uris_to_fail)
            assert.throws(function() {
                XRPLib.decodeURI(uri)
            })
    })

    it('should decode parameters correctly', function() {
        const justAccount = uris_to_pass[0]
        var data, expected
        data = XRPLib.decodeURI(justAccount)

        expected = {
            action: "query",
            address: "rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe"
        }

        compareKeys(data, expected, ['action', 'address'])

        const rippleProtocol = uris_to_pass[1]
        data = XRPLib.decodeURI(rippleProtocol)

        compareKeys(data, expected, ['action', 'address'])

        const justSend = uris_to_pass[2]
        data = XRPLib.decodeURI(justSend)

        expected = {
            action: "send",
            to: "rfemvFrpCAPc4hUa1v8mPRYdmaCqR1iFpe"
        }

        compareKeys(data, expected, ['action', 'to'])

        const sendWithData = uris_to_pass[3]
        data = XRPLib.decodeURI(sendWithData)

        expected.amount = 10

        compareKeys(data, expected, ['action', 'to', 'amount'])
    })
})
