require('mocha');

import chai = require('chai');
const { assert } = chai;

import Auth = require('../authorization/authorizer');

import { getOrg1, createOrganization } from './mockData/authorization';

describe('Authorization checks', () => {
    it('should authorize requests', () => {
        assert(Auth.authorizeRequest({url : '/organizations', method : 'GET'}, [getOrg1]).access == 'ALLOW');
        assert(Auth.authorizeRequest({url : '/organizations/org1', method : 'GET'}, [getOrg1]).access == 'ALLOW');
        assert(Auth.authorizeRequest({url : '/organizations', method : 'POST'}, [createOrganization]).access == 'ALLOW');
        assert(Auth.authorizeRequest({url : '/organizations', method : 'POST'}, [getOrg1, createOrganization]).access == 'ALLOW');
    });

    it('should deny requests', () => {
        assert(Auth.authorizeRequest({url : '/organizations/org2', method : 'GET'}, [getOrg1]).access == 'DENY');
        assert(Auth.authorizeRequest({url : '/users', method : 'POST'}, [getOrg1, createOrganization]).access == 'DENY');
    });
});