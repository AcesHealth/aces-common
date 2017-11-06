require('mocha');

import chai = require('chai');
const { assert } = chai;

import Capability = require('../authorization/capability');

import { getOrg1, createOrganization } from './mockData/authorization';

describe('Capability checks', () => {
    it('should return true', () => {
        assert(Capability.createOrganization([createOrganization]));
        assert(Capability.createOrganization([getOrg1, createOrganization]));
    });

    it('should return false', () => {
        assert(Capability.createOrganization([getOrg1]) == false);
        assert(Capability.deleteOrganization(1, [getOrg1, createOrganization]) == false);
        assert(Capability.createTrial(1, [getOrg1, createOrganization]) == false);
        assert(Capability.deleteTrial(1, 1, [getOrg1, createOrganization]) == false);
    });
});