import { OrganizationType } from './organizationType';

export interface Organization {
    readonly id: number;
    readonly name : string;
    readonly logoUrl : string;
    readonly size : string;
    readonly organizationType : OrganizationType;
}