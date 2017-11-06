import { Operation } from '../../authorization/model';

const ORGANIZATIONS = '/organizations';

export const getOrg1 = {
    resource : ORGANIZATIONS + '/org1',
    operations : ['R'] as Operation[]
};

export const createOrganization = {
    resource : ORGANIZATIONS,
    operations : ['C'] as Operation[]
};