import { OrganizationType } from './organizationType';

export interface Organization {
    readonly id: number;
    readonly name : string;
    readonly logoUrl : string | null;
    readonly size : string | null;
    readonly type : OrganizationType;
}