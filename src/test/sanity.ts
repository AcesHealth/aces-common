require('mocha');

import chai = require('chai');
const { assert } = chai;

describe('Sanity checks', () => {
    it('should calculate 2 + 2 = 4', () => {
        assert(2 + 2 == 4);
    });
});